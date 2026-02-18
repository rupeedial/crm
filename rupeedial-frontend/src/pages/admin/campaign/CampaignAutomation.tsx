import { useState } from "react";
import {
  ArrowLeft,
  Zap,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AutomationPage() {

  const navigate = useNavigate();

  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "New Lead WhatsApp Auto Reply",
      trigger: "New Lead Created",
      action: "Send WhatsApp Message",
      delay: "Instant",
      status: true,
    },
    {
      id: 2,
      name: "Missed Call Callback SMS",
      trigger: "Missed Call Received",
      action: "Send SMS",
      delay: "2 Minutes",
      status: false,
    },
  ]);

  const [newRule, setNewRule] = useState({
    name: "",
    trigger: "New Lead Created",
    action: "Send SMS",
    delay: "Instant",
  });

  /* ================= ADD AUTOMATION ================= */

  const addAutomation = () => {
    if (!newRule.name) return;

    setAutomations([
      ...automations,
      {
        id: Date.now(),
        ...newRule,
        status: true,
      },
    ]);

    setNewRule({
      name: "",
      trigger: "New Lead Created",
      action: "Send SMS",
      delay: "Instant",
    });
  };

  /* ================= TOGGLE ================= */

  const toggleStatus = (id) => {
    setAutomations(
      automations.map((rule) =>
        rule.id === id ? { ...rule, status: !rule.status } : rule
      )
    );
  };

  /* ================= DELETE ================= */

  const deleteRule = (id) => {
    setAutomations(automations.filter((rule) => rule.id !== id));
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Zap className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Automation Rules</h1>
      </div>

      {/* ================= CREATE AUTOMATION ================= */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">

        <h2 className="text-lg font-semibold">Create New Automation</h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Automation Name"
            value={newRule.name}
            onChange={(e) =>
              setNewRule({ ...newRule, name: e.target.value })
            }
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={newRule.trigger}
            onChange={(e) =>
              setNewRule({ ...newRule, trigger: e.target.value })
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>New Lead Created</option>
            <option>Missed Call Received</option>
            <option>Form Submitted</option>
            <option>IVR Pressed 1</option>
          </select>

          <select
            value={newRule.action}
            onChange={(e) =>
              setNewRule({ ...newRule, action: e.target.value })
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>Send SMS</option>
            <option>Send WhatsApp</option>
            <option>Send Email</option>
            <option>Assign Agent</option>
          </select>

          <select
            value={newRule.delay}
            onChange={(e) =>
              setNewRule({ ...newRule, delay: e.target.value })
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>Instant</option>
            <option>2 Minutes</option>
            <option>5 Minutes</option>
            <option>10 Minutes</option>
          </select>

        </div>

        <button
          onClick={addAutomation}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Automation
        </button>
      </div>

      {/* ================= AUTOMATION LIST ================= */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Trigger</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Delay</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {automations.map((rule) => (
              <tr key={rule.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{rule.name}</td>
                <td className="p-4">{rule.trigger}</td>
                <td className="p-4">{rule.action}</td>
                <td className="p-4">{rule.delay}</td>

                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(rule.id)}
                  >
                    {rule.status ? (
                      <ToggleRight className="text-emerald-600 w-6 h-6" />
                    ) : (
                      <ToggleLeft className="text-gray-400 w-6 h-6" />
                    )}
                  </button>
                </td>

                <td className="p-4 text-center">
                  <Trash2
                    onClick={() => deleteRule(rule.id)}
                    className="w-4 h-4 text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {automations.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No automation rules created yet.
          </div>
        )}
      </div>

      {/* ================= AUTOMATION INFO ================= */}
      <div className="bg-gray-50 border rounded-2xl p-6 text-sm text-gray-600">
        <p className="font-medium mb-2">How Automation Works:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Trigger event happens (Lead, Missed Call, Form)</li>
          <li>System waits based on delay</li>
          <li>Action is automatically executed</li>
          <li>Lead gets updated inside CRM</li>
        </ul>
      </div>

    </div>
  );
}
