import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLang } from "../../i18n/LangContext";

export default function TopNav({ onHome, showTabs, activeTab, onTabChange, theme, onThemeToggle, tabs }) {
  const { lang, setLang, t } = useLang();

  const defaultTabs = [
    ["viz",         t("nav.viz")],
    ["code",        t("nav.code")],
    ["interactive", t("nav.interactive")],
    ["quiz",        t("nav.quiz")],
    ["exercise",    t("nav.exercise")],
    ["complexity",  t("nav.complexity")],
  ];

  const resolvedTabs = tabs ?? defaultTabs;

  const navRef   = useRef(null);
  const tabsRef  = useRef(null);
  const thumbRef = useRef(null);

  /* ─ Entrée initiale : slide depuis le haut ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        yPercent:   -100,
        duration:   0.8,
        ease:       "power3.out",
        clearProps: "transform",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* ─ Apparition des onglets quand showTabs passe à true ── */
  useLayoutEffect(() => {
    if (!showTabs || !tabsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(tabsRef.current.querySelectorAll(".topnav-tab"), {
        opacity:    0,
        y:          -8,
        stagger:    0.05,
        duration:   0.35,
        ease:       "power2.out",
        clearProps: "transform,opacity",
      });
    }, tabsRef);
    return () => ctx.revert();
  }, [showTabs]);

  /* ─ Position initiale du thumb (sans animation) ── */
  useLayoutEffect(() => {
    if (!thumbRef.current) return;
    gsap.set(thumbRef.current, { x: theme === "dark" ? 0 : 24 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─ Animation du thumb au changement de thème ── */
  useEffect(() => {
    if (!thumbRef.current) return;
    const isDark  = theme === "dark";
    const targetX = isDark ? 0 : 24;

    gsap.to(thumbRef.current, {
      x:        targetX,
      duration: 0.4,
      ease:     "back.out(1.8)",
    });

    gsap.fromTo(
      thumbRef.current,
      { rotate: isDark ? 30 : -30, scale: 0.7 },
      { rotate: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }
    );
  }, [theme]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-[100] backdrop-blur-[20px] border-b border-line px-6 h-14 flex items-center justify-between transition-colors duration-[350ms] will-change-[transform,opacity]"
      style={{ background: "var(--bg-nav)" }}
    >
      {/* Logo */}
      <div
        className="font-mono font-bold text-[18px] tracking-[-0.5px] text-accent flex items-center gap-2 cursor-pointer"
        onClick={onHome}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="gradient-text">AzurIT Academy</span>
      </div>

      {/* Onglets centraux */}
      {showTabs && (
        <div className="flex gap-1" ref={tabsRef}>
          {resolvedTabs.map(([id, label]) => (
            <button
              key={id}
              className={`topnav-tab px-4 py-1.5 text-[13px] font-medium border rounded-lg cursor-pointer transition-all duration-200 will-change-[transform,opacity] ${
                activeTab === id
                  ? "text-accent bg-accent-dim border-accent"
                  : "text-sec bg-transparent border-transparent hover:text-pri hover:bg-card"
              }`}
              onClick={() => onTabChange(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Right side: language selector + theme switch */}
      <div className="flex items-center gap-0">
        {/* Language selector */}
        <div className="flex gap-1 mr-2">
          {["fr", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 text-[11px] font-mono font-bold rounded-[6px] border transition-all duration-200 cursor-pointer uppercase ${
                lang === l
                  ? "text-accent bg-accent-dim border-accent"
                  : "text-mut border-transparent hover:text-sec hover:border-line"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Theme switch */}
        <button
          className="theme-switch flex items-center justify-between w-[52px] h-[28px] px-[5px] py-[4px] rounded-[14px] border border-line bg-surface cursor-pointer flex-shrink-0 transition-colors duration-300 relative hover:border-accent"
          onClick={onThemeToggle}
          aria-label={theme === "dark" ? t("nav.theme.toLight") : t("nav.theme.toDark")}
          title={theme === "dark" ? t("nav.theme.light") : t("nav.theme.dark")}
        >
          <span className="flex items-center justify-between w-full px-[2px] text-[10px] pointer-events-none select-none relative z-10 text-mut">
            <span>🌙</span>
            <span>☀️</span>
          </span>
          <span
            className="theme-switch-thumb absolute top-[3px] left-[4px] w-[20px] h-[20px] rounded-full bg-card border border-line flex items-center justify-center text-[11px] transition-colors duration-300 shadow-[0_1px_4px_#0004]"
            style={{ willChange: "transform" }}
            ref={thumbRef}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>
      </div>
    </nav>
  );
}
