import { useEffect, useState } from "react";
import {
  LogIn,
  LogOut,
  Clock,
  CalendarDays,
} from "lucide-react";

interface Attendance {
  date: string;
  checkIn?: string;
  checkOut?: string;
  totalHours?: number;
  status: "PRESENT" | "HALF_DAY" | "ABSENT";
  late: boolean;
}

const STORAGE_KEY = "rupeedial_real_attendance";

export default function Attendance() {
  const today = new Date().toDateString();

  const [records, setRecords] =
    useState<Attendance[]>([]);
  const [working, setWorking] =
    useState(false);
  const [timer, setTimer] =
    useState(0);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
    setRecords(stored);

    const todayRec = stored.find(
      (r: Attendance) =>
        r.date === today
    );

    if (
      todayRec?.checkIn &&
      !todayRec?.checkOut
    ) {
      setWorking(true);

      const start = new Date(
        todayRec.checkIn
      ).getTime();
      const now = Date.now();
      setTimer(
        Math.floor(
          (now - start) / 1000
        )
      );
    }
  }, []);

  /* ================= TIMER ================= */

  useEffect(() => {
    let interval: any;
    if (working) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [working]);

  const save = (data: Attendance[]) => {
    setRecords(data);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  };

  /* ================= CHECK IN ================= */

  const checkIn = () => {
    const existing = records.find(
      (r) => r.date === today
    );
    if (
      existing?.checkIn &&
      !existing?.checkOut
    )
      return;

    const now = new Date();
    const isLate =
      now.getHours() >= 10;

    const newRec: Attendance = {
      date: today,
      checkIn: now.toISOString(),
      status: "PRESENT",
      late: isLate,
    };

    save([
      ...records.filter(
        (r) => r.date !== today
      ),
      newRec,
    ]);
    setWorking(true);
  };

  /* ================= CHECK OUT ================= */

  const checkOut = () => {
    const updated = records.map(
      (r) => {
        if (
          r.date === today &&
          r.checkIn
        ) {
          const start = new Date(
            r.checkIn
          ).getTime();
          const end = Date.now();
          const hours =
            (end - start) /
            3600000;

          return {
            ...r,
            checkOut:
              new Date().toISOString(),
            totalHours: Number(
              hours.toFixed(2)
            ),
            status:
              hours < 4
                ? "HALF_DAY"
                : "PRESENT",
          };
        }
        return r;
      }
    );

    save(updated);
    setWorking(false);
    setTimer(0);
  };

  /* ================= HELPERS ================= */

  const formatTime = (
    seconds: number
  ) => {
    const h = Math.floor(
      seconds / 3600
    );
    const m = Math.floor(
      (seconds % 3600) / 60
    );
    const s =
      seconds % 60;

    return `${h}h ${m}m ${s}s`;
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "PRESENT":
        return "bg-emerald-100 text-emerald-700";
      case "HALF_DAY":
        return "bg-amber-100 text-amber-700";
      case "ABSENT":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const todayRec = records.find(
    (r) => r.date === today
  );

  /* ================= UI ================= */

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Attendance Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your daily login &
          working hours
        </p>
      </div>

      {/* STATUS CARD */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Today's Status
          </p>

          <p className="text-xl font-semibold mt-1">
            {working
              ? "Working"
              : todayRec?.status ||
                "Not Checked In"}
          </p>

          {working && (
            <p className="text-emerald-600 mt-2 flex items-center gap-2">
              <Clock size={16} />
              {formatTime(timer)}
            </p>
          )}
        </div>

        {!working ? (
          <button
            onClick={checkIn}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <LogIn size={16} />
            Check In
          </button>
        ) : (
          <button
            onClick={checkOut}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogOut size={16} />
            Check Out
          </button>
        )}
      </div>

      {/* HISTORY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b text-sm font-semibold text-gray-700 flex items-center gap-2">
          <CalendarDays size={16} />
          Attendance History
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">
                Date
              </th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
              <th>Late</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  {r.date}
                </td>
                <td>
                  {r.checkIn
                    ? new Date(
                        r.checkIn
                      ).toLocaleTimeString()
                    : "-"}
                </td>
                <td>
                  {r.checkOut
                    ? new Date(
                        r.checkOut
                      ).toLocaleTimeString()
                    : "-"}
                </td>
                <td>
                  {r.totalHours ||
                    "-"}
                </td>
                <td>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.late ? (
                    <span className="text-red-600 font-medium">
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
