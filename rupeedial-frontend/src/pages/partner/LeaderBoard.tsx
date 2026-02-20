import { useState } from "react";
import {
  Trophy,
  Search,
  Medal,
  Crown,
  Star,
} from "lucide-react";

interface PartnerRank {
  id: number;
  name: string;
  disbursement: number;
  commission: number;
  rank: number;
}

export default function PartnerLeaderboard() {
  const [search, setSearch] = useState("");

  const partners: PartnerRank[] = [
    { id: 1, name: "Rahul Sharma", disbursement: 4500000, commission: 180000, rank: 1 },
    { id: 2, name: "Amit Verma", disbursement: 3800000, commission: 150000, rank: 2 },
    { id: 3, name: "Neha Singh", disbursement: 3200000, commission: 120000, rank: 3 },
    { id: 4, name: "Rohit Mehta", disbursement: 2100000, commission: 85000, rank: 4 },
    { id: 5, name: "Pooja Jain", disbursement: 1800000, commission: 72000, rank: 5 },
  ];

  const filtered = partners.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const topThree = partners.slice(0, 3);

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-sm text-slate-500">
          Top performing partners this month
        </p>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid md:grid-cols-3 gap-6">

        {topThree.map((partner) => (
          <div
            key={partner.id}
            className={`rounded-xl p-6 text-center shadow-md border
              ${partner.rank === 1
                ? "bg-yellow-50 border-yellow-300"
                : partner.rank === 2
                ? "bg-gray-50 border-gray-300"
                : "bg-orange-50 border-orange-300"
              }`}
          >
            {partner.rank === 1 && <Crown className="mx-auto text-yellow-500 w-8 h-8" />}
            {partner.rank === 2 && <Medal className="mx-auto text-gray-500 w-8 h-8" />}
            {partner.rank === 3 && <Star className="mx-auto text-orange-500 w-8 h-8" />}

            <h2 className="text-lg font-bold mt-3">{partner.name}</h2>
            <p className="text-sm text-slate-500 mt-1">
              Disbursement: ₹{partner.disbursement.toLocaleString()}
            </p>
            <p className="text-sm font-semibold text-green-600 mt-1">
              Commission: ₹{partner.commission.toLocaleString()}
            </p>
          </div>
        ))}

      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search partner..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* RANK TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Partner Name</th>
              <th className="px-6 py-3">Disbursement</th>
              <th className="px-6 py-3">Commission</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((partner) => (
              <tr
                key={partner.id}
                className={`hover:bg-green-50 transition ${
                  partner.rank === 1 ? "bg-yellow-50" : ""
                }`}
              >
                <td className="px-6 py-4 font-bold text-slate-700">
                  #{partner.rank}
                </td>

                <td className="px-6 py-4 font-medium">
                  {partner.name}
                </td>

                <td className="px-6 py-4">
                  ₹{partner.disbursement.toLocaleString()}
                </td>

                <td className="px-6 py-4 font-semibold text-green-700">
                  ₹{partner.commission.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No partners found
          </div>
        )}
      </div>

    </div>
  );
}
