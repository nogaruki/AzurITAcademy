import { useState, useEffect, useRef } from "react";
import { bstTrace, buildInitialTree } from "../utils/bstTrace";

/**
 * Gère toute la logique d'animation pour l'Arbre Binaire de Recherche :
 * arbre courant, opération sélectionnée, étapes, playback, vitesse.
 */
export function useBstAnimation() {
  const [tree,      setTree]      = useState(() => buildInitialTree());
  const [steps,     setSteps]     = useState(() => [{
    type: "init",
    desc: "Arbre prêt. Choisissez une opération et entrez une valeur.",
    tree: buildInitialTree(),
    currentNode: null, path: [], foundNode: null, successorNode: null, newNode: null,
  }]);
  const [stepIdx,   setStepIdx]   = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed,     setSpeed]     = useState(900);

  const [operation, setOperation] = useState("search");
  const [inputVal,  setInputVal]  = useState("");
  const [error,     setError]     = useState("");

  const intervalRef = useRef(null);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  function runOperation() {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) { setError("Entrez un nombre entier valide."); return; }
    if (val < 1 || val > 999) { setError("Valeur entre 1 et 999."); return; }
    setError("");

    const { steps: newSteps, resultTree } = bstTrace(tree, operation, val);

    // Pour insert/delete, mettre à jour l'arbre persistant immédiatement
    if (operation !== "search") setTree(resultTree);

    setSteps(newSteps);
    setStepIdx(0);
    setIsPlaying(false);
  }

  function resetTree() {
    const initial = buildInitialTree();
    setTree(initial);
    setSteps([{
      type: "init",
      desc: "Arbre réinitialisé à [50, 30, 70, 20, 40, 60, 80].",
      tree: initial,
      currentNode: null, path: [], foundNode: null, successorNode: null, newNode: null,
    }]);
    setStepIdx(0);
    setIsPlaying(false);
    setError("");
  }

  function play()   { if (stepIdx >= steps.length - 1) setStepIdx(0); setIsPlaying(true); }
  function pause()  { setIsPlaying(false); }
  function goFirst(){ setStepIdx(0);                                        setIsPlaying(false); }
  function goLast() { setStepIdx(steps.length - 1);                        setIsPlaying(false); }
  function goPrev() { setStepIdx((p) => Math.max(0, p - 1));               setIsPlaying(false); }
  function goNext() { setStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }
  function goTo(i)  { setStepIdx(i);                                        setIsPlaying(false); }

  const currentStep = steps[stepIdx] || null;

  return {
    tree,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    operation, setOperation,
    inputVal, setInputVal,
    error,
    play, pause, goFirst, goLast, goPrev, goNext, goTo,
    runOperation, resetTree,
  };
}
