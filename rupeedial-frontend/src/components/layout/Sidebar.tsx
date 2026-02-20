import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Percent,
  Trophy,
  FileText,
  Settings,
  Upload,
  PhoneCall,
  UserCheck,
  CalendarCheck,
  Activity,
  BarChart3,
  IndianRupee,
  Calculator,
  Megaphone,
  LifeBuoy,
  Briefcase,
  ChevronDown,
    CheckCircle, 
} from "lucide-react";

import { UserRole } from "@/types";

interface Props {
  role: UserRole;
}

/* ================= REUSABLE LINK ================= */

const SidebarLink = ({
  to,
  icon: Icon,
  label,
  end = false,
}: {
  to: string;
  icon: any;
  label: string;
  end?: boolean;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
      ${
        isActive
          ? "bg-green-800 text-white shadow-md"
          : "text-slate-800 hover:bg-green-100 hover:text-green-700"
      }`
    }
  >
    <Icon className="w-4 h-4" />
    {label}
  </NavLink>
);


/* ================= SIDEBAR ================= */

export default function Sidebar({ role }: Props) {
    const navigate = useNavigate(); 
  const [leadOpen, setLeadOpen] = useState(false);
  const [employeeCampaignOpen, setEmployeeCampaignOpen] = useState(false);
  const [adminCampaignOpen, setAdminCampaignOpen] = useState(false);
  const [coordinatorOpen, setCoordinatorOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [adminUserOpen, setAdminUserOpen] = useState(false);

  return (
 <aside className="w-64 bg-green-50 text-slate-800 flex flex-col border-r border-slate-200 shadow-[4px_0_25px_rgba(0,0,0,0.06)]">


     {/* LOGO */}
<div className="bg-green-800 px-6 py-5  border-b border-green-200">
  <div className="flex items-center gap-3">

    {/* Icon */}
    <div className="w-9 h-9 rounded-xl bg-white text-green-800 flex items-center justify-center font-bold shadow-sm">
      ₹
    </div>

    {/* Text */}
    <div className=" leading-tight">
      <p className="text-sm font-bold text-white">
        RupeeDial
      </p>
      <p className="text-xs text-white font-bold">
        {role === "admin" ? "Admin Portal" : "Partner Portal"}
      </p>
    </div>

  </div>
</div>


      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        {/* ================= DASHBOARD (TOP ALWAYS) ================= */}
        <SidebarLink
          to={`/dashboard/${role}`}
          icon={LayoutDashboard}
          label="Dashboard"
        />

        {/* ================= ADMIN MENU ================= */}
        {role === "admin" && (
          <>
            <SidebarLink
              to="/dashboard/admin/leads"
              icon={FileText}
              label="All Leads"
            />

            {/* USERS */}
            <button
              onClick={() => setAdminUserOpen(!adminUserOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                Users
              </span>
              <ChevronDown className={adminUserOpen ? "rotate-180" : ""} />
            </button>

            {adminUserOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="/dashboard/admin/employees" icon={Users} label="Employees" />
                <SidebarLink to="/dashboard/admin/partners" icon={UserCheck} label="Partners" />
                <SidebarLink to="/dashboard/admin/bank-users" icon={Building2} label="Bank Users" />
              </div>
            )}
  {/* CAMPAIGN INTELLIGENCE (ADMIN ONLY) */}
            <button
              onClick={() => setAdminCampaignOpen(!adminCampaignOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <Megaphone className="w-4 h-4" />
                Campaign Hub
              </span>
              <ChevronDown className={adminCampaignOpen ? "rotate-180" : ""} />
            </button>

            {adminCampaignOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="/dashboard/admin/campaign" icon={Megaphone} label="Campaign Hub" />
                <SidebarLink to="/dashboard/admin/campaign/list" icon={FileText} label="Campaign List" />
                <SidebarLink to="/dashboard/admin/campaign/analytics" icon={BarChart3} label="Analytics" />
                <SidebarLink to="/dashboard/admin/campaign/automation" icon={Activity} label="Automation" />
                <SidebarLink to="/dashboard/admin/campaign/audience" icon={Users} label="Audience" />
              </div>
            )}
            <SidebarLink to="/dashboard/admin/commissions" icon={Percent} label="Commissions" />
            <SidebarLink to="/dashboard/admin/leaderboard" icon={Trophy} label="Leaderboard" />
            <SidebarLink to="/dashboard/admin/settings" icon={Settings} label="Settings" />

          
          </>
        )}

        {/* ================= EMPLOYEE MENU ================= */}
        {role === "employee" && (
          
          <>
          
            {/* ================= CAMPAIGN ================= */}
<button
  onClick={() => setEmployeeCampaignOpen(!employeeCampaignOpen)}
  className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
>
  <span className="flex items-center gap-3">
    <Megaphone className="w-4 h-4" />
    Campaign
  </span>
  <ChevronDown className={employeeCampaignOpen ? "rotate-180" : ""} />
</button>

{employeeCampaignOpen && (
  <div className="ml-6 space-y-1">
    <SidebarLink
      to="/dashboard/employee/campaign"
      icon={Megaphone}
      label="Campaign Hub"
    />
    <SidebarLink
      to="/dashboard/employee/campaign/list"
      icon={FileText}
      label="Campaign List"
    />
    <SidebarLink
      to="/dashboard/employee/campaign/analytics"
      icon={BarChart3}
      label="Analytics"
    />
    <SidebarLink
      to="/dashboard/employee/campaign/automation"
      icon={Activity}
      label="Automation"
    />
    <SidebarLink
      to="/dashboard/employee/campaign/audience"
      icon={Users}
      label="Audience"
    />
  </div>
)}


            {/* MEETINGS */}
            <button
              onClick={() => setMeetingOpen(!meetingOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                Meetings
              </span>
              <ChevronDown className={meetingOpen ? "rotate-180" : ""} />
            </button>

            {meetingOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="meeting/join" icon={PhoneCall} label="Join Meeting" />
                <SidebarLink to="meetings/recordings" icon={FileText} label="Recordings" />
                <SidebarLink to="meetings/schedule" icon={CalendarCheck} label="Schedule Meeting" />
              </div>
            )}

            {/* SALES COORDINATOR */}
            <button
              onClick={() => setCoordinatorOpen(!coordinatorOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                Sales Coordinator
              </span>
              <ChevronDown className={coordinatorOpen ? "rotate-180" : ""} />
            </button>

            {coordinatorOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="sales-coordinator/active-files" icon={FileText} label="Active Files" />
                <SidebarLink to="sales-coordinator/lender-submission" icon={Building2} label="Lender Submission" />
              </div>
            )}

            {/* TRAINING */}
            <button
              onClick={() => setTrainingOpen(!trainingOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <Trophy className="w-4 h-4" />
                Training
              </span>
              <ChevronDown className={trainingOpen ? "rotate-180" : ""} />
            </button>

            {trainingOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="training/certifications" icon={Trophy} label="Certifications" />
                <SidebarLink to="training/course" icon={Trophy} label="Course Player" />
                <SidebarLink to="training/quiz" icon={Trophy} label="Quiz" />
              </div>
            )}

            {/* LEAD MANAGEMENT */}
            <button
              onClick={() => setLeadOpen(!leadOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                Lead Management
              </span>
              <ChevronDown className={leadOpen ? "rotate-180" : ""} />
            </button>

            {leadOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="/dashboard/employee/leads" icon={Users} label="Leads" />
                <SidebarLink to="/dashboard/employee/upload-lead" icon={Upload} label="Upload Lead" />
                <SidebarLink to="/dashboard/employee/login-desk" icon={Briefcase} label="Login Desk" />
                <SidebarLink to="/dashboard/employee/telecaller" icon={PhoneCall} label="Telecaller" />
                <SidebarLink to="/dashboard/employee/sales-field" icon={UserCheck} label="Sales Field" />
                <SidebarLink to="/dashboard/employee/bank" icon={Building2} label="Bank" />
              </div>
            )}

            {/* CHANNEL SALES */}
            <button
              onClick={() => setChannelOpen(!channelOpen)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm text-slate-800 hover:bg-green-100 hover:text-green-700 transition"
            >
              <span className="flex items-center gap-3">
                <IndianRupee className="w-4 h-4" />
                Channel Sales
              </span>
              <ChevronDown className={channelOpen ? "rotate-180" : ""} />
            </button>

            {channelOpen && (
              <div className="ml-6 space-y-1">
                <SidebarLink to="/dashboard/employee/cp-payout" icon={IndianRupee} label="CP Payout" />
                <SidebarLink to="/dashboard/employee/cp-payment" icon={Briefcase} label="CP Payment" />
                <SidebarLink to="/dashboard/employee/calculator" icon={Calculator} label="Calculator" />
              </div>
            )}

            {/* OTHERS */}
            <SidebarLink to="/dashboard/employee/attendance" icon={CalendarCheck} label="Attendance" />
            <SidebarLink to="/dashboard/employee/productivity" icon={Activity} label="Productivity" />
            <SidebarLink to="/dashboard/employee/performance" icon={BarChart3} label="Performance" />
            <SidebarLink to="/dashboard/employee/support" icon={LifeBuoy} label="Support" />
            <SidebarLink to="/dashboard/employee/settings" icon={Settings} label="Settings" />
          </>
        )}
      {/* ================= PARTNER MENU ================= */}
{role === "partner" && (
  <>
  

    <SidebarLink
      to="/dashboard/partner/leads"
      icon={Users}
      label="My Leads"
    />

    <SidebarLink
      to="/dashboard/partner/disbursements"
      icon={CheckCircle}
      label="Disbursements"
    />

    <SidebarLink
      to="/dashboard/partner/payouts"
      icon={IndianRupee}
      label="Payouts"
    />

    <SidebarLink
      to="/dashboard/partner/leaderboard"
      icon={Trophy}
      label="Leaderboard"
    />

    <SidebarLink
      to="/dashboard/partner/reports"
      icon={BarChart3}
      label="Reports"
    />

    <SidebarLink
      to="/dashboard/partner/documents"
      icon={FileText}
      label="Documents"
    />

    <SidebarLink
      to="/dashboard/partner/support"
      icon={LifeBuoy}
      label="Support"
    />

    <SidebarLink
      to="/dashboard/partner/settings"
      icon={Settings}
      label="Settings"
    />
  </>
)}


      </nav>

   <div
  onClick={() => navigate("/login")}
  className="px-4 py-4 border-t border-green-600 text-sm text-white bg-green-800 cursor-pointer hover:bg-green-900 hover:text-white transition"
>
  ← Switch Role
</div>
    </aside>
  );
}
