/**
 * Transforme un texte avec **bold** en éléments JSX.
 * Les sauts de ligne \n deviennent des <br />.
 *
 * @param {string} text
 * @returns {JSX.Element[]}
 */
export function formatContent(text) {
  return text.split("\n").map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith("**") && seg.endsWith("**"))
        return <strong key={j}>{seg.slice(2, -2)}</strong>;
      return seg;
    });

    return (
      <span key={i}>
        {parts}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}
