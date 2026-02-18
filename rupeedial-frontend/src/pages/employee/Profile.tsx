import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  BadgeCheck,
  Edit,
  Save,
  X,
  Building2,
} from "lucide-react";

export default function EmployeeProfile() {
  const { user, setAuth, loading } = useAuth();

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return null;

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    dob: "",
  });

  /* ================= SYNC USER ================= */

  useEffect(() => {
    if (user.role === "employee") {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  if (user.role !== "employee") {
    return (
      <div className="p-10 text-red-500">
        This page is only for Employee accounts.
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
      phone: formData.phone,
      address: formData.address,
      dob: formData.dob,
    });

    setEditing(false);
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 
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
              Employee ID: {user.id}
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
      <div className="grid md:grid-cols-2 gap-8">

        {/* PERSONAL DETAILS */}
        <Card title="Personal Information">
          <StaticField icon={Mail} label="Email" value={user.email} />

          <EditableField
            label="Phone"
            name="phone"
            editing={editing}
            value={formData.phone}
            icon={Phone}
            onChange={handleChange}
          />

          <EditableField
            label="Date of Birth"
            name="dob"
            type="date"
            editing={editing}
            value={formData.dob}
            icon={Calendar}
            onChange={handleChange}
          />

          <EditableField
            label="Address"
            name="address"
            editing={editing}
            value={formData.address}
            icon={MapPin}
            onChange={handleChange}
          />
        </Card>

        {/* EMPLOYMENT DETAILS */}
        <Card title="Employment Details">
          <StaticField icon={Shield} label="Role" value={user.role} />
          <StaticField icon={Building2} label="Department" value={user.department || "Sales"} />
          <StaticField icon={Briefcase} label="Reporting Manager" value={user.manager || "Not Assigned"} />
          <StaticField icon={Calendar} label="Joining Date" value={user.joiningDate || "Not Available"} />

          <div className="flex items-center gap-3 mt-4">
            <BadgeCheck className="text-green-600" />
            <p className="font-semibold text-green-600">Active Employee</p>
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
      <h2 className="text-lg font-bold text-emerald-700">{title}</h2>
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
        <p className="font-semibold text-gray-800">
          {value || "Not Available"}
        </p>
      </div>
    </div>
  );
}

function EditableField({
  label,
  name,
  value,
  editing,
  onChange,
  icon: Icon,
  type = "text",
}: any) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {editing ? (
        <input
          type={type}
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
