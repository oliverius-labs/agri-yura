import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import TreatmentSection from './components/TreatmentSection';
import BetaSignupSection from './components/BetaSignupSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        {/* <TreatmentSection /> */}
        <BetaSignupSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;