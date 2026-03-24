/**
 * Exécute la recherche binaire sur un tableau trié et retourne
 * une trace complète de chaque étape pour l'animation pas-à-pas.
 *
 * Champs du step compatibles avec BinarySearchArrayViz :
 *  - type : 'init' | 'compare' | 'done' | 'not_found'
 *  - desc : description textuelle de l'étape
 *  - array : état du tableau (constant — on ne modifie pas)
 *  - left : borne gauche lo (pour estomper les éléments hors plage)
 *  - right : borne droite hi (idem)
 *  - mid : indice du milieu calculé
 *  - pivotIdx : = mid (couleur accent dans le viz)
 *  - sortedIndices : [mid] quand trouvé (couleur verte)
 *  - target : valeur recherchée
 *
 * @param {number[]} array  Tableau trié
 * @param {number}   target Valeur à chercher
 * @returns {Array<object>}
 */
export function binarySearchTrace(array, target) {
  const arr = [...array];
  const n   = arr.length;
  const steps = [];

  // ── Étape 0 : initialisation ───────────────────────────────────────────────
  steps.push({
    type: "init",
    desc: `Recherche de ${target} dans [${arr.join(", ")}] (${n} éléments triés).`,
    array: arr,
    left: 0, right: n - 1,
    mid: null,
    pivotIdx: null,
    j: null, i: null,
    sortedIndices: [],
    target,
  });

  let lo = 0, hi = n - 1;
  let iter = 0;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    iter++;

    if (arr[mid] === target) {
      // ── Trouvé ─────────────────────────────────────────────────────────────
      steps.push({
        type: "compare",
        desc: `Itération ${iter} : lo=${lo}, hi=${hi} → mid=${mid}, arr[${mid}]=${arr[mid]} = ${target} ✓`,
        array: arr,
        left: lo, right: hi,
        mid,
        pivotIdx: mid,
        j: null, i: null,
        sortedIndices: [mid],
        target,
      });

      steps.push({
        type: "done",
        desc: `Trouvé ! ${target} est à l'index ${mid}. Complexité : O(log n) — ${iter} comparaison(s).`,
        array: arr,
        left: 0, right: n - 1,
        mid,
        pivotIdx: null,
        j: null, i: null,
        sortedIndices: [mid],
        target,
      });

      return steps;

    } else if (arr[mid] < target) {
      // ── Chercher à droite ──────────────────────────────────────────────────
      steps.push({
        type: "compare",
        desc: `Itération ${iter} : lo=${lo}, hi=${hi} → mid=${mid}, arr[${mid}]=${arr[mid]} < ${target} → chercher à droite, lo = ${mid + 1}`,
        array: arr,
        left: lo, right: hi,
        mid,
        pivotIdx: mid,
        j: null, i: null,
        sortedIndices: [],
        target,
      });
      lo = mid + 1;

    } else {
      // ── Chercher à gauche ──────────────────────────────────────────────────
      steps.push({
        type: "compare",
        desc: `Itération ${iter} : lo=${lo}, hi=${hi} → mid=${mid}, arr[${mid}]=${arr[mid]} > ${target} → chercher à gauche, hi = ${mid - 1}`,
        array: arr,
        left: lo, right: hi,
        mid,
        pivotIdx: mid,
        j: null, i: null,
        sortedIndices: [],
        target,
      });
      hi = mid - 1;
    }
  }

  // ── Non trouvé ─────────────────────────────────────────────────────────────
  steps.push({
    type: "not_found",
    desc: `${target} est absent du tableau. lo (${lo}) > hi (${hi}) — toute la plage a été éliminée en ${iter} comparaison(s).`,
    array: arr,
    left: 0, right: n - 1,
    mid: null,
    pivotIdx: null,
    j: null, i: null,
    sortedIndices: [],
    target,
  });

  return steps;
}
