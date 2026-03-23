import { BrevoClient } from "@getbrevo/brevo";

type SendEmailParams = {
  to: string;
  subject: string;
  htmlContent: string;
};

export async function sendEmail({ to, subject, htmlContent }: SendEmailParams) {
  const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
  });

  console.log("sending to:", to);

  return client.transactionalEmails.sendTransacEmail({
    sender: {
      email: "no-reply@gocart-ph.online",
      name: "GoCart PH",
    },
    to: [{ email: to }],
    subject,
    htmlContent,
  });
}
