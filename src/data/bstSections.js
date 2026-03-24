// ─── Données du cours Arbre Binaire de Recherche ───

const fr = [
  {
    id: "intro",
    title: "C'est quoi un arbre ?",
    icon: "◈",
    content: `Un **arbre** est une structure de données hiérarchique : il y a un **nœud racine** en haut, et chaque nœud peut avoir des **enfants**. Les nœuds sans enfants s'appellent des **feuilles**.\n\nUn **arbre binaire** est un arbre où chaque nœud a au plus **2 enfants** : un enfant gauche et un enfant droit.\n\n**Vocabulaire clé :**\n- **Racine** : le nœud au sommet de l'arbre\n- **Profondeur** : distance depuis la racine\n- **Hauteur** : profondeur maximale de l'arbre\n- **Sous-arbre** : un nœud et tous ses descendants`,
  },
  {
    id: "property",
    title: "La propriété ABR",
    icon: "◇",
    content: `Un **Arbre Binaire de Recherche** (ABR) obéit à une règle stricte pour chaque nœud :\n\n- Tous les nœuds du **sous-arbre gauche** ont une valeur **strictement inférieure**\n- Tous les nœuds du **sous-arbre droit** ont une valeur **strictement supérieure**\n\nCette propriété s'applique **récursivement** à chaque nœud.\n\n**Conséquence** : le **parcours infixe** (gauche → racine → droite) d'un ABR produit les valeurs **dans l'ordre croissant**. C'est la propriété fondamentale qui rend les ABR efficaces.`,
  },
  {
    id: "usages",
    title: "À quoi sert un ABR ?",
    icon: "◉",
    content: `Les arbres binaires de recherche sont la base de nombreuses structures utilisées au quotidien :\n\n**Structures de données standard :**\n- \`std::map\` / \`std::set\` en **C++** (implémentés avec un arbre Rouge-Noir)\n- \`TreeMap\` / \`TreeSet\` en **Java** (arbre Rouge-Noir)\n- Dictionnaires **ordonnés** dans de nombreux langages\n\n**Cas d'usage réels :**\n- **Index de bases de données** : les B-trees (variante) indexent les colonnes pour des recherches ultra-rapides\n- **Compilateurs** : tables de symboles (variables, fonctions) triées pour une résolution rapide\n- **Systèmes de fichiers** : NTFS (Windows), HFS+ (macOS) utilisent des arbres B+ pour organiser les fichiers\n- **Autocomplétion** : recherche par préfixe dans un dictionnaire ordonné\n- **Planificateurs de tâches** : files de priorité ordonnées par date d'exécution\n\n**Pourquoi pas un tableau trié ?** L'ABR permet l'insertion et la suppression en O(log n) **sans déplacer** les éléments existants.`,
  },
  {
    id: "search",
    title: "Recherche",
    icon: "◆",
    content: `La recherche exploite directement la propriété ABR :\n\n1. Partir de la **racine**\n2. Si la valeur cherchée = nœud courant → **trouvé !**\n3. Si la valeur est **plus petite** → aller à **gauche**\n4. Si la valeur est **plus grande** → aller à **droite**\n5. Si on atteint un nœud vide → **non trouvé**\n\n**Analogie :** C'est exactement comme la recherche dichotomique dans un tableau trié — à chaque étape, on élimine **la moitié** des nœuds restants.`,
  },
  {
    id: "insert",
    title: "Insertion",
    icon: "▣",
    content: `L'insertion place un nouveau nœud à sa **position correcte** :\n\n1. Rechercher la valeur (comme pour la recherche)\n2. Quand on tombe sur un **emplacement vide** → créer le nœud ici\n\nLa propriété ABR est ainsi **maintenue automatiquement** : le nouveau nœud est toujours une feuille, et sa position est déterminée uniquement par les comparaisons lors de la descente.\n\n**Important :** L'ordre d'insertion influence la forme de l'arbre. Insérer [50,30,70] donne un arbre équilibré, mais [10,20,30,40] donne une liste chaînée (cas dégénéré).`,
  },
  {
    id: "delete",
    title: "Suppression",
    icon: "⬡",
    content: `La suppression est l'opération la plus complexe. Il faut gérer **3 cas** :\n\n**Cas 1 — Feuille** (0 enfant) : on supprime simplement le nœud.\n\n**Cas 2 — 1 enfant** : on remplace le nœud par son unique enfant.\n\n**Cas 3 — 2 enfants** : on ne peut pas supprimer directement. On trouve le **successeur infixe** (le plus petit nœud du sous-arbre droit), on copie sa valeur dans le nœud à supprimer, puis on supprime le successeur (qui n'a au plus qu'un enfant droit).`,
  },
  {
    id: "complexity",
    title: "Complexité & analyse",
    icon: "⟐",
    content: `**Arbre équilibré : O(log n)** pour la recherche, l'insertion et la suppression.\n\nLa hauteur d'un arbre équilibré est log₂(n). À chaque étape, on divise le nombre de nœuds restants par 2.\n\n**Arbre dégénéré : O(n)** — Si les insertions se font dans un ordre croissant ou décroissant, l'arbre devient une liste chaînée (hauteur = n).\n\n**Complexité spatiale : O(n)** — Un nœud par valeur stockée.\n\n**Solution :** Les **arbres équilibrés** (AVL, Rouge-Noir) maintiennent automatiquement la hauteur en O(log n) par des **rotations** lors de l'insertion et de la suppression.`,
  },
  {
    id: "recap",
    title: "Récapitulatif",
    icon: "⬢",
    content: `**Points clés à retenir :**\n\n1. **Propriété ABR** : gauche < nœud < droite, récursivement\n2. **Recherche, insertion** : O(log n) en moyenne, O(n) au pire\n3. **Suppression** : 3 cas — feuille, 1 enfant, 2 enfants (successeur)\n4. **Parcours infixe** : donne les valeurs dans l'ordre croissant\n5. **Dégénérescence** : données triées → arbre = liste chaînée\n\n**ABR vs Tableau trié :** L'ABR permet l'insertion et la suppression en O(log n) sans déplacer d'éléments (vs O(n) pour un tableau). Mais un tableau trié supporte la recherche binaire et est plus cache-friendly.`,
  },
];

const en = [
  {
    id: "intro",
    title: "What is a tree?",
    icon: "◈",
    content: `A **tree** is a hierarchical data structure: there is a **root node** at the top, and each node can have **children**. Nodes with no children are called **leaves**.\n\nA **binary tree** is a tree where each node has at most **2 children**: a left child and a right child.\n\n**Key vocabulary:**\n- **Root**: the node at the top of the tree\n- **Depth**: distance from the root\n- **Height**: maximum depth of the tree\n- **Subtree**: a node and all its descendants`,
  },
  {
    id: "property",
    title: "The BST property",
    icon: "◇",
    content: `A **Binary Search Tree** (BST) follows a strict rule for every node:\n\n- All nodes in the **left subtree** have a **strictly smaller** value\n- All nodes in the **right subtree** have a **strictly larger** value\n\nThis property applies **recursively** to each node.\n\n**Consequence**: the **in-order traversal** (left → root → right) of a BST produces values **in ascending order**. This is the fundamental property that makes BSTs efficient.`,
  },
  {
    id: "usages",
    title: "What is a BST used for?",
    icon: "◉",
    content: `Binary Search Trees are the foundation of many data structures used every day:\n\n**Standard data structures:**\n- \`std::map\` / \`std::set\` in **C++** (implemented with a Red-Black tree)\n- \`TreeMap\` / \`TreeSet\` in **Java** (Red-Black tree)\n- **Ordered** dictionaries in many languages\n\n**Real-world use cases:**\n- **Database indexes**: B-trees (a variant) index columns for ultra-fast lookups\n- **Compilers**: symbol tables (variables, functions) sorted for fast resolution\n- **File systems**: NTFS (Windows), HFS+ (macOS) use B+ trees to organize files\n- **Autocomplete**: prefix search in an ordered dictionary\n- **Task schedulers**: priority queues ordered by execution time\n\n**Why not a sorted array?** A BST allows insertion and deletion in O(log n) **without shifting** existing elements.`,
  },
  {
    id: "search",
    title: "Search",
    icon: "◆",
    content: `Search directly exploits the BST property:\n\n1. Start from the **root**\n2. If the searched value = current node → **found!**\n3. If the value is **smaller** → go **left**\n4. If the value is **larger** → go **right**\n5. If we reach an empty node → **not found**\n\n**Analogy:** This is exactly like binary search in a sorted array — at each step, we eliminate **half** of the remaining nodes.`,
  },
  {
    id: "insert",
    title: "Insertion",
    icon: "▣",
    content: `Insertion places a new node at its **correct position**:\n\n1. Search for the value (like in search)\n2. When we hit an **empty spot** → create the node here\n\nThe BST property is thus **automatically maintained**: the new node is always a leaf, and its position is determined solely by comparisons during the descent.\n\n**Important:** Insertion order influences the tree shape. Inserting [50,30,70] gives a balanced tree, but [10,20,30,40] gives a linked list (degenerate case).`,
  },
  {
    id: "delete",
    title: "Deletion",
    icon: "⬡",
    content: `Deletion is the most complex operation. We must handle **3 cases**:\n\n**Case 1 — Leaf** (0 children): simply remove the node.\n\n**Case 2 — 1 child**: replace the node with its only child.\n\n**Case 3 — 2 children**: we cannot delete directly. We find the **in-order successor** (the smallest node of the right subtree), copy its value into the node to delete, then delete the successor (which has at most one right child).`,
  },
  {
    id: "complexity",
    title: "Complexity & analysis",
    icon: "⟐",
    content: `**Balanced tree: O(log n)** for search, insertion and deletion.\n\nThe height of a balanced tree is log₂(n). At each step, we halve the remaining nodes.\n\n**Degenerate tree: O(n)** — If insertions happen in ascending or descending order, the tree becomes a linked list (height = n).\n\n**Space complexity: O(n)** — One node per stored value.\n\n**Solution:** **Balanced trees** (AVL, Red-Black) automatically maintain height in O(log n) through **rotations** during insertion and deletion.`,
  },
  {
    id: "recap",
    title: "Summary",
    icon: "⬢",
    content: `**Key takeaways:**\n\n1. **BST property**: left < node < right, recursively\n2. **Search, insertion**: O(log n) on average, O(n) worst case\n3. **Deletion**: 3 cases — leaf, 1 child, 2 children (successor)\n4. **In-order traversal**: produces values in ascending order\n5. **Degeneration**: sorted data → tree = linked list\n\n**BST vs Sorted Array:** BST allows insertion and deletion in O(log n) without shifting elements (vs O(n) for an array). But a sorted array supports binary search and is more cache-friendly.`,
  },
];

export const BST_SECTIONS = { fr, en };
