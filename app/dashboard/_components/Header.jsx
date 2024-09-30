"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image';
import React from 'react'

function Header() {
  const {user}=useKindeBrowserClient();
  return (
    <div className='p-5 shadow-sm border flex justify-between'>
      <div>

      </div>
      <div>
        <Image src={user?.picture}
        width={47}
        height={47}
        alt='user'
        className='rounded-full'
        />
      </div>
    </div>
  )
}

export default Header