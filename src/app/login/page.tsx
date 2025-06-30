"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "@/helper/mailer";
import { getEmail } from "@/services/send";

type UserDataType = {
  _id: string;
  email: string;
  name?: string; // Optional fields if needed
  // Add other fields returned by your backend if necessary
};

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const [diabledButton, setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(userData);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("api/users/login", user);
      console.log("response of login", response.data);
      setUserData(response.data.user);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      console.log("error in sign in", error.message);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";

      toast.error(errorMessage);
      setUserData(null);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    try {
      if (userData) {
        const response = await axios.post("api/users/loginemail", {
          email: userData.email,
          emailType: "RESET",
          userId: userData._id,
        });
        console.log("response of login email", response.data);
      }
    } catch (error: any) {
      console.log("error in reset", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-grey-600 cursor-pointer"
        onClick={onLogin}
      >
        {diabledButton ? "Not Login" : "Login"}
      </button>
      <Link href="/signup"> Go To Signup Page</Link>
      <Link href="/reset"> ResetPassword</Link>
    </div>
  );
}
