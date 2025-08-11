import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Login from "./Login";

const Index = () => {
  const { profile } = useAuth();

  useEffect(() => {
    // Set an accessible H1 dynamically for SEO parity
    document.querySelector("h1[data-root-title]")?.remove();
    const h1 = document.createElement("h1");
    h1.setAttribute("data-root-title", "");
    h1.textContent = "College Attend Smart";
    h1.style.position = "absolute";
    h1.style.left = "-10000px";
    document.body.appendChild(h1);
  }, []);

  return <Login />;
};

export default Index;
