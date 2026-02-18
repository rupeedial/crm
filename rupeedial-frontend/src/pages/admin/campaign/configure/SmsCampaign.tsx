import { useState } from "react";
import {
  Sparkles,
  Send,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateCampaignContent } from "@/services/geminiService";

export default function SmsCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    pin: "400001",
    tone: "Professional",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [leads, setLeads] = useState(0);

  /* ================= GENERATE AI ================= */

  const generateAI = async () => {
    try {
      setLoading(true);

      const prompt = `
Create high converting SMS for:
Product: ${form.product}
City: ${form.city}
Tone: ${form.tone}
Language: ${form.language}
Max 160 characters.
CTA: Apply Now
`;

      const text = await generateCampaignContent(prompt);

      setForm({
        ...form,
        message: text.slice(0, 160),
      });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LAUNCH ================= */

  const launchCampaign = () => {
    if (!compliancePassed) return;

    const s = Math.floor(Math.random() * 500) + 200;
    const d = Math.floor(s * 0.9);
    const l = Math.floor(d * 0.25);

    setSent(s);
    setDelivered(d);
    setLeads(l);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.message.length > 0 && form.message.length <= 160;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">SMS Campaign</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-6">

          {/* PRODUCT + LANGUAGE */}
          <div className="grid md:grid-cols-2 gap-6">
            <select
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            >
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Credit Card</option>
              <option>Car Loan</option>
              <option>Gold Loan</option>
            </select>

            <select
              value={form.language}
              onChange={(e) =>
                setForm({ ...form, language: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>
          </div>

          {/* CITY + PIN */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl bg-gray-50"
              placeholder="City"
            />

            <input
              value={form.pin}
              onChange={(e) =>
                setForm({ ...form, pin: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl bg-gray-50"
              placeholder="Pin"
            />
          </div>

          {/* TONE */}
          <div className="flex gap-3 flex-wrap">
            {["Professional", "Aggressive", "Trust Based", "Local"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() =>
                    setForm({ ...form, tone: t })
                  }
                  className={`px-4 py-2 rounded-full text-xs border ${
                    form.tone === t
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          {/* GENERATE */}
          <button
            onClick={generateAI}
            disabled={loading}
            className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-200 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          {/* MESSAGE */}
          <div>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) =>
                e.target.value.length <= 160 &&
                setForm({ ...form, message: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 resize-none"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>160 Characters max</span>
              <span>{form.message.length}/160</span>
            </div>
          </div>

          {/* COMPLIANCE */}
          <div
            className={`flex items-center justify-between p-4 rounded-xl text-sm ${
              compliancePassed ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {compliancePassed
                ? "Compliance Check Passed"
                : "Invalid Message"}
            </div>
            <span className="font-semibold">
              {compliancePassed ? "READY" : "NOT READY"}
            </span>
          </div>

          {/* LAUNCH */}
          <button
            disabled={!compliancePassed}
            onClick={launchCampaign}
            className="w-full bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Launch Campaign
          </button>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm flex flex-col items-center">

          <div className="w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold mb-6">
            LIVE PREVIEW
          </div>

          <div className="w-full max-w-[280px] h-[520px] bg-black rounded-[40px] p-3 shadow-xl">
            <div className="bg-white h-full rounded-[30px] p-4 flex flex-col justify-between">

              <div>
                <div className="bg-emerald-100 text-sm p-3 rounded-xl break-words whitespace-pre-wrap">
                  {form.message || "Your SMS will appear here..."}
                </div>

                {form.message && (
                  <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
                    Apply Now
                  </button>
                )}
              </div>

              <div className="bg-gray-100 rounded-full px-3 py-2 text-xs text-gray-400 truncate">
                Type message...
              </div>

            </div>
          </div>

          {/* STATS */}
          <div className="w-full mt-8 bg-gray-100 p-5 rounded-xl text-center text-sm">
            <p className="font-medium mb-4">
              Live Campaign Stats (Estimated)
            </p>
            <div className="flex justify-around">
              <div>
                <p className="text-lg font-semibold">{sent}</p>
                <p className="text-xs text-gray-500">Sent</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{delivered}</p>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{leads}</p>
                <p className="text-xs text-gray-500">Leads</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
