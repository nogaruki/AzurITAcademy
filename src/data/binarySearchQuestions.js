// ─── Questions du quiz Recherche Binaire ───

const fr = [
  {
    q: "Quelle est la complexité temporelle de la recherche binaire dans le pire cas ?",
    opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: 2,
    explain:
      "À chaque itération, la recherche binaire divise la plage active par 2. Après k étapes, il reste n/2^k éléments. On s'arrête quand n/2^k ≤ 1, soit k = log₂(n). Le pire cas est donc O(log n) — sur 1 000 000 d'éléments, au plus 20 comparaisons.",
  },
  {
    q: "Quelle précondition est indispensable pour appliquer la recherche binaire ?",
    opts: [
      "Le tableau doit contenir uniquement des entiers",
      "Le tableau doit être trié",
      "Le tableau doit avoir une taille en puissance de 2",
      "Le tableau doit être en mémoire contiguë",
    ],
    answer: 1,
    explain:
      "La recherche binaire suppose que le tableau est trié : si arr[mid] < target, on sait avec certitude que la cible est à droite. Sans tri, cette déduction est invalide et l'algorithme peut manquer l'élément. Le type de données ou la taille ne changent pas cette exigence.",
  },
  {
    q: "Combien de comparaisons la recherche binaire effectue-t-elle au maximum sur un tableau de 1 024 éléments ?",
    opts: ["5", "10", "11", "1 024"],
    answer: 1,
    explain:
      "log₂(1024) = 10. La recherche binaire divise par 2 à chaque étape : 1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1. Au plus 10 comparaisons pour 1024 éléments — à comparer aux 1024 comparaisons dans le pire cas d'une recherche linéaire.",
  },
  {
    q: "Pourquoi utilise-t-on `mid = Math.floor((lo + hi) / 2)` et non `mid = (lo + hi) / 2` en TypeScript/JavaScript ?",
    opts: [
      "Pour éviter un dépassement d'entier (integer overflow)",
      "Pour garantir que mid est toujours dans le tableau",
      "Math.floor est plus rapide que la division entière",
      "Pour que mid soit toujours le plus petit des deux indices",
    ],
    answer: 1,
    explain:
      "En JavaScript, tous les nombres sont des flottants 64 bits (Number), donc (lo + hi) peut donner un flottant non entier. Math.floor() garantit que mid est un entier valide pour indexer le tableau. En C/Java, la raison principale est l'integer overflow : si lo et hi sont grands, lo + hi peut dépasser la valeur maximale d'un int. La formule sûre serait alors `lo + Math.floor((hi - lo) / 2)`.",
  },
  {
    q: "Quelle est la complexité spatiale de la recherche binaire itérative ?",
    opts: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    answer: 2,
    explain:
      "La version itérative utilise seulement 3 variables (lo, hi, mid) quelle que soit la taille du tableau — c'est donc O(1) en espace. En revanche, la version récursive consomme O(log n) sur la pile d'appels (profondeur de récursion = log₂ n). C'est pourquoi la version itérative est préférée en pratique.",
  },
];

const en = [
  {
    q: "What is the worst-case time complexity of binary search?",
    opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answer: 2,
    explain:
      "At each iteration, binary search halves the active range. After k steps, n/2^k elements remain. We stop when n/2^k ≤ 1, i.e. k = log₂(n). The worst case is therefore O(log n) — on 1,000,000 elements, at most 20 comparisons.",
  },
  {
    q: "What precondition is essential to apply binary search?",
    opts: [
      "The array must contain only integers",
      "The array must be sorted",
      "The array size must be a power of 2",
      "The array must be in contiguous memory",
    ],
    answer: 1,
    explain:
      "Binary search assumes the array is sorted: if arr[mid] < target, we know for certain the target is to the right. Without sorting, this deduction is invalid and the algorithm can miss the element. The data type or size don't change this requirement.",
  },
  {
    q: "How many comparisons does binary search perform at most on an array of 1,024 elements?",
    opts: ["5", "10", "11", "1,024"],
    answer: 1,
    explain:
      "log₂(1024) = 10. Binary search halves each step: 1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1. At most 10 comparisons for 1024 elements — compared to 1024 comparisons in the worst case of a linear search.",
  },
  {
    q: "Why use `mid = Math.floor((lo + hi) / 2)` instead of `mid = (lo + hi) / 2` in TypeScript/JavaScript?",
    opts: [
      "To avoid integer overflow",
      "To guarantee mid is always inside the array",
      "Math.floor is faster than integer division",
      "To ensure mid is always the smaller of the two indices",
    ],
    answer: 1,
    explain:
      "In JavaScript, all numbers are 64-bit floats (Number), so (lo + hi) can yield a non-integer float. Math.floor() guarantees mid is a valid integer for array indexing. In C/Java, the primary reason is integer overflow: if lo and hi are large, lo + hi can exceed the maximum int value. The safe formula there would be `lo + Math.floor((hi - lo) / 2)`.",
  },
  {
    q: "What is the space complexity of iterative binary search?",
    opts: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    answer: 2,
    explain:
      "The iterative version uses only 3 variables (lo, hi, mid) regardless of array size — so O(1) space. In contrast, the recursive version consumes O(log n) on the call stack (recursion depth = log₂ n). That's why the iterative version is preferred in practice.",
  },
];

export const BINARY_SEARCH_QUIZ_QUESTIONS = { fr, en };
