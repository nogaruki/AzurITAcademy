import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

import CourseSectionTabs from "../components/course/CourseSectionTabs";
import SectionContent    from "../components/course/SectionContent";
import Footer            from "../components/layout/Footer";

import MergesortVizTab        from "./tabs/MergesortVizTab";
import MergesortCodeTab       from "./tabs/MergesortCodeTab";
import MergesortQuizTab       from "./tabs/MergesortQuizTab";
import MergesortComplexityTab from "./tabs/MergesortComplexityTab";
import ExerciseTab            from "./tabs/ExerciseTab";

import { useMergesortAnimation } from "../hooks/useMergesortAnimation";
import { MERGESORT_SECTIONS }    from "../data/mergesortSections";
import { MERGESORT_EXERCISES }   from "../data/mergesortExercises";
import { useLang } from "../i18n/LangContext";

export default function MergesortPage({ activeTab, onTabChange }) {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("diviser");

  const {
    currentArray, setCurrentArray,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo, usePreset,
  } = useMergesortAnimation();

  const headerRef     = useRef(null);
  const tabContentRef = useRef(null);
  const splitRef      = useRef(null);

  /* ─ Entrée de page ─────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".ms-header h1", { type: "words" });
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

      tl.from(".ms-header p", {
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
      <div className="ms-header mb-8" ref={headerRef}>
        <h1 className="font-serif text-[36px] font-bold tracking-[-1px] mb-2 will-change-[transform,opacity]">
          {t("mergesort.title")}
        </h1>
        <p className="text-sec text-[15px] will-change-[transform,opacity]">
          {t("mergesort.subtitle")}
        </p>
      </div>

      <CourseSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={MERGESORT_SECTIONS[lang]}
      />
      <SectionContent
        activeSection={activeSection}
        sections={MERGESORT_SECTIONS[lang]}
      />

      <div ref={tabContentRef}>
        {activeTab === "viz" && (
          <MergesortVizTab
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

        {activeTab === "code"       && <MergesortCodeTab />}
        {activeTab === "quiz"       && <MergesortQuizTab />}
        {activeTab === "exercise"   && <ExerciseTab exercises={MERGESORT_EXERCISES[lang]} />}
        {activeTab === "complexity" && <MergesortComplexityTab />}
      </div>

      <Footer />
    </div>
  );
}
