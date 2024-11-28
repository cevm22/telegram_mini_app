'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import WebApp from '@twa-dev/sdk';
import { useState, useEffect } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [emojis, setEmojis] = useState<{ emoji: string; style: any }[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, []);

  useEffect(() => {
    generateEmojis();
  }, []);


  const generateEmojis = () => {
    const emojiList = ['✊', '✌️', '✋'];

    const newEmojis = Array.from({ length: 30 }, () => ({
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 3 + 1}rem`,
        opacity: 0.2,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }));
    setEmojis(newEmojis);
  };

  const handleRedirect = (destination: string) => {
    console.log(`Redirecting to: ${destination}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Emojis */}
      {emojis.map((emoji, index) => (
        <span key={index} className="absolute" style={emoji.style}>
          {emoji.emoji}
        </span>
      ))}

      <h1 className="bg-black text-4xl sm:text-5xl font-bold mb-12 text-yellow-500 shadow-[0_0_20px_gold] p-4 rounded-lg relative z-10">
        Trillion Wars
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl px-4">
        <div
          onClick={() => handleRedirect('RANKED')}
          className="bg-blue-700 text-center text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl">Ranked 10</h2>
        </div>
        <div
          onClick={() => handleRedirect('FREE')}
          className="bg-green-700 text-center text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl">FREE</h2>
        </div>
        <div
          onClick={() => handleRedirect('JACKPOT')}
          className="bg-red-700 text-center text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform cursor-pointer"
        >
          <h2 className="text-2xl sm:text-3xl">Jackpot</h2>
        </div>
      </div>
    </div>
  );
}
