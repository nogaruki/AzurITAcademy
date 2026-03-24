// ─── Questions du quiz ABR ───

const fr = [
  {
    q: "Quelle est la propriété fondamentale d'un Arbre Binaire de Recherche ?",
    opts: [
      "Chaque nœud a exactement 2 enfants",
      "Sous-arbre gauche < nœud < sous-arbre droit, récursivement",
      "L'arbre est toujours équilibré en hauteur",
      "Les valeurs sont stockées uniquement dans les feuilles",
    ],
    answer: 1,
    explain:
      "La propriété ABR stipule que pour tout nœud, toutes les valeurs à gauche lui sont inférieures et toutes les valeurs à droite lui sont supérieures. Cette règle s'applique récursivement à chaque sous-arbre.",
  },
  {
    q: "Quelle est la complexité de la recherche dans un ABR parfaitement équilibré de n nœuds ?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    explain:
      "Dans un ABR équilibré, la hauteur est log₂(n). À chaque étape de recherche, on élimine un sous-arbre entier, divisant le problème par 2 à chaque nœud visité.",
  },
  {
    q: "Comment supprimer un nœud ayant deux enfants dans un ABR ?",
    opts: [
      "On supprime le nœud et ses deux sous-arbres",
      "On le remplace par son successeur infixe (minimum du sous-arbre droit)",
      "On le remplace toujours par son enfant gauche",
      "On reconstruit entièrement l'arbre",
    ],
    answer: 1,
    explain:
      "Pour un nœud avec deux enfants, on trouve le successeur infixe (le plus petit nœud du sous-arbre droit), on copie sa valeur dans le nœud à supprimer, puis on supprime le successeur (qui n'a au plus qu'un enfant).",
  },
  {
    q: "Quel parcours d'un ABR produit les valeurs dans l'ordre croissant ?",
    opts: [
      "Parcours préfixe (racine → gauche → droite)",
      "Parcours suffixe (gauche → droite → racine)",
      "Parcours infixe (gauche → racine → droite)",
      "Parcours en largeur (BFS)",
    ],
    answer: 2,
    explain:
      "Le parcours infixe visite d'abord le sous-arbre gauche (valeurs inférieures), puis la racine, puis le sous-arbre droit (valeurs supérieures). Grâce à la propriété ABR, cela produit les valeurs dans l'ordre croissant.",
  },
  {
    q: "Quel est le pire cas de complexité pour un ABR non équilibré ?",
    opts: [
      "O(log n) toujours garanti",
      "O(√n)",
      "O(n) quand l'arbre est dégénéré (liste chaînée)",
      "O(n²) dans tous les cas",
    ],
    answer: 2,
    explain:
      "Si on insère des valeurs dans un ordre trié (croissant ou décroissant), l'ABR dégénère en liste chaînée de hauteur n. Toutes les opérations deviennent O(n). Les arbres équilibrés (AVL, Rouge-Noir) évitent ce cas.",
  },
];

const en = [
  {
    q: "What is the fundamental property of a Binary Search Tree?",
    opts: [
      "Each node has exactly 2 children",
      "Left subtree < node < right subtree, recursively",
      "The tree is always height-balanced",
      "Values are stored only in leaves",
    ],
    answer: 1,
    explain:
      "The BST property states that for every node, all values on the left are smaller and all values on the right are larger. This rule applies recursively to each subtree.",
  },
  {
    q: "What is the search complexity in a perfectly balanced BST of n nodes?",
    opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    answer: 1,
    explain:
      "In a balanced BST, the height is log₂(n). At each search step, we eliminate an entire subtree, halving the problem at each visited node.",
  },
  {
    q: "How do you delete a node with two children in a BST?",
    opts: [
      "Delete the node and both subtrees",
      "Replace it with its in-order successor (minimum of right subtree)",
      "Always replace with the left child",
      "Rebuild the entire tree",
    ],
    answer: 1,
    explain:
      "For a node with two children, find the in-order successor (smallest node of the right subtree), copy its value into the node to delete, then delete the successor (which has at most one child).",
  },
  {
    q: "Which traversal of a BST produces values in ascending order?",
    opts: [
      "Pre-order (root → left → right)",
      "Post-order (left → right → root)",
      "In-order (left → root → right)",
      "Breadth-first (BFS)",
    ],
    answer: 2,
    explain:
      "In-order traversal visits the left subtree (smaller values) first, then the root, then the right subtree (larger values). Thanks to the BST property, this produces values in ascending order.",
  },
  {
    q: "What is the worst-case complexity for an unbalanced BST?",
    opts: [
      "O(log n) always guaranteed",
      "O(√n)",
      "O(n) when the tree is degenerate (linked list)",
      "O(n²) in all cases",
    ],
    answer: 2,
    explain:
      "If values are inserted in sorted order (ascending or descending), the BST degenerates into a linked list of height n. All operations become O(n). Balanced trees (AVL, Red-Black) avoid this case.",
  },
];

export const BST_QUIZ_QUESTIONS = { fr, en };
