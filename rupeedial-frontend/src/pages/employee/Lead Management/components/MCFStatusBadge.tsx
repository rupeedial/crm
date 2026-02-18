interface Props {
  status: "LOGIN" | "IN_PROCESS" | "SANCTIONED" | "DISBURSED";
}

export default function MCFStatusBadge({ status }: Props) {
  const colorMap = {
    LOGIN: "bg-blue-100 text-blue-700",
    IN_PROCESS: "bg-yellow-100 text-yellow-700",
    SANCTIONED: "bg-purple-100 text-purple-700",
    DISBURSED: "bg-emerald-100 text-emerald-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
