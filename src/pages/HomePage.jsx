import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap }      from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../i18n/LangContext";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HomePage({ onStartCourse, onStartQuicksort, onStartMergesort, onStartBst, onStartBinarySearch, onStartComplexity, onStartBfsDfs }) {
  const { t } = useLang();

  const LOCKED_COURSES = [];

  const scope    = useRef(null);
  const splitRef = useRef(null);

  /* ─ Animations d'entrée ─────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Badge */
      tl.from(".hero-badge", { opacity: 0, y: -14, duration: 0.45 });

      /* Titre ligne 1 — SplitText mot par mot */
      const split = new SplitText(".hero-line1", { type: "words" });
      splitRef.current = split;

      tl.from(
        split.words,
        {
          opacity:         0,
          y:               22,
          rotationX:       -50,
          transformOrigin: "50% 50% -30px",
          stagger:         0.07,
          duration:        0.55,
          ease:            "back.out(1.4)",
          clearProps:      "transform,opacity",
        },
        "-=0.15"
      );

      /* Titre ligne 2 — "visuellement." en bloc (préserve le gradient) */
      tl.from(
        ".hero-line2",
        { opacity: 0, y: 22, duration: 0.45, ease: "back.out(1.4)", clearProps: "transform,opacity" },
        "-=0.3"
      );

      /* Sous-titre */
      tl.from(".hero p", { opacity: 0, y: 16, duration: 0.45, clearProps: "transform,opacity" }, "-=0.3");

      /* Cards en stagger */
      tl.from(
        ".course-card",
        {
          opacity:    0,
          y:          36,
          scale:      0.95,
          duration:   0.55,
          stagger:    0.07,
          ease:       "power3.out",
          clearProps: "transform,opacity",
        },
        "-=0.15"
      );
    }, scope);

    return () => {
      if (splitRef.current) splitRef.current.revert();
      ctx.revert();
    };
  }, []);

  /* ─ Hover lift sur toutes les cartes actives ─────────── */
  useEffect(() => {
    const cards = scope.current?.querySelectorAll(".course-card:not(.card-locked)");
    if (!cards || cards.length === 0) return;

    const cleanups = [];
    cards.forEach((card) => {
      const onEnter = () => gsap.to(card, { y: -7, duration: 0.25, ease: "power2.out" });
      const onLeave = () => gsap.to(card, { y: 0,  duration: 0.5,  ease: "elastic.out(1, 0.5)" });
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div ref={scope} className="hero pt-[60px] pb-[80px] px-6 max-w-[1100px] mx-auto">
      {/* Hero */}
      <div className="hero text-center mb-16 relative">
        <div className="hero-badge inline-flex items-center gap-[6px] px-[14px] py-[6px] border border-line rounded-[20px] text-[12px] font-medium text-sec mb-6 bg-card will-change-[transform,opacity]">
          <span className="w-[6px] h-[6px] bg-c-green rounded-full animate-pulse-slow flex-shrink-0"></span>
          {t("home.badge")}
        </div>
        <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] mb-5 tracking-[-2px]">
          <span className="block hero-line1 will-change-[transform,opacity]">{t("home.hero1")}</span>
          <em className="gradient-text block hero-line2 will-change-[transform,opacity]">{t("home.hero2")}</em>
        </h1>
        <p className="text-[18px] text-sec max-w-[540px] mx-auto leading-[1.6] will-change-[transform,opacity]">
          {t("home.heroSub")}
        </p>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
        {/* Dijkstra — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartCourse}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-accent-dim text-accent-hi">
            {t("home.dijkstra.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.dijkstra.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.dijkstra.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~30 min</span>
            <span className="flex items-center gap-1">📊 O((V+E) log V)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* Quicksort — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartQuicksort}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-c-green-dim text-c-green">
            {t("home.quicksort.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.quicksort.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.quicksort.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~25 min</span>
            <span className="flex items-center gap-1">📊 O(n log n)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* Mergesort — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartMergesort}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-c-green-dim text-c-green">
            {t("home.mergesort.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.mergesort.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.mergesort.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~25 min</span>
            <span className="flex items-center gap-1">📊 O(n log n)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* ABR — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartBst}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-c-red-dim text-c-red">
            {t("home.bst.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.bst.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.bst.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~25 min</span>
            <span className="flex items-center gap-1">📊 O(log n)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* Recherche Binaire — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartBinarySearch}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-c-orange-dim text-c-orange">
            {t("home.binarysearch.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.binarysearch.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.binarysearch.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~20 min</span>
            <span className="flex items-center gap-1">📊 O(log n)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* Complexité algorithmique — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartComplexity}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-c-cyan-dim text-c-cyan">
            {t("home.complexity.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.complexity.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.complexity.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~20 min</span>
            <span className="flex items-center gap-1">📐 Big O</span>
            <span className="flex items-center gap-1">🏷 6 classes</span>
          </div>
        </div>

        {/* BFS & DFS — active */}
        <div
          className="course-card bg-card border border-line rounded-[16px] p-7 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] will-change-[transform,opacity] hover:border-line-on hover:bg-card-hov"
          onClick={onStartBfsDfs}
        >
          <div className="inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] bg-accent-dim text-accent-hi">
            {t("home.bfsdfs.cat")}
          </div>
          <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{t("home.bfsdfs.title")}</h3>
          <p className="text-[14px] text-sec leading-[1.5] mb-4">
            {t("home.bfsdfs.desc")}
          </p>
          <div className="flex gap-4 text-[12px] text-mut">
            <span className="flex items-center gap-1">⏱ ~25 min</span>
            <span className="flex items-center gap-1">📊 O(V + E)</span>
            <span className="flex items-center gap-1">🏷 7 sections</span>
          </div>
        </div>

        {/* Locked cards */}
        {LOCKED_COURSES.map((c, i) => (
          <div
            key={i}
            className="course-card card-locked bg-card border border-line rounded-[16px] p-7 relative overflow-hidden opacity-45 pointer-events-none will-change-[transform,opacity]"
          >
            <div className={`inline-block text-[11px] font-semibold uppercase tracking-[1px] px-[10px] py-1 rounded-[6px] mb-[14px] ${c.tag}`}>
              {c.cat}
            </div>
            <h3 className="text-[20px] font-bold mb-2 tracking-[-0.3px]">{c.title}</h3>
            <p className="text-[14px] text-sec leading-[1.5] mb-4">{c.desc}</p>
            <div className="flex gap-4 text-[12px] text-mut">
              <span className="flex items-center gap-1">⏱ ~25 min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
