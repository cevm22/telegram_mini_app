"use client";

import { useEffect, useState } from "react";

interface GameBoardProps {
    blueMove: string;
    blueScore: number;
    redMove: string;
    redScore: number;
    blueBluff?: string;
    redBluff?: string;
    setWinner: string | null;
    gameWinner: string | null;
    resetGame?: boolean;
    onDialogClose?: () => void;
}

export default function GameBoard({
    blueMove,
    blueScore,
    redMove,
    redScore,
    blueBluff,
    redBluff,
    setWinner,
    gameWinner,
    resetGame = false,
    onDialogClose, // New prop
}: GameBoardProps) {

    const [showWinDialog, setShowWinDialog] = useState(false);

    useEffect(() => {
        if (gameWinner) setShowWinDialog(true);
    }, [gameWinner]);

    useEffect(() => {
        if (resetGame) {
            setShowWinDialog(false);
        }
    }, [resetGame]);

    const handleCloseDialog = () => {
        setShowWinDialog(false);
        if (onDialogClose) onDialogClose(); // Call the function if provided
    };


    return (
        <>
            <div className="w-full max-w-3xl mx-auto px-4 py-8 ">
                {/* Score Display */}
                <div className="text-center text-2xl font-bold mb-6">
                    <span className="text-blue-500">blue {blueScore}</span>
                    {" - "}
                    <span className="text-red-500">{redScore} red</span>
                </div>

                {/* Game Board */}
                <div className="relative border-4 border-yellow-300 rounded-lg overflow-hidden">
                    {/* Left Side Score */}
                    <div
                        className={`absolute left-0 top-0 bottom-0 w-12 border-r-4 border-yellow-300 flex items-center justify-center text-white font-bold ${setWinner === "blue" ? "bg-blue-500" : setWinner === "red" ? "bg-red-500" : setWinner === "tie" ? "bg-green-500" : "bg-gray-200"
                            }`}
                    >
                        <span className="[writing-mode:vertical-lr] rotate-180 transform">
                            {setWinner && `${setWinner === 'tie' ? 'TIE' : setWinner + ' wins'}`}

                        </span>
                    </div>

                    {/* Right Side Score */}
                    <div
                        className={`absolute right-0 top-0 bottom-0 w-12 border-l-4 border-yellow-300 flex items-center justify-center text-white font-bold ${setWinner === "blue" ? "bg-blue-500" : setWinner === "red" ? "bg-red-500" : setWinner === "tie" ? "bg-green-500" : "bg-gray-200"
                            }`}
                    >
                        <span className="[writing-mode:vertical-lr] rotate-360 transform">
                            {setWinner && `${setWinner === 'tie' ? 'TIE' : setWinner + ' wins'}`}

                        </span>
                    </div>

                    {/* Main Board */}
                    <div className="mx-6">
                        {/* Blue Player Section */}
                        <div
                            className={`h-40 flex flex-col items-center justify-center text-4xl font-bold border-b-4 border-yellow-300 ${setWinner === "blue" ? "bg-blue-500 text-white" : "bg-white"
                                }`}
                        >
                            {blueBluff && (
                                <div className="text-sm mt-2 opacity-70 pb-4">
                                    Bluffing: {blueBluff}
                                </div>
                            )}
                            <div className="rotate-180">{blueMove}</div>
                        </div>

                        {/* Red Player Section */}
                        <div
                            className={`h-40 flex flex-col items-center justify-center text-4xl font-bold ${setWinner === "red" ? "bg-red-500 text-white" : "bg-white"
                                }`}
                        >
                            <div>{redMove}</div>
                            {redBluff && (
                                <div className="text-sm mt-2 opacity-70">
                                    Bluffing: {redBluff}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Winner Dialog */}
            {showWinDialog && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
                    <p className="text-xl">
                        <span
                            className={`font-bold ${gameWinner === "blue" ? "text-blue-500" : gameWinner === "red" ? "text-red-500" : ""
                                }`}
                        >
                            {gameWinner?.toUpperCase() + " "}
                        </span>
                        wins the game!
                    </p>
                    <button
                        onClick={handleCloseDialog}
                        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        Close
                    </button>
                </div>
            </div>}

        </>
    );
}


