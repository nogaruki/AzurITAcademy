// ─── Données du cours Mergesort ───

const fr = [
  {
    id: "diviser",
    title: "Diviser pour régner",
    icon: "◈",
    content: `**Diviser pour régner** est le cœur du Tri fusion : on **coupe le tableau en deux** récursivement jusqu'à obtenir des sous-tableaux d'un seul élément (déjà triés), puis on **fusionne** ces morceaux triés deux à deux.\n\nContrairement à Quicksort qui fait tout le travail lors de la division (choix du pivot), Mergesort fait tout le travail lors de la **fusion**. La division est triviale : couper au milieu.\n\nCette approche garantit toujours **O(n log n)** opérations, quelles que soient les données d'entrée.`,
  },
  {
    id: "fusion",
    title: "Fusionner deux tableaux triés",
    icon: "◇",
    content: `L'opération clé est **merge()** : fusionner deux sous-tableaux déjà triés en un seul sous-tableau trié.\n\nOn utilise **deux pointeurs** i et j :\n1. Comparer arr[i] (moitié gauche) et arr[j] (moitié droite)\n2. Copier le plus petit dans le tableau de sortie, avancer le pointeur correspondant\n3. Répéter jusqu'à épuisement d'une moitié\n4. Copier les éléments restants de l'autre moitié\n\n**Exemple :** fusionner [3, 27, 38] et [9, 10, 43, 82]\n→ 3, 9, 10, 27, 38, 43, 82`,
  },
  {
    id: "usages",
    title: "À quoi sert Mergesort ?",
    icon: "◉",
    content: `Mergesort est l'algorithme de tri **stable et garanti en O(n log n)** par excellence. On le retrouve dans des contextes critiques :\n\n**Bibliothèques standard :**\n- \`Arrays.sort()\` en **Java** pour les objets (garantie de stabilité)\n- \`sorted()\` et \`.sort()\` en **Python** (Timsort = hybride Mergesort + insertion)\n- **Git** l'utilise pour fusionner des branches de manière stable\n\n**Cas d'usage réels :**\n- **Tri externe** : trier des fichiers qui ne tiennent pas en RAM (bases de données)\n- **Tri parallèle** : chaque moitié peut être triée indépendamment sur un autre processeur\n- **Listes chaînées** : Mergesort est optimal pour les listes (pas d'accès aléatoire nécessaire)\n- **Données streaming** : fusionne des flux déjà triés en temps réel\n\n**Pourquoi pas Quicksort partout ?** Quicksort n'est pas stable et a un pire cas O(n²). Mergesort est stable et toujours O(n log n).`,
  },
  {
    id: "algorithm",
    title: "Comment fonctionne Mergesort ?",
    icon: "▣",
    content: `**L'algorithme en 3 étapes :**\n\n1. **Diviser** : couper le tableau [left..right] en deux moitiés [left..mid] et [mid+1..right]\n2. **Récurser** : trier chaque moitié indépendamment\n3. **Fusionner** : combiner les deux moitiés triées avec merge()\n\n**Base de récursion :** un sous-tableau de taille 0 ou 1 est déjà trié — on s'arrête.\n\n**La récursion forme un arbre binaire complet** de profondeur log₂(n). À chaque niveau, on fait O(n) comparaisons au total. D'où : O(n log n) au total.\n\n**Point clé :** merge() nécessite un **tableau auxiliaire** de taille O(n) pour stocker les copies temporaires.`,
  },
  {
    id: "complexity",
    title: "Complexité & analyse",
    icon: "⬡",
    content: `**Tous les cas : O(n log n)**\nMergesort divise toujours exactement en deux (pas de pivot aléatoire), donc la profondeur est toujours log₂(n), et chaque niveau fait O(n) fusions.\n\n**Meilleur cas : O(n log n)** — même sur un tableau trié, on execute toutes les fusions.\n\n**Pire cas : O(n log n)** — aucun cas dégénéré possible, contrairement à Quicksort.\n\n**Complexité spatiale : O(n)** — les tableaux auxiliaires de merge() totalisent O(n) mémoire.\n\n**Stable** : merge() conserve l'ordre relatif des éléments égaux (utilise ≤ pour favoriser la gauche).`,
  },
  {
    id: "practice",
    title: "Avantages & limitations",
    icon: "⟐",
    content: `**Avantages :**\n\n**Garanti O(n log n)** dans tous les cas — pas de mauvaise surprise comme Quicksort.\n\n**Stable** : deux éléments égaux conservent leur ordre d'origine (important pour les tris multi-critères).\n\n**Parallélisable** : les deux moitiés sont indépendantes → triables en parallèle.\n\n**Optimal pour les listes chaînées** : contrairement à Quicksort, ne nécessite pas d'accès aléatoire.\n\n**Limitations :**\n\n**Mémoire O(n)** : alloue des tableaux auxiliaires, ce qui le rend moins efficace en mémoire que Quicksort.\n\n**Plus lent en pratique** : Quicksort exploite mieux le cache CPU (tri en place), Mergesort fait plus de copies mémoire.`,
  },
  {
    id: "recap",
    title: "Récapitulatif",
    icon: "⬢",
    content: `**5 points clés :**\n\n1. **Diviser pour régner** : diviser → récurser → fusionner\n2. La fusion est l'opération clé : elle combine deux moitiés triées en O(n)\n3. Complexité **O(n log n) garantie** dans tous les cas (meilleur, moyen, pire)\n4. **Stable** : préserve l'ordre relatif des éléments égaux\n5. **Non en place** : nécessite O(n) mémoire supplémentaire\n\n**Mergesort vs Quicksort :** Quicksort est plus rapide en pratique (cache), Mergesort garantit O(n log n) et est stable — préférable pour les données en mémoire externe ou quand la stabilité compte.`,
  },
];

const en = [
  {
    id: "diviser",
    title: "Divide and Conquer",
    icon: "◈",
    content: `**Divide and conquer** is the core of Merge Sort: we **split the array in two** recursively until we get single-element sub-arrays (already sorted), then **merge** those sorted pieces two by two.\n\nUnlike Quicksort which does all the work during the split (pivot selection), Mergesort does all the work during the **merge**. The split is trivial: cut in the middle.\n\nThis approach always guarantees **O(n log n)** operations, regardless of the input data.`,
  },
  {
    id: "fusion",
    title: "Merging two sorted arrays",
    icon: "◇",
    content: `The key operation is **merge()**: combining two already-sorted sub-arrays into one sorted sub-array.\n\nWe use **two pointers** i and j:\n1. Compare arr[i] (left half) and arr[j] (right half)\n2. Copy the smaller one into the output array, advance the corresponding pointer\n3. Repeat until one half is exhausted\n4. Copy the remaining elements from the other half\n\n**Example:** merge [3, 27, 38] and [9, 10, 43, 82]\n→ 3, 9, 10, 27, 38, 43, 82`,
  },
  {
    id: "usages",
    title: "What is Mergesort used for?",
    icon: "◉",
    content: `Mergesort is the go-to algorithm for **stable, guaranteed O(n log n)** sorting. It appears in critical contexts:\n\n**Standard libraries:**\n- \`Arrays.sort()\` in **Java** for objects (stability guarantee)\n- \`sorted()\` and \`.sort()\` in **Python** (Timsort = Mergesort + insertion sort hybrid)\n- **Git** uses it to merge branches in a stable manner\n\n**Real-world use cases:**\n- **External sorting**: sorting files that don't fit in RAM (databases)\n- **Parallel sorting**: each half can be sorted independently on another processor\n- **Linked lists**: Mergesort is optimal for lists (no random access needed)\n- **Streaming data**: merges already-sorted streams in real time\n\n**Why not Quicksort everywhere?** Quicksort is unstable and has an O(n²) worst case. Mergesort is stable and always O(n log n).`,
  },
  {
    id: "algorithm",
    title: "How does Mergesort work?",
    icon: "▣",
    content: `**The algorithm in 3 steps:**\n\n1. **Divide**: split array [left..right] into two halves [left..mid] and [mid+1..right]\n2. **Recurse**: sort each half independently\n3. **Merge**: combine the two sorted halves with merge()\n\n**Recursion base case:** a sub-array of size 0 or 1 is already sorted — we stop.\n\n**The recursion forms a complete binary tree** of depth log₂(n). At each level, we do O(n) comparisons in total. Hence: O(n log n) overall.\n\n**Key point:** merge() requires an **auxiliary array** of size O(n) to store temporary copies.`,
  },
  {
    id: "complexity",
    title: "Complexity & analysis",
    icon: "⬡",
    content: `**All cases: O(n log n)**\nMergesort always splits exactly in two (no random pivot), so the depth is always log₂(n), and each level does O(n) merges.\n\n**Best case: O(n log n)** — even on a sorted array, all merges are executed.\n\n**Worst case: O(n log n)** — no degenerate case possible, unlike Quicksort.\n\n**Space complexity: O(n)** — the auxiliary arrays in merge() total O(n) memory.\n\n**Stable**: merge() preserves the relative order of equal elements (uses ≤ to favor the left side).`,
  },
  {
    id: "practice",
    title: "Advantages & limitations",
    icon: "⟐",
    content: `**Advantages:**\n\n**Guaranteed O(n log n)** in all cases — no bad surprises like Quicksort.\n\n**Stable**: two equal elements keep their original order (important for multi-key sorts).\n\n**Parallelizable**: both halves are independent → can be sorted in parallel.\n\n**Optimal for linked lists**: unlike Quicksort, doesn't need random access.\n\n**Limitations:**\n\n**O(n) memory**: allocates auxiliary arrays, making it less memory-efficient than Quicksort.\n\n**Slower in practice**: Quicksort exploits CPU cache better (in-place), Mergesort does more memory copies.`,
  },
  {
    id: "recap",
    title: "Summary",
    icon: "⬢",
    content: `**5 key points:**\n\n1. **Divide and conquer**: split → recurse → merge\n2. Merging is the key operation: combines two sorted halves in O(n)\n3. Complexity **O(n log n) guaranteed** in all cases (best, average, worst)\n4. **Stable**: preserves relative order of equal elements\n5. **Not in-place**: requires O(n) extra memory\n\n**Mergesort vs Quicksort:** Quicksort is faster in practice (cache), Mergesort guarantees O(n log n) and is stable — preferable for external memory data or when stability matters.`,
  },
];

export const MERGESORT_SECTIONS = { fr, en };
