import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Wallet,
  BadgeCheck,
  Edit,
  Save,
  X,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function PartnerProfile() {
  const { user, setAuth, loading } = useAuth();

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return null;

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    company: "",
    pan: "",
    gst: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });

  /* ================= SYNC USER ================= */

  useEffect(() => {
    if (user.role === "partner") {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        company: user.company || "",
        pan: user.pan || "",
        gst: user.gst || "",
        bankName: user.bankName || "",
        accountNumber: user.accountNumber || "",
        ifsc: user.ifsc || "",
      });
    }
  }, [user]);

  if (user.role !== "partner") {
    return (
      <div className="p-10 text-red-500">
        This page is only for Partner accounts.
      </div>
    );
  }

  /* ================= HANDLERS ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setAuth({
      ...user,
      ...formData,
    });

    setEditing(false);
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 
                      rounded-3xl p-8 text-white shadow-xl relative">

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 
                          flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-emerald-100">{user.email}</p>
            <p className="mt-2 bg-white/20 inline-block px-3 py-1 rounded-full text-sm">
              Channel Partner (DSA)
            </p>
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-6 right-6 bg-white text-emerald-700 
                       px-4 py-2 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={handleSave}
              className="bg-white text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* ================= GRID ================= */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* BASIC INFO */}
        <Card title="Basic Information">
          <StaticField icon={Mail} label="Email" value={user.email} />

          <Field label="Phone" name="phone" editing={editing} value={formData.phone} onChange={handleChange} icon={Phone} />
          <Field label="Company Name" name="company" editing={editing} value={formData.company} onChange={handleChange} icon={Building2} />
          <Field label="Address" name="address" editing={editing} value={formData.address} onChange={handleChange} icon={MapPin} />
        </Card>

        {/* KYC */}
        <Card title="KYC & Tax Details">
          <Field label="PAN Number" name="pan" editing={editing} value={formData.pan} onChange={handleChange} icon={ShieldCheck} />
          <Field label="GST Number" name="gst" editing={editing} value={formData.gst} onChange={handleChange} icon={ShieldCheck} />

          <div className="flex items-center gap-3 mt-4">
            <BadgeCheck
              className={
                user.kycStatus === "verified"
                  ? "text-green-600"
                  : "text-yellow-500"
              }
            />
            <p className="font-semibold">
              {user.kycStatus === "verified"
                ? "KYC Verified"
                : "KYC Pending"}
            </p>
          </div>
        </Card>

        {/* BANK + WALLET */}
        <Card title="Bank & Wallet">
          <Field label="Bank Name" name="bankName" editing={editing} value={formData.bankName} onChange={handleChange} icon={CreditCard} />
          <Field label="Account Number" name="accountNumber" editing={editing} value={formData.accountNumber} onChange={handleChange} icon={CreditCard} />
          <Field label="IFSC Code" name="ifsc" editing={editing} value={formData.ifsc} onChange={handleChange} icon={CreditCard} />

          <div className="flex items-center gap-3 mt-6 bg-emerald-50 p-4 rounded-xl">
            <Wallet className="text-emerald-600" />
            <div>
              <p className="text-sm text-gray-500">Wallet Balance</p>
              <p className="text-xl font-bold text-emerald-700">
                ₹{user.wallet || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Card({ title, children }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow border space-y-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}

function StaticField({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-emerald-600" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, editing, name, value, onChange, icon: Icon }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {editing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-xl p-2"
        />
      ) : (
        <div className="flex items-center gap-3">
          <Icon size={16} className="text-emerald-600" />
          <p className="font-semibold text-gray-800">
            {value || "Not Added"}
          </p>
        </div>
      )}
    </div>
  );
}
