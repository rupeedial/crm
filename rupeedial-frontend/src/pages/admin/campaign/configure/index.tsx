import {
  Megaphone,
  MessageSquare,
  Mail,
  PhoneCall,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= CHANNEL CONFIG ================= */

const channels = [
  {
    key: "whatsapp",
    title: "WhatsApp",
    subtitle: "Direct Message API",
    tag: "HIGH ENGAGEMENT",
    icon: MessageSquare,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "sms",
    title: "SMS",
    subtitle: "Bulk Transactional SMS",
    tag: "INSTANT REACH",
    icon: PhoneCall,
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "email",
    title: "Email",
    subtitle: "Newsletter & Promotional",
    tag: "CONTENT RICH",
    icon: Mail,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "facebook",
    title: "Facebook",
    subtitle: "Social Lead Generation",
    tag: "TARGETED ADS",
    icon: Facebook,
    color: "bg-sky-50 text-sky-600",
  },
  {
    key: "instagram",
    title: "Instagram",
    subtitle: "Visual Storytelling",
    tag: "YOUTH FOCUSED",
    icon: Instagram,
    color: "bg-pink-50 text-pink-600",
  },
  {
    key: "google-ads",
    title: "Google Ads",
    subtitle: "Search Visibility",
    tag: "INTENT DRIVEN",
    icon: Globe,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    key: "ivr",
    title: "IVR",
    subtitle: "Voice Broadcasting",
    tag: "INTERACTIVE",
    icon: PhoneCall,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    key: "missed-call",
    title: "Missed Call",
    subtitle: "Zero Cost Leads",
    tag: "LEAD CAPTURE",
    icon: PhoneCall,
    color: "bg-rose-50 text-rose-600",
  },
];

/* ================= COMPONENT ================= */

export default function CampaignHub() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold">
          Campaign Intelligence Hub
        </h1>
        <p className="text-sm text-muted-foreground">
          Launch and manage AI-powered marketing campaigns
        </p>
      </div>

      {/* ================= HERO ================= */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-700 text-white p-8">
        <span className="inline-flex items-center gap-2 text-xs bg-emerald-800 px-3 py-1 rounded-full mb-4">
          <Megaphone className="w-4 h-4" />
          AI ENGINE ACTIVE
        </span>

        <h2 className="text-3xl font-bold mb-2">
          Launch Your Next Big Campaign
        </h2>
        <p className="text-emerald-100 max-w-2xl">
          Select a communication channel and let AI generate
          high-converting loan & insurance campaigns in seconds.
        </p>
      </div>

      {/* ================= CHANNEL SELECT ================= */}
      <div>
        <h3 className="font-semibold mb-4">
          Select Marketing Channel
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((c) => (
            <div
              key={c.key}
              onClick={() =>
                navigate(
                  `/dashboard/admin/campaign/configure/${c.key}`
                )
              }
              className="group border rounded-2xl p-6 bg-white
                         hover:shadow-lg transition cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}
              >
                <c.icon className="w-6 h-6" />
              </div>

              <p className="text-xs font-medium mt-4 text-muted-foreground">
                {c.tag}
              </p>

              <h4 className="font-semibold mt-1">
                {c.title}
              </h4>

              <p className="text-sm text-muted-foreground">
                {c.subtitle}
              </p>

              <div className="mt-4 text-sm font-medium text-emerald-600">
                Configure →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
