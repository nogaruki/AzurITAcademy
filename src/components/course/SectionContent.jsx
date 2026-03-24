import { COURSE_SECTIONS } from "../../data/courseSections";
import { formatContent } from "../../utils/formatContent";

export default function SectionContent({ activeSection, sections = COURSE_SECTIONS.fr }) {
  const section = sections.find((s) => s.id === activeSection);
  if (!section) return null;

  return (
    <div className="panel mb-6">
      <div className="panel-header">
        {section.icon} {section.title}
      </div>
      <div className="section-content">
        {formatContent(section.content)}
      </div>
    </div>
  );
}
