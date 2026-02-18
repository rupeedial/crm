import { useState } from "react";
import {
  Wallet,
  PlusCircle,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  description: string;
  date: string;
}

export default function CpPayment() {
  const [balance] = useState(12500);

  const transactions: Transaction[] = [
    {
      id: "TXN-001",
      type: "CREDIT",
      amount: 5000,
      description: "Commission Credit",
      date: "2026-02-15",
    },
    {
      id: "TXN-002",
      type: "DEBIT",
      amount: 2000,
      description: "Withdrawal",
      date: "2026-02-10",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Channel Partner Wallet
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage balance & track transactions
        </p>
      </div>

      {/* WALLET CARD */}
      <Card className="p-8 rounded-2xl shadow-sm border bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Wallet className="text-white w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Available Balance
              </p>
              <p className="text-3xl font-semibold text-emerald-600">
                ₹{balance.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Money
          </Button>
        </div>
      </Card>

      {/* TRANSACTION HISTORY */}
      <Card className="rounded-2xl shadow-sm border bg-white overflow-hidden">
        <div className="p-6 border-b font-semibold text-gray-800">
          Recent Transactions
        </div>

        {transactions.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No transactions yet
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">
                  Transaction ID
                </th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {txn.id}
                  </td>

                  <td>{txn.description}</td>

                  <td
                    className={`font-semibold ${
                      txn.type === "CREDIT"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {txn.type === "CREDIT" ? (
                      <ArrowDownCircle className="inline w-4 h-4 mr-1" />
                    ) : (
                      <ArrowUpCircle className="inline w-4 h-4 mr-1" />
                    )}
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>

                  <td>
                    {new Date(
                      txn.date
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
