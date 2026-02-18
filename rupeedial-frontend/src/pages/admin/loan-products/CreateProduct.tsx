import { useState } from "react";

const DOCUMENT_OPTIONS = [
  "PAN Card",
  "Aadhaar Card",
  "Bank Statement",
  "Salary Slip",
  "ITR",
  "GST Certificate",
];

export default function CreateProduct() {
  const [form, setForm] = useState({
    product_name: "",
    product_code: "",
    bank_nbfc_name: "",
    interest_rate: "",
    processing_fee: "",
    min_cibil: "",
    min_income: "",
    max_amount: "",
    tenure_months: "",
    documents_required: [] as string[],
    eligibility_rules: "",
    cta_text: "Apply Now",
    status: "active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleDocument = (doc: string) => {
    setForm((prev) => ({
      ...prev,
      documents_required: prev.documents_required.includes(doc)
        ? prev.documents_required.filter((d) => d !== doc)
        : [...prev.documents_required, doc],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://yourdomain.com/api/loan-products/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed");

      alert("Loan Product Created Successfully");
    } catch (err) {
      alert("Error creating product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Create Loan Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="product_name"
            placeholder="Product Name (Personal Loan)"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="product_code"
            placeholder="Product Code (PL)"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="bank_nbfc_name"
            placeholder="Bank / NBFC Name"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="interest_rate"
            placeholder="Interest Rate (%)"
            type="number"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="processing_fee"
            placeholder="Processing Fee (%)"
            type="number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="min_cibil"
            placeholder="Minimum CIBIL"
            type="number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="min_income"
            placeholder="Minimum Monthly Income"
            type="number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="max_amount"
            placeholder="Maximum Loan Amount"
            type="number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="tenure_months"
            placeholder="Tenure (Months)"
            type="number"
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* DOCUMENTS */}
        <div>
          <p className="font-medium mb-2">Documents Required</p>
          <div className="flex flex-wrap gap-3">
            {DOCUMENT_OPTIONS.map((doc) => (
              <button
                key={doc}
                type="button"
                onClick={() => toggleDocument(doc)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  form.documents_required.includes(doc)
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {doc}
              </button>
            ))}
          </div>
        </div>

        {/* ELIGIBILITY */}
        <div>
          <textarea
            name="eligibility_rules"
            placeholder="Eligibility Rules (Age, Income, Employment)"
            className="input h-24"
            onChange={handleChange}
          />
        </div>

        {/* CTA + STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="cta_text"
            placeholder="CTA Text"
            className="input"
            value={form.cta_text}
            onChange={handleChange}
          />

          <select
            name="status"
            className="input"
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        {/* SUBMIT */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
