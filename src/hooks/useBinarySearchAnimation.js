import { useState, useEffect, useRef } from "react";
import { binarySearchTrace } from "../utils/binarySearchTrace";
import { DEFAULT_PRESET, SMALL_PRESET, NOT_FOUND_PRESET } from "../data/binarySearchArrays";

/**
 * Gère toute la logique d'animation Recherche Binaire :
 * tableau courant, cible, étapes, index, lecture automatique, vitesse.
 */
export function useBinarySearchAnimation() {
  const [currentArray, setCurrentArray] = useState(DEFAULT_PRESET.array);
  const [target,       setTarget]       = useState(DEFAULT_PRESET.target);
  const [steps,        setSteps]        = useState(() => binarySearchTrace(DEFAULT_PRESET.array, DEFAULT_PRESET.target));
  const [stepIdx,      setStepIdx]      = useState(0);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [speed,        setSpeed]        = useState(900);
  const intervalRef = useRef(null);

  // Recalcule la trace quand le tableau ou la cible change
  useEffect(() => {
    const s = binarySearchTrace(currentArray, target);
    setSteps(s);
    setStepIdx(0);
    setIsPlaying(false);
  }, [currentArray, target]);

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

  function play()    {
    if (stepIdx >= steps.length - 1) setStepIdx(0);
    setIsPlaying(true);
  }
  function pause()   { setIsPlaying(false); }
  function goFirst() { setStepIdx(0);                                         setIsPlaying(false); }
  function goLast()  { setStepIdx(steps.length - 1);                         setIsPlaying(false); }
  function goPrev()  { setStepIdx((p) => Math.max(0, p - 1));                setIsPlaying(false); }
  function goNext()  { setStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }
  function goTo(i)   { setStepIdx(i);                                         setIsPlaying(false); }

  function usePreset(preset) {
    if (preset === "default") {
      setCurrentArray(DEFAULT_PRESET.array);
      setTarget(DEFAULT_PRESET.target);
    } else if (preset === "small") {
      setCurrentArray(SMALL_PRESET.array);
      setTarget(SMALL_PRESET.target);
    } else if (preset === "notfound") {
      setCurrentArray(NOT_FOUND_PRESET.array);
      setTarget(NOT_FOUND_PRESET.target);
    }
  }

  const currentStep = steps[stepIdx] || null;

  return {
    currentArray, setCurrentArray,
    target, setTarget,
    steps, stepIdx, currentStep,
    isPlaying, speed, setSpeed,
    play, pause, goFirst, goLast, goPrev, goNext, goTo,
    usePreset,
  };
}
