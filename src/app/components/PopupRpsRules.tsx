const RulesPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className="bg-white p-6 rounded-lg shadow-lg overflow-auto"
                style={{
                    minWidth: "300px",
                    minHeight: "300px",
                    maxWidth: "500px",
                    maxHeight: "700px",
                }}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Game Rules</h2>
                <ul className="text-left text-gray-700 mb-6 space-y-2">
                    <li>🎯 The first color to reach 5 points wins the game.</li>
                    <li>🌈 Your color (Blue or Red) is displayed below the board.</li>
                    <li>🏆 After a round, the board changes to the winner&apos;s color.</li>
                    <li>🎮 There are two types of controls: Player Choices and Bluffing Buttons.</li>
                    <li>🤫 Player Choices are secret until the round ends.</li>
                    <li>🃏 Bluffing Buttons are public, and both players can see your choice.</li>
                </ul>

                <h3 className="text-xl font-bold mb-2">Rewards Formula</h3>
                <ul className="text-left text-gray-700 mb-6 space-y-2">
                    <li>
                        <strong>Ranked 10:</strong> Each player bets $0.10 USDT.
                        <br />Winner gets $0.18. Fee: $0.02.
                    </li>
                    <li>
                        <strong>Free Ranked:</strong> Each player bets 10 POINTS.
                        <br />Winner gets 17 points. Fee: 3 points.
                    </li>
                    <li>
                        <strong>Custom:</strong> A custom room requires a BET entry higher than $2.00 USDT.
                        <br />Fee: 3% of the total Bet.
                        <br />Example: $5.00 USDT BET → Winner gets $9.70, Fee is $0.30.
                    </li>
                </ul>

                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default RulesPopup;
