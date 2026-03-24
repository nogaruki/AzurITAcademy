import { useState, useEffect, useRef } from "react";
import { bfsTrace, dfsTrace } from "../utils/bfsDfsTrace";
import { BFS_DFS_SIMPLE, BFS_DFS_COMPLEX } from "../data/bfsDfsGraphs";

export function useBfsDfsAnimation() {
  const [algo, setAlgo]               = useState("bfs"); // "bfs" | "dfs"
  const [currentGraph, setCurrentGraph] = useState(BFS_DFS_SIMPLE);
  const [steps, setSteps]             = useState(() => bfsTrace(BFS_DFS_SIMPLE));
  const [stepIdx, setStepIdx]         = useState(0);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [speed, setSpeed]             = useState(900);
  const intervalRef                   = useRef(null);

  // Recalcule la trace quand le graphe ou l'algo change
  useEffect(() => {
    const trace = algo === "bfs" ? bfsTrace(currentGraph) : dfsTrace(currentGraph);
    setSteps(trace);
    setStepIdx(0);
    setIsPlaying(false);
  }, [currentGraph, algo]);

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

  function play()   { if (stepIdx >= steps.length - 1) setStepIdx(0); setIsPlaying(true); }
  function pause()  { setIsPlaying(false); }
  function goFirst(){ setStepIdx(0);                              setIsPlaying(false); }
  function goLast() { setStepIdx(steps.length - 1);              setIsPlaying(false); }
  function goPrev() { setStepIdx((p) => Math.max(0, p - 1));    setIsPlaying(false); }
  function goNext() { setStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }
  function goTo(i)  { setStepIdx(i);                             setIsPlaying(false); }

  function usePreset(preset) {
    setCurrentGraph(preset === "simple" ? BFS_DFS_SIMPLE : BFS_DFS_COMPLEX);
  }

  return {
    algo, setAlgo,
    currentGraph, setCurrentGraph,
    steps,
    stepIdx,
    currentStep: steps[stepIdx] || null,
    isPlaying,
    speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo,
    usePreset,
  };
}
