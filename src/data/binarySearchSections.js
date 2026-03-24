// ─── Données du cours Recherche Binaire ───

const fr = [
  {
    id: "principe",
    title: "Le principe",
    icon: "◈",
    content: `La **recherche binaire** (ou dichotomie) est une stratégie qui exploite le fait que le tableau est **trié** pour éliminer la moitié des candidats à chaque étape.\n\nPar analogie : vous cherchez un mot dans un dictionnaire. Vous ouvrez au milieu — si le mot cible est avant, vous cherchez dans la première moitié ; sinon, dans la deuxième. Vous répétez jusqu'à trouver le mot.\n\nÀ chaque itération, la **plage active est divisée par 2**. Sur n éléments, on a besoin d'au plus **log₂(n) comparaisons** — sur 1 000 000 d'éléments, c'est au plus **20 comparaisons**.`,
  },
  {
    id: "fonctionnement",
    title: "Fonctionnement",
    icon: "◇",
    content: `**L'algorithme en 4 étapes :**\n\n1. Initialiser **lo = 0** et **hi = n - 1** (toute la plage)\n2. Calculer **mid = ⌊(lo + hi) / 2⌋** (indice du milieu)\n3. Comparer **arr[mid]** avec la cible :\n   - **arr[mid] === target** → trouvé, retourner mid\n   - **arr[mid] < target** → la cible est à droite : **lo = mid + 1**\n   - **arr[mid] > target** → la cible est à gauche : **hi = mid - 1**\n4. Répéter tant que **lo ≤ hi** ; si lo > hi → non trouvé, retourner -1\n\n**Invariant** : si la cible existe, elle est toujours dans **arr[lo..hi]**.`,
  },
  {
    id: "precondition",
    title: "Précondition : tableau trié",
    icon: "◉",
    content: `La recherche binaire **exige absolument** que le tableau soit trié. Sans tri, la déduction "si arr[mid] < target, chercher à droite" est invalide — la cible pourrait très bien se trouver à gauche.\n\n**Que faire si le tableau n'est pas trié ?**\n- Trier d'abord (O(n log n)), puis rechercher en O(log n) — rentable si on effectue de nombreuses recherches\n- Si une seule recherche est nécessaire : une recherche linéaire O(n) est suffisante\n\n**Structures déjà triées** : arbres BST, tableaux triés en base de données, index, dictionnaires ordonnés — la recherche binaire y est applicable directement.`,
  },
  {
    id: "complexity",
    title: "Complexité O(log n)",
    icon: "⬡",
    content: `**Pourquoi O(log n) ?**\n\nÀ chaque itération, la plage active est divisée par 2 :\n- n → n/2 → n/4 → n/8 → … → 1\n\nAprès k itérations, il reste n/2^k éléments. On s'arrête quand n/2^k ≤ 1, soit **k = log₂(n)**.\n\n**Comparaison avec la recherche linéaire :**\n| n | Linéaire O(n) | Binaire O(log n) |\n|---|---|---|\n| 1 000 | 1 000 | 10 |\n| 1 000 000 | 1 000 000 | 20 |\n| 1 000 000 000 | 1 000 000 000 | 30 |\n\n**Complexité spatiale :** O(1) en version itérative (seulement 3 variables : lo, hi, mid).`,
  },
  {
    id: "usages",
    title: "Applications réelles",
    icon: "▣",
    content: `La recherche binaire est omniprésente dans les systèmes réels :\n\n**Bases de données** — les index B-tree utilisent la dichotomie pour localiser les entrées en O(log n) parmi des millions de lignes.\n\n**Systèmes de fichiers** — recherche de fichiers dans des répertoires triés.\n\n**Bibliothèques standard** :\n- \`Arrays.binarySearch()\` en Java\n- \`bisect\` en Python\n- \`std::lower_bound\` en C++\n- \`Array.prototype\` via \`lodash.sortedIndex\` en JS\n\n**Algorithmes avancés** — problèmes de recherche sur réponse (binary search on the answer) : trouver la valeur minimale vérifiant une propriété monotone en O(log n × coût de vérification).`,
  },
  {
    id: "variantes",
    title: "Variantes",
    icon: "⟐",
    content: `**lower_bound** — premier index i tel que arr[i] ≥ target (insertion point à gauche). Si target est dupliqué, retourne le premier.\n\n**upper_bound** — premier index i tel que arr[i] > target (insertion point à droite). Utile pour compter les occurrences.\n\n**Recherche dans un tableau rotatif** — tableau trié puis "décalé" (ex. [4,5,6,1,2,3]). On détermine d'abord quelle moitié est triée, puis on y applique la dichotomie.\n\n**Recherche sur réponse** — on ne cherche pas un élément mais une valeur v vérifiant une propriété f(v) monotone. Ex : trouver la racine carrée entière d'un entier, minimiser une fonction convexe.\n\n**Version récursive** — identique mais avec appels récursifs ; coût O(log n) en espace pile.`,
  },
  {
    id: "recap",
    title: "Récapitulatif",
    icon: "⬢",
    content: `**5 points clés :**\n\n1. **Précondition : tableau trié** — sans tri, l'algorithme est invalide\n2. **Diviser par 2 à chaque étape** : lo et hi convergent vers la cible\n3. **O(log n) comparaisons** — 30 comparaisons suffisent pour 1 milliard d'éléments\n4. **O(1) espace** en version itérative (3 variables)\n5. **Retourne -1** si la cible est absente (quand lo > hi)\n\n**Recherche binaire vs linéaire :** la recherche linéaire est universelle (ne requiert pas de tri), mais O(n). La recherche binaire est O(log n), mais exige le tri. Le tri coûte O(n log n) — rentable dès que les recherches sont fréquentes.`,
  },
];

const en = [
  {
    id: "principe",
    title: "The principle",
    icon: "◈",
    content: `**Binary search** (also called dichotomy) is a strategy that exploits the fact that the array is **sorted** to eliminate half of the candidates at each step.\n\nAnalogy: you're looking up a word in a dictionary. You open it in the middle — if the target word comes before, you search the first half; otherwise, the second. You repeat until you find it.\n\nAt each iteration, the **active range is halved**. With n elements, at most **log₂(n) comparisons** are needed — on 1,000,000 elements, that's at most **20 comparisons**.`,
  },
  {
    id: "fonctionnement",
    title: "How it works",
    icon: "◇",
    content: `**The algorithm in 4 steps:**\n\n1. Initialize **lo = 0** and **hi = n - 1** (full range)\n2. Compute **mid = ⌊(lo + hi) / 2⌋** (middle index)\n3. Compare **arr[mid]** with the target:\n   - **arr[mid] === target** → found, return mid\n   - **arr[mid] < target** → target is to the right: **lo = mid + 1**\n   - **arr[mid] > target** → target is to the left: **hi = mid - 1**\n4. Repeat while **lo ≤ hi**; if lo > hi → not found, return -1\n\n**Invariant**: if the target exists, it is always within **arr[lo..hi]**.`,
  },
  {
    id: "precondition",
    title: "Precondition: sorted array",
    icon: "◉",
    content: `Binary search **absolutely requires** the array to be sorted. Without sorting, the deduction "if arr[mid] < target, search right" is invalid — the target could very well be on the left.\n\n**What if the array isn't sorted?**\n- Sort first (O(n log n)), then search in O(log n) — worthwhile if many searches are performed\n- If only one search is needed: linear search O(n) is sufficient\n\n**Already-sorted structures**: BST trees, sorted database arrays, indexes, ordered dictionaries — binary search applies directly.`,
  },
  {
    id: "complexity",
    title: "O(log n) complexity",
    icon: "⬡",
    content: `**Why O(log n)?**\n\nAt each iteration, the active range is halved:\n- n → n/2 → n/4 → n/8 → … → 1\n\nAfter k iterations, n/2^k elements remain. We stop when n/2^k ≤ 1, i.e. **k = log₂(n)**.\n\n**Comparison with linear search:**\n| n | Linear O(n) | Binary O(log n) |\n|---|---|---|\n| 1,000 | 1,000 | 10 |\n| 1,000,000 | 1,000,000 | 20 |\n| 1,000,000,000 | 1,000,000,000 | 30 |\n\n**Space complexity:** O(1) in the iterative version (only 3 variables: lo, hi, mid).`,
  },
  {
    id: "usages",
    title: "Real-world applications",
    icon: "▣",
    content: `Binary search is ubiquitous in real systems:\n\n**Databases** — B-tree indexes use dichotomy to locate entries in O(log n) among millions of rows.\n\n**File systems** — file lookup in sorted directories.\n\n**Standard libraries**:\n- \`Arrays.binarySearch()\` in Java\n- \`bisect\` in Python\n- \`std::lower_bound\` in C++\n- \`lodash.sortedIndex\` in JS\n\n**Advanced algorithms** — "binary search on the answer" problems: find the minimum value satisfying a monotone property in O(log n × verification cost).`,
  },
  {
    id: "variantes",
    title: "Variants",
    icon: "⟐",
    content: `**lower_bound** — first index i such that arr[i] ≥ target (left insertion point). If target is duplicated, returns the first occurrence.\n\n**upper_bound** — first index i such that arr[i] > target (right insertion point). Useful for counting occurrences.\n\n**Search in a rotated array** — sorted then "shifted" (e.g. [4,5,6,1,2,3]). First determine which half is sorted, then apply binary search there.\n\n**Binary search on the answer** — searching not for an element but a value v satisfying a monotone property f(v). E.g.: find the integer square root, minimize a convex function.\n\n**Recursive version** — identical but with recursive calls; O(log n) stack space cost.`,
  },
  {
    id: "recap",
    title: "Summary",
    icon: "⬢",
    content: `**5 key points:**\n\n1. **Precondition: sorted array** — without sorting, the algorithm is invalid\n2. **Halve at each step**: lo and hi converge toward the target\n3. **O(log n) comparisons** — 30 comparisons are enough for 1 billion elements\n4. **O(1) space** in the iterative version (3 variables)\n5. **Returns -1** if the target is absent (when lo > hi)\n\n**Binary vs linear search:** linear search is universal (no sorting required), but O(n). Binary search is O(log n), but requires sorting. Sorting costs O(n log n) — worthwhile when searches are frequent.`,
  },
];

export const BINARY_SEARCH_SECTIONS = { fr, en };
