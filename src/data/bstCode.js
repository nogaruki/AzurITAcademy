// ─── Code source TypeScript complet (affiché dans l'onglet Code) ───
export const BST_CODE = `class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

class BST {
  root: TreeNode | null = null;

  // ── Insertion ──────────────────────────────────────────
  insert(val: number): void {
    this.root = this._insert(this.root, val);
  }

  private _insert(node: TreeNode | null, val: number): TreeNode {
    if (!node) return new TreeNode(val);
    if (val < node.val) node.left  = this._insert(node.left,  val);
    else if (val > node.val) node.right = this._insert(node.right, val);
    // val === node.val : doublon ignoré
    return node;
  }

  // ── Recherche ─────────────────────────────────────────
  search(val: number): boolean {
    return this._search(this.root, val);
  }

  private _search(node: TreeNode | null, val: number): boolean {
    if (!node) return false;
    if (val === node.val) return true;
    return val < node.val
      ? this._search(node.left, val)
      : this._search(node.right, val);
  }

  // ── Suppression ───────────────────────────────────────
  delete(val: number): void {
    this.root = this._delete(this.root, val);
  }

  private _delete(node: TreeNode | null, val: number): TreeNode | null {
    if (!node) return null;

    if (val < node.val) {
      node.left = this._delete(node.left, val);
    } else if (val > node.val) {
      node.right = this._delete(node.right, val);
    } else {
      // Cas 1 : feuille / Cas 2 : un seul enfant
      if (!node.left)  return node.right;
      if (!node.right) return node.left;

      // Cas 3 : deux enfants → successeur infixe
      const successor = this._min(node.right);
      node.val   = successor.val;
      node.right = this._delete(node.right, successor.val);
    }
    return node;
  }

  // ── Minimum ───────────────────────────────────────────
  private _min(node: TreeNode): TreeNode {
    while (node.left) node = node.left;
    return node;
  }

  // ── Parcours infixe ───────────────────────────────────
  inorder(): number[] {
    const result: number[] = [];
    this._inorder(this.root, result);
    return result;
  }

  private _inorder(node: TreeNode | null, result: number[]): void {
    if (!node) return;
    this._inorder(node.left, result);
    result.push(node.val);
    this._inorder(node.right, result);
  }
}`;
