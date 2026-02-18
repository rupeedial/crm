import { useParams } from "react-router-dom";
import Leads from "../Lead Management/Leads";

export default function CampaignTabLeads() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Campaign #{id} – Lead Board
      </h2>

      

      {/* FILTER BAR */}
      <div className="flex gap-2">
        <button className="btn">All</button>
        <button className="btn">Raw</button>
        <button className="btn">Verified</button>
        <button className="btn">Hot</button>
      </div>

      {/* EXISTING LEADS PAGE */}
      <Leads />
    </div>
  );
}
