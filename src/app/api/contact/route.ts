import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jonathan@focusfirst.studio";

interface ContactFormData {
  org: string;
  scope: string;
  timeline: string;
  name: string;
  email: string;
  message: string;
  orgLabel: string;
  scopeLabel: string;
  timelineLabel: string;
  tierName?: string;
  tierPrice?: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    const emailBody = [
      `Organization: ${data.orgLabel}`,
      `Scope: ${data.scopeLabel}`,
      `Timeline: ${data.timelineLabel}`,
      data.tierName ? `Estimate: ${data.tierName} (${data.tierPrice})` : "",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    // Send email to admin
    const adminResponse = await resend.emails.send({
      from: "Focus First <noreply@focusfirst.studio>",
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New project inquiry from ${data.name}`,
      text: emailBody,
      html: `<pre style="font-family: monospace; white-space: pre-wrap;">${emailBody}</pre>`,
    });

    if (adminResponse.error) {
      console.error("Error sending admin email:", adminResponse.error);
      return Response.json(
        { error: "Failed to send email to admin" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const userResponse = await resend.emails.send({
      from: "Focus First <noreply@focusfirst.studio>",
      to: data.email,
      subject: "We received your project inquiry",
      html: `
        <h2>Thanks for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>We've received your project inquiry and will get back to you within 24 hours.</p>
        <hr />
        <h3>Your submission:</h3>
        <pre style="font-family: monospace; white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 8px;">${emailBody}</pre>
        <p>Best regards,<br />Focus First Team</p>
      `,
    });

    if (userResponse.error) {
      console.error("Error sending user confirmation email:", userResponse.error);
      // Don't fail the whole request if confirmation email fails
    }

    return Response.json(
      {
        success: true,
        message: "Email sent successfully",
        adminEmailId: adminResponse.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
