import { sendMail } from "infrastructure/email/mailer";

export async function emailSendService ( subject: string, content: string, to: string, from?: string, cc?: string, bcc?: string ) {
  await sendMail( {
    from: from ? from : process.env.EMAIL!,
    to,
    cc,
    bcc,
    subject,
    html: content
  } );
}