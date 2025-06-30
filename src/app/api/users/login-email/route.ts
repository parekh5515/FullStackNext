import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  console.log("request", request);
  try {
    const reqBody = await request.json();
    console.log("reqBody", reqBody);
    const { email } = reqBody;

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json({ error: "Invalid Email Id" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "login email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
