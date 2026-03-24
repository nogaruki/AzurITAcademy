import { useLang } from "../../i18n/LangContext";

export default function Controls({
  stepIdx,
  stepsLength,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onFirst,
  onLast,
  onSpeedChange,
}) {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button className="ctrl-btn" onClick={onFirst} title={t("ctrl.first")}>⏮</button>

      <button
        className="ctrl-btn"
        onClick={onPrev}
        disabled={stepIdx === 0}
        title={t("ctrl.prev")}
      >◀</button>

      {isPlaying ? (
        <button className="ctrl-btn active" onClick={onPause} title={t("ctrl.pause")}>⏸</button>
      ) : (
        <button className="ctrl-btn" onClick={onPlay} title={t("ctrl.play")}>▶</button>
      )}

      <button
        className="ctrl-btn"
        onClick={onNext}
        disabled={stepIdx >= stepsLength - 1}
        title={t("ctrl.next")}
      >▶</button>

      <button className="ctrl-btn" onClick={onLast} title={t("ctrl.last")}>⏭</button>

      <select
        className="speed-select"
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
      >
        <option value={2000}>0.5×</option>
        <option value={1000}>1×</option>
        <option value={500}>2×</option>
        <option value={250}>4×</option>
      </select>

      <div className="flex-1 text-right text-[12px] text-mut font-mono">
        {t("ctrl.step")} {stepIdx + 1} / {stepsLength}
      </div>
    </div>
  );
}
