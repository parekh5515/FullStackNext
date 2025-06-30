"use client";

import axios from "axios";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleSavedPassword = async () => {
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post("/api/users/reset-password", {
            token,
            password,
          });
          setVerified(true);
          console.log("response of change password", response.data);
          toast.success("Password changed successfully");
          router.push("/login");
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.error || "Something went wrong!";
          console.log("error in change password", error.message);
          setVerified(false);
          toast.error(errorMessage);
        }
      } else {
        toast.error("Password not match");
      }
    } else {
      toast.error("Password required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl"> Verify Email </h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className="text-2xl"> Reset Password </h2>
        <hr />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <hr />
        <label htmlFor="confirmpassword">confirm password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="confirmpassword"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-grey-600 cursor-pointer"
          onClick={handleSavedPassword}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
