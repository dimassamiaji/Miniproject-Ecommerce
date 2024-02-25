// Import React and other necessary libraries
"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    referralCode: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Fungsi untuk memuat data user
    const loadUserData = async () => {
      try {
        const response = await axiosInstance.get("/path-to-user-data"); // Sesuaikan endpoint
        setUser(response.data);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  // Fungsi untuk menangani update profil
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Kirim data update ke server
      await axiosInstance.put("/path-to-update-user", user);
      alert("Profile updated successfully");
      // Refresh data user atau navigasi
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {/* Repeat for lastName, email, phoneNumber */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
