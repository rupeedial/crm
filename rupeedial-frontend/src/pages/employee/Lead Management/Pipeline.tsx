export default function Pipeline() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lead Pipeline</h2>

      <div className="bg-white p-4 rounded shadow">
        <p>Status: VERIFIED</p>
        <p>Income: ₹45,000</p>
        <p>CIBIL: 760</p>

        <button className="bg-red-600 text-white px-4 py-2 rounded mt-3">
          Mark as HOT Lead
        </button>
      </div>
    </div>
  );
}
