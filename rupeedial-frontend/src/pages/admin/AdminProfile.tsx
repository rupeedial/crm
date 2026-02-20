import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Shield,
  User,
  Phone,
  MapPin,
  Calendar,
  Building2,
  BadgeCheck,
  Edit,
  Save,
  X,
  KeyRound,
} from "lucide-react";

export default function AdminProfile() {
  const { user, setAuth } = useAuth();

  // ✅ HOOKS ALWAYS TOP PE
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  // ✅ useEffect safe
  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // ✅ agar user nahi hai toh yaha return
  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      phone: formData.phone,
      address: formData.address,
    };

    setAuth(updatedUser);
    setEditing(false);
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 
                      rounded-3xl p-8 text-white shadow-xl relative">

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 
                          flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-emerald-100 mt-1">
              Super Administrator
            </p>
            <p className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full mt-2">
              Admin ID: {user.id}
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
            Edit
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

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* PERSONAL */}
        <div className="bg-white rounded-3xl shadow border p-8 space-y-6">
          <h2 className="text-xl font-bold text-emerald-700">
            Personal Details
          </h2>

          <Field label="Full Name" value={user.name} />
          <Field label="Email" value={user.email} />

          <EditableField
            editing={editing}
            label="Phone"
            name="phone"
            value={formData.phone}
            displayValue={user.phone}
            onChange={handleChange}
          />

          <EditableField
            editing={editing}
            label="Address"
            name="address"
            value={formData.address}
            displayValue={user.address}
            onChange={handleChange}
          />
        </div>

        {/* SYSTEM */}
        <div className="bg-white rounded-3xl shadow border p-8 space-y-6">
          <h2 className="text-xl font-bold text-emerald-700">
            System Information
          </h2>

          <Field label="Role" value={user.role} />
          <Field label="Department" value="Administration" />
          <Field label="Status" value="Active" />

          <button
            onClick={() => setShowPasswordModal(true)}
            className="mt-6 bg-emerald-600 text-white 
                       px-4 py-2 rounded-xl flex items-center gap-2 font-semibold"
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">
            <h3 className="text-lg font-bold">Change Password</h3>

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl p-2"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- small helpers ---------- */

function Field({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value || "Not Available"}</p>
    </div>
  );
}

function EditableField({
  editing,
  label,
  name,
  value,
  displayValue,
  onChange,
}: any) {
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
        <p className="font-semibold">
          {displayValue || "Not Available"}
        </p>
      )}
    </div>
  );
}
