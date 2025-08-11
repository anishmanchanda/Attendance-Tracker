import { schedules, ClassEntry } from "@/data/schedules";
import { students } from "@/data/students";
import type { GroupType, StudentProfile } from "@/context/AuthContext";

export type AttendanceStatus = "attended" | "absent" | "cancelled";
export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  subjectCode: string;
  status: AttendanceStatus;
}

export type StatsMap = Record<string, { attended: number; total: number }>;

// Helpers to robustly match section labels across different naming styles
const normalizeRawSection = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const canonicalSection = (s: string) => {
  let n = normalizeRawSection(s);
  // Alias: CSE-AI and variants -> CSAI
  n = n.replace(/cseai/g, "csai");
  return n;
};
const sectionsMatch = (a: string, b: string) => {
  const ca = canonicalSection(a);
  const cb = canonicalSection(b);
  return ca === cb || ca.startsWith(cb) || cb.startsWith(ca);
};

const attendanceKey = (roll: string) => `attendance:${roll}`;
const profileKey = (roll: string) => `studentProfile:${roll}`;

export const MockApi = {
  async login(roll: string) {
    const found = students.find((s) => s.roll.toLowerCase() === roll.toLowerCase());
    return !!found;
  },
  async getStudentByRoll(roll: string) {
    return students.find((s) => s.roll.toLowerCase() === roll.toLowerCase()) || null;
  },
  async getProfile(roll: string): Promise<StudentProfile | null> {
    const raw = localStorage.getItem(profileKey(roll));
    return raw ? JSON.parse(raw) : null;
  },
  async setGroup(roll: string, group: GroupType) {
    const base = await this.getProfile(roll);
    if (!base) return null;
    const updated = { ...base, group } as StudentProfile;
    localStorage.setItem(profileKey(roll), JSON.stringify(updated));
    return updated;
  },
  async getTodaySchedule(roll: string): Promise<ClassEntry[]> {
    const student = await this.getStudentByRoll(roll);
    if (!student) return [];
    // Compute day in Indian Standard Time (IST)
    const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const today = nowIST.getDay(); // 0=Sun ... 6=Sat
    const prof = await this.getProfile(roll);
    const sectionNorm = student.section;
    const filtered = schedules.filter((c) => {
      if (!sectionsMatch(c.section, sectionNorm)) return false;
      if (c.day !== today) return false;
      // Show ALL classes for the day irrespective of group selection (labs for both groups + theory)
      return true;
    });
    // sort by start time to show entire day in order (handle times like 9:00 vs 09:00)
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":");
      return parseInt(h, 10) * 60 + parseInt(m, 10);
    };
    return filtered.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  },
  async saveAttendance(roll: string, record: AttendanceRecord) {
    const raw = localStorage.getItem(attendanceKey(roll));
    const list: AttendanceRecord[] = raw ? JSON.parse(raw) : [];
    // overwrite if same date + subject exists
    const idx = list.findIndex((r) => r.date === record.date && r.subjectCode === record.subjectCode);
    if (idx >= 0) list[idx] = record; else list.push(record);
    localStorage.setItem(attendanceKey(roll), JSON.stringify(list));
    return list;
  },
  async getAttendance(roll: string): Promise<AttendanceRecord[]> {
    const raw = localStorage.getItem(attendanceKey(roll));
    return raw ? JSON.parse(raw) : [];
  },
  async getStats(roll: string) {
    const list = await this.getAttendance(roll);
    const bySubject: Record<string, { attended: number; total: number }> = {};
    for (const r of list) {
      if (!bySubject[r.subjectCode]) bySubject[r.subjectCode] = { attended: 0, total: 0 };
      if (r.status === "cancelled") continue; // not counted
      bySubject[r.subjectCode].total += 1;
      if (r.status === "attended") bySubject[r.subjectCode].attended += 1;
    }
    return bySubject;
  },
  async getSubjectsForSection(section: string): Promise<Record<string, string>> {
    const map: Record<string, string> = {};
    for (const c of schedules) {
      if (!sectionsMatch(c.section, section)) continue;
      map[c.subjectCode] = c.subject;
    }
    return map;
  },
};
