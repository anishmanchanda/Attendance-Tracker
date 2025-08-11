import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "@/data/students";

export type GroupType = "A" | "B";
export interface StudentProfile {
  roll: string;
  name: string;
  section: string;
  group?: GroupType;
}

interface AuthContextValue {
  profile: StudentProfile | null;
  needsGroup: boolean;
  login: (roll: string) => Promise<{ ok: boolean; error?: string; needsGroup?: boolean }>;
  setGroup: (group: GroupType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = (roll: string) => `studentProfile:${roll}`;
const CURRENT_KEY = "studentProfile:currentRoll";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [needsGroup, setNeedsGroup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentRoll = localStorage.getItem(CURRENT_KEY);
    if (currentRoll) {
      const saved = localStorage.getItem(STORAGE_KEY(currentRoll));
      if (saved) setProfile(JSON.parse(saved));
    }
  }, []);

  const login: AuthContextValue["login"] = async (roll) => {
    const found = students.find((s) => s.roll.toLowerCase() === roll.toLowerCase());
    if (!found) return { ok: false, error: "Roll number not found" };

    const storedRaw = localStorage.getItem(STORAGE_KEY(found.roll));
    if (storedRaw) {
      const stored: StudentProfile = JSON.parse(storedRaw);
      setProfile(stored);
      localStorage.setItem(CURRENT_KEY, found.roll);
      setNeedsGroup(!stored.group);
      return { ok: true, needsGroup: !stored.group };
    }

    const base: StudentProfile = { roll: found.roll, name: found.name, section: found.section };
    setProfile(base);
    localStorage.setItem(CURRENT_KEY, found.roll);
    setNeedsGroup(true);
    return { ok: true, needsGroup: true };
  };

  const setGroup = (group: GroupType) => {
    if (!profile) return;
    const withGroup = { ...profile, group };
    setProfile(withGroup);
    localStorage.setItem(STORAGE_KEY(profile.roll), JSON.stringify(withGroup));
    navigate("/dashboard");
  };

  const logout = () => {
    if (profile) localStorage.removeItem(CURRENT_KEY);
    setProfile(null);
    setNeedsGroup(false);
    navigate("/login");
  };

  const value = useMemo(() => ({ profile, needsGroup, login, setGroup, logout }), [profile, needsGroup]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
