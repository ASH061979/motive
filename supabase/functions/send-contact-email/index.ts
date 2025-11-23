import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid input",
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message } = validationResult.data;

    console.log("Processing contact form submission from:", name);

    // Send email to MotivWealth team with the contact form details
    const teamEmailResponse = await resend.emails.send({
      from: "MotivWealth Contact Form <onboarding@resend.dev>",
      to: ["megnaprakash21@gmail.com"],
      reply_to: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>From:</strong> ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</a></p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555;">Message:</h3>
            <p style="line-height: 1.6; color: #666; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px;">
            This email was sent from the MotivWealth contact form.
          </p>
        </div>
      `,
    });

    console.log("Team email sent successfully:", teamEmailResponse);

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "MotivWealth <onboarding@resend.dev>",
      to: [email],
      subject: "We've Received Your Message - MotivWealth",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            Thank You for Contacting MotivWealth
          </h2>
          
          <p style="line-height: 1.6; color: #333; margin: 20px 0;">
            Dear ${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')},
          </p>
          
          <p style="line-height: 1.6; color: #333; margin: 20px 0;">
            We have received your message and appreciate you reaching out to us. Our team will review your inquiry and respond within <strong>24 hours</strong>.
          </p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Your Message:</h3>
            <p style="line-height: 1.6; color: #666; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          
          <p style="line-height: 1.6; color: #333; margin: 20px 0;">
            If you have any urgent matters, please feel free to call us at:
          </p>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Phone:</strong> +65 8353 8647</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> +91 8130498071</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> motivwealth.in@gmail.com</p>
          </div>
          
          <p style="line-height: 1.6; color: #333; margin: 20px 0;">
            Best regards,<br>
            <strong>The MotivWealth Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      `,
    });

    console.log("User confirmation email sent successfully:", userEmailResponse);

    return new Response(JSON.stringify({ 
      teamEmail: teamEmailResponse, 
      userEmail: userEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
