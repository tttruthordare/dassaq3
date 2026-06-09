import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { TopUniversities } from '@/sections/TopUniversities';
import { Statistics } from '@/sections/Statistics';
import { AdmissionRequirements } from '@/sections/AdmissionRequirements';
import { UniversityTypes } from '@/sections/UniversityTypes';
import { Programs } from '@/sections/Programs';
import { TuitionFees } from '@/sections/TuitionFees';
import { StudentLife } from '@/sections/StudentLife';
import { FAQ } from '@/sections/FAQ';
import { CTASection } from '@/sections/CTASection';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <TopUniversities />
        <Statistics />
        <AdmissionRequirements />
        <UniversityTypes />
        <Programs />
        <TuitionFees />
        <StudentLife />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
