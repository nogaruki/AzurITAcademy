import { useState, useEffect, useRef } from "react";
import { quicksortTrace } from "../utils/quicksortTrace";
import { DEFAULT_ARRAY, REVERSED_ARRAY, SMALL_ARRAY } from "../data/quicksortArrays";

/**
 * Gère toute la logique d'animation Quicksort :
 * tableau courant, étapes, index, lecture automatique, vitesse.
 */
export function useQuicksortAnimation() {
  const [currentArray, setCurrentArray] = useState(DEFAULT_ARRAY);
  const [steps, setSteps]     = useState(() => quicksortTrace(DEFAULT_ARRAY));
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed]     = useState(800);
  const intervalRef = useRef(null);

  // Recalcule la trace quand le tableau change
  useEffect(() => {
    const s = quicksortTrace(currentArray);
    setSteps(s);
    setStepIdx(0);
    setIsPlaying(false);
  }, [currentArray]);

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

  function pause()   { setIsPlaying(false); }
  function goFirst() { setStepIdx(0);                                        setIsPlaying(false); }
  function goLast()  { setStepIdx(steps.length - 1);                        setIsPlaying(false); }
  function goPrev()  { setStepIdx((p) => Math.max(0, p - 1));               setIsPlaying(false); }
  function goNext()  { setStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }
  function goTo(i)   { setStepIdx(i);                                        setIsPlaying(false); }

  function usePreset(preset) {
    if (preset === "default")  setCurrentArray(DEFAULT_ARRAY);
    else if (preset === "reversed") setCurrentArray(REVERSED_ARRAY);
    else if (preset === "small")    setCurrentArray(SMALL_ARRAY);
  }

  const currentStep = steps[stepIdx] || null;

  return {
    currentArray,
    setCurrentArray,
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
