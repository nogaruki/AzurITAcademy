// ─── Exercices Mergesort (codes à trou) ───

const fr = [
  {
    id: "merge",
    title: "La fonction merge()",
    description:
      "Complétez la fusion de deux sous-tableaux triés. Utilisez deux pointeurs i et j pour comparer et placer les éléments dans l'ordre.",
    code:
`function merge(arr, left, mid, right) {
  const leftArr  = arr.slice(___, mid + 1);   // copie moitié gauche
  const rightArr = arr.slice(mid + ___, right + 1); // copie moitié droite

  let i = 0, j = 0, k = ___;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[___]) {
      arr[k++] = leftArr[___++];  // gauche ≤ droite : prendre gauche
    } else {
      arr[k++] = rightArr[j++];  // droite < gauche : prendre droite
    }
  }

  // Copier les restes
  while (i < leftArr.length)  arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[___++];
}`,
    blanks: ["left", "1", "left", "j", "i", "j"],
  },
  {
    id: "mergesort",
    title: "Mergesort récursif",
    description:
      "Complétez la fonction récursive : calculez le milieu, récursez sur chaque moitié, puis fusionnez.",
    code:
`function mergesort(arr, left, right) {
  // Cas de base : 0 ou 1 élément → déjà trié
  if (left >= ___) return;

  // Calcule le milieu (évite le dépassement d'entier)
  const mid = Math.floor((left + ___) / 2);

  mergesort(arr, ___, mid);         // trie la moitié gauche
  mergesort(arr, mid + ___, right); // trie la moitié droite
  merge(arr, left, ___, right);     // fusionne les deux moitiés
}`,
    blanks: ["right", "right", "left", "1", "mid"],
  },
  {
    id: "entry",
    title: "Point d'entrée & copie défensive",
    description:
      "Complétez la fonction publique qui protège le tableau d'origine et lance le tri.",
    code:
`function sort(arr) {
  // Copie pour ne pas modifier le tableau d'origine
  const copy = [...___];

  // Lance le tri sur l'intégralité du tableau
  mergesort(copy, ___, copy.length - ___);

  return ___;
}`,
    blanks: ["arr", "0", "1", "copy"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "bottom-up",
    title: "TP — Mergesort itératif (bottom-up)",
    description:
      "La version bottom-up évite la récursion : elle fusionne directement des sous-tableaux de taille croissante (1, 2, 4, 8…) sans appel récursif. Complétez la double boucle.",
    code:
`function mergesortBottomUp(arr) {
  const n = arr.length;

  // size : taille de chaque sous-tableau à fusionner (1, 2, 4, 8…)
  for (let size = 1; size < ___; size *= 2) {
    // left : début du premier sous-tableau de la paire
    for (let left = 0; left < n - ___; left += size * 2) {
      const mid   = Math.min(left + size - ___, n - 1);
      const right = Math.min(left + size * ___ - 1, n - 1);
      merge(arr, left, ___, right);
    }
  }
}`,
    blanks: ["n", "1", "1", "2", "mid"],
    guide: [
      "La boucle externe double la taille à chaque itération : size = 1, 2, 4, 8… jusqu'à size >= n.",
      "La boucle interne avance de 2*size à chaque pas pour traiter les paires de sous-tableaux.",
      "mid = left + size - 1 (fin de la première moitié), mais cappé à n-1.",
      "right = left + 2*size - 1 (fin de la deuxième moitié), aussi cappé à n-1.",
      "Appelle merge() exactement comme dans la version récursive.",
    ],
    explanation:
      "La version bottom-up est souvent plus rapide en pratique car elle évite l'overhead des appels récursifs et améliore la localité de cache. Elle fusionne d'abord les paires voisines (taille 1→2), puis les groupes de 4, 8, etc. — identique au résultat final de la version top-down, mais dans l'ordre inverse.",
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "natural",
    title: "TP — Mergesort naturel (runs existants)",
    description:
      "Le Mergesort naturel exploite les séquences déjà triées (\"runs\") dans les données. Au lieu de diviser arbitrairement, il identifie les runs naturels et les fusionne. Complétez la détection d'un run.",
    code:
`function findRunEnd(arr, start) {
  let end = start;
  const n = arr.length;

  if (end + 1 >= n) return end; // dernier élément

  // Détermine si le run est croissant ou décroissant
  const ascending = arr[end] <= arr[end + ___];

  while (end + 1 < n && (ascending ? arr[end] <= arr[end + 1]
                                   : arr[___] >= arr[end + 1])) {
    end++;
  }

  // Inverse si décroissant pour obtenir un run croissant
  if (!___) {
    let l = start, r = ___;
    while (l < r) [arr[l++], arr[r--]] = [arr[r], arr[l - 1]];
  }

  return ___;
}`,
    blanks: ["1", "end", "ascending", "end", "end"],
    guide: [
      "Un 'run' est une séquence maximale d'éléments consécutifs dans l'ordre (croissant ou décroissant).",
      "On détecte d'abord si le run est croissant ou décroissant en comparant les deux premiers éléments.",
      "On avance end tant que la séquence continue dans le même sens.",
      "Si le run est décroissant, on l'inverse en place pour le rendre croissant.",
      "On retourne end, l'indice de fin du run.",
    ],
    explanation:
      "Le Mergesort naturel est la base de Timsort (Python, Java), qui peut être O(n) sur des données déjà triées ou partiellement triées. Au lieu de toujours diviser au milieu, il exploite l'ordre existant pour fusionner de plus grandes séquences dès le départ.",
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "inplace",
    title: "TP — Compter les inversions",
    description:
      "Une application classique de Mergesort : compter le nombre d'inversions dans un tableau. Une inversion est une paire (i, j) où i < j mais arr[i] > arr[j]. Mergesort les compte en O(n log n).",
    code:
`function countInversions(arr) {
  let inversions = 0;
  const copy = [...arr];

  function mergeCount(left, mid, right) {
    const leftArr  = copy.slice(left, mid + 1);
    const rightArr = copy.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        copy[k++] = leftArr[i++];
      } else {
        // Tous les éléments restants de leftArr sont > rightArr[j]
        inversions += leftArr.length - ___;  // compte les inversions
        copy[k++] = rightArr[j++];
      }
    }
    while (i < leftArr.length)  copy[k++] = leftArr[i++];
    while (j < rightArr.length) copy[k++] = rightArr[j++];
  }

  function sort(left, right) {
    if (left >= ___) return;
    const mid = Math.floor((left + right) / 2);
    sort(___, mid);
    sort(mid + 1, ___);
    mergeCount(left, ___, right);
  }

  sort(0, copy.length - 1);
  return { sorted: copy, ___ };
}`,
    blanks: ["i", "right", "left", "right", "mid", "inversions"],
    guide: [
      "Une inversion se détecte pendant merge() : si leftArr[i] > rightArr[j], alors tous les éléments de leftArr[i..end] forment une inversion avec rightArr[j].",
      "Le nombre d'inversions à ajouter est leftArr.length - i (tous les éléments restants de la moitié gauche).",
      "La structure récursive est identique à Mergesort standard.",
      "Retourner l'objet { sorted, inversions } avec le tableau trié et le compte d'inversions.",
    ],
    explanation:
      "Compter les inversions mesure 'combien de swaps' un tri à bulles aurait besoin. 0 inversions = tableau trié, n(n-1)/2 inversions = tableau inversé. Mergesort les compte en O(n log n) car lors de chaque fusion, chaque fois qu'on prend un élément de droite, il forme une inversion avec tous les éléments restants de gauche.",
  },
];

const en = [
  {
    id: "merge",
    title: "The merge() function",
    description:
      "Complete the merge of two sorted sub-arrays. Use two pointers i and j to compare and place elements in order.",
    code:
`function merge(arr, left, mid, right) {
  const leftArr  = arr.slice(___, mid + 1);   // copy left half
  const rightArr = arr.slice(mid + ___, right + 1); // copy right half

  let i = 0, j = 0, k = ___;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[___]) {
      arr[k++] = leftArr[___++];  // left ≤ right: take from left
    } else {
      arr[k++] = rightArr[j++];  // right < left: take from right
    }
  }

  // Copy remainders
  while (i < leftArr.length)  arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[___++];
}`,
    blanks: ["left", "1", "left", "j", "i", "j"],
  },
  {
    id: "mergesort",
    title: "Recursive mergesort",
    description:
      "Complete the recursive function: compute the midpoint, recurse on each half, then merge.",
    code:
`function mergesort(arr, left, right) {
  // Base case: 0 or 1 element → already sorted
  if (left >= ___) return;

  // Compute the midpoint (avoids integer overflow)
  const mid = Math.floor((left + ___) / 2);

  mergesort(arr, ___, mid);         // sort the left half
  mergesort(arr, mid + ___, right); // sort the right half
  merge(arr, left, ___, right);     // merge both halves
}`,
    blanks: ["right", "right", "left", "1", "mid"],
  },
  {
    id: "entry",
    title: "Entry point & defensive copy",
    description:
      "Complete the public function that protects the original array and starts the sort.",
    code:
`function sort(arr) {
  // Copy to avoid mutating the original array
  const copy = [...___];

  // Start the sort on the whole array
  mergesort(copy, ___, copy.length - ___);

  return ___;
}`,
    blanks: ["arr", "0", "1", "copy"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "bottom-up",
    title: "TP — Iterative Mergesort (bottom-up)",
    description:
      "The bottom-up version avoids recursion: it directly merges sub-arrays of increasing size (1, 2, 4, 8…) without recursive calls. Complete the double loop.",
    code:
`function mergesortBottomUp(arr) {
  const n = arr.length;

  // size: size of each sub-array to merge (1, 2, 4, 8…)
  for (let size = 1; size < ___; size *= 2) {
    // left: start of the first sub-array in the pair
    for (let left = 0; left < n - ___; left += size * 2) {
      const mid   = Math.min(left + size - ___, n - 1);
      const right = Math.min(left + size * ___ - 1, n - 1);
      merge(arr, left, ___, right);
    }
  }
}`,
    blanks: ["n", "1", "1", "2", "mid"],
    guide: [
      "The outer loop doubles the size each iteration: size = 1, 2, 4, 8… until size >= n.",
      "The inner loop advances by 2*size each step to process pairs of sub-arrays.",
      "mid = left + size - 1 (end of the first half), capped at n-1.",
      "right = left + 2*size - 1 (end of the second half), also capped at n-1.",
      "Calls merge() exactly like in the recursive version.",
    ],
    explanation:
      "The bottom-up version is often faster in practice because it avoids the overhead of recursive calls and improves cache locality. It first merges neighboring pairs (size 1→2), then groups of 4, 8, etc. — identical result to the top-down version, but in reverse order.",
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "natural",
    title: "TP — Natural Mergesort (existing runs)",
    description:
      "Natural Mergesort exploits already-sorted sequences ('runs') in the data. Instead of splitting arbitrarily, it identifies natural runs and merges them. Complete the run detection.",
    code:
`function findRunEnd(arr, start) {
  let end = start;
  const n = arr.length;

  if (end + 1 >= n) return end; // last element

  // Determine if the run is ascending or descending
  const ascending = arr[end] <= arr[end + ___];

  while (end + 1 < n && (ascending ? arr[end] <= arr[end + 1]
                                   : arr[___] >= arr[end + 1])) {
    end++;
  }

  // Reverse if descending to get an ascending run
  if (!___) {
    let l = start, r = ___;
    while (l < r) [arr[l++], arr[r--]] = [arr[r], arr[l - 1]];
  }

  return ___;
}`,
    blanks: ["1", "end", "ascending", "end", "end"],
    guide: [
      "A 'run' is a maximal sequence of consecutive elements in order (ascending or descending).",
      "First detect whether the run is ascending or descending by comparing the first two elements.",
      "Advance end while the sequence continues in the same direction.",
      "If the run is descending, reverse it in place to make it ascending.",
      "Return end, the index of the run's last element.",
    ],
    explanation:
      "Natural Mergesort is the basis of Timsort (Python, Java), which can be O(n) on already-sorted or partially-sorted data. Instead of always splitting in the middle, it exploits existing order to merge larger sequences from the start.",
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "inplace",
    title: "TP — Counting inversions",
    description:
      "A classic application of Mergesort: count the number of inversions in an array. An inversion is a pair (i, j) where i < j but arr[i] > arr[j]. Mergesort counts them in O(n log n).",
    code:
`function countInversions(arr) {
  let inversions = 0;
  const copy = [...arr];

  function mergeCount(left, mid, right) {
    const leftArr  = copy.slice(left, mid + 1);
    const rightArr = copy.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        copy[k++] = leftArr[i++];
      } else {
        // All remaining elements in leftArr are > rightArr[j]
        inversions += leftArr.length - ___;  // count inversions
        copy[k++] = rightArr[j++];
      }
    }
    while (i < leftArr.length)  copy[k++] = leftArr[i++];
    while (j < rightArr.length) copy[k++] = rightArr[j++];
  }

  function sort(left, right) {
    if (left >= ___) return;
    const mid = Math.floor((left + right) / 2);
    sort(___, mid);
    sort(mid + 1, ___);
    mergeCount(left, ___, right);
  }

  sort(0, copy.length - 1);
  return { sorted: copy, ___ };
}`,
    blanks: ["i", "right", "left", "right", "mid", "inversions"],
    guide: [
      "An inversion is detected during merge(): if leftArr[i] > rightArr[j], then all leftArr[i..end] elements form an inversion with rightArr[j].",
      "The number of inversions to add is leftArr.length - i (all remaining elements in the left half).",
      "The recursive structure is identical to standard Mergesort.",
      "Return the object { sorted, inversions } with the sorted array and the inversion count.",
    ],
    explanation:
      "Counting inversions measures 'how many swaps' a bubble sort would need. 0 inversions = sorted array, n(n-1)/2 inversions = reversed array. Mergesort counts them in O(n log n) because during each merge, every time we take an element from the right, it forms an inversion with all remaining left-side elements.",
  },
];

export const MERGESORT_EXERCISES = { fr, en };
