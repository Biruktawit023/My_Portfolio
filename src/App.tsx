import React, { Suspense, useState } from 'react';
import { CursorGlow } from './components/CursorGlow';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundDecor } from './components/BackgroundDecor';
import { SectionDivider } from './components/SectionDivider';
import HeroSection from './sections/HeroSection';

const AboutSection = React.lazy(() =>
  import('./sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = React.lazy(() =>
  import('./sections/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const ToolsSection = React.lazy(() =>
  import('./sections/ToolsSection').then((m) => ({ default: m.ToolsSection }))
);
const ProjectsSection = React.lazy(() =>
  import('./sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const CertificationsSection = React.lazy(() =>
  import('./sections/CertificationsSection').then((m) => ({ default: m.CertificationsSection }))
);

const LazyFallback = (
  <div style={{ minHeight: '400px', background: '#0A0A14' }} />
);

function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <>
      {/* Fixed background layer */}
      <BackgroundDecor />
      <CursorGlow />

      {/* Page content above background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main id="main-content">
          <HeroSection />

          <Suspense fallback={LazyFallback}>
            <SectionDivider />
            <AboutSection />

            <SectionDivider />
            <SkillsSection />

            <SectionDivider />
            <ToolsSection />

            <SectionDivider />
            <ProjectsSection />

            <SectionDivider />
            <CertificationsSection />
          </Suspense>
        </main>
        <SectionDivider />
        <Footer />
      </div>
    </>
  );
}

export default App;
