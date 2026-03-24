// ─── Exercices Arbre Binaire de Recherche (codes à trou) ───

const fr = [
  {
    id: "search",
    title: "Recherche",
    description:
      "Complétez la recherche récursive. À chaque nœud, comparez la valeur et descendez du bon côté.",
    code:
`function search(node, value) {
  // Nœud vide : valeur absente de l'arbre
  if (node === ___) return null;

  // Valeur trouvée !
  if (value === node.value) return ___;

  if (value < node.value) {
    // Valeur plus petite → cherche à ___
    return search(node.___, value);
  } else {
    // Valeur plus grande → cherche à ___
    return search(node.___, value);
  }
}`,
    blanks: ["null", "node", "gauche", "left", "droite", "right"],
  },
  {
    id: "insert",
    title: "Insertion",
    description:
      "Complétez l'insertion récursive. Descendez jusqu'au bon emplacement vide, puis créez le nœud.",
    code:
`function insert(node, value) {
  // Emplacement vide : crée le nouveau nœud ici
  if (node === ___) {
    return { value: ___, left: null, right: null };
  }

  if (value < node.value) {
    node.left = insert(node.___, value);
  } else if (value > node.value) {
    node.right = insert(node.___, value);
  }
  // Doublon → on ignore silencieusement

  return ___;
}`,
    blanks: ["null", "value", "left", "right", "node"],
  },
  {
    id: "inorder",
    title: "Parcours infixe",
    description:
      "Le parcours infixe (gauche → racine → droite) produit les valeurs triées. Complétez la récursion.",
    code:
`function inOrder(node, result = []) {
  // Arbre vide : rien à visiter
  if (node === ___) return result;

  // 1. Visite d'abord le sous-arbre ___
  inOrder(node.___, result);

  // 2. Ajoute la valeur du nœud courant
  result.___(node.value);

  // 3. Visite ensuite le sous-arbre ___
  inOrder(node.___, result);

  return ___;
}`,
    blanks: ["null", "gauche", "left", "push", "droit", "right", "result"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "height",
    title: "TP — Hauteur de l'arbre",
    description:
      "La hauteur est le nombre d'arêtes du chemin le plus long de la racine à une feuille. Un arbre vide a hauteur -1, une feuille a hauteur 0.",
    code:
`function height(node) {
  // Arbre vide : hauteur = ___
  if (node === ___) return -1;

  const leftH  = height(node.___);  // Hauteur du sous-arbre gauche
  const rightH = height(node.___);  // Hauteur du sous-arbre droit

  // Hauteur = 1 + maximum des deux sous-arbres
  return ___ + Math.max(___, ___);
}`,
    blanks: ["-1", "null", "left", "right", "1", "leftH", "rightH"],
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "findmin",
    title: "TP — Trouver le minimum (successeur infixe)",
    description:
      "Le minimum d'un ABR est le nœud le plus à gauche. Cette fonction est utilisée lors de la suppression d'un nœud à deux fils.",
    code:
`function findMin(node) {
  // Arbre vide : pas de minimum
  if (node === ___) return null;

  // Le minimum est le nœud le plus à gauche : descend tant qu'il y a un fils gauche
  while (node.___ !== ___) {
    node = node.___;
  }

  return ___;  // Nœud le plus à gauche = minimum
}`,
    blanks: ["null", "left", "null", "left", "node"],
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "delete",
    title: "TP — Suppression d'un nœud",
    description:
      "La suppression gère 3 cas : (1) nœud sans fils gauche, (2) nœud sans fils droit, (3) nœud à deux fils — remplacé par son successeur infixe (minimum du sous-arbre droit).",
    code:
`function deleteNode(node, value) {
  if (node === ___) return null;

  if (value < node.value) {
    node.left  = deleteNode(node.___, value);
  } else if (value > node.value) {
    node.right = deleteNode(node.___, value);
  } else {
    // Nœud trouvé — 3 cas :
    if (node.left === null)  return node.___;   // Cas 1 : pas de fils gauche
    if (node.right === ___) return node.left;  // Cas 2 : pas de fils droit

    // Cas 3 : deux fils → successeur infixe (minimum du sous-arbre droit)
    const succ  = findMin(node.___);
    node.value  = succ.___;
    node.right  = deleteNode(node.___, succ.value);
  }
  return ___;
}`,
    blanks: ["null", "left", "right", "right", "null", "right", "value", "right", "node"],
  },
];

const en = [
  {
    id: "search",
    title: "Search",
    description:
      "Complete the recursive search. At each node, compare the value and go down the right side.",
    code:
`function search(node, value) {
  // Empty node: value not in the tree
  if (node === ___) return null;

  // Value found!
  if (value === node.value) return ___;

  if (value < node.value) {
    // Value is smaller → search ___
    return search(node.___, value);
  } else {
    // Value is larger → search ___
    return search(node.___, value);
  }
}`,
    blanks: ["null", "node", "left", "left", "right", "right"],
  },
  {
    id: "insert",
    title: "Insertion",
    description:
      "Complete the recursive insertion. Descend to the right empty slot, then create the node.",
    code:
`function insert(node, value) {
  // Empty slot: create the new node here
  if (node === ___) {
    return { value: ___, left: null, right: null };
  }

  if (value < node.value) {
    node.left = insert(node.___, value);
  } else if (value > node.value) {
    node.right = insert(node.___, value);
  }
  // Duplicate → silently ignored

  return ___;
}`,
    blanks: ["null", "value", "left", "right", "node"],
  },
  {
    id: "inorder",
    title: "In-order traversal",
    description:
      "In-order traversal (left → root → right) produces sorted values. Complete the recursion.",
    code:
`function inOrder(node, result = []) {
  // Empty tree: nothing to visit
  if (node === ___) return result;

  // 1. Visit the ___ subtree first
  inOrder(node.___, result);

  // 2. Add the current node's value
  result.___(node.value);

  // 3. Then visit the ___ subtree
  inOrder(node.___, result);

  return ___;
}`,
    blanks: ["null", "left", "left", "push", "right", "right", "result"],
  },

  // ── TP 4 ──────────────────────────────────────────
  {
    id: "height",
    title: "TP — Tree height",
    description:
      "Height is the number of edges on the longest path from root to a leaf. An empty tree has height -1, a leaf has height 0.",
    code:
`function height(node) {
  // Empty tree: height = ___
  if (node === ___) return -1;

  const leftH  = height(node.___);  // Height of left subtree
  const rightH = height(node.___);  // Height of right subtree

  // Height = 1 + maximum of both subtrees
  return ___ + Math.max(___, ___);
}`,
    blanks: ["-1", "null", "left", "right", "1", "leftH", "rightH"],
  },

  // ── TP 5 ──────────────────────────────────────────
  {
    id: "findmin",
    title: "TP — Find minimum (in-order successor)",
    description:
      "The minimum of a BST is always the leftmost node. This function is used during deletion of a node with two children.",
    code:
`function findMin(node) {
  // Empty tree: no minimum
  if (node === ___) return null;

  // The minimum is the leftmost node: descend while there is a left child
  while (node.___ !== ___) {
    node = node.___;
  }

  return ___;  // Leftmost node = minimum
}`,
    blanks: ["null", "left", "null", "left", "node"],
  },

  // ── TP 6 ──────────────────────────────────────────
  {
    id: "delete",
    title: "TP — Delete a node",
    description:
      "Deletion handles 3 cases: (1) no left child, (2) no right child, (3) two children — replaced by its in-order successor (minimum of the right subtree).",
    code:
`function deleteNode(node, value) {
  if (node === ___) return null;

  if (value < node.value) {
    node.left  = deleteNode(node.___, value);
  } else if (value > node.value) {
    node.right = deleteNode(node.___, value);
  } else {
    // Node found — 3 cases:
    if (node.left === null)  return node.___;   // Case 1: no left child
    if (node.right === ___) return node.left;  // Case 2: no right child

    // Case 3: two children → in-order successor (min of right subtree)
    const succ  = findMin(node.___);
    node.value  = succ.___;
    node.right  = deleteNode(node.___, succ.value);
  }
  return ___;
}`,
    blanks: ["null", "left", "right", "right", "null", "right", "value", "right", "node"],
  },
];

// ── TPs FR ────────────────────────────────────────
const tp1_fr = {
  id: "tp-validate",
  type: "tp",
  title: "TP — Valider qu'un arbre est un ABR",
  subject:
`N'importe quel arbre binaire n'est pas forcément un ABR. La propriété gauche < nœud < droite doit tenir récursivement pour chaque sous-arbre — pas seulement localement entre parent et enfant.

Implémentez \`isValidBST(root)\` qui retourne \`true\` si et seulement si l'arbre est un ABR valide.
Indice : passez des bornes (min, max) à chaque récursion pour contrôler l'intervalle autorisé.`,
  baseCode:
`function isValidBST(root) {
  function validate(node, min, max) {
    // Cas de base : arbre vide est valide
    if (node === null) return true;

    // TODO : vérifier que node.value est strictement entre min et max
    //        (utiliser -Infinity et +Infinity pour les bornes initiales)

    // TODO : valider récursivement les deux sous-arbres
    //        sous-arbre gauche : la borne max devient node.value
    //        sous-arbre droit  : la borne min devient node.value
  }

  return validate(root, -Infinity, Infinity);
}

// Piège classique — cet arbre semble valide localement
// mais ne l'est pas globalement :
//       10
//      /  \\
//     5    15
//    / \\
//   3   12   ← 12 > 10 : invalide !`,
  correction:
`function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;

    // La valeur doit être strictement dans (min, max)
    if (node.value <= min || node.value >= max) return false;

    return (
      validate(node.left,  min,        node.value) &&
      validate(node.right, node.value, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

// Exemples :
//       5               5
//      / \\             / \\
//     3   7    ✅     3   7    ❌  (si 3 avait un enfant droit > 5)
//    / \\ / \\
//   2  4 6  8`,
  explanation:
    "L'erreur classique est de vérifier seulement node.left.value < node.value localement. Cela rate le cas où un nœud du sous-arbre gauche est plus grand que la racine globale. La solution : propager des bornes strictes (min, max) à chaque descente. Au niveau de la racine : (-∞, +∞). En allant à gauche : max = node.value. En allant à droite : min = node.value.",
};

const tp2_fr = {
  id: "tp-count",
  type: "tp",
  title: "TP — Compter les nœuds et les feuilles",
  subject:
`Implémentez deux fonctions récursives :
- \`countNodes(root)\` : compte le nombre total de nœuds dans l'arbre
- \`countLeaves(root)\` : compte uniquement les feuilles (nœuds sans aucun enfant)

Ces fonctions illustrent le modèle de récursion fondamental sur les arbres : cas de base (nœud vide) + cas récursif (combiner les résultats des sous-arbres).`,
  baseCode:
`function countNodes(root) {
  if (root === null) return 0;

  // TODO : retourner 1 (nœud courant)
  //        + nombre de nœuds dans le sous-arbre gauche
  //        + nombre de nœuds dans le sous-arbre droit
}

function countLeaves(root) {
  if (root === null) return 0;

  // TODO : si c'est une feuille (left === null ET right === null)
  //        → retourner 1
  //        sinon → sommer les feuilles des deux sous-arbres
}`,
  correction:
`function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

function countLeaves(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;  // feuille !
  return countLeaves(root.left) + countLeaves(root.right);
}

// Exemple sur l'arbre [50, 30, 70, 20, 40] :
//       50
//      /  \\
//    30    70
//   /  \\
//  20   40
//
// countNodes → 5
// countLeaves → 3  (20, 40, 70 sont des feuilles)`,
  explanation:
    "Ces deux fonctions montrent le modèle récursif sur arbre dans sa forme la plus pure. countNodes : chaque nœud vaut 1, on additionne tout. countLeaves : seules les feuilles valent 1 (la condition est left===null ET right===null). Propriété intéressante : dans un arbre binaire complet (full), feuilles = nœuds internes + 1.",
};

const tp3_fr = {
  id: "tp-lca",
  type: "tp",
  title: "TP — Plus proche ancêtre commun (LCA)",
  subject:
`Le plus proche ancêtre commun (LCA) de deux nœuds p et q est le nœud le plus bas de l'arbre qui a p et q comme descendants (un nœud est son propre descendant).

Dans un ABR, la propriété d'ordre permet une solution élégante en O(log n) : si p et q sont tous les deux < nœud courant → LCA est à gauche. Si tous les deux > nœud → LCA est à droite. Sinon → le nœud courant est le LCA.`,
  baseCode:
`function lowestCommonAncestor(root, p, q) {
  // p et q sont des valeurs (pas des nœuds)
  let node = root;

  while (node !== null) {
    if (p < node.value && q < node.value) {
      // TODO : p et q sont tous les deux plus petits → descendre à gauche
    } else if (p > node.value && q > node.value) {
      // TODO : p et q sont tous les deux plus grands → descendre à droite
    } else {
      // TODO : divergence → c'est le LCA, retourner node
    }
  }

  return null;  // p ou q absent de l'arbre
}`,
  correction:
`function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node !== null) {
    if (p < node.value && q < node.value) {
      node = node.left;
    } else if (p > node.value && q > node.value) {
      node = node.right;
    } else {
      return node;  // node.value est entre p et q, ou égal à l'un d'eux
    }
  }

  return null;
}

// Exemples sur [50, 30, 70, 20, 40, 60, 80] :
// LCA(20, 40) → nœud 30   (premier point de divergence)
// LCA(60, 80) → nœud 70
// LCA(20, 80) → nœud 50   (la racine : 20 < 50 < 80)
// LCA(30, 30) → nœud 30   (un nœud est son propre ancêtre)`,
  explanation:
    "La propriété ABR permet de guider la recherche sans explorer tout l'arbre. On sait immédiatement dans quel sous-arbre chercher. Le premier nœud où p et q se 'séparent' (l'un est à gauche, l'autre à droite) est le LCA. Complexité : O(log n) sur arbre équilibré, contre O(n) pour un arbre binaire général sans la propriété d'ordre.",
};

// ── TPs EN ────────────────────────────────────────
const tp1_en = {
  id: "tp-validate",
  type: "tp",
  title: "TP — Validate that a tree is a valid BST",
  subject:
`Not every binary tree is a BST. The property left < node < right must hold recursively for every subtree — not just locally between a parent and its children.

Implement \`isValidBST(root)\` that returns \`true\` if and only if the tree is a valid BST.
Hint: pass (min, max) bounds at each recursion to control the allowed range.`,
  baseCode:
`function isValidBST(root) {
  function validate(node, min, max) {
    // Base case: empty tree is valid
    if (node === null) return true;

    // TODO: verify that node.value is strictly between min and max
    //       (use -Infinity and +Infinity as initial bounds)

    // TODO: recursively validate both subtrees
    //       left subtree:  max becomes node.value
    //       right subtree: min becomes node.value
  }

  return validate(root, -Infinity, Infinity);
}

// Classic trap — this tree looks locally valid
// but is globally invalid:
//       10
//      /  \\
//     5    15
//    / \\
//   3   12   ← 12 > 10: invalid!`,
  correction:
`function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;

    // Value must be strictly within (min, max)
    if (node.value <= min || node.value >= max) return false;

    return (
      validate(node.left,  min,        node.value) &&
      validate(node.right, node.value, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

// Examples:
//       5               5
//      / \\             / \\
//     3   7    ✅     3   7    ❌  (if 3 had a right child > 5)
//    / \\ / \\
//   2  4 6  8`,
  explanation:
    "The classic mistake is to only check node.left.value < node.value locally. This misses the case where a node in the left subtree is greater than the global root. The fix: propagate strict bounds (min, max) down each branch. At root: (-∞, +∞). Going left: max = node.value. Going right: min = node.value.",
};

const tp2_en = {
  id: "tp-count",
  type: "tp",
  title: "TP — Count nodes and leaves",
  subject:
`Implement two recursive functions:
- \`countNodes(root)\`: count the total number of nodes in the tree
- \`countLeaves(root)\`: count only the leaves (nodes with no children at all)

These functions illustrate the fundamental tree recursion pattern: base case (empty node) + recursive case (combine results from subtrees).`,
  baseCode:
`function countNodes(root) {
  if (root === null) return 0;

  // TODO: return 1 (current node)
  //       + number of nodes in the left subtree
  //       + number of nodes in the right subtree
}

function countLeaves(root) {
  if (root === null) return 0;

  // TODO: if it's a leaf (left === null AND right === null)
  //       → return 1
  //       otherwise → sum the leaves of both subtrees
}`,
  correction:
`function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

function countLeaves(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;  // leaf!
  return countLeaves(root.left) + countLeaves(root.right);
}

// Example on tree [50, 30, 70, 20, 40]:
//       50
//      /  \\
//    30    70
//   /  \\
//  20   40
//
// countNodes → 5
// countLeaves → 3  (20, 40, 70 are leaves)`,
  explanation:
    "These two functions show the tree recursion pattern in its purest form. countNodes: each node is worth 1, add everything up. countLeaves: only leaves are worth 1 (condition: left===null AND right===null). Interesting property: in a full binary tree, leaves = internal nodes + 1.",
};

const tp3_en = {
  id: "tp-lca",
  type: "tp",
  title: "TP — Lowest Common Ancestor (LCA)",
  subject:
`The lowest common ancestor (LCA) of two nodes p and q is the lowest node in the tree that has both p and q as descendants (a node is its own descendant).

In a BST, the ordering property allows an elegant O(log n) solution: if both p and q are < current node → LCA is left. If both > node → LCA is right. Otherwise → current node is the LCA.`,
  baseCode:
`function lowestCommonAncestor(root, p, q) {
  // p and q are values (not nodes)
  let node = root;

  while (node !== null) {
    if (p < node.value && q < node.value) {
      // TODO: both p and q are smaller → go left
    } else if (p > node.value && q > node.value) {
      // TODO: both p and q are larger → go right
    } else {
      // TODO: divergence point → this is the LCA, return node
    }
  }

  return null;  // p or q not in the tree
}`,
  correction:
`function lowestCommonAncestor(root, p, q) {
  let node = root;

  while (node !== null) {
    if (p < node.value && q < node.value) {
      node = node.left;
    } else if (p > node.value && q > node.value) {
      node = node.right;
    } else {
      return node;  // node.value is between p and q, or equal to one of them
    }
  }

  return null;
}

// Examples on [50, 30, 70, 20, 40, 60, 80]:
// LCA(20, 40) → node 30   (first divergence point)
// LCA(60, 80) → node 70
// LCA(20, 80) → node 50   (root: 20 < 50 < 80)
// LCA(30, 30) → node 30   (a node is its own ancestor)`,
  explanation:
    "The BST property lets us guide the search without exploring the whole tree. We immediately know which subtree to follow. The first node where p and q 'diverge' (one goes left, the other right) is the LCA. Complexity: O(log n) on a balanced tree, vs O(n) for a general binary tree without the ordering property.",
};

fr.push(tp1_fr, tp2_fr, tp3_fr);
en.push(tp1_en, tp2_en, tp3_en);

export const BST_EXERCISES = { fr, en };
