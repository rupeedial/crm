import { useParams } from "react-router-dom";

import WhatsAppCampaign from "@/pages/admin/campaign/configure/WhatsAppCampaign";

import SmsCampaign from "@/pages/admin/campaign/configure/SmsCampaign";
import EmailCampaign from "@/pages/admin/campaign/configure/EmailCampaign";
import FacebookCampaign from "@/pages/admin/campaign/configure/FacebookCampaign";
import InstagramCampaign from "@/pages/admin/campaign/configure/InstagramCampaign";
import GoogleAdsCampaign from "@/pages/admin/campaign/configure/GoogleAdsCampaign";
import IvrCampaign from "@/pages/admin/campaign/configure/IvrCampaign";
import MissedCallCampaign from "@/pages/admin/campaign/configure/MissedCallCampaign";


export default function EmployeeCampaignRouter() {
  const { type } = useParams();

  switch (type) {
    case "whatsapp":
      return <WhatsAppCampaign />;
    case "sms":
      return <SmsCampaign />;
    case "email":
      return <EmailCampaign />;
    case "facebook":
      return <FacebookCampaign />;
    case "instagram":
      return <InstagramCampaign />;
    case "google-ads":
      return <GoogleAdsCampaign />;
    case "ivr":
      return <IvrCampaign />;
    case "missed-call":
      return <MissedCallCampaign />;
    default:
      return <div className="p-8">Invalid Campaign Type</div>;
  }
}
