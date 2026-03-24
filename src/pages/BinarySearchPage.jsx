import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

import CourseSectionTabs from "../components/course/CourseSectionTabs";
import SectionContent    from "../components/course/SectionContent";
import Footer            from "../components/layout/Footer";

import BinarySearchVizTab        from "./tabs/BinarySearchVizTab";
import BinarySearchCodeTab       from "./tabs/BinarySearchCodeTab";
import BinarySearchQuizTab       from "./tabs/BinarySearchQuizTab";
import BinarySearchComplexityTab from "./tabs/BinarySearchComplexityTab";
import ExerciseTab               from "./tabs/ExerciseTab";

import { useBinarySearchAnimation } from "../hooks/useBinarySearchAnimation";
import { BINARY_SEARCH_SECTIONS }   from "../data/binarySearchSections";
import { BINARY_SEARCH_EXERCISES }  from "../data/binarySearchExercises";
import { useLang } from "../i18n/LangContext";

export default function BinarySearchPage({ activeTab, onTabChange }) {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("principe");

  const {
    currentArray, setCurrentArray,
    target, setTarget,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo, usePreset,
  } = useBinarySearchAnimation();

  const headerRef     = useRef(null);
  const tabContentRef = useRef(null);
  const splitRef      = useRef(null);

  /* ─ Entrée de page ─────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".bs-header h1", { type: "words" });
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

      tl.from(".bs-header p", {
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
      <div className="bs-header mb-8" ref={headerRef}>
        <h1 className="font-serif text-[36px] font-bold tracking-[-1px] mb-2 will-change-[transform,opacity]">
          {t("binarysearch.title")}
        </h1>
        <p className="text-sec text-[15px] will-change-[transform,opacity]">
          {t("binarysearch.subtitle")}
        </p>
      </div>

      <CourseSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={BINARY_SEARCH_SECTIONS[lang]}
      />
      <SectionContent
        activeSection={activeSection}
        sections={BINARY_SEARCH_SECTIONS[lang]}
      />

      <div ref={tabContentRef}>
        {activeTab === "viz" && (
          <BinarySearchVizTab
            currentArray={currentArray}
            target={target}
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
            onTargetChange={setTarget}
          />
        )}

        {activeTab === "code"       && <BinarySearchCodeTab />}
        {activeTab === "quiz"       && <BinarySearchQuizTab />}
        {activeTab === "exercise"   && <ExerciseTab exercises={BINARY_SEARCH_EXERCISES[lang]} />}
        {activeTab === "complexity" && <BinarySearchComplexityTab />}
      </div>

      <Footer />
    </div>
  );
}
