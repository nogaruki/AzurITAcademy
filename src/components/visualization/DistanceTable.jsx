export default function DistanceTable({ nodes, step }) {
  if (!step) return null;

  const thClass = "px-3 py-2 text-center border-b border-line font-semibold text-mut text-[11px] uppercase tracking-[0.5px]";

  return (
    <table className="w-full border-collapse font-mono text-[13px]">
      <thead>
        <tr>
          <th className={thClass}>Sommet</th>
          {nodes.map((n) => <th key={n.id} className={thClass}>{n.label}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-3 py-2 text-center border-b border-line text-mut">dist</td>
          {nodes.map((n) => (
            <td
              key={n.id}
              className={`dist-cell px-3 py-2 text-center border-b border-line ${
                step.relaxing === n.id
                  ? "updated"
                  : step.visited[n.id]
                  ? "visited-cell"
                  : ""
              }`}
            >
              {step.dist[n.id] === Infinity ? "∞" : step.dist[n.id]}
            </td>
          ))}
        </tr>
        <tr>
          <td className="px-3 py-2 text-center text-mut">visité</td>
          {nodes.map((n) => (
            <td
              key={n.id}
              className={`px-3 py-2 text-center ${step.visited[n.id] ? "text-c-green" : "text-mut"}`}
            >
              {step.visited[n.id] ? "✓" : "—"}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
