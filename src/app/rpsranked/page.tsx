/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import './styles.css'
import GameBoard from "../components/GameBoardRPS";

const EmojisList: Record<string, string> = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
};

const RpsRankedPage = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [chatLog, setChatLog] = useState<string[]>([]);
    const roomIdRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [selectedMove, setSelectedMove] = useState<string | null>(null);
    const [blueMove, setBlueMove] = useState<string | "">("")
    const [blueScore, setBlueScore] = useState<number | 0>(0)
    const [redScore, setRedScore] = useState<number | 0>(0)
    const [redMove, setRedMove] = useState<string | "">("")
    const [roundWinner, setRoundWinner] = useState<string | null>(null)
    const [gameWinner, setGameWinner] = useState<string | null>(null)
    const [teamColor, setTeamColor] = useState<string | "">("")
    const [isWaiting, setIsWaiting] = useState<boolean | true>(true)
    const [lastBluff, setLastBluff] = useState<string | "">("")

    useEffect(() => {
        console.log("redScore", redScore, "blueScore", blueScore)

    }, [redScore, blueScore])

    const appendChatLog = (message: string) => {
        setChatLog((prev) => [...prev, message]);
    };

    const handleConnect = (lobby = false) => {
        const roomId = roomIdRef.current?.value || "lobby";
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (!username || !password || (!lobby && !roomId)) {
            alert("Please fill in all fields to connect.");
            return;
        }

        const url = `ws://localhost:8000/ws/${lobby ? "ranked/lobby" : roomId}?username=${username}&password=${password}`;
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
            appendChatLog("Connected to the server.");
        };

        newSocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("data", data)
                if (data.msg === "RANKED GAME") {
                    console.log("RANKED GAME started.");
                    if (newSocket.readyState === WebSocket.OPEN) {
                        newSocket.send(JSON.stringify({ type: "system", msg: "RANKED GAME" }));
                        newSocket.send(JSON.stringify({ type: "start", msg: "start" }));
                        setSelectedMove(null)
                        setIsWaiting(false)
                    } else {
                        console.error("WebSocket is not open.");
                    }
                }
                if (data.type === "color") {
                    console.log("teamColor", data)
                    setTeamColor(data.msg)

                }
                if (data.type === "summary") {
                    console.log("SUMMARY ")
                    setSelectedMove(null)
                    if (data.winner === 'blue') {
                        setBlueScore((prevBlueScore) => prevBlueScore + 1);
                        setRoundWinner(data.winner)

                    }
                    if (data.winner === 'red') {
                        setRedScore((prevRedScore) => prevRedScore + 1);
                        setRoundWinner(data.winner)

                    }
                    if (data.winner === 'TIE') {
                        setRoundWinner("tie")

                    }
                    const blue_emoji_move = changeToEmoji(data.blue_move);
                    const red_emoji_move = changeToEmoji(data.red_move);
                    setBlueMove(blue_emoji_move)
                    setRedMove(red_emoji_move)

                    // Clean Board
                    setTimeout(() => {
                        clearBoard();
                    }, 2000);
                }
                if (data.type === "finished") {
                    setGameWinner(data.msg)


                }


                appendChatLog(event.data);
            } catch (error) {
                console.log(error);
                appendChatLog(event.data);
            }
        };


        newSocket.onclose = () => {
            appendChatLog("Disconnected from the server.");
        };

        newSocket.onerror = (error) => {
            console.error("WebSocket Error: ", error);
            alert("Connection error. Please check the server.");
        };

        setSocket(newSocket);
    };

    const handleSend = (type: string, msg: string) => {

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type, msg }));
            if (type === 'move') {
                const emoji_move = changeToEmoji(msg);
                setSelectedMove(msg)
                if (teamColor === "blue") {
                    setBlueMove(emoji_move)
                }
                if (teamColor === "red") {
                    setRedMove(emoji_move)
                }
            }
        }
        // Pending handling if nos websocket connection rise a POPUP for reconnect
    };

    const clearChat = () => {
        setChatLog([]);
    };

    const changeToEmoji = (word: string): string | "" => {
        return EmojisList[word];
    };

    const clearBoard = () => {
        setBlueMove("")
        setRedMove("")
        setRoundWinner(null)
    }

    const handleDialogClose = () => {
        setTeamColor("")
        setBlueMove("")
        setRedMove("")
        setRedScore(0)
        setBlueScore(0)
        setIsWaiting(true)
        //PENDING SHOW POPUP TO CONTINUE IN RANKED MODE IF NOT, THEN REDIRECT TO HOME
    }

    return (
        <div style={{ backgroundColor: "black", color: "blue", padding: "20px", minHeight: "100vh" }}>
            <h1>WebSocket Chat Client</h1>

            {/* Authentication and Connection Controls */}
            <div id="controls" style={{ marginBottom: "20px" }}>
                <input ref={roomIdRef} type="text" placeholder="Room ID" required style={{ marginRight: "10px" }} />
                <input ref={usernameRef} type="text" placeholder="Username" required style={{ marginRight: "10px" }} />
                <input ref={passwordRef} type="password" placeholder="Password" required style={{ marginRight: "10px" }} />
                <button onClick={() => handleConnect(false)} style={{ marginRight: "10px" }}>
                    Connect
                </button>
                <button onClick={() => handleConnect(true)}>Connect LOBBY</button>
            </div>


            <div>

                <div>
                    {isWaiting ? (
                        <div className="flex items-center justify-center  text-2xl font-bold">
                            Waiting for match...
                        </div>
                    ) : (
                        <div>

                            <GameBoard
                                blueMove={blueMove}
                                blueScore={blueScore}
                                redMove={redMove}
                                redScore={redScore}
                                blueBluff="✊"
                                redBluff="✋"
                                setWinner={roundWinner}
                                gameWinner={gameWinner}
                                resetGame={false}
                                onDialogClose={handleDialogClose}
                            />
                            <p className="text-xl text-white justify-center items-center flex">
                                <span
                                    className={`font-bold ${teamColor === "blue" ? "text-blue-500" : teamColor === "red" ? "text-red-500" : ""
                                        }`}
                                >
                                    {teamColor?.toUpperCase() + " "}
                                    team
                                </span>
                            </p>

                            {/* Game Controls */}
                            <div
                                id="message-controls-2"
                                className="flex flex-wrap items-center justify-center gap-4 mt-4"
                            >
                                <button
                                    onClick={() => handleSend("move", "rock")}
                                    className={`${selectedMove === "rock" ? "btn-yellow" : "btn-blue"}
                     font-bold py-2 px-6 rounded-full text-lg sm:text-xl shadow-md transform hover:scale-105 transition-transform`}
                                >
                                    ✊ ROCK ✊
                                </button>
                                <button
                                    onClick={() => handleSend("move", "paper")}
                                    className={`${selectedMove === "paper" ? "btn-yellow" : "btn-blue"}
                     text-white font-bold py-2 px-6 rounded-full text-lg sm:text-xl shadow-md transform hover:scale-105 transition-transform`}
                                >
                                    ✋ PAPER ✋
                                </button>
                                <button
                                    onClick={() => handleSend("move", "scissors")}
                                    className={`${selectedMove === "scissors" ? "btn-yellow" : "btn-blue"}
                     text-white font-bold py-2 px-6 rounded-full text-lg sm:text-xl shadow-md transform hover:scale-105 transition-transform`}
                                >
                                    ✌️ SCISSORS ✌️
                                </button>
                            </div>
                        </div>

                    )}
                </div>



            </div>

            {/* Message Controls */}
            <div id="message-controls" style={{ marginBottom: "20px" }}>

                <button onClick={clearChat} style={{ marginRight: "10px" }}>
                    Clear Chat
                </button>
            </div>
            {/* Chat Log */}
            <div id="chat-log" style={{ backgroundColor: "#222", padding: "10px", borderRadius: "5px", minHeight: "150px", marginBottom: "20px", overflowY: "auto" }}>
                {chatLog.map((log, index) => (
                    <p key={index} style={{ margin: 0 }}>{log}</p>
                ))}
            </div>


        </div>
    );
};

export default RpsRankedPage;
