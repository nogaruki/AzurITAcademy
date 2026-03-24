// ─── Code source TypeScript (affiché dans l'onglet Code) ───
export const MERGESORT_CODE = `function merge(arr: number[], left: number, mid: number, right: number): void {
  const leftArr  = arr.slice(left, mid + 1);  // copie de la moitié gauche
  const rightArr = arr.slice(mid + 1, right + 1); // copie de la moitié droite

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++]; // l'élément gauche est plus petit
    } else {
      arr[k++] = rightArr[j++]; // l'élément droit est plus petit
    }
  }

  // Copie les éléments restants
  while (i < leftArr.length)  arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}

function mergesort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
  if (left >= right) return; // base : 0 ou 1 élément → déjà trié

  const mid = Math.floor((left + right) / 2);
  mergesort(arr, left, mid);        // trie la moitié gauche
  mergesort(arr, mid + 1, right);   // trie la moitié droite
  merge(arr, left, mid, right);     // fusionne les deux moitiés
}`;
