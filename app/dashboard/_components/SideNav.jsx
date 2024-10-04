"use client";

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LayoutIcon, GraduationCap, Hand, Settings, Download, Smartphone, Laptop, Headset, Send, Mail, PhoneCall, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function SideNav({ isOpen }) { // Accept isOpen prop
  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: 'Home',
      icon: LayoutIcon,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Students',
      icon: GraduationCap,
      path: '/dashboard/students'
    },
    {
      id: 3,
      name: 'Attendance',
      icon: Hand,
      path: '/dashboard/attendance'
    },
    {
      id: 4,
      name: 'Download',
      icon: Download,
      path: '#'
    },
    {
      id: 5,
      name: 'App',
      icon: Smartphone,
      path: 'https://govt-model-sanskriti-senior-secondary-school.vercel.app'
    },
    {
      id: 6,
      name: 'Website',
      icon: Laptop,
      path: 'https://govt-model-sanskriti-senior-secondary-school.vercel.app'
    },
    {
      id: 7,
      name: 'Gurugram',
      icon: MapPin,
      path: 'https://maps.app.goo.gl/VwV9DUwQ5yyrB4Xo6'
    },
    {
      id: 8,
      name: '0124-2570289',
      icon: PhoneCall,
      path: 'tel:0124-2570289'
    },
    {
      id: 9,
      name: 'Email',
      icon: Mail,
      path: 'mailto:5520gmssss@gmail.com'
    },
    {
      id: 10,
      name: 'Contact',
      icon: Headset,
      path: 'https://govt-model-sanskriti-senior-secondary-school.vercel.app/Contact.html'
    },
    {
      id: 11,
      name: 'Share',
      icon: Send,
      path: '#'
    },
    {
      id: 12,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
  ];
  
  const path = usePathname();
  
  useEffect(() => {
    console.log(path);
  }, [path]);
  
  return (
    <div className="border shadow-md h-full p-2 py-5 overflow-y-auto overflow-x-hidden">
      <Link href="/" className="flex items-center gap-3">
        <Image src={'/op.png'} width={440} height={110} alt='Yup or Nope' />
      </Link>

      <hr className='my-5 -mx-2 w-screen'></hr>

      {menuList.map((menu) => (
        <Link key={menu.id} href={menu.path} target={menu.path.startsWith('http') ? '_blank' : '_self'}>
          <h2 className={`flex items-center gap-3 text-md p-4 text-slate-600 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-white cursor-pointer rounded-lg my-1 ${path === menu.path ? 'bg-gray-700 text-white' : ''}`}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      <div className="pl-2 mt-9">
        <div className='flex items-center gap-3'>
          <Image src={user?.picture} width={45} height={45} alt='user' className='rounded-full' />
          <div>
            <h2 className='font-bold text-lg font-mono text-slate-800'>{user?.given_name} {user?.family_name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;