import { useState, useEffect, useRef } from "react";
import { dijkstraTrace } from "../utils/dijkstraTrace";
import { DEFAULT_GRAPH, COMPLEX_GRAPH } from "../data/graphs";

/**
 * Gère toute la logique d'animation Dijkstra :
 * graphe courant, étapes, index, lecture automatique, vitesse.
 */
export function useDijkstraAnimation() {
  const [currentGraph, setCurrentGraph] = useState(DEFAULT_GRAPH);
  const [steps, setSteps] = useState(() => dijkstraTrace(DEFAULT_GRAPH));
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef(null);

  // Recalcule la trace quand le graphe change
  useEffect(() => {
    const s = dijkstraTrace(currentGraph);
    setSteps(s);
    setStepIdx(0);
    setIsPlaying(false);
  }, [currentGraph]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  function play() {
    if (stepIdx >= steps.length - 1) setStepIdx(0);
    setIsPlaying(true);
  }

  function pause()    { setIsPlaying(false); }
  function goFirst()  { setStepIdx(0);                              setIsPlaying(false); }
  function goLast()   { setStepIdx(steps.length - 1);              setIsPlaying(false); }
  function goPrev()   { setStepIdx((p) => Math.max(0, p - 1));    setIsPlaying(false); }
  function goNext()   { setStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }
  function goTo(i)    { setStepIdx(i);                             setIsPlaying(false); }

  function usePreset(preset) {
    setCurrentGraph(preset === "simple" ? DEFAULT_GRAPH : COMPLEX_GRAPH);
  }

  const currentStep = steps[stepIdx] || null;

  return {
    currentGraph,
    setCurrentGraph,
    steps,
    stepIdx,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    goFirst,
    goLast,
    goPrev,
    goNext,
    goTo,
    usePreset,
  };
}
