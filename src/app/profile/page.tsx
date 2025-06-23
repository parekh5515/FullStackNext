"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const roouter = useRouter();

  const [userData, seUserData] = useState("nothing");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      seUserData(response.data.data._id);
    } catch (error: any) {
      console.log("error in getUserDetails");
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      roouter.push("/login");
    } catch (error: any) {
      console.log("error in logout", error.message);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <hr />
      <h2 className="p-3 rounded bg-green-500">
        {userData === "nothing" ? (
          "nothing "
        ) : (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        )}
      </h2>
      <hr />
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
