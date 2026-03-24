// ─── Questions du quiz Quicksort ───

const fr = [
  {
    q: "Quelle est la complexité temporelle moyenne de Quicksort ?",
    opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: 1,
    explain:
      "En cas moyen, le pivot divise le tableau en deux moitiés équilibrées : log n niveaux de récursion × O(n) comparaisons par niveau = O(n log n).",
  },
  {
    q: "Dans quel cas Quicksort atteint-il sa complexité dans le pire cas O(n²) ?",
    opts: [
      "Le tableau est mélangé aléatoirement",
      "Le pivot est toujours le plus grand ou le plus petit élément",
      "Le tableau a un nombre impair d'éléments",
      "Les éléments sont tous identiques",
    ],
    answer: 1,
    explain:
      "Si le pivot est toujours l'extrême (ex. tableau déjà trié + pivot = dernier élément), chaque partition ne réduit la taille que de 1 → n niveaux de profondeur, O(n²) au total.",
  },
  {
    q: "Quicksort est-il un algorithme de tri stable ?",
    opts: [
      "Oui, il préserve toujours l'ordre des éléments égaux",
      "Non, les échanges peuvent modifier l'ordre relatif des éléments égaux",
      "Oui, mais seulement si le pivot est le premier élément",
      "Cela dépend de la taille du tableau",
    ],
    answer: 1,
    explain:
      "Quicksort n'est pas stable : les échanges lors du partitionnement peuvent réordonner des éléments de même valeur. Pour la stabilité, préférez Mergesort ou Timsort.",
  },
  {
    q: "Dans le schéma de Lomuto, à quel index se retrouve le pivot après `partition(arr, low, high)` ?",
    opts: [
      "Toujours à l'index `high`",
      "À l'index `i + 1`, où `i` est la frontière finale des petits éléments",
      "Toujours au milieu exact du sous-tableau",
      "À l'index `low`",
    ],
    answer: 1,
    explain:
      "À la fin du partitionnement Lomuto, on fait l'échange arr[i+1] ↔ arr[high]. Le pivot se place à l'index i+1, qui est sa position correcte dans le tableau trié final.",
  },
  {
    q: "Pourquoi Quicksort est-il souvent plus rapide que Mergesort en pratique ?",
    opts: [
      "Sa complexité asymptotique est strictement meilleure",
      "Il trie en place, ce qui améliore la localité de cache CPU",
      "Il n'utilise pas de récursion",
      "Il est O(n) sur les tableaux presque triés",
    ],
    answer: 1,
    explain:
      "Quicksort trie en place (sans tableau auxiliaire), ce qui améliore la localité de cache. Mergesort alloue O(n) mémoire supplémentaire, entraînant plus d'accès mémoire lents.",
  },
];

const en = [
  {
    q: "What is the average time complexity of Quicksort?",
    opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    answer: 1,
    explain:
      "On average, the pivot splits the array into balanced halves: log n recursion levels × O(n) comparisons per level = O(n log n).",
  },
  {
    q: "In what case does Quicksort reach its worst-case complexity O(n²)?",
    opts: [
      "The array is randomly shuffled",
      "The pivot is always the largest or smallest element",
      "The array has an odd number of elements",
      "All elements are identical",
    ],
    answer: 1,
    explain:
      "If the pivot is always extreme (e.g., sorted array + pivot = last element), each partition only reduces size by 1 → n levels of depth, O(n²) total.",
  },
  {
    q: "Is Quicksort a stable sorting algorithm?",
    opts: [
      "Yes, it always preserves the order of equal elements",
      "No, swaps can modify the relative order of equal elements",
      "Yes, but only if the pivot is the first element",
      "It depends on the array size",
    ],
    answer: 1,
    explain:
      "Quicksort is not stable: swaps during partitioning can reorder elements with the same value. For stability, prefer Mergesort or Timsort.",
  },
  {
    q: "In the Lomuto scheme, at what index does the pivot end up after `partition(arr, low, high)`?",
    opts: [
      "Always at index `high`",
      "At index `i + 1`, where `i` is the final boundary of small elements",
      "Always at the exact middle of the sub-array",
      "At index `low`",
    ],
    answer: 1,
    explain:
      "At the end of Lomuto partitioning, we swap arr[i+1] ↔ arr[high]. The pivot lands at index i+1, which is its correct position in the final sorted array.",
  },
  {
    q: "Why is Quicksort often faster than Mergesort in practice?",
    opts: [
      "Its asymptotic complexity is strictly better",
      "It sorts in-place, improving CPU cache locality",
      "It never uses recursion",
      "It is O(n) on nearly-sorted arrays",
    ],
    answer: 1,
    explain:
      "Quicksort sorts in-place (no auxiliary array), exploiting the CPU cache very efficiently. Mergesort needs an auxiliary array of size n, causing more cache misses.",
  },
];

export const QUICKSORT_QUIZ_QUESTIONS = { fr, en };
