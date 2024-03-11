import { useEffect } from "react";
import { Features } from "../../components/Feature";
import Hero from "../../components/Hero";

export default function Home() {
  useEffect(() => {
    document.title = "ArgentBank - Home";
  }, []);

  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
}
