import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_admin: boolean;
  is_read: boolean;
  created_at: string;
}

interface Conversation {
  id: string;
  user_id: string;
  created_at: string;
  last_message_at: string;
}

export const useChat = (userId: string | undefined, isAdmin: boolean = false) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  // Get or create conversation for user
  const getOrCreateConversation = useCallback(async () => {
    if (!userId) return null;

    // First try to get existing conversation
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingConv) {
      return existingConv as Conversation;
    }

    // Create new conversation if doesn't exist
    const { data: newConv, error } = await supabase
      .from("conversations")
      .insert({ user_id: userId })
      .select()
      .single();

    if (error) {
      console.error("Error creating conversation:", error);
      return null;
    }

    return newConv as Conversation;
  }, [userId]);

  // Fetch messages for a conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data as Message[]);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(async (content: string, conversationId: string, senderId: string, isAdminMessage: boolean = false) => {
    const { error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        is_admin: isAdminMessage,
      });

    if (error) {
      console.error("Error sending message:", error);
      return false;
    }

    // If admin is sending, trigger email notification
    if (isAdminMessage) {
      try {
        await supabase.functions.invoke("send-chat-notification", {
          body: { conversationId, message: content },
        });
      } catch (e) {
        console.error("Error sending notification:", e);
      }
    }

    return true;
  }, []);

  // Mark messages as read
  const markAsRead = useCallback(async (conversationId: string) => {
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conversationId)
      .eq("is_read", false);
  }, []);

  // Initialize conversation and messages
  useEffect(() => {
    const init = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      const conv = await getOrCreateConversation();
      if (conv) {
        setConversation(conv);
        await fetchMessages(conv.id);
      }
      setLoading(false);
    };

    init();
  }, [userId, getOrCreateConversation, fetchMessages]);

  // Subscribe to realtime messages
  useEffect(() => {
    if (!conversation?.id) return;

    const channel = supabase
      .channel(`messages-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  return {
    messages,
    conversation,
    loading,
    sendMessage,
    markAsRead,
    fetchMessages,
    setConversation,
  };
};

export const useAdminConversations = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        profiles:user_id (email, pan_number)
      `)
      .order("last_message_at", { ascending: false });

    if (!error && data) {
      // Get unread counts for each conversation
      const convsWithUnread = await Promise.all(
        data.map(async (conv) => {
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("is_admin", false)
            .eq("is_read", false);

          return { ...conv, unread_count: count || 0 };
        })
      );
      setConversations(convsWithUnread);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConversations();

    // Subscribe to new messages
    const channel = supabase
      .channel("admin-conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  return { conversations, loading, refetch: fetchConversations };
};
