import { createContext, useContext, useState } from "react";
import { fr } from "./fr";
import { en } from "./en";

const translations = { fr, en };
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("azurit-academy-lang");
    return saved === "en" ? "en" : "fr";
  });

  function setLang(l) {
    localStorage.setItem("azurit-academy-lang", l);
    setLangState(l);
  }

  function t(key) {
    return translations[lang]?.[key] ?? translations.fr[key] ?? key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
