import { COURSE_SECTIONS } from "../../data/courseSections";

export default function CourseSectionTabs({ activeSection, onSectionChange, sections = COURSE_SECTIONS.fr }) {
  return (
    <div className="flex gap-[6px] flex-wrap mb-8 pb-4 border-b border-line">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`px-4 py-2 text-[13px] font-medium rounded-[10px] cursor-pointer transition-all duration-200 border font-sans ${
            activeSection === s.id
              ? "text-accent-hi bg-accent-dim border-accent"
              : "text-mut border-line hover:text-sec hover:border-line-on"
          }`}
          onClick={() => onSectionChange(s.id)}
        >
          {s.icon} {s.title}
        </button>
      ))}
    </div>
  );
}
