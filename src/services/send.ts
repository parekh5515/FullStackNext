import { sendEmail } from "@/helper/mailer";

export async function getEmail(
  email: string,
  emailType: string,
  userId: string,
) {
  try {
    await sendEmail({ email, emailType, userId });
  } catch (error) {
    console.log("error in send email", error);
  }
}
