// =============================================================
// STOCKWISE — Homepage
// File: src/app/page.tsx
// Route: /
//
// This is a Server Component by default in Next.js App Router —
// it can directly await data without useEffect or loading states.
// =============================================================

import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedBrokers from "@/components/home/FeaturedBrokers";
import LearnPreview from "@/components/home/LearnPreview";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturedBrokers />
      <LearnPreview />
    </main>
  );
}
