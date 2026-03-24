const BADGE_CLASS = {
  init:       "badge-init",
  visit:      "badge-visit",
  relax:      "badge-relax",
  "no-relax": "badge-init",
  skip:       "badge-skip",
  done:       "badge-done",
};

export default function StepLog({ steps, stepIdx, onStepClick }) {
  return (
    <div className="max-h-[260px] overflow-y-auto flex flex-col gap-[6px]">
      {steps.map((s, i) => {
        const badgeClass = BADGE_CLASS[s.type] ?? "badge-init";
        return (
          <div
            key={i}
            className={`px-3 py-2 rounded-lg text-[13px] leading-[1.4] border transition-all duration-200 cursor-pointer ${
              i === stepIdx
                ? "bg-accent-dim border-accent text-pri"
                : "border-transparent text-mut"
            }`}
            onClick={() => onStepClick(i)}
          >
            <span className={`step-badge ${badgeClass}`}>{s.type}</span>
            {s.desc}
          </div>
        );
      })}
    </div>
  );
}
