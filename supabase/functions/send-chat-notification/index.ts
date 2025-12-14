import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ChatNotificationRequest {
  conversationId: string;
  message: string;
  userEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId, message, userEmail }: ChatNotificationRequest = await req.json();

    console.log("Sending chat notification for conversation:", conversationId);
    console.log("User email:", userEmail);

    if (!userEmail) {
      console.log("No user email provided, skipping notification");
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailResponse = await resend.emails.send({
      from: "MotivWealth <onboarding@resend.dev>",
      to: [userEmail],
      subject: "New message from MotivWealth",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .message-box { background-color: white; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MotivWealth</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>You have received a new message from Meghna at MotivWealth:</p>
                <div class="message-box">
                  <p>${message}</p>
                </div>
                <p>Log in to your MotivWealth account to reply.</p>
                <p>Best regards,<br>The MotivWealth Team</p>
              </div>
              <div class="footer">
                <p>MotivWealth - Your Trusted Investment Partner</p>
                <p>Mutual Fund Investments are subject to market risks. Read all scheme related documents carefully.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-chat-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
