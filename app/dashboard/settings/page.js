"use client"; // Ensures the component is a Client Component

import React from 'react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Correct import for LogoutLink

function Settings() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" 
         style={{ 
           backgroundImage: "url('https://i.pinimg.com/originals/64/20/b7/6420b726daf8d0b7203c2abe58222447.gif')", 
           backgroundSize: 'cover', 
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center'
         }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Account Settings</h1>
        <p className="text-gray-600 text-center mb-6">Are you sure you want to log out?</p>
        
        <div className="flex flex-col items-center">
          <LogoutLink className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 mb-4 w-full text-center">
            Goodbye !
          </LogoutLink>
          <p className="text-gray-500 text-sm text-center">Click the button above to logout of your account :(</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;