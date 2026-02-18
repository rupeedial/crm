import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  MessageSquare,
  MapPin,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function WhatsAppCampaign() {
  const navigate = useNavigate();

  const [product, setProduct] = useState("Personal Loan");
  const [language, setLanguage] = useState("English");
  const [city, setCity] = useState("Mumbai");
  const [pin, setPin] = useState("400001");
  const [tone, setTone] = useState("Professional");
  const [content, setContent] = useState("");
  const [sent, setSent] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [leads, setLeads] = useState(0);

  const products = [
    "Personal Loan",
    "Business Loan",
    "Home Loan",
    "Loan Against Property",
    "Car Loan",
    "Two Wheeler Loan",
    "Used Car Loan",
    "Gold Loan",
    "Education Loan",
    "Credit Card",
  ];

  /* ================= GENERATE ================= */

  const generateContent = () => {
    let message = `Need quick funds in ${city}?

Get ${product} at low interest rates.

✔ Instant approval
✔ Minimal documents

Apply now`;

    if (tone === "Aggressive") message += `\n\n⚡ Limited Offer!`;
    if (tone === "Trust Based") message += `\n\nTrusted by 10,000+ customers`;
    if (tone === "Local") message += `\n\nServing ${city} - ${pin}`;

    if (message.length > 160) {
      message = message.substring(0, 157) + "...";
    }

    setContent(message);
  };

  const launchCampaign = () => {
    const s = Math.floor(Math.random() * 500) + 200;
    const d = Math.floor(s * 0.9);
    const l = Math.floor(d * 0.25);

    setSent(s);
    setDelivered(d);
    setLeads(l);
  };

  const compliancePassed = content.length > 0 && content.length <= 160;

  return (
    <div className="px-6 py-6">

      {/* HEADER (BACK LEFT) */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <MessageSquare className="text-green-600 w-6 h-6" />
          <h1 className="text-2xl font-semibold">WhatsApp Campaign</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm"
            >
              {products.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded-xl pl-10 pr-4 py-3 text-sm"
              />
            </div>

            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border rounded-xl px-4 py-3 text-sm"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            {["Professional", "Aggressive", "Trust Based", "Local"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 rounded-full text-xs border ${
                    tone === t
                      ? "bg-green-600 text-white"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <button
            onClick={generateContent}
            className="w-full bg-green-100 py-3 rounded-xl text-green-700 font-semibold"
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Generate Message
          </button>

          <textarea
            value={content}
            onChange={(e) =>
              e.target.value.length <= 160 && setContent(e.target.value)
            }
            rows={6}
            className="w-full border rounded-xl px-4 py-3 text-sm resize-none"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>160 Characters max</span>
            <span>{content.length}/160</span>
          </div>

          <div
            className={`p-4 rounded-xl text-sm flex justify-between ${
              compliancePassed ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {compliancePassed ? "Ready to Launch" : "Invalid Message"}
            </div>
          </div>

          <button
            disabled={!compliancePassed}
            onClick={launchCampaign}
            className="w-full bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold"
          >
            Launch Campaign
          </button>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="flex flex-col items-center">

          <div className="w-[300px] h-[600px] bg-black rounded-[45px] p-3 shadow-2xl">

            <div className="bg-[#ECE5DD] w-full h-full rounded-[35px] overflow-hidden flex flex-col">

              {/* HEADER */}
              <div className="bg-[#075E54] text-white px-4 py-3 text-sm font-medium">
                RupeeDial
                <div className="text-[10px] opacity-80">Online</div>
              </div>

              {/* CHAT AREA */}
              <div className="flex-1 p-4 overflow-y-auto">

                <div className="flex justify-end">
                  <div
                    className="
                      bg-[#DCF8C6]
                      text-sm
                      px-4
                      py-2
                      rounded-2xl
                      rounded-br-sm
                      max-w-[75%]
                      break-words
                      whitespace-pre-wrap
                      overflow-hidden
                    "
                  >
                    {content || "Message preview..."}
                  </div>
                </div>

                {content && (
                  <div className="flex justify-end mt-3">
                    <div className="bg-[#25D366] text-white text-sm px-5 py-2 rounded-full shadow-md">
                      Apply Now
                    </div>
                  </div>
                )}

              </div>

              {/* INPUT BAR */}
              <div className="bg-white px-3 py-2 border-t flex items-center">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400 truncate">
                  Type message...
                </div>
              </div>

            </div>
          </div>

          {/* STATS */}
          <div className="mt-6 bg-gray-50 p-5 rounded-xl w-full text-center">
            <p className="font-semibold text-sm">Live Campaign Stats</p>
            <div className="flex justify-around mt-4 text-sm">
              <div>
                <p className="text-lg font-semibold">{sent}</p>
                <p className="text-gray-500">Sent</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{delivered}</p>
                <p className="text-gray-500">Delivered</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{leads}</p>
                <p className="text-gray-500">Leads</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
