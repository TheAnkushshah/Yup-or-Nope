import { Button } from '@/components/ui/button';
import React from 'react'

function Share() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center overflow-hidden" 
             style={{ 
               backgroundImage: "url('https://i.pinimg.com/originals/78/17/04/7817047889af38d483287d632d383e6e.gif')", 
               backgroundSize: 'cover', 
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               height: '100vh',
             }}>
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full mb-36">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Share Feature</h1>
            <p className="text-gray-600 text-center mb-6">Imagination ✨</p>
            
            <div className="flex flex-col items-center">
              <Button className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 mb-4 w-full text-center">
                Back to home
              </Button>
              <p className="text-gray-500 text-sm text-center">Developer is currenlty working upon his thoughts :)</p>
            </div>
          </div>
        </div>
      );
}

export default Share