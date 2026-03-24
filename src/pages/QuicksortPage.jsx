import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

import CourseSectionTabs from "../components/course/CourseSectionTabs";
import SectionContent    from "../components/course/SectionContent";
import Footer            from "../components/layout/Footer";

import QuicksortVizTab        from "./tabs/QuicksortVizTab";
import QuicksortCodeTab       from "./tabs/QuicksortCodeTab";
import QuicksortQuizTab       from "./tabs/QuicksortQuizTab";
import QuicksortComplexityTab from "./tabs/QuicksortComplexityTab";
import ExerciseTab            from "./tabs/ExerciseTab";

import { useQuicksortAnimation } from "../hooks/useQuicksortAnimation";
import { QUICKSORT_SECTIONS }    from "../data/quicksortSections";
import { QUICKSORT_EXERCISES }   from "../data/quicksortExercises";
import { useLang } from "../i18n/LangContext";

export default function QuicksortPage({ activeTab, onTabChange }) {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("diviser");

  const {
    currentArray, setCurrentArray,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo, usePreset,
  } = useQuicksortAnimation();

  const headerRef     = useRef(null);
  const tabContentRef = useRef(null);
  const splitRef      = useRef(null);

  /* ─ Entrée de page ─────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".qs-header h1", { type: "words" });
      splitRef.current = split;

      tl.from(split.words, {
        opacity:         0,
        y:               20,
        rotationX:       -40,
        transformOrigin: "50% 50% -20px",
        stagger:         0.06,
        duration:        0.5,
        ease:            "back.out(1.3)",
        clearProps:      "transform,opacity",
      });

      tl.from(".qs-header p", {
        opacity:    0,
        y:          14,
        duration:   0.4,
        clearProps: "transform,opacity",
      }, "-=0.25");
    });

    return () => {
      if (splitRef.current) splitRef.current.revert();
      ctx.revert();
    };
  }, []);

  /* ─ Transition d'onglet ─────────────────────────────── */
  useEffect(() => {
    if (!tabContentRef.current) return;
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, [activeTab]);

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      {/* Header */}
      <div className="qs-header mb-8" ref={headerRef}>
        <h1 className="font-serif text-[36px] font-bold tracking-[-1px] mb-2 will-change-[transform,opacity]">
          {t("quicksort.title")}
        </h1>
        <p className="text-sec text-[15px] will-change-[transform,opacity]">
          {t("quicksort.subtitle")}
        </p>
      </div>

      <CourseSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={QUICKSORT_SECTIONS[lang]}
      />
      <SectionContent
        activeSection={activeSection}
        sections={QUICKSORT_SECTIONS[lang]}
      />

      <div ref={tabContentRef}>
        {activeTab === "viz" && (
          <QuicksortVizTab
            currentArray={currentArray}
            currentStep={currentStep}
            steps={steps}
            stepIdx={stepIdx}
            isPlaying={isPlaying}
            speed={speed}
            onPlay={play}
            onPause={pause}
            onPrev={goPrev}
            onNext={goNext}
            onFirst={goFirst}
            onLast={goLast}
            onSpeedChange={setSpeed}
            onStepClick={goTo}
            onPreset={usePreset}
            onCustomArray={setCurrentArray}
          />
        )}

        {activeTab === "code"       && <QuicksortCodeTab />}
        {activeTab === "quiz"       && <QuicksortQuizTab />}
        {activeTab === "exercise"   && <ExerciseTab exercises={QUICKSORT_EXERCISES[lang]} />}
        {activeTab === "complexity" && <QuicksortComplexityTab />}
      </div>

      <Footer />
    </div>
  );
}
