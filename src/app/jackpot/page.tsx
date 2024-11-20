'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react'
import './styles.css'

export default function Home() {
    const [numbers, setNumbers] = useState<string[]>(['0', '0', '0', '0', '0', '0'])
    const [showWinner, setShowWinner] = useState(false)
    const [emojis, setEmojis] = useState<{ emoji: string; style: any }[]>([])
    const [isPoints, setIsPoints] = useState(true)
    useEffect(() => {

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

    const rollCustom = (qty: number) => {
        // router.push('/dummy-page') // Replace with an actual page in your app
        console.log("Roll times: ", qty)
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
                <span className="bg-black text-red-500 rounded-xl p-4 mx-auto flex items-center justify-center text-5xl sm:text-5xl font-bold text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.5)] max-w-fit">
                    $12345.12
                </span>

                <span className="text-white rounded-xl p-6  mx-auto flex items-center justify-center text-3xl sm:text-3xl font-bold text-center hover:shadow-2xl transition-shadow duration-300 ">
                    Hit the Jackpot with 666666!
                </span>

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
                className="btn-yellow text-red-600 font-bold py-3 px-8 rounded-full text-xl sm:text-2xl shadow-lg "
            >
                ROLL IT
            </button>

            <br />
            <br />
            <br />

            <div className="mt-6 flex flex-col gap-4 items-center">
                <div className="flex items-center space-x-4 mb-4">
                    {/* Toggle Switch */}
                    <button
                        type="button"
                        onClick={() => setIsPoints(!isPoints)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${isPoints ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-300 ${isPoints ? 'translate-x-6' : 'translate-x-0'
                                }`}
                        />
                    </button>

                    {/* Label */}
                    <span className=" bg-gray-800 rounded-lg flex items-center justify-center text-4xl sm:text-5xl font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        {isPoints ? 'POINTS' : 'CHIPS'}
                    </span>
                </div>


                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={() => rollCustom(5)}
                        className={`${isPoints ? 'btn-blue' : 'btn-green'} text-white font-bold py-3 px-8 rounded-full text-xl sm:text-2xl shadow-lg`}
                    >
                        Roll it! x 5
                    </button>
                    <span className="ml-4 text-lg">
                        {isPoints ? '100 points' : '$0.02'}
                    </span>
                </div>

                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={() => rollCustom(10)}
                        className={`${isPoints ? 'btn-blue' : 'btn-green'} text-white font-bold py-3 px-8 rounded-full text-xl sm:text-2xl shadow-lg`}

                    >
                        Roll it! x 10
                    </button>
                    <span className="ml-4 text-lg">
                        {isPoints ? '170 points' : '$0.04'}
                    </span>
                </div>
            </div>


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