export const PurchaseButton = ({
  onClick,
  canAfford,
  canBuy,
}: {
  onClick: () => void;
  canAfford: boolean;
  canBuy?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded transition font-medium
    ${
      canBuy === false
        ? "bg-yellow-400"
        : !canAfford
        ? "bg-gray-400"
        : "bg-blue-300 hover:bg-blue-400"
    }`}
      disabled={!canAfford || canBuy === false}
    >
      {canBuy === false ? "Maxed" : !canAfford ? "Can't Afford" : "Purchase"}
    </button>
  );
};
