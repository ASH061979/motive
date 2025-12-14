import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminConversations } from "@/hooks/useChat";
import { Loader2, Users, MessageCircle, TrendingUp, Send, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  pan_number: string | null;
  created_at: string;
}

interface UserWithAssets extends Profile {
  total_assets: number;
  mutual_funds: number;
  shares_bonds: number;
  fixed_deposits: number;
  other_assets: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_admin: boolean;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAdmin();
  const { conversations, loading: convsLoading, refetch } = useAdminConversations();
  const [users, setUsers] = useState<UserWithAssets[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "chat">("users");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    
    // Fetch all profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching profiles:", error);
      setLoadingUsers(false);
      return;
    }

    // Fetch assets for each user
    const usersWithAssets = await Promise.all(
      (profiles as Profile[]).map(async (profile) => {
        const { data: assets } = await supabase
          .from("user_assets")
          .select("*")
          .eq("user_id", profile.user_id);

        const totals = {
          mutual_funds: 0,
          shares_bonds: 0,
          fixed_deposits: 0,
          other_assets: 0,
        };

        if (assets) {
          assets.forEach((asset: any) => {
            const value = Number(asset.current_value);
            if (asset.asset_type === "mutual_funds") totals.mutual_funds += value;
            else if (asset.asset_type === "shares_bonds") totals.shares_bonds += value;
            else if (asset.asset_type === "fixed_deposits") totals.fixed_deposits += value;
            else if (asset.asset_type === "other_assets") totals.other_assets += value;
          });
        }

        return {
          ...profile,
          ...totals,
          total_assets: totals.mutual_funds + totals.shares_bonds + totals.fixed_deposits + totals.other_assets,
        };
      })
    );

    setUsers(usersWithAssets);
    setLoadingUsers(false);
  };

  const selectConversation = async (conv: any) => {
    setSelectedConversation(conv);
    
    // Fetch messages
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data as Message[]);
    }

    // Mark as read
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("conversation_id", conv.id)
      .eq("is_admin", false)
      .eq("is_read", false);

    refetch();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setSending(true);
    
    const { error } = await supabase
      .from("messages")
      .insert({
        conversation_id: selectedConversation.id,
        sender_id: user.id,
        content: newMessage,
        is_admin: true,
      });

    if (error) {
      toast.error("Failed to send message");
    } else {
      // Send email notification
      try {
        await supabase.functions.invoke("send-chat-notification", {
          body: { 
            conversationId: selectedConversation.id, 
            message: newMessage,
            userEmail: selectedConversation.profiles?.email 
          },
        });
      } catch (e) {
        console.error("Error sending notification:", e);
      }
      
      setNewMessage("");
      // Refetch messages
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", selectedConversation.id)
        .order("created_at", { ascending: true });
      if (data) setMessages(data as Message[]);
    }
    
    setSending(false);
  };

  // Subscribe to realtime messages
  useEffect(() => {
    if (!selectedConversation?.id) return;

    const channel = supabase
      .channel(`admin-messages-${selectedConversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation?.id]);

  if (authLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const totalAssets = users.reduce((sum, u) => sum + u.total_assets, 0);
  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">₹{totalAssets.toLocaleString("en-IN")}</p>
                    <p className="text-sm text-muted-foreground">Total Assets Under Management</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{totalUnread}</p>
                    <p className="text-sm text-muted-foreground">Unread Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4 mr-2" />
              User Accounts
            </Button>
            <Button
              variant={activeTab === "chat" ? "default" : "outline"}
              onClick={() => setActiveTab("chat")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
              {totalUnread > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {totalUnread}
                </Badge>
              )}
            </Button>
          </div>

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>All User Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No users found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>PAN</TableHead>
                        <TableHead>Mutual Funds</TableHead>
                        <TableHead>Shares & Bonds</TableHead>
                        <TableHead>Fixed Deposits</TableHead>
                        <TableHead>Other</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.email}</TableCell>
                          <TableCell>{u.pan_number || "-"}</TableCell>
                          <TableCell>₹{u.mutual_funds.toLocaleString("en-IN")}</TableCell>
                          <TableCell>₹{u.shares_bonds.toLocaleString("en-IN")}</TableCell>
                          <TableCell>₹{u.fixed_deposits.toLocaleString("en-IN")}</TableCell>
                          <TableCell>₹{u.other_assets.toLocaleString("en-IN")}</TableCell>
                          <TableCell className="text-right font-bold">
                            ₹{u.total_assets.toLocaleString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Conversations List */}
              <Card className="md:col-span-1">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    {convsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : conversations.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground text-sm">
                        No conversations yet
                      </p>
                    ) : (
                      conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => selectConversation(conv)}
                          className={cn(
                            "w-full p-4 text-left border-b hover:bg-muted/50 transition-colors",
                            selectedConversation?.id === conv.id && "bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">
                              {conv.profiles?.email || "Unknown"}
                            </span>
                            {conv.unread_count > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conv.unread_count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(conv.last_message_at).toLocaleDateString("en-IN")}
                          </p>
                        </button>
                      ))
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <Card className="md:col-span-2">
                {selectedConversation ? (
                  <>
                    <CardHeader className="py-3 border-b">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                          <CardTitle className="text-lg">
                            {selectedConversation.profiles?.email}
                          </CardTitle>
                          {selectedConversation.profiles?.pan_number && (
                            <p className="text-xs text-muted-foreground">
                              PAN: {selectedConversation.profiles.pan_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
                        <div className="space-y-3">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={cn(
                                "flex",
                                message.is_admin ? "justify-end" : "justify-start"
                              )}
                            >
                              <div
                                className={cn(
                                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                  message.is_admin
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                )}
                              >
                                {message.content}
                                <div
                                  className={cn(
                                    "text-[10px] mt-1 opacity-70"
                                  )}
                                >
                                  {new Date(message.created_at).toLocaleTimeString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="p-3 border-t flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          disabled={sending}
                          className="flex-1"
                        />
                        <Button
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={sending || !newMessage.trim()}
                        >
                          {sending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-[500px] text-muted-foreground">
                    Select a conversation to start chatting
                  </CardContent>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
