import { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { autoAssignLead } from "@/lib/autoAssign";
import { saveLead, getAllLeads } from "@/lib/leadStore";

interface Lead {
  id: string;
  customerName: string;
  phone: string;
  loanAmount?: number;
  product?: string;
  city?: string;
  status: string;
  assignedTo?: string;
  campaignId?: string;
  campaignName?: string;
  createdAt?: string;
}

export default function UploadLead() {
  const { user, loading } = useAuth();
  const { addNotification } = useNotifications();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [invalidRows, setInvalidRows] = useState<any[]>([]);

  const CAMPAIGNS = [
    { id: "PL", name: "Personal Loan" },
    { id: "BL", name: "Business Loan" },
    { id: "HL", name: "Home Loan" },
  ];

  const [selectedCampaign, setSelectedCampaign] =
    useState(CAMPAIGNS[0]);

  if (loading)
    return <div className="p-6">Loading...</div>;
  if (!user)
    return (
      <div className="p-6 text-red-500">
        User not authenticated
      </div>
    );

  const cleanPhone = (phone: string) =>
    phone.replace(/\D/g, "").slice(-10);

  const isValidPhone = (phone: string) =>
    /^[6-9]\d{9}$/.test(phone);

  const handleUpload = () => {
    if (!file) return alert("Select file first");

    setUploading(true);
    setSummary(null);
    setInvalidRows([]);

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, {
        type: "binary",
      });
      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];
      const rows =
        XLSX.utils.sheet_to_json<any>(sheet);

      let total = 0;
      let saved = 0;
      let duplicates = 0;
      let invalid = 0;

      const invalidData: any[] = [];
      const existingLeads = getAllLeads();
      const filePhones = new Set<string>();

      rows.forEach((row: any, index: number) => {
        total++;

        const cleanedPhone = cleanPhone(
          String(row.Mobile || "")
        );

        if (
          !row.Name ||
          !isValidPhone(cleanedPhone)
        ) {
          invalid++;
          invalidData.push(row);
          return;
        }

        if (
          filePhones.has(cleanedPhone) ||
          existingLeads.some(
            (l: Lead) =>
              l.phone === cleanedPhone
          )
        ) {
          duplicates++;
          return;
        }

        filePhones.add(cleanedPhone);

        const lead: Lead =
          autoAssignLead({
            id: `LEAD-${Date.now()}-${index}`,
            customerName:
              row.Name.trim(),
            phone: cleanedPhone,
            loanAmount: Number(
              row.Amount || 0
            ),
            product:
              row.Product ||
              selectedCampaign.name,
            city: row.City || "Unknown",
            status: "NEW",
            campaignId:
              selectedCampaign.id,
            campaignName:
              selectedCampaign.name,
            createdAt:
              new Date().toISOString(),
          });

        saveLead(lead);
        saved++;

        if (lead.assignedTo) {
          addNotification({
            id: crypto.randomUUID(),
            userId: lead.assignedTo,
            title: "New Lead Assigned",
            message: `${lead.customerName} (${lead.product})`,
            read: false,
            createdAt:
              new Date().toISOString(),
          });
        }
      });

      setSummary({
        total,
        saved,
        duplicates,
        invalid,
      });
      setInvalidRows(invalidData);
      setUploading(false);
      setFile(null);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Lead Upload Center
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Smart campaign import with validation &
          auto-distribution
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            className="border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedCampaign.id}
            onChange={(e) =>
              setSelectedCampaign(
                CAMPAIGNS.find(
                  (c) => c.id === e.target.value
                )!
              )
            }
          >
            {CAMPAIGNS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="flex items-center justify-center gap-2 border border-dashed rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-purple-50 transition">
            <FileSpreadsheet
              size={16}
              className="text-purple-600"
            />
            {file ? file.name : "Choose Excel File"}
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-emerald-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : "Upload Leads"}
          </button>
        </div>
      </div>

      {/* SUMMARY STATS */}
      {summary && (
        <div className="grid md:grid-cols-4 gap-4">
          <StatBox
            label="Total Rows"
            value={summary.total}
          />
          <StatBox
            label="Saved"
            value={summary.saved}
            highlight="emerald"
          />
          <StatBox
            label="Duplicates"
            value={summary.duplicates}
            highlight="purple"
          />
          <StatBox
            label="Invalid"
            value={summary.invalid}
            highlight="red"
          />
        </div>
      )}

      {/* INVALID TABLE */}
      {invalidRows.length > 0 && (
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Invalid Rows
          </h3>

          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">
                  Name
                </th>
                <th className="p-3 text-left">
                  Mobile
                </th>
              </tr>
            </thead>
            <tbody>
              {invalidRows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b"
                >
                  <td className="p-3">
                    {row.Name}
                  </td>
                  <td className="p-3">
                    {row.Mobile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================= STAT BOX ================= */

function StatBox({
  label,
  value,
  highlight,
}: any) {
  const color =
    highlight === "emerald"
      ? "text-emerald-600"
      : highlight === "purple"
      ? "text-purple-600"
      : highlight === "red"
      ? "text-red-600"
      : "text-gray-900";

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5 text-center">
      <p className="text-xs text-gray-500">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-semibold ${color}`}
      >
        {value}
      </p>
    </div>
  );
}
