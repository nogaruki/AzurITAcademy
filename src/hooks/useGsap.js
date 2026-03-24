/**
 * useGsap — Hook React encapsulant la logique GSAP.
 *
 * Utilise useLayoutEffect + gsap.context() pour :
 *  - exécuter les animations après le rendu DOM (évite les flash)
 *  - scoper les sélecteurs CSS au conteneur ref (évite les conflits)
 *  - reverter automatiquement toutes les animations au démontage
 *
 * @example
 * const { scope } = useGsap((ctx) => {
 *   gsap.from(".card", { opacity: 0, y: 20 });
 * }, []);
 * return <div ref={scope}>...</div>;
 */

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * @param {(context: gsap.Context) => void} fn  - Fonction définissant les animations GSAP
 * @param {Array}                           deps - Dépendances React (re-run si elles changent)
 * @returns {{ scope: React.RefObject<HTMLElement> }}
 */
export function useGsap(fn, deps = []) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    // gsap.context() scope les sélecteurs CSS à `scope.current`
    // et enregistre toutes les animations pour un cleanup propre
    const ctx = gsap.context(() => fn(ctx), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { scope };
}
