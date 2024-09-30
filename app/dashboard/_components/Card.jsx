import React from 'react';

function Card({ icon, title, value }) {
  return (
    <div 
      className='flex items-center gap-5 p-7 rounded-lg shadow-sm bg-gray-700'>
      <div className='p-3.5 h-[50px] w-[50px] rounded-full bg-white text-black'>
        {icon}
      </div>
      <div>
        <h2 className='font-bold text-xl text-white'>{title}</h2> {/* White text */}
        <h2 className='text-lg text-white'>{value}</h2> {/* White text */}
      </div>
    </div>
  );
}

export default Card;
