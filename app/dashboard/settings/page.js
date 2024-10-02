"use client"; // Ensures the component is a Client Component

import React from 'react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Correct import for LogoutLink

function Settings() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <p className="mb-4">Are you sure you want to log out?</p>
        <LogoutLink className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Log out
        </LogoutLink>
      </div>
    </div>
  );
}

export default Settings;
