import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SeoHead } from "@/components/SeoHead";
import { BackgroundGlow } from "@/components/BackgroundGlow";

const Login = () => {
  const { login, needsGroup, setGroup, profile } = useAuth();
  const [roll, setRoll] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.group) navigate("/dashboard");
  }, [profile, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await login(roll.trim());
    if (!res.ok) setError(res.error || "Login failed");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <SeoHead title="Login | College Attend Smart" description="Login with enrollment number to track attendance." />
      <BackgroundGlow />
      <Card className="w-full max-w-md shadow-[var(--shadow-glow)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary-glow)))]">College Attend Smart</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in with your enrollment number to start tracking attendance</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="enrollment">Enrollment Number</Label>
              <Input id="enrollment" placeholder="Enrollment Number" value={roll} onChange={(e) => setRoll(e.target.value)} />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" variant="hero" className="w-full">Continue</Button>
            
          </form>
        </CardContent>
      </Card>

      <Dialog open={!!profile && needsGroup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select your Lab Group</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => setGroup("A")}>Group A</Button>
            <Button variant="secondary" onClick={() => setGroup("B")}>Group B</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Login;
