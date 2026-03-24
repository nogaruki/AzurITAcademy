// ─── Code source TypeScript (affiché dans l'onglet Code) ───
export const QUICKSORT_CODE = `function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // Lomuto : pivot = dernier élément
  let i = low - 1;         // i = frontière des éléments ≤ pivot

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  // Place le pivot à sa position finale
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // retourne l'index final du pivot
}

function quicksort(arr: number[], low: number = 0, high: number = arr.length - 1): void {
  if (low >= high) return; // base : 0 ou 1 élément → déjà trié

  const pivotIdx = partition(arr, low, high); // partitionne & place le pivot
  quicksort(arr, low, pivotIdx - 1);          // trie la partie gauche
  quicksort(arr, pivotIdx + 1, high);         // trie la partie droite
}`;
