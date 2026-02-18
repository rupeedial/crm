import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  preview: ReactNode;
}

export default function CampaignLayout({
  title,
  children,
  preview,
}: Props) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT PANEL */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          {children}
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          {preview}
        </div>
      </div>
    </div>
  );
}
