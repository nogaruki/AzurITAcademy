import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

import CourseSectionTabs from "../components/course/CourseSectionTabs";
import SectionContent    from "../components/course/SectionContent";
import Footer            from "../components/layout/Footer";

import BfsDfsVizTab        from "./tabs/BfsDfsVizTab";
import BfsDfsCodeTab       from "./tabs/BfsDfsCodeTab";
import BfsDfsQuizTab       from "./tabs/BfsDfsQuizTab";
import BfsDfsComplexityTab from "./tabs/BfsDfsComplexityTab";
import ExerciseTab         from "./tabs/ExerciseTab";

import { useBfsDfsAnimation } from "../hooks/useBfsDfsAnimation";
import { BFS_DFS_SECTIONS }   from "../data/bfsDfsSections";
import { BFS_DFS_EXERCISES }  from "../data/bfsDfsExercises";
import { useLang }            from "../i18n/LangContext";

export default function BfsDfsPage({ activeTab, onTabChange }) {
  const { t, lang } = useLang();
  const [activeSection, setActiveSection] = useState("intro");

  const {
    algo, setAlgo,
    currentGraph, setCurrentGraph,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo, usePreset,
  } = useBfsDfsAnimation();

  const tabContentRef = useRef(null);
  const splitRef      = useRef(null);

  /* ─ Entrée de page ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const split = new SplitText(".bfsdfs-header h1", { type: "words" });
      splitRef.current = split;

      tl.from(split.words, {
        opacity: 0, y: 20, rotationX: -40,
        transformOrigin: "50% 50% -20px",
        stagger: 0.06, duration: 0.5,
        ease: "back.out(1.3)", clearProps: "transform,opacity",
      });

      tl.from(".bfsdfs-header p", {
        opacity: 0, y: 14, duration: 0.4, clearProps: "transform,opacity",
      }, "-=0.25");
    });

    return () => {
      if (splitRef.current) splitRef.current.revert();
      ctx.revert();
    };
  }, []);

  /* ─ Transition d'onglet ── */
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
      <div className="bfsdfs-header mb-8">
        <h1 className="font-serif text-[36px] font-bold tracking-[-1px] mb-2 will-change-[transform,opacity]">
          {t("bfsdfs.title")}
        </h1>
        <p className="text-sec text-[15px] will-change-[transform,opacity]">
          {t("bfsdfs.subtitle")}
        </p>
      </div>

      <CourseSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sections={BFS_DFS_SECTIONS[lang]}
      />
      <SectionContent activeSection={activeSection} sections={BFS_DFS_SECTIONS[lang]} />

      <div ref={tabContentRef}>
        {activeTab === "viz" && (
          <BfsDfsVizTab
            algo={algo}
            onAlgoChange={setAlgo}
            currentGraph={currentGraph}
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
          />
        )}
        {activeTab === "code"       && <BfsDfsCodeTab />}
        {activeTab === "quiz"       && <BfsDfsQuizTab />}
        {activeTab === "exercise"   && <ExerciseTab exercises={BFS_DFS_EXERCISES[lang]} />}
        {activeTab === "complexity" && <BfsDfsComplexityTab />}
      </div>

      <Footer />
    </div>
  );
}
