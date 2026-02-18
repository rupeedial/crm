import { LeadStatus, LeadSource } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props {
  search: string;
  onSearch: (v: string) => void;

  status: LeadStatus | "all";
  onStatus: (v: LeadStatus | "all") => void;

  source: LeadSource | "all";
  onSource: (v: LeadSource | "all") => void;

  aiOnly: boolean;
  onAIMode: (v: boolean) => void;
}

export function LeadsFilterBar({
  search,
  onSearch,
  status,
  onStatus,
  source,
  onSource,
  aiOnly,
  onAIMode,
}: Props) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-card grid grid-cols-1 md:grid-cols-5 gap-4">
      
      {/* SEARCH */}
      <Input
        placeholder="Search name / phone"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* STATUS */}
      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger>Status</SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="documents_collected">Docs</SelectItem>
          <SelectItem value="sanctioned">Sanctioned</SelectItem>
          <SelectItem value="disbursed">Disbursed</SelectItem>
        </SelectContent>
      </Select>

      {/* SOURCE */}
      <Select value={source} onValueChange={onSource}>
        <SelectTrigger>Source</SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="facebook">Facebook</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="partner">Partner</SelectItem>
          <SelectItem value="telecalling">Telecalling</SelectItem>
        </SelectContent>
      </Select>

      {/* AI ONLY */}
      <div className="flex items-center gap-2">
        <Switch checked={aiOnly} onCheckedChange={onAIMode} />
        <Label>AI Leads</Label>
      </div>
    </div>
  );
}
