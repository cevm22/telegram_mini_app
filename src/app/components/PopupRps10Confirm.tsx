import React from "react";

interface PopupRps10ConfirmProps {
    onAccept: () => void;
    onClose: () => void;
}

const PopupRps10Confirm: React.FC<PopupRps10ConfirmProps> = ({ onAccept, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-white p-6 rounded-lg shadow-lg overflow-auto"
                style={{
                    minWidth: "260px",
                    minHeight: "200px",
                    maxWidth: "200px",
                    maxHeight: "500px",
                }}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Confirmation!</h2>
                <p className="text-center text-gray-700 mb-6">
                    Confirm to join the Lobby and auto bet <strong>$0.10 USDT</strong>. The winner earns <strong>$0.18 USDT</strong>.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={onAccept}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        I Accept!
                    </button>
                    <button
                        onClick={() => {
                            console.log("Redirecting...");
                            onClose();
                        }}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupRps10Confirm;
