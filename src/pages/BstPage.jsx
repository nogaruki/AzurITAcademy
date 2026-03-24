import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

import CourseSectionTabs from "../components/course/CourseSectionTabs";
import SectionContent    from "../components/course/SectionContent";
import Footer            from "../components/layout/Footer";

import BstVizTab        from "./tabs/BstVizTab";
import BstCodeTab       from "./tabs/BstCodeTab";
import BstQuizTab       from "./tabs/BstQuizTab";
import BstComplexityTab from "./tabs/BstComplexityTab";
import ExerciseTab      from "./tabs/ExerciseTab";

import { useBstAnimation } from "../hooks/useBstAnimation";
import { BST_SECTIONS }    from "../data/bstSections";
import { BST_EXERCISES }   from "../data/bstExercises";
import { useLang } from "../i18n/LangContext";

export default function BstPage({ activeTab, onTabChange }) {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("intro");

  const {
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    operation, setOperation,
    inputVal, setInputVal,
    error,
    play, pause, goFirst, goLast, goPrev, goNext, goTo,
    runOperation, resetTree,
  } = useBstAnimation();

  const headerRef     = useRef(null);
  const tabContentRef = useRef(null);
  const splitRef      = useRef(null);

  /* ─ Entrée de page ─────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".bst-header h1", { type: "words" });
      splitRef.current = split;

      tl.from(split.words, {
        opacity: 0, y: 20, rotationX: -40,
        transformOrigin: "50% 50% -20px",
        stagger: 0.06, duration: 0.5,
        ease: "back.out(1.3)", clearProps: "transform,opacity",
      });

      tl.from(".bst-header p", {
        opacity: 0, y: 14, duration: 0.4, clearProps: "transform,opacity",
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
      <div className="bst-header mb-8" ref={headerRef}>
        <h1 className="font-serif text-[36px] font-bold tracking-[-1px] mb-2 will-change-[transform,opacity]">
          {t("bst.title")}
        </h1>
        <p className="text-sec text-[15px] will-change-[transform,opacity]">
          {t("bst.subtitle")}
        </p>
      </div>

      <CourseSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={BST_SECTIONS[lang]}
      />
      <SectionContent
        activeSection={activeSection}
        sections={BST_SECTIONS[lang]}
      />

      <div ref={tabContentRef}>
        {activeTab === "viz" && (
          <BstVizTab
            currentStep={currentStep}
            steps={steps}
            stepIdx={stepIdx}
            isPlaying={isPlaying}
            speed={speed}
            operation={operation}
            setOperation={setOperation}
            inputVal={inputVal}
            setInputVal={setInputVal}
            error={error}
            onPlay={play}
            onPause={pause}
            onPrev={goPrev}
            onNext={goNext}
            onFirst={goFirst}
            onLast={goLast}
            onSpeedChange={setSpeed}
            onStepClick={goTo}
            onRun={runOperation}
            onReset={resetTree}
          />
        )}

        {activeTab === "code"       && <BstCodeTab />}
        {activeTab === "quiz"       && <BstQuizTab />}
        {activeTab === "exercise"   && <ExerciseTab exercises={BST_EXERCISES[lang]} />}
        {activeTab === "complexity" && <BstComplexityTab />}
      </div>

      <Footer />
    </div>
  );
}
