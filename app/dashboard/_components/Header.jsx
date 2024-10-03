"use client";

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React from 'react';
import { Menu } from 'lucide-react'; // Import Menu icon from lucide-react

function Header({ toggleSidebar }) {
  const { user } = useKindeBrowserClient();
  
  return (
    <div className='p-5 shadow-sm border flex justify-between items-center'>
      {/* Hamburger icon for mobile view */}
      <div className="block md:hidden"> {/* Only show on screens smaller than 769px */}
        <button onClick={toggleSidebar} aria-label="Open Sidebar">
          <Menu size={24} />
        </button>
      </div>

      {/* This empty div ensures the user image is always at the end */}
      <div className="flex-1"></div>

      <div>
        <Image 
          src={user?.picture} 
          width={47} 
          height={47} 
          alt='user' 
          className='rounded-full' 
        />
      </div>
    </div>
  );
}

export default Header;