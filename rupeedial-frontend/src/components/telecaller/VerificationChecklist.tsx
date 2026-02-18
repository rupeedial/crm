export default function VerificationChecklist({ onVerify }: any) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">Verification</h3>

      <label><input type="checkbox" /> Income Confirmed</label><br />
      <label><input type="checkbox" /> Location Serviceable</label><br />

      <button
        className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
        onClick={onVerify}
      >
        Mark Verified
      </button>
    </div>
  );
}
