import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { SeoHead } from "@/components/SeoHead";
import { MockApi, AttendanceRecord, AttendanceStatus } from "@/services/mockApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarClock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
const Schedule = () => {
  const { profile } = useAuth();
  const qc = useQueryClient();
  const { data: classes, refetch } = useQuery({
    queryKey: ["schedule", profile?.roll],
    queryFn: () => (profile ? MockApi.getTodaySchedule(profile.roll) : Promise.resolve([])),
    enabled: !!profile,
  });

  const setStatus = async (subjectCode: string, status: AttendanceStatus) => {
    if (!profile) return;
    const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const y = nowIST.getFullYear();
    const m = String(nowIST.getMonth() + 1).padStart(2, "0");
    const d = String(nowIST.getDate()).padStart(2, "0");
    const date = `${y}-${m}-${d}`; // IST date
    const rec: AttendanceRecord = { date, subjectCode, status };
    await MockApi.saveAttendance(profile.roll, rec);
    toast.success(`Marked ${status} for ${subjectCode}`);
    qc.invalidateQueries({ queryKey: ["stats", profile.roll] });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main className="min-h-screen px-4 py-6 container">
      <SeoHead title="Schedule | College Attend Smart" description="Mark today's attendance quickly." />
      <PageHeader
        title="Today's Schedule"
        subtitle={`${new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" })} • Section ${profile?.section} • ${profile?.group ? "Group " + profile.group : "Select group for labs"}`}
        icon={<CalendarClock className="h-5 w-5" />}
      />

      <section className="space-y-4">
        {classes && classes.length > 0 ? (
          classes.map((c) => (
            <Card key={`${c.subjectCode}-${c.start}`} className="transition-shadow hover:shadow-[var(--shadow-glow)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{c.subject}</span>
                  <span className="text-sm text-muted-foreground">{c.start} - {c.end}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="hero" onClick={() => setStatus(c.subjectCode, "attended")}>Attended</Button>
                <Button variant="outline" onClick={() => setStatus(c.subjectCode, "absent")}>Absent</Button>
                <Button variant="soft" onClick={() => setStatus(c.subjectCode, "cancelled")}>Cancelled</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardHeader><CardTitle>No classes</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">No classes scheduled for today or group not set.</CardContent>
          </Card>
        )}
      </section>
    </main>
  );
};

export default Schedule;
