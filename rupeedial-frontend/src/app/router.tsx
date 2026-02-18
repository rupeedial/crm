import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminAttendance from "@/pages/admin/Attendance";
import BankUsers from "@/pages/admin/BankUsers";
import Commissions from "@/pages/admin/Commissions";
import Employees from "@/pages/admin/Employees";
import HRMS from "@/pages/admin/HRMS";
import Invoices from "@/pages/admin/Invoices";
import Partners from "@/pages/admin/Partners";
import Reports from "@/pages/admin/Reports";
import Wallet from "@/pages/admin/Wallet";
import DigitalTools from "@/pages/admin/DigitalTools";
import AutoAssignRules from "@/pages/admin/AutoAssignRules";
import SupervisorMonitor from "@/pages/admin/SupervisorMonitor";
import AdminProfile from "@/pages/admin/Profile";


//leads
import AdminLeads from "@/pages/admin/leads/AllLeads";
// import LoginDesk from "@/pages/admin/leads/LoginDesk";
// import UploadLead from "@/pages/admin/leads/UploadLead";

import CampaignHub from "@/pages/admin/campaign/configure";
import AdminCampaignList from "@/pages/admin/campaign/CampaignList";
import AdminCampaignAnalytics from "@/pages/admin/campaign/CampaignAnalytics";
import AdminCampaignAutomation from "@/pages/admin/campaign/CampaignAutomation";
import AdminCampaignAudience from "@/pages/admin/campaign/CampaignAudience";
import Leaderboard from "@/pages/admin/Leaderboard";
import AdminSettings from "@/pages/admin/Settings";
// channel config pages
import WhatsAppCampaign from "@/pages/admin/campaign/configure/WhatsAppCampaign";
import SmsCampaign from "@/pages/admin/campaign/configure/SmsCampaign";
import FacebookCampaign from "@/pages/admin/campaign/configure/FacebookCampaign";
import EmailCampaign from "@/pages/admin/campaign/configure/EmailCampaign";
import InstagramCampaign from "@/pages/admin/campaign/configure/InstagramCampaign";
import IvrCampaign from "@/pages/admin/campaign/configure/IvrCampaign";
import MissedCallCampaign from "@/pages/admin/campaign/configure/MissedCallCampaign";
import GoogleAdsCampaign from "@/pages/admin/campaign/configure/GoogleAdsCampaign";



/* ================= EMPLOYEE PAGES ================= */
import EmployeeDashboard from "@/pages/employee/Dashboard";
import Attendance from "@/pages/employee/Attendence";
import Productivity from "@/pages/employee/Productivity";
import Performance from "@/pages/employee/Performance";
import HR from "@/pages/employee/HR";
import Support from "@/pages/employee/Support";
import Settings from "@/pages/employee/Settings";

// campaign

import CampaignOverview from "@/pages/employee/campaign/CampaignOverview";
import EmployeeCampaignList from "@/pages/employee/campaign/CampaignList";
import CampaignDetails from "@/pages/employee/campaign/CampaignDetails";
import CampaignWallet from "@/pages/employee/campaign/CampaignWallet";
import CampaignTabLeads from "@/pages/employee/campaign/CampaignTabLeads";
import CampaignAnalytics from "@/pages/employee/campaign/CampaignAnalytics";
import CampaignAutomation from "@/pages/employee/campaign/CampaignAutomation";
import CampaignAudience from "@/pages/employee/campaign/CampaignAudience";



import Profile from "@/pages/employee/Profile";


// Lead Management
import Leads from "@/pages/employee/Lead Management/Leads";
import UploadLead from "@/pages/employee/Lead Management/UploadLead";
import LoginDesk from "@/pages/employee/Lead Management/LoginDesk";
import Bank from "@/pages/employee/Lead Management/Bank";
import Telecaller from "@/pages/employee/Lead Management/Telecaller";
import SalesField from "@/pages/employee/Lead Management/SalesField";
import BankMCF from "@/pages/employee/Lead Management/BankMCF";
import LeadDetails from "@/pages/employee/Lead Management/LeadDetails";
import Pipeline from "@/pages/employee/Lead Management/Pipeline";


// sales-coordinator
// sales-coordinator
import ActiveFiles from "@/pages/employee/sales-coordinator/ActiveFiles";
import LenderSubmissions from "@/pages/employee/sales-coordinator/LenderSubmissions";



// training
import Certifications from "@/pages/employee/training/Certifications";
import CoursePlayer from "@/pages/employee/training/CoursePlayer";
import Quiz from "@/pages/employee/training/Quiz";

// meetings
import JoinMeeting from "@/pages/employee/meetings/JoinMeeting";
import Recordings from "@/pages/employee/meetings/Recordings";
import ScheduleMeeting from "@/pages/employee/meetings/ScheduleMeeting";


// Channel Sales
import Calculator from "@/pages/employee/Channel Sales/Calculator";
import CpPayout from "@/pages/employee/Channel Sales/CpPayout";
import CpPayment from "@/pages/employee/Channel Sales/CpPayment";

/* ================= PARTNER ================= */
import PartnerDashboard from "@/pages/partner/Dashboard";
import PartnerProfile from "@/pages/partner/Profile";
/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({
  role,
  children,
}: {
  role: "admin" | "employee" | "partner";
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
}



/* ================= ROUTER ================= */

export default function AppRouter() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        {/* DASHBOARD */}
        <Route index element={<AdminDashboard />} />
<Route path="profile" element={<AdminProfile />} />
        {/* ================= CAMPAIGN ================= */}
        <Route path="campaign">
          <Route index element={<CampaignHub />} />
          <Route path="list" element={<AdminCampaignList />} />
          <Route path="analytics" element={<AdminCampaignAnalytics />} />
          <Route path="automation" element={<AdminCampaignAutomation />} />
          <Route path="audience" element={<AdminCampaignAudience />} />

          <Route path="configure">
            <Route path="whatsapp" element={<WhatsAppCampaign />} />
            <Route path="sms" element={<SmsCampaign />} />
            <Route path="facebook" element={<FacebookCampaign />} />
            <Route path="email" element={<EmailCampaign />} />
            <Route path="instagram" element={<InstagramCampaign />} />
            <Route path="ivr" element={<IvrCampaign />} />
            <Route path="missed-call" element={<MissedCallCampaign />} />
            <Route path="google-ads" element={<GoogleAdsCampaign />} />
          </Route>
        </Route>   {/* 👈 YE CLOSE KARNA THA */}


        {/* ================= OTHER ADMIN PAGES ================= */}
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="bank-users" element={<BankUsers />} />
        <Route path="commissions" element={<Commissions />} />
        <Route path="employees" element={<Employees />} />
        <Route path="hrms" element={<HRMS />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="partners" element={<Partners />} />
        <Route path="reports" element={<Reports />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="digital-tools" element={<DigitalTools />} />
        <Route path="auto-assign" element={<AutoAssignRules />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="leaderboard" element={<Leaderboard />} />
       <Route path="supervisor" element={<SupervisorMonitor />} />


        {/* LEADS */}
        <Route path="leads" element={<AdminLeads />} />
      </Route>


    /* ================= EMPLOYEE ================= */
      <Route
        path="/dashboard/employee"
        element={
          <ProtectedRoute role="employee">
            <DashboardLayout role="employee" />
          </ProtectedRoute>
        }
      >
        {/* DASHBOARD */}
        <Route index element={<EmployeeDashboard />} />

        {/* ================= EMPLOYEE CAMPAIGN ================= */}
        <Route path="campaign">

          {/* Campaign Hub */}
          <Route index element={<CampaignOverview />} />

          {/* Basic Pages */}
          <Route path="list" element={<EmployeeCampaignList />} />
          <Route path="analytics" element={<CampaignAnalytics />} />
          <Route path="automation" element={<CampaignAutomation />} />
          <Route path="audience" element={<CampaignAudience />} />
 <Route path="configure">
    <Route path="whatsapp" element={<WhatsAppCampaign />} />
    <Route path="sms" element={<SmsCampaign />} />
    <Route path="facebook" element={<FacebookCampaign />} />
    <Route path="email" element={<EmailCampaign />} />
    <Route path="instagram" element={<InstagramCampaign />} />
    <Route path="ivr" element={<IvrCampaign />} />
    <Route path="missed-call" element={<MissedCallCampaign />} />
    <Route path="google-ads" element={<GoogleAdsCampaign />} />
  </Route>
          {/* Dynamic Campaign Details */}
          <Route path=":id" element={<CampaignDetails />}>
            <Route index element={<CampaignOverview />} />
            <Route path="overview" element={<CampaignOverview />} />
            <Route path="wallet" element={<CampaignWallet />} />
            <Route path="leads" element={<CampaignTabLeads />} />
            
          </Route>

        </Route>


        {/* ================= LEAD MANAGEMENT ================= */}
        <Route path="leads" element={<Leads />} />
        <Route path="upload-lead" element={<UploadLead />} />
        <Route path="login-desk" element={<LoginDesk />} />
        <Route path="bank" element={<Bank />} />
        <Route path="telecaller" element={<Telecaller />} />
        <Route path="sales-field" element={<SalesField />} />
        <Route path="bank-mcf" element={<BankMCF />} />
        <Route path="lead-details" element={<LeadDetails />} />
        <Route path="pipeline" element={<Pipeline />} />

        {/* ================= SALES COORDINATOR ================= */}
        <Route path="sales-coordinator/active-files" element={<ActiveFiles />} />
        <Route path="sales-coordinator/lender-submission" element={<LenderSubmissions />} />
       

        {/* ================= TRAINING ================= */}
        <Route path="training/course" element={<CoursePlayer />} />
        <Route path="training/quiz" element={<Quiz />} />
        <Route path="training/certifications" element={<Certifications />} />

        {/* ================= MEETINGS ================= */}
        <Route path="meetings/recordings" element={<Recordings />} />
        <Route path="meeting/join" element={<JoinMeeting />} />
        <Route path="meetings/schedule" element={<ScheduleMeeting />} />

        {/* ================= WORK ================= */}
        <Route path="attendance" element={<Attendance />} />
        <Route path="productivity" element={<Productivity />} />
        <Route path="performance" element={<Performance />} />
        <Route path="hr" element={<HR />} />

        {/* ================= CHANNEL SALES ================= */}
        <Route path="cp-payout" element={<CpPayout />} />
        <Route path="cp-payment" element={<CpPayment />} />
        <Route path="calculator" element={<Calculator />} />

        {/* ================= OTHERS ================= */}
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>


    //   {/* ================= PARTNER ================= */}
      <Route
        path="/dashboard/partner"
        element={
          <ProtectedRoute role="partner">
            <DashboardLayout role="partner" />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<PartnerProfile />} />
        <Route index element={<PartnerDashboard />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
