/**
 * Exécute Mergesort sur un tableau et retourne
 * une trace complète de chaque étape pour l'animation pas-à-pas.
 *
 * Champs du step compatibles avec ArrayViz :
 *  - type : 'init'|'divide'|'compare'|'merged'|'done'
 *  - desc : description textuelle
 *  - array : état courant du tableau
 *  - left, right : bornes du sous-tableau actif
 *  - mid : point de milieu (divide) ou null
 *  - j : pointeur gauche de fusion (orange dans ArrayViz)
 *  - pivotIdx : pointeur droit de fusion (accent dans ArrayViz)
 *  - i : toujours null (non utilisé par Mergesort)
 *  - sortedIndices : indices de la dernière plage fusionnée (vert)
 *
 * @param {number[]} inputArray
 * @returns {Array<object>}
 */
export function mergesortTrace(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];

  // ── Étape 0 : initialisation ───────────────────────────────────────────────
  steps.push({
    type: "init",
    desc: `Tableau initial : [${arr.join(", ")}]. Mergesort va diviser récursivement puis fusionner.`,
    array: [...arr],
    left: 0,
    right: n - 1,
    mid: null,
    j: null,
    pivotIdx: null,
    i: null,
    sortedIndices: [],
  });

  // ── Fusion de deux moitiés triées ──────────────────────────────────────────
  function merge(left, mid, right) {
    const leftArr  = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      const li = left + i;         // index réel dans arr du ptr gauche
      const rj = mid + 1 + j;     // index réel dans arr du ptr droit

      steps.push({
        type: "compare",
        desc: `Fusionner [${left}…${mid}]|[${mid + 1}…${right}] — Comparer ${leftArr[i]} ${leftArr[i] <= rightArr[j] ? "≤" : ">"} ${rightArr[j]} → placer ${Math.min(leftArr[i], rightArr[j])} en arr[${k}]`,
        array: [...arr],
        left,
        right,
        mid,
        j: li,
        pivotIdx: rj,
        i: null,
        sortedIndices: [],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    // Copier les restes (sans étapes supplémentaires pour fluidité)
    while (i < leftArr.length)  { arr[k] = leftArr[i];  i++; k++; }
    while (j < rightArr.length) { arr[k] = rightArr[j]; j++; k++; }

    // Résultat de la fusion — mettre en vert la plage fusionnée
    const merged = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);

    steps.push({
      type: "merged",
      desc: `Fusion [${left}…${right}] terminée : [${arr.slice(left, right + 1).join(", ")}]`,
      array: [...arr],
      left,
      right,
      mid,
      j: null,
      pivotIdx: null,
      i: null,
      sortedIndices: merged,
    });
  }

  // ── Mergesort récursif ─────────────────────────────────────────────────────
  function mergesort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: "divide",
      desc: `Diviser [${left}…${right}] au milieu → gauche [${left}…${mid}] | droite [${mid + 1}…${right}]`,
      array: [...arr],
      left,
      right,
      mid,
      j: null,
      pivotIdx: null,
      i: null,
      sortedIndices: [],
    });

    mergesort(left, mid);
    mergesort(mid + 1, right);
    merge(left, mid, right);
  }

  mergesort(0, n - 1);

  // ── Étape finale ───────────────────────────────────────────────────────────
  steps.push({
    type: "done",
    desc: `Tri terminé ! Tableau trié : [${arr.join(", ")}]`,
    array: [...arr],
    left: 0,
    right: n - 1,
    mid: null,
    j: null,
    pivotIdx: null,
    i: null,
    sortedIndices: Array.from({ length: n }, (_, k) => k),
  });

  return steps;
}
