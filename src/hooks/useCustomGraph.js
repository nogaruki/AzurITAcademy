import { useState } from "react";
import { DEFAULT_GRAPH, COMPLEX_GRAPH } from "../data/graphs";

/**
 * Gère la construction interactive d'un graphe personnalisé :
 * liste de nœuds, ajout/suppression d'arêtes, génération du graphe.
 *
 * @param {(graph: object) => void} onGraphChange - callback appelé quand le graphe est lancé
 */
export function useCustomGraph(onGraphChange) {
  const [customNodes, setCustomNodes] = useState("0,1,2,3");
  const [customEdges, setCustomEdges] = useState([
    { from: 0, to: 1, weight: 5 },
    { from: 0, to: 2, weight: 10 },
    { from: 1, to: 2, weight: 3 },
  ]);
  const [edgeFrom, setEdgeFrom]     = useState("");
  const [edgeTo, setEdgeTo]         = useState("");
  const [edgeWeight, setEdgeWeight] = useState("");

  function addEdge() {
    const f = parseInt(edgeFrom);
    const t = parseInt(edgeTo);
    const w = parseInt(edgeWeight);
    if (isNaN(f) || isNaN(t) || isNaN(w) || w <= 0) return;
    setCustomEdges((prev) => [...prev, { from: f, to: t, weight: w }]);
    setEdgeFrom("");
    setEdgeTo("");
    setEdgeWeight("");
  }

  function removeEdge(index) {
    setCustomEdges((prev) => prev.filter((_, i) => i !== index));
  }

  function clearEdges() {
    setCustomEdges([]);
  }

  function runCustom() {
    const nodeIds = customNodes
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));
    const V = nodeIds.length;

    // Dispose nodes in a circle
    const positions = nodeIds.map((id, i) => {
      const angle = (i / V) * Math.PI * 2 - Math.PI / 2;
      return {
        id,
        x: 350 + Math.cos(angle) * 200,
        y: 200 + Math.sin(angle) * 140,
        label: String(id),
      };
    });

    const validEdges = customEdges.filter(
      (e) => nodeIds.includes(e.from) && nodeIds.includes(e.to)
    );

    onGraphChange({ nodes: positions, edges: validEdges });
  }

  function applyPreset(preset) {
    if (preset === "simple") {
      setCustomNodes("0,1,2");
      setCustomEdges([
        { from: 0, to: 1, weight: 5 },
        { from: 0, to: 2, weight: 10 },
        { from: 1, to: 2, weight: 3 },
      ]);
      onGraphChange(DEFAULT_GRAPH);
    } else {
      setCustomNodes("0,1,2,3,4,5");
      setCustomEdges(COMPLEX_GRAPH.edges);
      onGraphChange(COMPLEX_GRAPH);
    }
  }

  return {
    customNodes, setCustomNodes,
    customEdges,
    edgeFrom,    setEdgeFrom,
    edgeTo,      setEdgeTo,
    edgeWeight,  setEdgeWeight,
    addEdge,
    removeEdge,
    clearEdges,
    runCustom,
    applyPreset,
  };
}
