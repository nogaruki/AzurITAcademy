/**
 * Exécute Quicksort (schéma Lomuto) sur un tableau et retourne
 * une trace complète de chaque étape pour l'animation pas-à-pas.
 *
 * @param {number[]} inputArray
 * @returns {Array<{
 *   type: 'init'|'pivot'|'compare'|'swap'|'noswap'|'partition'|'sorted'|'done',
 *   desc: string,
 *   array: number[],
 *   pivotIdx: number|null,
 *   left: number,
 *   right: number,
 *   i: number|null,
 *   j: number|null,
 *   sortedIndices: number[]
 * }>}
 */
export function quicksortTrace(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];
  const sortedSet = new Set();

  // ── Étape 0 : initialisation ───────────────────────────────────────────────
  steps.push({
    type: "init",
    desc: `Tableau initial : [${arr.join(", ")}]. Quicksort va trier avec la stratégie Lomuto (pivot = dernier élément).`,
    array: [...arr],
    pivotIdx: null,
    left: 0,
    right: n - 1,
    i: null,
    j: null,
    sortedIndices: [],
  });

  // ── Partition Lomuto ───────────────────────────────────────────────────────
  function partition(low, high) {
    const pivot = arr[high];

    steps.push({
      type: "pivot",
      desc: `Sous-tableau [${low}…${high}] — Pivot choisi : arr[${high}] = ${pivot}`,
      array: [...arr],
      pivotIdx: high,
      left: low,
      right: high,
      i: low - 1,
      j: null,
      sortedIndices: [...sortedSet],
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Comparaison
      steps.push({
        type: "compare",
        desc: `Comparer arr[${j}] = ${arr[j]} ${arr[j] <= pivot ? "≤" : ">"} pivot (${pivot}) → ${arr[j] <= pivot ? "inclure à gauche" : "ignorer"}`,
        array: [...arr],
        pivotIdx: high,
        left: low,
        right: high,
        i,
        j,
        sortedIndices: [...sortedSet],
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const oldI = arr[i];
          const oldJ = arr[j];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            type: "swap",
            desc: `arr[${j}] ≤ pivot → Échange arr[${i}] (${oldI}) ↔ arr[${j}] (${oldJ})`,
            array: [...arr],
            pivotIdx: high,
            left: low,
            right: high,
            i,
            j,
            sortedIndices: [...sortedSet],
          });
        } else {
          steps.push({
            type: "noswap",
            desc: `arr[${j}] ≤ pivot → i avance à ${i} (i = j, pas d'échange)`,
            array: [...arr],
            pivotIdx: high,
            left: low,
            right: high,
            i,
            j,
            sortedIndices: [...sortedSet],
          });
        }
      }
    }

    // Place le pivot à sa position finale
    const pivotFinal = i + 1;
    if (pivotFinal !== high) {
      [arr[pivotFinal], arr[high]] = [arr[high], arr[pivotFinal]];
    }
    sortedSet.add(pivotFinal);

    steps.push({
      type: "partition",
      desc: `Pivot ${pivot} placé en position finale arr[${pivotFinal}]. Gauche : [${low}…${pivotFinal - 1}]  Droite : [${pivotFinal + 1}…${high}]`,
      array: [...arr],
      pivotIdx: pivotFinal,
      left: low,
      right: high,
      i: null,
      j: null,
      sortedIndices: [...sortedSet],
    });

    return pivotFinal;
  }

  // ── Quicksort récursif ─────────────────────────────────────────────────────
  function quicksort(low, high) {
    if (low > high) return;

    if (low === high) {
      sortedSet.add(low);
      steps.push({
        type: "sorted",
        desc: `Sous-tableau [${low}] — Un seul élément arr[${low}] = ${arr[low]}, déjà à sa place.`,
        array: [...arr],
        pivotIdx: null,
        left: low,
        right: high,
        i: null,
        j: null,
        sortedIndices: [...sortedSet],
      });
      return;
    }

    const pi = partition(low, high);
    quicksort(low, pi - 1);
    quicksort(pi + 1, high);
  }

  quicksort(0, n - 1);

  // S'assurer que tous les index sont marqués triés
  for (let k = 0; k < n; k++) sortedSet.add(k);

  steps.push({
    type: "done",
    desc: `Tri terminé ! Tableau trié : [${arr.join(", ")}]`,
    array: [...arr],
    pivotIdx: null,
    left: 0,
    right: n - 1,
    i: null,
    j: null,
    sortedIndices: [...sortedSet],
  });

  return steps;
}
