/**
 * animations.js — Bibliothèque d'animations GSAP centralisées pour AzurIT Academy.
 * Toutes les fonctions retournent des timelines ou tweens GSAP réutilisables.
 * Enregistrement des plugins effectué une seule fois ici.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText }    from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/* ─── Page / section entrances ─────────────────────────────────────────── */

/**
 * Anime la barre de navigation depuis le haut.
 * @param {Element} element
 */
export function navEnter(element) {
  return gsap.from(element, {
    yPercent:   -100,
    duration:   0.8,
    ease:       "power3.out",
    clearProps: "transform",
  });
}

/**
 * Fade-in + slide-up générique.
 * @param {Element|Element[]} elements
 * @param {object} options
 */
export function fadeUp(elements, options = {}) {
  return gsap.from(elements, {
    opacity:    0,
    y:          28,
    duration:   0.55,
    ease:       "power3.out",
    clearProps: "transform,opacity",
    ...options,
  });
}

/**
 * Stagger d'éléments avec fade + scale.
 * @param {Element[]|NodeList} elements
 * @param {object} options
 */
export function staggerIn(elements, options = {}) {
  return gsap.from(elements, {
    opacity:    0,
    y:          32,
    scale:      0.96,
    duration:   0.5,
    stagger:    options.stagger ?? 0.08,
    ease:       "power3.out",
    clearProps: "transform,opacity",
    ...options,
  });
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */

/**
 * Animation complète du hero : badge → h1 (SplitText) → paragraphe.
 * @param {Element} container - Élément .hero
 * @returns {{ tl: gsap.core.Timeline, split: SplitText }}
 */
export function heroEnter(container) {
  const badge = container.querySelector(".hero-badge");
  const h1    = container.querySelector("h1");
  const p     = container.querySelector("p");

  const split = new SplitText(h1, { type: "words" });

  const tl = gsap.timeline();

  tl.from(badge, { opacity: 0, y: -14, duration: 0.45, ease: "power2.out" })
    .from(
      split.words,
      {
        opacity:         0,
        y:               20,
        rotationX:       -45,
        transformOrigin: "50% 50% -20px",
        stagger:         0.07,
        duration:        0.5,
        ease:            "back.out(1.4)",
      },
      "-=0.1"
    )
    .from(p, { opacity: 0, y: 16, duration: 0.45, ease: "power2.out" }, "-=0.25");

  return { tl, split };
}

/* ─── SplitText ─────────────────────────────────────────────────────────── */

/**
 * Anime un titre lettre par lettre.
 * @param {Element} element
 * @param {object} options
 * @returns {{ tl: gsap.core.Timeline, split: SplitText }}
 */
export function splitTitleAnimate(element, options = {}) {
  const split = new SplitText(element, { type: "words,chars" });
  const tl = gsap.timeline();

  tl.from(split.chars, {
    opacity:         0,
    y:               18,
    rotationX:       -60,
    transformOrigin: "50% 50% -20px",
    stagger:         0.018,
    duration:        0.45,
    ease:            "back.out(1.5)",
    delay:           options.delay ?? 0,
  });

  return { tl, split };
}

/* ─── Navigation / tabs ─────────────────────────────────────────────────── */

/**
 * Transition douce lors du changement d'onglet.
 * @param {Element} element - Conteneur du contenu actif
 */
export function tabTransition(element) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" }
  );
}

/* ─── ScrollTrigger ─────────────────────────────────────────────────────── */

/**
 * Révèle des éléments en stagger au défilement.
 * @param {Element[]|NodeList} elements
 * @param {object} options
 */
export function scrollReveal(elements, options = {}) {
  const trigger = Array.isArray(elements) ? elements[0] : elements[0] ?? elements;
  return gsap.from(elements, {
    opacity:    0,
    y:          40,
    duration:   0.65,
    stagger:    options.stagger ?? 0.1,
    ease:       "power3.out",
    clearProps: "transform,opacity",
    scrollTrigger: {
      trigger,
      start:         "top 88%",
      toggleActions: "play none none none",
      ...options.scrollTrigger,
    },
    ...options,
  });
}

/**
 * Anime les barres d'un graphique de 0 → hauteur cible.
 * @param {Element[]|NodeList} barElements
 */
export function animateBars(barElements) {
  const trigger = barElements[0];
  gsap.set(barElements, { scaleY: 0, transformOrigin: "bottom center" });

  return gsap.to(barElements, {
    scaleY:     1,
    duration:   0.85,
    stagger:    0.1,
    ease:       "power3.out",
    clearProps: "scaleY,transformOrigin",
    scrollTrigger: {
      trigger,
      start:         "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/* ─── Micro-interactions ────────────────────────────────────────────────── */

/**
 * Effet scale au hover sur un bouton ou carte.
 * Retourne une fonction cleanup à appeler dans useEffect.
 * @param {Element} element
 * @param {number}  scale
 * @returns {() => void} cleanup
 */
export function hoverScale(element, scale = 1.05) {
  const onEnter = () =>
    gsap.to(element, { scale, duration: 0.2, ease: "power2.out" });
  const onLeave = () =>
    gsap.to(element, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
}

/**
 * Effet lift (translateY) au hover sur une carte.
 * @param {Element} element
 * @returns {() => void} cleanup
 */
export function cardLift(element) {
  const onEnter = () =>
    gsap.to(element, { y: -6, duration: 0.25, ease: "power2.out" });
  const onLeave = () =>
    gsap.to(element, { y: 0,  duration: 0.45, ease: "elastic.out(1, 0.5)" });

  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
}
