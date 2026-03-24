import { useState, useEffect } from "react";
import { LangProvider, useLang } from "./i18n/LangContext";
import TopNav        from "./components/layout/TopNav";
import HomePage      from "./pages/HomePage";
import CoursePage    from "./pages/CoursePage";
import QuicksortPage from "./pages/QuicksortPage";
import MergesortPage from "./pages/MergesortPage";
import BstPage              from "./pages/BstPage";
import BinarySearchPage    from "./pages/BinarySearchPage";
import ComplexityGuidePage from "./pages/ComplexityGuidePage";
import BfsDfsPage          from "./pages/BfsDfsPage";

function AppInner() {
  const { t } = useLang();
  const [page,      setPage]      = useState("home");
  const [activeTab, setActiveTab] = useState("viz");

  // Thème initialisé depuis localStorage (ou préférence système)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("azurit-academy-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  // Applique data-theme sur <html> à chaque changement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("azurit-academy-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const ALGO_PAGES = ["quicksort", "bst", "mergesort", "binarysearch", "bfsdfs"];

  const SECONDARY_TABS = [
    ["viz",        t("nav.viz")],
    ["code",       t("nav.code")],
    ["quiz",       t("nav.quiz")],
    ["exercise",   t("nav.exercise")],
    ["complexity", t("nav.complexity")],
  ];

  return (
    <div className="min-h-screen">
      <TopNav
        onHome={() => { setPage("home"); setActiveTab("viz"); }}
        showTabs={page === "course" || ALGO_PAGES.includes(page)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={ALGO_PAGES.includes(page) ? SECONDARY_TABS : undefined}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      {page === "home" && (
        <HomePage
          onStartCourse={() => { setPage("course");               setActiveTab("viz"); }}
          onStartQuicksort={() => { setPage("quicksort");         setActiveTab("viz"); }}
          onStartMergesort={() => { setPage("mergesort");         setActiveTab("viz"); }}
          onStartBst={() => { setPage("bst");                     setActiveTab("viz"); }}
          onStartBinarySearch={() => { setPage("binarysearch");   setActiveTab("viz"); }}
          onStartComplexity={() => setPage("complexity-guide")}
          onStartBfsDfs={() => { setPage("bfsdfs"); setActiveTab("viz"); }}
        />
      )}
      {page === "course"    && <CoursePage    activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "quicksort" && <QuicksortPage activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "mergesort" && <MergesortPage activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "bst"          && <BstPage          activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "binarysearch" && <BinarySearchPage activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "bfsdfs"       && <BfsDfsPage       activeTab={activeTab} onTabChange={setActiveTab} />}
      {page === "complexity-guide" && <ComplexityGuidePage />}
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
