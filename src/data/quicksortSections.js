// ─── Données du cours Quicksort ───

const fr = [
  {
    id: "diviser",
    title: "Diviser pour régner",
    icon: "◈",
    content: `**Diviser pour régner** est une stratégie algorithmique puissante : on **coupe un problème en sous-problèmes plus petits**, on résout chacun, puis on **combine** les résultats.\n\nTrier 1000 éléments est difficile. Mais si on coupe le tableau en deux, on trie chaque moitié séparément — et ainsi de suite, jusqu'à des sous-tableaux d'un seul élément (déjà triés).\n\nQuicksort applique cette idée grâce à un **pivot** : un élément placé à sa position définitive, qui divise le tableau en deux sous-problèmes indépendants.`,
  },
  {
    id: "pivot",
    title: "L'idée du pivot",
    icon: "◇",
    content: `Un **pivot** est un élément choisi dans le tableau. L'objectif : le placer à sa **position finale correcte** dans le tableau trié.\n\nUne fois le pivot en place :\n- Tous les éléments **à gauche** sont ≤ au pivot\n- Tous les éléments **à droite** sont ≥ au pivot\n\nOn appelle ça le **partitionnement**. Ensuite, on applique le même procédé récursivement aux deux moitiés — jusqu'à ce que chaque sous-tableau ait 0 ou 1 élément.`,
  },
  {
    id: "usages",
    title: "À quoi sert Quicksort ?",
    icon: "◉",
    content: `Quicksort est **l'algorithme de tri le plus utilisé en pratique**. On le retrouve partout :\n\n**Bibliothèques standard :**\n- \`std::sort\` en **C++** (introsort basé sur Quicksort)\n- \`Arrays.sort()\` en **Java** pour les types primitifs\n- \`Array.prototype.sort()\` dans le moteur **V8** (JavaScript)\n\n**Cas d'usage réels :**\n- **Bases de données** : trier des résultats de requêtes en mémoire vive\n- **Systèmes embarqués** : tri rapide avec peu de mémoire auxiliaire\n- **Traitement de données** : pipelines ETL, pré-traitement de datasets\n- **Moteurs de jeux vidéo** : tri des objets à afficher par profondeur (depth sorting)\n\n**Pourquoi pas Mergesort partout ?** Quicksort est souvent 2× plus rapide en pratique grâce à sa localité de cache, même si Mergesort garantit O(n log n) dans tous les cas.`,
  },
  {
    id: "partition",
    title: "Partitionnement (Lomuto)",
    icon: "◆",
    content: `Le **schéma de Lomuto** (le plus lisible) utilise le dernier élément comme pivot :\n\n1. **pivot = arr[high]** (dernier élément du sous-tableau)\n2. **i = low − 1** (frontière des éléments ≤ pivot)\n3. Pour **j** de low à high−1 :\n   - Si arr[j] ≤ pivot : i++, échanger arr[i] ↔ arr[j]\n4. Placer le pivot : échanger arr[i+1] ↔ arr[high]\n\nRésultat : le pivot est à l'index **i+1**, les petits à gauche, les grands à droite.`,
  },
  {
    id: "algorithm",
    title: "Comment fonctionne Quicksort ?",
    icon: "▣",
    content: `**L'algorithme en 3 étapes :**\n\n1. **Choisir** un pivot (ici, le dernier élément du sous-tableau)\n2. **Partitionner** : réorganiser les éléments autour du pivot\n3. **Récurser** sur le sous-tableau gauche [low..pivot−1] et droit [pivot+1..high]\n\n**Base de récursion :** un sous-tableau de taille 0 ou 1 est déjà trié — on s'arrête.\n\nChaque appel place **exactement un pivot** à sa position définitive. Avec n éléments, après n placements, tout est trié.`,
  },
  {
    id: "complexity",
    title: "Complexité & analyse",
    icon: "⬡",
    content: `**Cas moyen : O(n log n)**\nQuand le pivot divise le tableau en deux moitiés équilibrées, on a log n niveaux de récursion, chacun faisant O(n) comparaisons.\n\n**Pire cas : O(n²)**\nSi le pivot est toujours l'extrême (tableau trié + pivot = dernier élément), on a n niveaux de récursion de taille n−1, n−2, … : O(n²).\n\n**Meilleur cas : O(n log n)**\nQuand le pivot tombe toujours au milieu exact.\n\n**Complexité spatiale : O(log n)** en moyenne (pile de récursion).`,
  },
  {
    id: "practice",
    title: "Pourquoi Quicksort est-il rapide ?",
    icon: "⟐",
    content: `Malgré un pire cas en O(n²), Quicksort est **le tri le plus utilisé en pratique** :\n\n**Localité de cache** : il trie **en place** (pas de tableau auxiliaire), exploitant très bien le cache CPU.\n\n**Facteur constant faible** : ses opérations élémentaires (comparaisons, swaps) sont très légères.\n\n**Pivot aléatoire** : en choisissant le pivot aléatoirement, le pire cas devient statistiquement négligeable.\n\n**Dans la vraie vie :** C'est la base de \`Array.prototype.sort()\` dans V8 (JavaScript), de \`std::sort\` en C++, et de \`sorted()\` en Python (hybride Timsort).`,
  },
  {
    id: "recap",
    title: "Récapitulatif",
    icon: "⬢",
    content: `**5 points clés :**\n\n1. **Diviser pour régner** : pivot → partitionner → récurser\n2. Le pivot est placé à sa **position finale** à chaque étape\n3. Complexité **O(n log n)** en moyenne, **O(n²)** au pire\n4. **Non stable** : deux éléments égaux peuvent changer d'ordre relatif\n5. **En place** : mémoire O(log n), bien adapté au cache CPU\n\n**Quicksort vs Mergesort :** Quicksort est plus rapide en pratique (cache), Mergesort garantit O(n log n) et est stable — préférable pour les données en mémoire externe.`,
  },
];

const en = [
  {
    id: "diviser",
    title: "Divide and Conquer",
    icon: "◈",
    content: `**Divide and conquer** is a powerful algorithmic strategy: we **break a problem into smaller sub-problems**, solve each one, then **combine** the results.\n\nSorting 1000 elements is hard. But if we split the array in two, we sort each half separately — and so on, down to single-element sub-arrays (already sorted).\n\nQuicksort applies this idea using a **pivot**: an element placed at its final position, dividing the array into two independent sub-problems.`,
  },
  {
    id: "pivot",
    title: "The pivot idea",
    icon: "◇",
    content: `A **pivot** is an element chosen from the array. The goal: place it at its **correct final position** in the sorted array.\n\nOnce the pivot is in place:\n- All elements **to the left** are ≤ the pivot\n- All elements **to the right** are ≥ the pivot\n\nThis is called **partitioning**. Then we apply the same process recursively to both halves — until each sub-array has 0 or 1 element.`,
  },
  {
    id: "usages",
    title: "What is Quicksort used for?",
    icon: "◉",
    content: `Quicksort is **the most widely used sorting algorithm in practice**. You'll find it everywhere:\n\n**Standard libraries:**\n- \`std::sort\` in **C++** (introsort based on Quicksort)\n- \`Arrays.sort()\` in **Java** for primitive types\n- \`Array.prototype.sort()\` in the **V8** engine (JavaScript)\n\n**Real-world use cases:**\n- **Databases**: sorting query results in memory\n- **Embedded systems**: fast sorting with minimal auxiliary memory\n- **Data processing**: ETL pipelines, dataset pre-processing\n- **Game engines**: sorting objects to render by depth (depth sorting)\n\n**Why not Mergesort everywhere?** Quicksort is often 2× faster in practice thanks to its cache locality, even though Mergesort guarantees O(n log n) in all cases.`,
  },
  {
    id: "partition",
    title: "Partitioning (Lomuto)",
    icon: "◆",
    content: `The **Lomuto scheme** (the most readable) uses the last element as pivot:\n\n1. **pivot = arr[high]** (last element of the sub-array)\n2. **i = low − 1** (boundary of elements ≤ pivot)\n3. For **j** from low to high−1:\n   - If arr[j] ≤ pivot: i++, swap arr[i] ↔ arr[j]\n4. Place the pivot: swap arr[i+1] ↔ arr[high]\n\nResult: the pivot is at index **i+1**, small elements on the left, large ones on the right.`,
  },
  {
    id: "algorithm",
    title: "How does Quicksort work?",
    icon: "▣",
    content: `**The algorithm in 3 steps:**\n\n1. **Choose** a pivot (here, the last element of the sub-array)\n2. **Partition**: rearrange elements around the pivot\n3. **Recurse** on the left sub-array [low..pivot−1] and right [pivot+1..high]\n\n**Recursion base case:** a sub-array of size 0 or 1 is already sorted — we stop.\n\nEach call places **exactly one pivot** at its final position. With n elements, after n placements, everything is sorted.`,
  },
  {
    id: "complexity",
    title: "Complexity & analysis",
    icon: "⬡",
    content: `**Average case: O(n log n)**\nWhen the pivot splits the array into balanced halves, we get log n recursion levels, each doing O(n) comparisons.\n\n**Worst case: O(n²)**\nIf the pivot is always extreme (sorted array + pivot = last element), we get n recursion levels of size n−1, n−2, …: O(n²).\n\n**Best case: O(n log n)**\nWhen the pivot always falls exactly in the middle.\n\n**Space complexity: O(log n)** on average (recursion stack).`,
  },
  {
    id: "practice",
    title: "Why is Quicksort fast?",
    icon: "⟐",
    content: `Despite a worst case of O(n²), Quicksort is **the most used sort in practice**:\n\n**Cache locality**: it sorts **in-place** (no auxiliary array), making excellent use of the CPU cache.\n\n**Low constant factor**: its elementary operations (comparisons, swaps) are very lightweight.\n\n**Random pivot**: by choosing the pivot randomly, the worst case becomes statistically negligible.\n\n**In real life:** It's the basis of \`Array.prototype.sort()\` in V8 (JavaScript), \`std::sort\` in C++, and \`sorted()\` in Python (hybrid Timsort).`,
  },
  {
    id: "recap",
    title: "Summary",
    icon: "⬢",
    content: `**5 key points:**\n\n1. **Divide and conquer**: pivot → partition → recurse\n2. The pivot is placed at its **final position** at each step\n3. Complexity **O(n log n)** on average, **O(n²)** worst case\n4. **Not stable**: two equal elements may change relative order\n5. **In-place**: O(log n) memory, well-suited to CPU cache\n\n**Quicksort vs Mergesort:** Quicksort is faster in practice (cache), Mergesort guarantees O(n log n) and is stable — preferable for external memory data.`,
  },
];

export const QUICKSORT_SECTIONS = { fr, en };
