// ─── Exercices Quicksort (codes à trou) ───

const fr = [
  {
    id: "partition",
    title: "Partition de Lomuto",
    description:
      "Complétez le partitionnement : le dernier élément est le pivot. Tout ce qui est ≤ pivot passe à gauche.",
    code:
`function partition(arr, low, high) {
  const pivot = arr[___];   // Pivot = dernier élément
  let i = ___ - 1;          // i : frontière des petits éléments

  for (let j = low; j < high; j++) {
    if (arr[j] <= ___) {
      i++;
      // Échange arr[i] et arr[j]
      [arr[i], arr[j]] = [arr[___], arr[i]];
    }
  }

  // Place le pivot à sa position finale (i + 1)
  [arr[i + 1], arr[high]] = [arr[___], arr[i + 1]];
  return i + ___;
}`,
    blanks: ["high", "low", "pivot", "j", "high", "1"],
  },
  {
    id: "quicksort",
    title: "Quicksort récursif",
    description:
      "Complétez la fonction récursive : après le partitionnement, récursez sur les deux sous-tableaux.",
    code:
`function quicksort(arr, low, high) {
  // Cas de base : sous-tableau de 0 ou 1 élément
  if (low < ___) {
    const pivotIdx = partition(arr, ___, high);

    // Récurse sur le sous-tableau gauche (éléments < pivot)
    quicksort(arr, low, pivotIdx - ___);

    // Récurse sur le sous-tableau droit (éléments > pivot)
    quicksort(arr, pivotIdx + ___, high);
  }
}`,
    blanks: ["high", "low", "1", "1"],
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
  quicksort(copy, ___, copy.length - ___);

  return ___;
}`,
    blanks: ["arr", "0", "1", "copy"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "median3",
    title: "TP — Médiane de 3 (meilleur pivot)",
    description:
      "La médiane de 3 choisit un meilleur pivot : la valeur médiane entre arr[low], arr[mid] et arr[high]. Complétez la sélection et le placement du pivot.",
    code:
`function medianOfThree(arr, low, high) {
  const mid = (low + ___) >> 1;  // Indice du milieu

  // Trie les 3 positions pour que arr[mid] = médiane
  if (arr[low] > arr[mid])  [arr[low], arr[___]]  = [arr[mid],  arr[low]];
  if (arr[low] > arr[high]) [arr[___], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[___]]  = [arr[high], arr[mid]];

  // Place la médiane juste avant arr[high] comme pivot
  [arr[mid], arr[high - 1]] = [arr[high - ___], arr[mid]];
  return arr[high - ___];  // Valeur du pivot
}`,
    blanks: ["high", "mid", "low", "high", "1", "1"],
    guide: [
      "L'indice du milieu vaut (low + high) >> 1 — le décalage à droite est une division entière par 2.",
      "Effectue 3 comparaisons/échanges dans l'ordre : low↔mid, puis low↔high, puis mid↔high. Après ça, arr[low] ≤ arr[mid] ≤ arr[high].",
      "arr[mid] est maintenant la médiane. Place-la en arr[high - 1] pour qu'elle serve de pivot à partition().",
      "Retourne arr[high - 1], la valeur du pivot.",
    ],
    explanation:
      "La médiane de 3 réduit la probabilité de tomber sur un mauvais pivot. En choisissant la valeur médiane, on évite le cas dégénéré O(n²) qui survient quand le tableau est déjà trié et que partition() choisit toujours le plus petit ou le plus grand élément.",
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "hybrid",
    title: "TP — Quicksort hybride (seuil d'insertion)",
    description:
      "Pour les petits sous-tableaux (< THRESHOLD éléments), le tri par insertion est plus rapide car il évite la surcharge des appels récursifs. Complétez la version hybride.",
    code:
`const THRESHOLD = 10;

function hybridQuicksort(arr, low, high) {
  if (high - low < ___) {
    // Insertion sort pour les petits sous-tableaux
    for (let i = low + ___; i <= high; i++) {
      const key = arr[___];
      let j = i - 1;
      while (j >= low && arr[j] > ___) {
        arr[j + 1] = arr[___];
        j--;
      }
      arr[j + 1] = ___;
    }
    return;
  }

  const p = partition(arr, ___, high);
  hybridQuicksort(arr, low, p - ___);
  hybridQuicksort(arr, p + ___, high);
}`,
    blanks: ["THRESHOLD", "1", "i", "key", "j", "key", "low", "1", "1"],
    guide: [
      "Si high - low < THRESHOLD, le sous-tableau est assez petit pour l'insertion sort.",
      "La boucle d'insertion démarre à i = low + 1. Sauvegarde arr[i] dans key avant de déplacer les éléments.",
      "La boucle interne décale vers la droite tous les éléments plus grands que key avec arr[j + 1] = arr[j].",
      "Place key à sa position finale avec arr[j + 1] = key.",
      "Sinon (grand sous-tableau), appelle partition(arr, low, high) et recurse sur les deux moitiés ± 1.",
    ],
    explanation:
      "Le tri par insertion est très rapide sur de petits tableaux (< 10–20 éléments) car il n'a aucune surcharge d'appels récursifs et exploite bien le cache CPU. Cette optimisation est utilisée dans les implémentations réelles de qsort() en C et Arrays.sort() en Java.",
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "iterative",
    title: "TP — Quicksort itératif (pile explicite)",
    description:
      "Remplacez la récursion par une pile explicite. Chaque entrée stocke [low, high] du sous-tableau à trier. Évite le risque de stack overflow sur de grandes données.",
    code:
`function quicksortIterative(arr) {
  // Initialise la pile avec le tableau entier
  const stack = [[0, arr.length - ___]];

  while (stack.___ > 0) {
    const [low, high] = stack.___;    // Dépile

    if (low < ___) {
      const p = partition(arr, low, ___);

      // Empile les deux sous-tableaux (seulement si taille > 1)
      if (p - 1 > low)  stack.push([___, p - 1]);
      if (p + 1 < high) stack.push([p + ___, high]);
    }
  }
  return ___;
}`,
    blanks: ["1", "length", "pop", "high", "high", "low", "1", "arr"],
    guide: [
      "Initialise la pile avec [0, arr.length - 1] pour traiter tout le tableau.",
      "La boucle principale tourne tant que stack.length > 0.",
      "Dépile avec stack.pop() pour récupérer le prochain [low, high] à traiter.",
      "Si low < high, partitionne et empile les deux sous-tableaux — uniquement si leur taille est > 1 (sinon déjà triés).",
      "Retourne arr une fois la pile vide : le tableau est trié sur place.",
    ],
    explanation:
      "La version itérative mime exactement la pile d'appels de la version récursive. Elle évite le stack overflow sur de très grands tableaux. En empilant en premier le plus grand sous-tableau, on garantit une taille de pile maximale de O(log n).",
  },
];

const en = [
  {
    id: "partition",
    title: "Lomuto partition",
    description:
      "Complete the partitioning: the last element is the pivot. Everything ≤ pivot moves to the left.",
    code:
`function partition(arr, low, high) {
  const pivot = arr[___];   // Pivot = last element
  let i = ___ - 1;          // i: boundary of small elements

  for (let j = low; j < high; j++) {
    if (arr[j] <= ___) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[___], arr[i]];
    }
  }

  // Place pivot at its final position (i + 1)
  [arr[i + 1], arr[high]] = [arr[___], arr[i + 1]];
  return i + ___;
}`,
    blanks: ["high", "low", "pivot", "j", "high", "1"],
  },
  {
    id: "quicksort",
    title: "Recursive quicksort",
    description:
      "Complete the recursive function: after partitioning, recurse on both sub-arrays.",
    code:
`function quicksort(arr, low, high) {
  // Base case: sub-array of 0 or 1 element
  if (low < ___) {
    const pivotIdx = partition(arr, ___, high);

    // Recurse on the left sub-array (elements < pivot)
    quicksort(arr, low, pivotIdx - ___);

    // Recurse on the right sub-array (elements > pivot)
    quicksort(arr, pivotIdx + ___, high);
  }
}`,
    blanks: ["high", "low", "1", "1"],
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
  quicksort(copy, ___, copy.length - ___);

  return ___;
}`,
    blanks: ["arr", "0", "1", "copy"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "median3",
    title: "TP — Median of three (better pivot)",
    description:
      "Median-of-three picks a better pivot: the median value among arr[low], arr[mid] and arr[high]. Complete the selection and pivot placement.",
    code:
`function medianOfThree(arr, low, high) {
  const mid = (low + ___) >> 1;  // Middle index

  // Sort the 3 positions so that arr[mid] = median
  if (arr[low] > arr[mid])  [arr[low], arr[___]]  = [arr[mid],  arr[low]];
  if (arr[low] > arr[high]) [arr[___], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[___]]  = [arr[high], arr[mid]];

  // Place the median just before arr[high] as pivot
  [arr[mid], arr[high - 1]] = [arr[high - ___], arr[mid]];
  return arr[high - ___];  // Pivot value
}`,
    blanks: ["high", "mid", "low", "high", "1", "1"],
    guide: [
      "The middle index is (low + high) >> 1 — the right bit-shift is an integer division by 2.",
      "Perform 3 compare/swap steps in order: low↔mid, then low↔high, then mid↔high. After that, arr[low] ≤ arr[mid] ≤ arr[high].",
      "arr[mid] is now the median. Place it at arr[high - 1] so partition() can use it as the pivot.",
      "Return arr[high - 1], the pivot value.",
    ],
    explanation:
      "Median-of-three reduces the chance of picking a bad pivot. By choosing the median of 3 elements, we avoid the O(n²) degenerate case that occurs when the array is already sorted and partition() always picks the smallest or largest element.",
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "hybrid",
    title: "TP — Hybrid quicksort (insertion threshold)",
    description:
      "For small sub-arrays (< THRESHOLD elements), insertion sort is faster because it avoids recursive call overhead. Complete the hybrid version.",
    code:
`const THRESHOLD = 10;

function hybridQuicksort(arr, low, high) {
  if (high - low < ___) {
    // Insertion sort for small sub-arrays
    for (let i = low + ___; i <= high; i++) {
      const key = arr[___];
      let j = i - 1;
      while (j >= low && arr[j] > ___) {
        arr[j + 1] = arr[___];
        j--;
      }
      arr[j + 1] = ___;
    }
    return;
  }

  const p = partition(arr, ___, high);
  hybridQuicksort(arr, low, p - ___);
  hybridQuicksort(arr, p + ___, high);
}`,
    blanks: ["THRESHOLD", "1", "i", "key", "j", "key", "low", "1", "1"],
    guide: [
      "If high - low < THRESHOLD, the sub-array is small enough for insertion sort.",
      "The insertion loop starts at i = low + 1. Save arr[i] into key before shifting elements.",
      "The inner loop shifts all elements greater than key to the right: arr[j + 1] = arr[j].",
      "Place key at its final position with arr[j + 1] = key.",
      "Otherwise (large sub-array), call partition(arr, low, high) and recurse on both halves ± 1.",
    ],
    explanation:
      "Insertion sort is very fast on small arrays (< 10–20 elements) because it has no recursive call overhead and has excellent CPU cache behavior. This optimization is used in real implementations of qsort() in C and Arrays.sort() in Java.",
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "iterative",
    title: "TP — Iterative quicksort (explicit stack)",
    description:
      "Replace recursion with an explicit stack. Each entry stores [low, high] of the sub-array to sort. Avoids stack overflow risk on large data.",
    code:
`function quicksortIterative(arr) {
  // Initialize the stack with the full array
  const stack = [[0, arr.length - ___]];

  while (stack.___ > 0) {
    const [low, high] = stack.___;    // Pop

    if (low < ___) {
      const p = partition(arr, low, ___);

      // Push both sub-arrays (only if size > 1)
      if (p - 1 > low)  stack.push([___, p - 1]);
      if (p + 1 < high) stack.push([p + ___, high]);
    }
  }
  return ___;
}`,
    blanks: ["1", "length", "pop", "high", "high", "low", "1", "arr"],
    guide: [
      "Initialize the stack with [0, arr.length - 1] to process the whole array.",
      "The main loop runs while stack.length > 0.",
      "Pop with stack.pop() to get the next [low, high] pair to process.",
      "If low < high, partition and push both sub-arrays — only if their size is > 1 (otherwise already sorted).",
      "Return arr once the stack is empty: the array is sorted in place.",
    ],
    explanation:
      "The iterative version exactly mimics the recursive call stack. It avoids stack overflow on very large arrays. By pushing the larger sub-array first, the maximum stack size is guaranteed to be O(log n).",
  },
];

// ── TPs FR ────────────────────────────────────────
const tp1_fr = {
  id: "tp-quickselect",
  type: "tp",
  title: "TP — QuickSelect : kième plus petit élément",
  subject:
`Quicksort trie tout le tableau en O(n log n), mais si on veut seulement le kième plus petit élément, on peut s'arrêter dès que le pivot atterrit à l'index k. C'est l'algorithme QuickSelect en O(n) en moyenne.

Implémentez \`quickSelect(arr, k)\` où k est un index 0-basé : k=0 → minimum, k=arr.length-1 → maximum.`,
  baseCode:
`function quickSelect(arr, k) {
  const copy = [...arr];  // copie défensive

  function select(low, high) {
    if (low === high) return copy[low];

    const pivotIdx = partition(copy, low, high);

    if (pivotIdx === k) {
      // TODO : le pivot est à la bonne position → retourner sa valeur
    } else if (k < pivotIdx) {
      // TODO : k est dans la moitié gauche
    } else {
      // TODO : k est dans la moitié droite
    }
  }

  return select(0, copy.length - 1);
}

// partition() retourne l'index final du pivot (Lomuto)`,
  correction:
`function quickSelect(arr, k) {
  const copy = [...arr];

  function select(low, high) {
    if (low === high) return copy[low];

    const pivotIdx = partition(copy, low, high);

    if (pivotIdx === k) {
      return copy[pivotIdx];              // trouvé !
    } else if (k < pivotIdx) {
      return select(low, pivotIdx - 1);  // cherche à gauche
    } else {
      return select(pivotIdx + 1, high); // cherche à droite
    }
  }

  return select(0, copy.length - 1);
}

// Exemple :
// quickSelect([3, 1, 4, 1, 5, 9], 2)
// → 3  (le 3ème plus petit : tableau trié [1,1,3,4,5,9], index 2)`,
  explanation:
    "QuickSelect réutilise exactement partition() de Quicksort, mais n'explore qu'un seul sous-tableau (celui qui contient l'index k). Complexité : O(n) en moyenne car on élimine environ la moitié des éléments à chaque étape, O(n²) au pire. C'est la base de nth_element en C++ STL et de l'algorithme de médiane utilisé dans les bases de données.",
};

const tp2_fr = {
  id: "tp-sortbykey",
  type: "tp",
  title: "TP — Tri d'objets par propriété",
  subject:
`En pratique, on trie rarement des entiers — on trie des objets par une de leurs propriétés (prix, nom, date…). Adaptez Quicksort pour trier un tableau d'objets par une clé \`key\` donnée, en ordre croissant.

La seule différence avec Quicksort standard : la comparaison porte sur arr[j][key] au lieu de arr[j].`,
  baseCode:
`function sortByKey(items, key) {
  const copy = [...items];

  function partitionByKey(arr, low, high) {
    const pivotVal = arr[high][key];  // valeur pivot pour la propriété key
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // TODO : comparer arr[j][key] avec pivotVal
      //        si arr[j][key] <= pivotVal → incrémenter i et échanger
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function qs(arr, low, high) {
    if (low < high) {
      const p = partitionByKey(arr, low, high);
      qs(arr, low, p - 1);
      qs(arr, p + 1, high);
    }
  }

  qs(copy, 0, copy.length - 1);
  return copy;
}

// Exemple :
// sortByKey([{name:"Bob",age:30},{name:"Alice",age:25}], "age")
// → [{name:"Alice",age:25},{name:"Bob",age:30}]`,
  correction:
`function sortByKey(items, key) {
  const copy = [...items];

  function partitionByKey(arr, low, high) {
    const pivotVal = arr[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j][key] <= pivotVal) {         // ← comparaison sur la propriété
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function qs(arr, low, high) {
    if (low < high) {
      const p = partitionByKey(arr, low, high);
      qs(arr, low, p - 1);
      qs(arr, p + 1, high);
    }
  }

  qs(copy, 0, copy.length - 1);
  return copy;
}`,
  explanation:
    "La seule différence avec Quicksort standard est la comparaison : arr[j][key] <= pivotVal au lieu de arr[j] <= pivot. Cela illustre le concept de comparateur générique — JavaScript utilise exactement ce principe avec Array.sort((a, b) => a[key] - b[key]) en interne. Pour les chaînes, remplacez <= par localeCompare().",
};

const tp3_fr = {
  id: "tp-countswaps",
  type: "tp",
  title: "TP — Compter les échanges pendant le tri",
  subject:
`Instrumentez Quicksort pour compter le nombre total d'échanges (swaps) effectués pendant tout le tri. Cette métrique mesure le « coût concret » indépendamment de l'horloge.

Retournez \`{ sorted, swapCount }\`. Chaque échange d'éléments et chaque placement final du pivot comptent comme 1 swap.`,
  baseCode:
`function quicksortCounted(arr) {
  const copy = [...arr];
  let swapCount = 0;

  function partitionCounted(low, high) {
    const pivot = copy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (copy[j] <= pivot) {
        i++;
        // TODO : effectuer l'échange ET incrémenter swapCount
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
    }

    // TODO : échange final du pivot ET incrémenter swapCount
    [copy[i + 1], copy[high]] = [copy[high], copy[i + 1]];
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partitionCounted(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, copy.length - 1);
  return { sorted: copy, swapCount };
}`,
  correction:
`function quicksortCounted(arr) {
  const copy = [...arr];
  let swapCount = 0;

  function partitionCounted(low, high) {
    const pivot = copy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (copy[j] <= pivot) {
        i++;
        swapCount++;                              // ← compte l'échange
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
    }

    swapCount++;                                  // ← échange final du pivot
    [copy[i + 1], copy[high]] = [copy[high], copy[i + 1]];
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partitionCounted(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, copy.length - 1);
  return { sorted: copy, swapCount };
}

// Exemples :
// quicksortCounted([5,3,1,4,2]) → { sorted:[1,2,3,4,5], swapCount:6 }
// quicksortCounted([1,2,3,4,5]) → { sorted:[1,2,3,4,5], swapCount:4 }
//   (tableau trié + pivot=dernier : 0 échange d'éléments, 1 pivot × n niveaux)`,
  explanation:
    "Compter les échanges révèle un fait contre-intuitif : un tableau déjà trié avec pivot = dernier élément donne 0 échanges d'éléments mais n échanges de pivot (un par appel récursif). C'est pourquoi ce cas est O(n²) malgré l'absence de vrais désordres — chaque appel ne réduit le tableau que d'un seul élément.",
};

// ── TPs EN ────────────────────────────────────────
const tp1_en = {
  id: "tp-quickselect",
  type: "tp",
  title: "TP — QuickSelect: kth smallest element",
  subject:
`Quicksort sorts the entire array in O(n log n), but if you only need the kth smallest element, you can stop as soon as the pivot lands at index k. This is the QuickSelect algorithm in O(n) on average.

Implement \`quickSelect(arr, k)\` where k is 0-based: k=0 → minimum, k=arr.length-1 → maximum.`,
  baseCode:
`function quickSelect(arr, k) {
  const copy = [...arr];  // defensive copy

  function select(low, high) {
    if (low === high) return copy[low];

    const pivotIdx = partition(copy, low, high);

    if (pivotIdx === k) {
      // TODO: pivot is at the right position → return its value
    } else if (k < pivotIdx) {
      // TODO: k is in the left half
    } else {
      // TODO: k is in the right half
    }
  }

  return select(0, copy.length - 1);
}

// partition() returns the final pivot index (Lomuto scheme)`,
  correction:
`function quickSelect(arr, k) {
  const copy = [...arr];

  function select(low, high) {
    if (low === high) return copy[low];

    const pivotIdx = partition(copy, low, high);

    if (pivotIdx === k) {
      return copy[pivotIdx];              // found!
    } else if (k < pivotIdx) {
      return select(low, pivotIdx - 1);  // search left
    } else {
      return select(pivotIdx + 1, high); // search right
    }
  }

  return select(0, copy.length - 1);
}

// Example:
// quickSelect([3, 1, 4, 1, 5, 9], 2)
// → 3  (3rd smallest: sorted array [1,1,3,4,5,9], index 2)`,
  explanation:
    "QuickSelect reuses exactly partition() from Quicksort, but only explores one sub-array (the one containing index k). Complexity: O(n) on average since we eliminate about half the elements each step, O(n²) worst case. It's the basis of nth_element in C++ STL and the median algorithm used in databases.",
};

const tp2_en = {
  id: "tp-sortbykey",
  type: "tp",
  title: "TP — Sort objects by property",
  subject:
`In practice, we rarely sort integers — we sort objects by one of their properties (price, name, date…). Adapt Quicksort to sort an array of objects by a given \`key\`, in ascending order.

The only difference from standard Quicksort: the comparison is on arr[j][key] instead of arr[j].`,
  baseCode:
`function sortByKey(items, key) {
  const copy = [...items];

  function partitionByKey(arr, low, high) {
    const pivotVal = arr[high][key];  // pivot value for property key
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // TODO: compare arr[j][key] with pivotVal
      //       if arr[j][key] <= pivotVal → increment i and swap
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function qs(arr, low, high) {
    if (low < high) {
      const p = partitionByKey(arr, low, high);
      qs(arr, low, p - 1);
      qs(arr, p + 1, high);
    }
  }

  qs(copy, 0, copy.length - 1);
  return copy;
}

// Example:
// sortByKey([{name:"Bob",age:30},{name:"Alice",age:25}], "age")
// → [{name:"Alice",age:25},{name:"Bob",age:30}]`,
  correction:
`function sortByKey(items, key) {
  const copy = [...items];

  function partitionByKey(arr, low, high) {
    const pivotVal = arr[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j][key] <= pivotVal) {         // ← compare on the property
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function qs(arr, low, high) {
    if (low < high) {
      const p = partitionByKey(arr, low, high);
      qs(arr, low, p - 1);
      qs(arr, p + 1, high);
    }
  }

  qs(copy, 0, copy.length - 1);
  return copy;
}`,
  explanation:
    "The only difference from standard Quicksort is the comparison: arr[j][key] <= pivotVal instead of arr[j] <= pivot. This illustrates the generic comparator concept — JavaScript uses exactly this principle with Array.sort((a, b) => a[key] - b[key]) internally. For strings, replace <= with localeCompare().",
};

const tp3_en = {
  id: "tp-countswaps",
  type: "tp",
  title: "TP — Count swaps during sorting",
  subject:
`Instrument Quicksort to count the total number of swaps performed during the sort. This metric measures the concrete cost independently of the clock.

Return \`{ sorted, swapCount }\`. Each element swap and each final pivot placement count as 1 swap.`,
  baseCode:
`function quicksortCounted(arr) {
  const copy = [...arr];
  let swapCount = 0;

  function partitionCounted(low, high) {
    const pivot = copy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (copy[j] <= pivot) {
        i++;
        // TODO: perform the swap AND increment swapCount
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
    }

    // TODO: final pivot swap AND increment swapCount
    [copy[i + 1], copy[high]] = [copy[high], copy[i + 1]];
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partitionCounted(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, copy.length - 1);
  return { sorted: copy, swapCount };
}`,
  correction:
`function quicksortCounted(arr) {
  const copy = [...arr];
  let swapCount = 0;

  function partitionCounted(low, high) {
    const pivot = copy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (copy[j] <= pivot) {
        i++;
        swapCount++;                              // ← count the swap
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
    }

    swapCount++;                                  // ← count pivot placement
    [copy[i + 1], copy[high]] = [copy[high], copy[i + 1]];
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partitionCounted(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, copy.length - 1);
  return { sorted: copy, swapCount };
}

// Examples:
// quicksortCounted([5,3,1,4,2]) → { sorted:[1,2,3,4,5], swapCount:6 }
// quicksortCounted([1,2,3,4,5]) → { sorted:[1,2,3,4,5], swapCount:4 }
//   (sorted array + pivot=last: 0 element swaps, 1 pivot swap × n levels)`,
  explanation:
    "Counting swaps reveals a counterintuitive fact: an already-sorted array with pivot = last element gives 0 element swaps but n pivot swaps (one per recursive call). This is why that case is O(n²) despite no real disorder — each call only shrinks the array by one element.",
};

fr.push(tp1_fr, tp2_fr, tp3_fr);
en.push(tp1_en, tp2_en, tp3_en);

export const QUICKSORT_EXERCISES = { fr, en };
