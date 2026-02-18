export default function LenderMatchingPanel() {
  const lenders = [
    { name: "Bank A", score: 78 },
    { name: "NBFC B", score: 72 },
    { name: "Fintech C", score: 60 },
  ];

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Lender Matching</h3>
      {lenders.map((l) => (
        <div key={l.name} className="flex justify-between border p-2 mt-2">
          <span>{l.name}</span>
          <span>{l.score}%</span>
        </div>
      ))}
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Send to Selected Lenders
      </button>
    </div>
  );
}
