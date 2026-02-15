import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Slide1_Narrative from './components/Slide1_Narrative';
import Slide_Thesis from './components/Slide_Thesis';
import Slide_SLM from './components/Slide_SLM';
import Slide2_Alignment from './components/Slide2_Alignment';
import Slide3_Paradox from './components/Slide3_Paradox';
import Slide4_Governance from './components/Slide4_Governance';
import Slide5_Orchestrator from './components/Slide5_Orchestrator';
import Slide6_Summary from './components/Slide6_Summary';
import CapgeminiLogo from './assets/capgemini_logo_white.svg';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const totalSlides = 8;

  const handleScrollUp = () => {
    const prevSlideIndex = currentSlide - 1;
    if (prevSlideIndex >= 0 && containerRef.current) {
      containerRef.current.scrollTo({
        top: prevSlideIndex * window.innerHeight,
        behavior: 'smooth'
      });
      setCurrentSlide(prevSlideIndex);
    }
  };

  const handleScroll = () => {
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex < totalSlides && containerRef.current) {
      containerRef.current.scrollTo({
        top: nextSlideIndex * window.innerHeight,
        behavior: 'smooth'
      });
      setCurrentSlide(nextSlideIndex);
    }
  };

  // Track scroll position of the container
  useEffect(() => {
    const handleContainerScroll = () => {
      if (containerRef.current) {
        const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
        setCurrentSlide(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleContainerScroll);
    }

    // Listen for custom navigation event from Slide_Thesis
    const handleCustomNav = () => {
      handleScroll();
    };
    window.addEventListener('navigateNext', handleCustomNav);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleContainerScroll);
      }
      window.removeEventListener('navigateNext', handleCustomNav);
    };
  }, [currentSlide]); // Add currentSlide dependency to ensure handleScroll has fresh state if called directly, though event listener might trap closure.
  // Actually, handleScroll uses currentSlide state. The event listener 'navigateNext' calls handleScroll.
  // If we bind handleScroll in useEffect, it might catch stale state.
  // Better way for custom event: logic inside the effect or ref.
  // Let's refine the custom event handler to simply scroll container based on current scrollTop.

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* CAPGEMINI LOGO - Fixed Top Right */}
      <div className="fixed top-6 right-8 z-50">
        <img src={CapgeminiLogo} alt="Capgemini" className="h-8 w-auto" />
      </div>

      {/* PREV SLIDE BUTTON - Fixed Top Center */}
      {currentSlide > 0 && (
        <button
          onClick={handleScrollUp}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white shadow-lg cursor-pointer border border-white/10"
          aria-label="Previous Slide"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* NEXT SLIDE BUTTON - Fixed Bottom Center */}
      {currentSlide < (totalSlides - 1) && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-centered">
          <button
            onClick={handleScroll}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all text-white shadow-lg cursor-pointer border border-white/10"
            aria-label="Next Slide"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      )}

      {/* MAIN CONTENT SCROLL CONTAINER */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory bg-background text-text-primary scroll-smooth no-scrollbar"
      >
        <Slide1_Narrative isActive={currentSlide === 0} onNext={handleScroll} />
        <Slide_Thesis />
        <Slide_SLM />
        <Slide2_Alignment isActive={currentSlide === 3} />
        <Slide3_Paradox />
        <Slide4_Governance />
        <Slide5_Orchestrator />
        <Slide6_Summary />
      </div>
    </div>
  );
}

export default App;
