"use client"; // Ensures the component is a Client Component

import React from 'react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Correct import for LogoutLink

function Settings() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Account Settings</h1>
        <p className="text-gray-600 text-center mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center">
          <LogoutLink className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105">
            Log out
          </LogoutLink>
        </div>
      </div>
    </div>
  );
}

export default Settings;
