/**
 * Trace complète des opérations d'un Arbre Binaire de Recherche.
 * Retourne une liste d'étapes pour l'animation pas-à-pas.
 */

// ── Utilitaires ────────────────────────────────────────────────────────────

function deepClone(node) {
  if (!node) return null;
  return { val: node.val, left: deepClone(node.left), right: deepClone(node.right) };
}

function insertNode(node, val) {
  if (!node) return { val, left: null, right: null };
  if (val < node.val) return { ...node, left: insertNode(node.left, val) };
  if (val > node.val) return { ...node, right: insertNode(node.right, val) };
  return node; // doublon ignoré
}

function findMin(node) {
  let curr = node;
  while (curr.left) curr = curr.left;
  return curr;
}

function deleteNode(node, val) {
  if (!node) return null;
  if (val < node.val) return { ...node, left: deleteNode(node.left, val) };
  if (val > node.val) return { ...node, right: deleteNode(node.right, val) };
  if (!node.left) return node.right;
  if (!node.right) return node.left;
  const succ = findMin(node.right);
  return { ...node, val: succ.val, right: deleteNode(node.right, succ.val) };
}

function makeStep(type, desc, tree, extras = {}) {
  return {
    type,
    desc,
    tree,
    currentNode: null,
    path: [],
    foundNode: null,
    successorNode: null,
    newNode: null,
    ...extras,
  };
}

// ── Arbre initial ──────────────────────────────────────────────────────────

export function buildInitialTree() {
  let root = null;
  for (const v of [50, 30, 70, 20, 40, 60, 80]) root = insertNode(root, v);
  return root;
}

// ── Trace principale ───────────────────────────────────────────────────────

/**
 * @param {object|null} root  Arbre courant (plain objects {val, left, right})
 * @param {'search'|'insert'|'delete'} operation
 * @param {number} value
 * @returns {{ steps: object[], resultTree: object|null }}
 */
export function bstTrace(root, operation, value) {
  const opLabel = { search: "Recherche", insert: "Insertion", delete: "Suppression" }[operation];
  const snap0 = deepClone(root); // snapshot original (partagé pour les étapes de traversée)
  const steps = [];

  steps.push(makeStep(
    "init",
    `${opLabel} de ${value} dans l'ABR.`,
    snap0,
    { path: [] }
  ));

  if (operation === "search") return searchTrace(root, value, steps, snap0);
  if (operation === "insert") return insertTrace(root, value, steps, snap0);
  return deleteTrace(root, value, steps, snap0);
}

// ── Recherche ─────────────────────────────────────────────────────────────

function searchTrace(root, value, steps, snap) {
  if (!root) {
    steps.push(makeStep("not-found", `L'arbre est vide — ${value} introuvable.`, snap));
    steps.push(makeStep("done", "Recherche terminée.", snap));
    return { steps, resultTree: root };
  }

  const path = [];
  let curr = root;

  while (curr) {
    path.push(curr.val);

    if (curr.val === value) {
      steps.push(makeStep("found", `✓ ${value} trouvé !`, snap, {
        currentNode: value, path: [...path], foundNode: value,
      }));
      break;
    }

    const dir = value < curr.val ? "gauche" : "droite";
    steps.push(makeStep("visit",
      `${value} ${value < curr.val ? "<" : ">"} ${curr.val} → aller à ${dir}`,
      snap, { currentNode: curr.val, path: [...path] }
    ));
    curr = value < curr.val ? curr.left : curr.right;
  }

  const found = steps.some((s) => s.type === "found");
  if (!found) {
    steps.push(makeStep("not-found", `✗ ${value} n'est pas dans l'arbre.`, snap, { path: [...path] }));
  }

  steps.push(makeStep("done",
    found
      ? `Recherche terminée en ${path.length} étape${path.length > 1 ? "s" : ""}.`
      : `${value} absent — recherche terminée en ${path.length} étape${path.length > 1 ? "s" : ""}.`,
    snap,
    { path: [...path], foundNode: found ? value : null }
  ));

  return { steps, resultTree: root };
}

// ── Insertion ─────────────────────────────────────────────────────────────

function insertTrace(root, value, steps, snap) {
  // Arbre vide
  if (!root) {
    const newRoot = { val: value, left: null, right: null };
    const newSnap = deepClone(newRoot);
    steps.push(makeStep("insert", `Arbre vide — ${value} devient la racine.`, newSnap, {
      currentNode: value, path: [value], newNode: value,
    }));
    steps.push(makeStep("done", `Insertion de ${value} terminée.`, newSnap, {
      path: [value], newNode: value,
    }));
    return { steps, resultTree: newRoot };
  }

  const path = [];
  let curr = root;
  let parent = null;

  while (curr) {
    path.push(curr.val);

    if (curr.val === value) {
      steps.push(makeStep("duplicate", `${value} existe déjà — pas d'insertion (doublons ignorés).`, snap, {
        currentNode: curr.val, path: [...path], foundNode: value,
      }));
      steps.push(makeStep("done", "Opération annulée : doublon.", snap, {
        path: [...path], foundNode: value,
      }));
      return { steps, resultTree: root };
    }

    parent = curr;
    const next = value < curr.val ? curr.left : curr.right;
    const dir = value < curr.val ? "gauche" : "droite";

    if (!next) {
      steps.push(makeStep("visit",
        `${value} ${value < curr.val ? "<" : ">"} ${curr.val} → position ${dir} libre → insertion ici`,
        snap, { currentNode: curr.val, path: [...path] }
      ));
      break;
    }

    steps.push(makeStep("visit",
      `${value} ${value < curr.val ? "<" : ">"} ${curr.val} → aller à ${dir}`,
      snap, { currentNode: curr.val, path: [...path] }
    ));
    curr = next;
  }

  const newRoot = insertNode(root, value);
  const newSnap = deepClone(newRoot);
  path.push(value);

  steps.push(makeStep("insert",
    `Nœud ${value} inséré comme fils ${value < (parent?.val ?? 0) ? "gauche" : "droit"} de ${parent?.val}.`,
    newSnap, { currentNode: value, path: [...path], newNode: value }
  ));
  steps.push(makeStep("done",
    `Insertion de ${value} terminée. Hauteur du chemin : ${path.length}.`,
    newSnap, { path: [...path], newNode: value }
  ));

  return { steps, resultTree: newRoot };
}

// ── Suppression ───────────────────────────────────────────────────────────

function deleteTrace(root, value, steps, snap) {
  if (!root) {
    steps.push(makeStep("not-found", `L'arbre est vide — rien à supprimer.`, snap));
    steps.push(makeStep("done", "Opération terminée.", snap));
    return { steps, resultTree: root };
  }

  const path = [];
  let curr = root;

  // Traversée jusqu'au nœud cible
  while (curr) {
    path.push(curr.val);

    if (curr.val === value) {
      const hasL = !!curr.left;
      const hasR = !!curr.right;

      if (!hasL && !hasR) {
        // Cas 1 : feuille
        steps.push(makeStep("found",
          `Nœud ${value} trouvé. C'est une feuille (0 enfant) → suppression directe.`,
          snap, { currentNode: value, path: [...path], foundNode: value }
        ));
        const newRoot = deleteNode(root, value);
        const newSnap = deepClone(newRoot);
        steps.push(makeStep("delete", `Nœud ${value} supprimé.`, newSnap, {
          path: path.slice(0, -1),
        }));
        steps.push(makeStep("done", `Suppression de ${value} terminée.`, newSnap, {
          path: path.slice(0, -1),
        }));
        return { steps, resultTree: newRoot };

      } else if (!hasL || !hasR) {
        // Cas 2 : un seul enfant
        const child = (hasL ? curr.left : curr.right);
        const side = hasL ? "gauche" : "droit";
        steps.push(makeStep("found",
          `Nœud ${value} trouvé. Il a 1 seul enfant (${side} = ${child.val}) → remplacé par cet enfant.`,
          snap, { currentNode: value, path: [...path], foundNode: value }
        ));
        const newRoot = deleteNode(root, value);
        const newSnap = deepClone(newRoot);
        steps.push(makeStep("delete",
          `Nœud ${value} supprimé, remplacé par son enfant ${child.val}.`,
          newSnap, { path: path.slice(0, -1) }
        ));
        steps.push(makeStep("done", `Suppression de ${value} terminée.`, newSnap, {
          path: path.slice(0, -1),
        }));
        return { steps, resultTree: newRoot };

      } else {
        // Cas 3 : deux enfants — chercher le successeur infixe
        steps.push(makeStep("found",
          `Nœud ${value} trouvé. Il a 2 enfants → chercher le successeur infixe (min du sous-arbre droit).`,
          snap, { currentNode: value, path: [...path], foundNode: value }
        ));

        // Descente vers le successeur
        const succPath = [...path];
        let succCurr = curr.right;
        succPath.push(succCurr.val);

        while (succCurr.left) {
          steps.push(makeStep("successor",
            `${succCurr.val} a un fils gauche → descendre à gauche pour trouver le minimum`,
            snap, {
              currentNode: succCurr.val,
              path: [...succPath],
              foundNode: value,
            }
          ));
          succCurr = succCurr.left;
          succPath.push(succCurr.val);
        }

        const succ = succCurr;
        steps.push(makeStep("successor",
          `Successeur trouvé : ${succ.val} (le plus à gauche du sous-arbre droit, pas d'enfant gauche).`,
          snap, {
            currentNode: succ.val,
            path: [...succPath],
            foundNode: value,
            successorNode: succ.val,
          }
        ));

        const newRoot = deleteNode(root, value);
        const newSnap = deepClone(newRoot);
        steps.push(makeStep("delete",
          `${value} remplacé par ${succ.val}, puis ${succ.val} supprimé du sous-arbre droit.`,
          newSnap, { path: path.slice(0, -1), successorNode: succ.val }
        ));
        steps.push(makeStep("done", `Suppression de ${value} terminée.`, newSnap, {
          path: path.slice(0, -1),
        }));
        return { steps, resultTree: newRoot };
      }
    }

    const dir = value < curr.val ? "gauche" : "droite";
    steps.push(makeStep("visit",
      `${value} ${value < curr.val ? "<" : ">"} ${curr.val} → aller à ${dir}`,
      snap, { currentNode: curr.val, path: [...path] }
    ));
    curr = value < curr.val ? curr.left : curr.right;
  }

  // Non trouvé
  steps.push(makeStep("not-found",
    `✗ ${value} n'est pas dans l'arbre — rien à supprimer.`,
    snap, { path: [...path] }
  ));
  steps.push(makeStep("done", "Suppression terminée (valeur absente).", snap, { path: [...path] }));
  return { steps, resultTree: root };
}
