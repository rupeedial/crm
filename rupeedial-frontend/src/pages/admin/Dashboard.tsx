import { useRef, useState, useMemo } from "react";
import { Lead, LeadStatus, LeadSource } from "@/types";
import { mockLeads } from "@/lib/mockData";

/* DASHBOARD SECTIONS */
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { PipelineView } from "@/components/dashboard/PipelineView";
import PipelineKanban from "@/components/dashboard/PipelineKanban";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { LeadsStatusSummary } from "@/components/dashboard/LeadsStatusSummary";
import { FollowUpPanel } from "@/components/dashboard/FollowUpPanel";
import { CampaignDashboard } from "@/components/dashboard/CampaignDashboard";
import { EmployeePerformanceTable } from "@/components/dashboard/EmployeePerformanceTable";

/* PERFORMANCE DRAWERS */
import { PerformanceActions } from "@/components/dashboard/PerformanceActions";
import { PerformanceDrawer } from "@/components/dashboard/PerformanceDrawer";
import { TelecallerTodayPanel } from "@/components/dashboard/TelecallerTodayPanel";
import { TelecallerPerformancePanel } from "@/components/dashboard/TelecallerPerformancePanel";
import { LeadSourcePerformancePanel } from "@/components/dashboard/LeadSourcePerformancePanel";

/* AUTH */
import { useAuth } from "@/context/AuthContext";
import { filterLeadsByRole } from "@/lib/roleFilter";

export default function AdminDashboard() {
  const { role, userId } = useAuth();

  /* ================= LEADS ================= */
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const visibleLeads = useMemo(() => {
    if (!role) return leads; // 🔒 safety fallback
    return filterLeadsByRole(leads, role, userId);
  }, [leads, role, userId]);

  /* ================= FILTERS ================= */
  const [selectedStage, setSelectedStage] =
    useState<LeadStatus | "all">("all");

  const [selectedSource, setSelectedSource] =
    useState<LeadSource | "all">("all");

  const [showKanban, setShowKanban] = useState(false);

  const [panel, setPanel] = useState<
    "today" | "telecaller" | "source" | null
  >(null);

  const kanbanRef = useRef<HTMLDivElement | null>(null);

  /* ================= UPDATE LEAD STATUS ================= */
  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(l =>
        l.id === leadId ? { ...l, status, updatedAt: new Date() } : l
      )
    );
  };

  /* ================= PIPELINE CLICK ================= */
  const handlePipelineClick = (stage: LeadStatus | "all") => {
    setSelectedStage(stage);
    setShowKanban(true);

    setTimeout(() => {
      kanbanRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-8">
      {/* 🔝 TOP STATS */}
      <DashboardStatsCards />

      {/* 📞 PERFORMANCE ACTIONS */}
      <PerformanceActions onOpen={setPanel} />

      {/* 📊 PIPELINE SUMMARY */}
      <PipelineView
        leads={visibleLeads}
        selectedStage={selectedStage}
        onStageClick={handlePipelineClick}
      />

      {/* 🌐 CAMPAIGN DASHBOARD */}
      <CampaignDashboard
        leads={visibleLeads}
        selectedSource={selectedSource}
        onSelectSource={setSelectedSource}
      />

      {/* 🔀 KANBAN BOARD */}
      {showKanban && (
        <div ref={kanbanRef}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">
              Lead Movement Board
            </h3>

            <button
              onClick={() => setShowKanban(false)}
              className="px-3 py-1.5 text-sm rounded-lg border
                         bg-background hover:bg-secondary transition"
            >
              Hide Board
            </button>
          </div>

          <PipelineKanban
            leads={visibleLeads}
            onStatusChange={updateLeadStatus}
          />
        </div>
      )}

      {/* 📌 STATUS + FOLLOW UPS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeadsStatusSummary leads={visibleLeads} />
        </div>
        <FollowUpPanel leads={visibleLeads} />
      </div>

      {/* 📋 LEADS TABLE */}
      <LeadsTable
        leads={visibleLeads}
        selectedStatus={selectedStage}
        selectedSource={selectedSource}
      />

      {/* 👨‍💼 EMPLOYEE PERFORMANCE */}
      <EmployeePerformanceTable />

      {/* ================= DRAWERS ================= */}

      <PerformanceDrawer
        open={panel === "today"}
        title="Today Telecaller Performance"
        onClose={() => setPanel(null)}
      >
        <TelecallerTodayPanel leads={visibleLeads} />
      </PerformanceDrawer>

      <PerformanceDrawer
        open={panel === "telecaller"}
        title="Telecaller Performance"
        onClose={() => setPanel(null)}
      >
        <TelecallerPerformancePanel leads={visibleLeads} />
      </PerformanceDrawer>

      <PerformanceDrawer
        open={panel === "source"}
        title="Lead Source Performance"
        onClose={() => setPanel(null)}
      >
        <LeadSourcePerformancePanel leads={visibleLeads} />
      </PerformanceDrawer>
    </div>
  );
}
