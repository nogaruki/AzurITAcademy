// ─── Questions du quiz Mergesort ───

const fr = [
  {
    q: "Quelle est la complexité temporelle de Mergesort dans le pire cas ?",
    opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    answer: 2,
    explain:
      "Mergesort divise toujours le tableau en deux moitiés égales (log₂ n niveaux de récursion), et chaque niveau effectue O(n) comparaisons lors de la fusion. Résultat : O(n log n) dans tous les cas, sans exception.",
  },
  {
    q: "Quelle complexité spatiale Mergesort nécessite-t-il ?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    explain:
      "Mergesort utilise des tableaux auxiliaires dans merge() pour stocker les copies temporaires. Au total, ces tableaux occupent O(n) mémoire supplémentaire. C'est son principal désavantage par rapport à Quicksort (O(log n) en place).",
  },
  {
    q: "Mergesort est-il un algorithme de tri stable ?",
    opts: [
      "Non, les fusions peuvent réordonner les éléments égaux",
      "Oui, merge() favorise toujours l'élément gauche en cas d'égalité (≤)",
      "Oui, mais seulement sur des tableaux de taille paire",
      "Cela dépend de l'implémentation",
    ],
    answer: 1,
    explain:
      "Mergesort est stable : dans merge(), la condition `leftArr[i] <= rightArr[j]` favorise l'élément de gauche en cas d'égalité. Les éléments égaux de la moitié gauche sont donc toujours placés avant ceux de la moitié droite, préservant leur ordre relatif.",
  },
  {
    q: "Comment Mergesort divise-t-il le tableau à chaque étape ?",
    opts: [
      "Il choisit un pivot et partitionne autour de lui",
      "Il coupe toujours au milieu : mid = ⌊(left + right) / 2⌋",
      "Il trie d'abord les petits éléments puis les grands",
      "Il divise selon la valeur médiane",
    ],
    answer: 1,
    explain:
      "Mergesort coupe toujours au milieu de l'indice : mid = Math.floor((left + right) / 2). C'est une division régulière qui garantit log₂(n) niveaux de récursion. C'est très différent de Quicksort dont le pivot est variable.",
  },
  {
    q: "Dans quel cas Mergesort est-il préférable à Quicksort ?",
    opts: [
      "Pour trier des petits tableaux (<10 éléments)",
      "Quand la stabilité du tri est requise ou pour les données en mémoire externe",
      "Quand on veut économiser la mémoire RAM",
      "Quand les données sont déjà presque triées",
    ],
    answer: 1,
    explain:
      "Mergesort est préférable à Quicksort quand : (1) la stabilité est requise (Java l'utilise pour les objets), (2) les données ne tiennent pas en RAM (tri externe sur disque), ou (3) on veut une garantie O(n log n) sans pire cas. Quicksort reste plus rapide en pratique pour les tableaux en mémoire.",
  },
];

const en = [
  {
    q: "What is the worst-case time complexity of Mergesort?",
    opts: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    answer: 2,
    explain:
      "Mergesort always splits the array into two equal halves (log₂ n recursion levels), and each level performs O(n) comparisons during merging. Result: O(n log n) in all cases, no exceptions.",
  },
  {
    q: "What space complexity does Mergesort require?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    answer: 2,
    explain:
      "Mergesort uses auxiliary arrays in merge() to store temporary copies. In total, these arrays take O(n) extra memory. This is its main disadvantage compared to Quicksort (O(log n) in-place).",
  },
  {
    q: "Is Mergesort a stable sorting algorithm?",
    opts: [
      "No, merges can reorder equal elements",
      "Yes, merge() always favors the left element on equality (≤)",
      "Yes, but only on even-sized arrays",
      "It depends on the implementation",
    ],
    answer: 1,
    explain:
      "Mergesort is stable: in merge(), the condition `leftArr[i] <= rightArr[j]` favors the left element on equality. Equal elements from the left half are always placed before those from the right half, preserving their relative order.",
  },
  {
    q: "How does Mergesort split the array at each step?",
    opts: [
      "It picks a pivot and partitions around it",
      "It always cuts in the middle: mid = ⌊(left + right) / 2⌋",
      "It sorts the small elements first then the large ones",
      "It splits based on the median value",
    ],
    answer: 1,
    explain:
      "Mergesort always cuts at the middle index: mid = Math.floor((left + right) / 2). This regular split guarantees log₂(n) recursion levels. This is very different from Quicksort whose pivot position varies.",
  },
  {
    q: "When is Mergesort preferable to Quicksort?",
    opts: [
      "For sorting small arrays (<10 elements)",
      "When sort stability is required or for data in external memory",
      "When you want to save RAM",
      "When data is almost already sorted",
    ],
    answer: 1,
    explain:
      "Mergesort is preferable to Quicksort when: (1) stability is required (Java uses it for objects), (2) data doesn't fit in RAM (external disk sorting), or (3) you need a guaranteed O(n log n) without a worst case. Quicksort remains faster in practice for in-memory arrays.",
  },
];

export const MERGESORT_QUIZ_QUESTIONS = { fr, en };
