import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface DocumentItem {
  id: number;
  name: string;
  type: string;
  uploadedOn: string;
  status: "Verified" | "Pending" | "Rejected";
}

export default function PartnerDocuments() {
  const [showUpload, setShowUpload] = useState(false);

  const documents: DocumentItem[] = [
    {
      id: 1,
      name: "PAN Card",
      type: "Identity Proof",
      uploadedOn: "12 Jan 2025",
      status: "Verified",
    },
    {
      id: 2,
      name: "Aadhaar Card",
      type: "Address Proof",
      uploadedOn: "15 Jan 2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "Cancelled Cheque",
      type: "Bank Proof",
      uploadedOn: "18 Jan 2025",
      status: "Rejected",
    },
  ];

  const statusBadge = (status: string) => {
    if (status === "Verified")
      return (
        <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
          <CheckCircle className="w-3 h-3" /> Verified
        </span>
      );
    if (status === "Pending")
      return (
        <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs">
          <Clock className="w-3 h-3" /> Pending
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs">
        <XCircle className="w-3 h-3" /> Rejected
      </span>
    );
  };

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-700" />
            Documents
          </h1>
          <p className="text-sm text-slate-500">
            Manage and upload your KYC documents
          </p>
        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* DOCUMENT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Document Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Uploaded On</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium">{doc.name}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4">{doc.uploadedOn}</td>
                <td className="px-6 py-4">{statusBadge(doc.status)}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-green-700 hover:text-green-900">
                    <Download className="w-4 h-4 inline" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Upload New Document
            </h2>

            <input
              type="text"
              placeholder="Document Name"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
            />

            <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none">
              <option>Select Document Type</option>
              <option>Identity Proof</option>
              <option>Address Proof</option>
              <option>Bank Proof</option>
              <option>Business Proof</option>
            </select>

            <input
              type="file"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 rounded-lg text-sm border"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg text-sm bg-green-700 text-white hover:bg-green-800">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
