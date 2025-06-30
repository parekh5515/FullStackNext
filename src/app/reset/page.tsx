"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabledButton] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [email]);

  const onReset = async () => {
    try {
      //   setLoading(true);
      console.log("tyujk");

      const response = await axios.post(
        "http://localhost:3003/api/users/login-email",
        { email },
      );
      console.log("response of reset", response.data);
      toast.success(response.data.message);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";

      console.log("error in reset password", error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Password</h1>

      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-grey-600 cursor-pointer"
        onClick={onReset}
      >
        {disabled ? "Not Reset" : "reset password"}
      </button>
    </div>
  );
};
export default ResetPassword;
