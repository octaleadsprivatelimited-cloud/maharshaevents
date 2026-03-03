import { useState } from "react";
import { useEnquiries, FollowUpStatus, Enquiry } from "@/lib/useFirebaseData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  StickyNote,
  Send,
  Trash2,
  Clock,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<FollowUpStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-800 border-blue-200" },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  call_done: { label: "Call Done", color: "bg-purple-100 text-purple-800 border-purple-200" },
  proposal_sent: { label: "Proposal Sent", color: "bg-orange-100 text-orange-800 border-orange-200" },
  converted: { label: "Converted", color: "bg-green-100 text-green-800 border-green-200" },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground border-border" },
};

const EnquiryManager = () => {
  const { enquiries, updateStatus, addNote, removeEnquiry } = useEnquiries();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [noteText, setNoteText] = useState("");
  const [filterStatus, setFilterStatus] = useState<FollowUpStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = enquiries.filter((e) => {
    if (filterStatus !== "all" && e.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddNote = () => {
    if (!noteText.trim() || !selectedEnquiry) return;
    addNote(selectedEnquiry.id, noteText.trim());
    setNoteText("");
    // Refresh selected enquiry
    const updated = enquiries.find((e) => e.id === selectedEnquiry.id);
    if (updated) {
      setSelectedEnquiry({
        ...updated,
        notes: [
          ...updated.notes,
          { id: crypto.randomUUID(), text: noteText.trim(), createdAt: Date.now() },
        ],
      });
    }
    toast.success("Note added");
  };

  const handleStatusChange = (id: string, status: FollowUpStatus) => {
    updateStatus(id, status);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
    toast.success(`Status updated to ${STATUS_CONFIG[status].label}`);
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filterStatus}
          onValueChange={(v) => setFilterStatus(v as FollowUpStatus | "all")}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <SelectItem key={key} value={key}>
                {cfg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = enquiries.filter((e) => e.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? "all" : (key as FollowUpStatus))}
              className={cn(
                "rounded-lg border p-2 text-center text-xs transition-colors",
                filterStatus === key ? cfg.color : "bg-card hover:bg-muted"
              )}
            >
              <div className="text-lg font-bold">{count}</div>
              <div className="truncate">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((enquiry) => (
            <Card
              key={enquiry.id}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => setSelectedEnquiry(enquiry)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium text-foreground">{enquiry.name}</p>
                    <Badge variant="outline" className="shrink-0 text-[10px] uppercase">
                      {enquiry.source}
                    </Badge>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {enquiry.email}
                    </span>
                    {enquiry.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {enquiry.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(enquiry.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {enquiry.notes.length > 0 && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <StickyNote className="h-3 w-3" /> {enquiry.notes.length}
                    </span>
                  )}
                  <Badge className={cn("border text-xs", STATUS_CONFIG[enquiry.status].color)}>
                    {STATUS_CONFIG[enquiry.status].label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={(o) => !o && setSelectedEnquiry(null)}>
        {selectedEnquiry && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-display">
                <User className="h-5 w-5" /> {selectedEnquiry.name}
              </DialogTitle>
              <DialogDescription>
                Submitted on {formatDate(selectedEnquiry.createdAt)} via{" "}
                <span className="capitalize">{selectedEnquiry.source}</span> form
              </DialogDescription>
            </DialogHeader>

            {/* Contact Details */}
            <div className="space-y-2 rounded-lg bg-muted p-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${selectedEnquiry.email}`} className="text-foreground hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-foreground hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
              )}
              {selectedEnquiry.eventType && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{selectedEnquiry.eventType}</span>
                  {selectedEnquiry.eventDate && <span>· {selectedEnquiry.eventDate}</span>}
                </div>
              )}
              {selectedEnquiry.budget && (
                <div className="text-muted-foreground">Budget: {selectedEnquiry.budget}</div>
              )}
              {selectedEnquiry.subject && (
                <div className="text-muted-foreground">Subject: {selectedEnquiry.subject}</div>
              )}
            </div>

            {/* Message */}
            {selectedEnquiry.message && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Message</p>
                <p className="rounded-lg border border-border bg-card p-3 text-sm text-foreground">
                  {selectedEnquiry.message}
                </p>
              </div>
            )}

            {/* Status */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Follow-up Status</p>
              <Select
                value={selectedEnquiry.status}
                onValueChange={(v) => handleStatusChange(selectedEnquiry.id, v as FollowUpStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>
                      {cfg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                Notes ({selectedEnquiry.notes.length})
              </p>
              {selectedEnquiry.notes.length > 0 && (
                <div className="mb-3 max-h-40 space-y-2 overflow-y-auto">
                  {selectedEnquiry.notes.map((note) => (
                    <div key={note.id} className="rounded-lg bg-muted p-2.5 text-sm">
                      <p className="text-foreground">{note.text}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {formatDate(note.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Delete */}
            <div className="flex justify-end border-t border-border pt-3">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  removeEnquiry(selectedEnquiry.id);
                  setSelectedEnquiry(null);
                  toast.success("Enquiry removed");
                }}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete Enquiry
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default EnquiryManager;
