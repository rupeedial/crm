import { useState } from "react";
import {
  Sparkles,
  Mail,
  Send,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmailCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    tone: "Professional",
    subject: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [stats, setStats] = useState({
    sent: 0,
    delivered: 0,
    leads: 0,
  });

  /* ================= GENERATE EMAIL ================= */

  const generateEmail = async () => {
    setLoading(true);

    setTimeout(() => {
      let subject = "";
      let body = "";

      // Language Logic
      if (form.language === "Hindi") {
        subject = `${form.city} me ${form.product} – Vishesh Offer`;

        body = `Dear Customer,

${form.city} me turant ${form.product} chahiye?

RupeeDial ke saath paaye attractive interest rate aur fast approval.

✔ Instant approval
✔ Kam documentation
✔ Trusted lenders

Neeche diye gaye button par click karein.

Regards,
Team RupeeDial`;
      } else if (form.language === "Hinglish") {
        subject = `${form.product} Offer in ${form.city} – Limited Time`;

        body = `Dear Customer,

${form.city} me instant ${form.product} chahiye?

Low interest rates ke saath fast approval paaye RupeeDial par.

✔ Quick processing
✔ Minimal documents
✔ Trusted partners

Click below to check eligibility.

Regards,
Team RupeeDial`;
      } else {
        subject = `${form.product} Offer in ${form.city} – Limited Time`;

        body = `Dear Customer,

Looking for quick funds in ${form.city}?

Get ${form.product} at attractive interest rates with minimal documentation.

✔ Instant approval
✔ Fast disbursal
✔ Trusted lenders

Click below to check eligibility.

Regards,
Team RupeeDial`;
      }

      // Tone Logic
      if (form.tone === "Aggressive") {
        subject = "⚡ Urgent Offer - " + subject;
      }

      if (form.tone === "Trust Based") {
        body += "\n\nTrusted by 10,000+ satisfied customers.";
      }

      if (form.tone === "Local") {
        body += `\n\nSpecially curated for customers in ${form.city}.`;
      }

      setForm({ ...form, subject, body });
      setLoading(false);
    }, 800);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.subject.trim().length >= 6 &&
    form.body.trim().length >= 30;

  /* ================= LAUNCH CAMPAIGN ================= */

  const launchCampaign = () => {
    if (!compliancePassed) return;

    const sent = Math.floor(Math.random() * 1000) + 500;
    const delivered = Math.floor(sent * 0.93);
    const leads = Math.floor(delivered * 0.25);

    setStats({ sent, delivered, leads });
    setLaunched(true);
  };

  return (
    <div className="p-6 space-y-8 bg-[#f5f9f7] min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Mail className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Email Campaign</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm space-y-6">

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
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
              className="border rounded-lg px-3 py-2"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>
          </div>

          <input
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full"
          />

          {/* Tone */}
          <div className="flex gap-2 flex-wrap">
            {["Professional", "Trust Based", "Aggressive", "Local"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() =>
                    setForm({ ...form, tone: t })
                  }
                  className={`px-3 py-1 rounded-full text-xs border ${
                    form.tone === t
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <button
            onClick={generateEmail}
            disabled={loading}
            className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          <input
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Subject Line"
          />

          <textarea
            value={form.body}
            onChange={(e) =>
              setForm({ ...form, body: e.target.value })
            }
            rows={7}
            className="border rounded-lg px-3 py-2 w-full resize-none"
            placeholder="Email body..."
          />

          {/* Compliance */}
          <div
            className={`flex items-center justify-between p-3 rounded-lg text-sm ${
              compliancePassed ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {compliancePassed
                ? "Compliance Check Passed"
                : "Subject & Body Required"}
            </div>
            <span className="font-medium">
              {compliancePassed ? "READY" : "NOT READY"}
            </span>
          </div>

          <button
            disabled={!compliancePassed}
            onClick={launchCampaign}
            className="w-full bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Launch Campaign
          </button>

          {launched && (
            <div className="text-sm text-emerald-600 font-medium">
              Campaign Launched Successfully 🚀
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm overflow-hidden">

          <div className="w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold mb-6">
            LIVE PREVIEW
          </div>

          <div className="bg-gray-50 border rounded-xl p-6 space-y-4 overflow-hidden">

            <div className="text-sm text-gray-500">
              From: RupeeDial Connect
            </div>

            <h2 className="font-semibold text-lg break-words">
              {form.subject || "Email Subject Line"}
            </h2>

            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Banner Image
            </div>

            <p className="text-sm text-gray-700 whitespace-pre-wrap break-words max-w-full">
              {form.body || "Email body will appear here..."}
            </p>

            {form.body && (
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm">
                Check Eligibility
              </button>
            )}

            <div className="text-xs text-gray-400 pt-4 border-t">
              Sent via RupeeDial Compliance Engine
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
            <p className="font-medium text-sm">
              Live Campaign Stats (Estimated)
            </p>

            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-lg font-semibold">{stats.sent}</p>
                <p className="text-gray-500 text-xs">Sent</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.delivered}</p>
                <p className="text-gray-500 text-xs">Delivered</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.leads}</p>
                <p className="text-gray-500 text-xs">Leads</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
