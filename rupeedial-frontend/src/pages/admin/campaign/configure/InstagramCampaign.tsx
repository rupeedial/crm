import { useState } from "react";
import {
  Instagram,
  Sparkles,
  Image as ImageIcon,
  Send,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InstagramCampaign() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    pin: "400001",
    tone: "Professional",
    caption: "",
    cta: "Apply Now",
  });

  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);

  const [stats, setStats] = useState({
    reach: 0,
    engagement: 0,
    leads: 0,
  });

  /* ================= GENERATE CONTENT ================= */

  const generateInstagramContent = () => {
    setLoading(true);

    setTimeout(() => {
      let caption = "";

      // Language Logic
      if (form.language === "Hindi") {
        caption = `💸 ${form.city} me turant ${form.product} chahiye?

✔ Instant approval
✔ Kam documents
✔ Trusted by 1L+ customers

Abhi apply karein!

#RupeeDial #Loan #Finance`;
      } 
      else if (form.language === "Hinglish") {
        caption = `💸 Need quick ${form.product} in ${form.city}?

✔ Fast approval
✔ Minimal documents
✔ Trusted partners

Apply Today!

#Loan #InstantLoan #RupeeDial`;
      } 
      else {
        caption = `💸 Need quick funds in ${form.city}?

Get ${form.product} at low interest rates.

✔ Instant Approval
✔ Minimal Documents
✔ Trusted by 1L+ Customers

Apply Today!

#RupeeDial #Loan #InstantLoan #Finance`;
      }

      // Tone Logic
      if (form.tone === "Aggressive") {
        caption = "⚡ LIMITED TIME OFFER ⚡\n\n" + caption;
      }

      if (form.tone === "Trust Based") {
        caption += "\n\nTrusted by thousands across India.";
      }

      if (form.tone === "Local") {
        caption += `\n\nSpecial offer for ${form.city} residents.`;
      }

      setForm({ ...form, caption });
      setLoading(false);
    }, 700);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.caption.trim().length >= 30;

  /* ================= PUBLISH ================= */

  const publishCampaign = () => {
    if (!compliancePassed) return;

    const reach = Math.floor(Math.random() * 20000) + 10000;
    const engagement = Math.floor(reach * 0.12);
    const leads = Math.floor(engagement * 0.2);

    setStats({ reach, engagement, leads });
    setLaunched(true);
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER WITH BACK ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Instagram className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Instagram Campaign</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-6 shadow-sm">

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

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="City"
            />

            <input
              value={form.pin}
              onChange={(e) =>
                setForm({ ...form, pin: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Pin Code"
            />
          </div>

          {/* Tone */}
          <div className="flex gap-2 flex-wrap">
            {["Professional", "Aggressive", "Trust Based", "Local"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() =>
                    setForm({ ...form, tone: t })
                  }
                  className={`px-3 py-1 rounded-full text-xs border ${
                    form.tone === t
                      ? "bg-emerald-600 text-white"
                      : "text-gray-500"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <textarea
            rows={6}
            value={form.caption}
            onChange={(e) =>
              setForm({ ...form, caption: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full resize-none"
            placeholder="Instagram caption..."
          />

          <select
            value={form.cta}
            onChange={(e) =>
              setForm({ ...form, cta: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option>Apply Now</option>
            <option>Learn More</option>
            <option>Get Quote</option>
            <option>Contact Us</option>
          </select>

          <button
            onClick={generateInstagramContent}
            disabled={loading}
            className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>

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
                : "Caption Required"}
            </div>
            <span className="font-medium">
              {compliancePassed ? "READY" : "NOT READY"}
            </span>
          </div>

          <button
            disabled={!compliancePassed}
            onClick={publishCampaign}
            className="w-full bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publish Campaign
          </button>

          {launched && (
            <div className="text-sm text-emerald-600 font-medium">
              Campaign Published Successfully 🚀
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col">

          <div className="w-full bg-emerald-600 text-white text-center py-2 rounded-lg mb-6 font-semibold">
            LIVE PREVIEW
          </div>

          <div className="border rounded-xl overflow-hidden shadow-sm bg-white">

            <div className="h-56 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-emerald-400" />
            </div>

            <div className="p-4 space-y-2 text-sm">
              <p className="font-semibold">rupeedial_official</p>

              <p className="whitespace-pre-wrap break-words text-gray-600">
                {form.caption || "Your Instagram caption preview will appear here"}
              </p>

              <button className="mt-3 w-full bg-emerald-600 text-white rounded-lg py-2 font-medium">
                {form.cta}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center text-sm">
            <p className="font-medium">Live Campaign Stats (Estimated)</p>

            <div className="flex justify-around mt-4">
              <div>
                <p className="text-lg font-semibold">{stats.reach}</p>
                <p className="text-xs text-gray-500">Reach</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.engagement}</p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.leads}</p>
                <p className="text-xs text-gray-500">Leads</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
