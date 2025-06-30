import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { Html } from "next/document";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f65ec67e1ce297",
        pass: "b94f3bba36f53b",
      },
    });

    const linkPath = emailType === "VERIFY" ? "verifyemail" : "changePassword";

    const mailOptions = {
      from: "deep@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
        Click <a href="${process.env.DOMAIN}/${linkPath}?token=${hashedToken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } or copy and paste the link below in your browser. <br>
        ${process.env.DOMAIN}/${linkPath}?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    console.log("mailresponse", mailresponse);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.messsage);
  }
};
