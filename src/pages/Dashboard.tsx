import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { SeoHead } from "@/components/SeoHead";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
import { MockApi, type StatsMap } from "@/services/mockApi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
const COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))"]; // attended vs pending/absent base

const Dashboard = () => {
  const { profile, logout } = useAuth();
  const { data } = useQuery<StatsMap>({
    queryKey: ["stats", profile?.roll],
    queryFn: () => (profile ? MockApi.getStats(profile.roll) : Promise.resolve({} as StatsMap)),
    enabled: !!profile,
  });

  const { data: subjectMap, isLoading: subjectsLoading } = useQuery<Record<string, string>>({
    queryKey: ["subjects", profile?.section],
    queryFn: () => (profile ? MockApi.getSubjectsForSection(profile.section) : Promise.resolve({} as Record<string, string>)),
    enabled: !!profile,
  });

  const lowSubjects = useMemo(() => {
    if (!data) return [] as string[];
    return Object.entries(data)
      .filter(([_, v]) => v.total > 0 && (v.attended / v.total) * 100 < 75)
      .map(([k]) => k);
  }, [data]);

  return (
    <main className="min-h-screen px-4 py-6 container">
      <SeoHead title="Dashboard | College Attend Smart" description="View your attendance summary by subject." />
      <PageHeader
        title={`Hello${profile?.name ? `, ${profile.name}` : ""}`}
        subtitle={`Section ${profile?.section} • Group ${profile?.group}`}
        icon={<GraduationCap className="h-5 w-5" />}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="soft"><Link to="/schedule">Mark Today</Link></Button>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        }
      />

      {lowSubjects.length > 0 && (
        <Card className="mb-6 border-destructive/40">
          <CardHeader>
            <CardTitle className="text-destructive">Attention needed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Your attendance is below 75% in: {lowSubjects.join(", ")}</p>
          </CardContent>
        </Card>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectsLoading ? (
          <Card>
            <CardHeader><CardTitle>Loading subjects…</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Fetching your section subjects.</CardContent>
          </Card>
        ) : subjectMap && Object.keys(subjectMap).length > 0 ? (
          Object.entries(subjectMap).map(([code, name]) => {
            const v = data?.[code] || { attended: 0, total: 0 };
            const chartData = [
              { name: "Attended", value: v.attended },
              { name: "Missed", value: Math.max(v.total - v.attended, 0) },
            ];
            const percentage = v.total > 0 ? Math.round((v.attended / v.total) * 100) : 0;
            return (
              <Card key={code}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{name}</span>
                    <span className={percentage < 75 ? "text-destructive" : "text-muted-foreground"}>{percentage}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                        {chartData.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardHeader><CardTitle>Nothing yet</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">No subjects configured for your section.</CardContent>
          </Card>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
