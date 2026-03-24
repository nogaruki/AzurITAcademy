// ─── Code source TypeScript (affiché dans l'onglet Code) ───
export const BINARY_SEARCH_CODE = `function binarySearch(arr: number[], target: number): number {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2); // évite le dépassement

    if (arr[mid] === target) {
      return mid;           // trouvé à l'index mid
    } else if (arr[mid] < target) {
      lo = mid + 1;         // target est à droite
    } else {
      hi = mid - 1;         // target est à gauche
    }
  }

  return -1;                // non trouvé
}`;
