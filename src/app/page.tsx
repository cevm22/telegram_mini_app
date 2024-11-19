'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import WebApp from '@twa-dev/sdk'
import { useState, useEffect } from 'react'

export default function Home() {
  const [numbers, setNumbers] = useState<string[]>(['0', '0', '0', '0', '0', '0'])
  const [showWinner, setShowWinner] = useState(false)
  const [emojis, setEmojis] = useState<{ emoji: string; style: any }[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }

    generateEmojis()
  }, [])

  const generateEmojis = () => {
    const emojiList = ['✊', '✌️', '✋']

    const newEmojis = Array.from({ length: 30 }, () => ({
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 3 + 1}rem`,
        opacity: 0.2,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }))
    setEmojis(newEmojis)
  }

  const rollNumbers = () => {
    // In a real scenario, this would be an API call to the backend
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10).toString())
    setNumbers(newNumbers)
    setShowWinner(Math.random() > 0.5) // 20% chance of winning for demo purposes
  }

  interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {typeof window !== "undefined" &&
        emojis.map((emoji, index) => (
          <span key={index} className="absolute" style={emoji.style}>
            {emoji.emoji}
          </span>
        ))}

      <div>
        <div className="z-10 flex flex-col items-center gap-4 mb-8 px-4">
          {/* Flex Container for Both Blocks */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            {/* First Block: First 3 Numbers and Comma */}
            <div className="flex items-center gap-2">
              {numbers.slice(0, 3).map((number, index) => (
                <div
                  key={`top-${index}`}
                  className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >
                  {number}
                </div>
              ))}
              {/* Comma */}
              <div className="text-6xl font-bold text-white mx-2">,</div>
            </div>

            {/* Second Block: Remaining Numbers */}
            <div className="flex items-center gap-2">
              {numbers.slice(3).map((number, index) => (
                <div
                  key={`bottom-${index}`}
                  className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <button
        onClick={rollNumbers}
        className="bg-yellow-500 text-red-600 font-bold py-3 px-8 rounded-full text-xl sm:text-2xl shadow-lg hover:bg-yellow-400 transition duration-300"
      >
        ROLL IT
      </button>
      <p>
        {userData ? (
          <>
            <strong>ID:</strong> {userData.id} <br />
            <strong>First Name:</strong> {userData.first_name} <br />
            <strong>Last Name:</strong> {userData.last_name || "N/A"} <br />
            <strong>Username:</strong> {userData.username || "N/A"} <br />
            <strong>Language Code:</strong> {userData.language_code} <br />
            <strong>Premium User:</strong> {userData.is_premium ? "Yes" : "No"} <br />
          </>
        ) : (
          "No user data available."
        )}
      </p>

      {showWinner && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowWinner(false)}
        >
          <div className="bg-yellow-500 p-8 rounded-lg text-center">
            <h2 className="text-4xl font-bold mb-4 text-black shadow-[0_0_10px_gold]">WINNER!</h2>
            <p className="text-2xl text-black">You won Nothing!! 0000</p>
          </div>
        </div>
      )}
    </div>
  )
}