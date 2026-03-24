// ─── Exercices Recherche Binaire (codes à trou) ───

const fr = [
  {
    id: "loop",
    title: "La boucle principale",
    description:
      "Complétez la boucle while de la recherche binaire : initialisez les bornes, calculez le milieu et mettez à jour les pointeurs selon la comparaison.",
    code:
`function binarySearch(arr, target) {
  let lo = ___;          // borne inférieure : premier index
  let hi = arr.length - ___; // borne supérieure : dernier index

  while (lo <= ___) {    // tant que la plage est non vide
    const mid = Math.floor((lo + ___) / 2); // milieu

    if (arr[mid] === ___) {
      return mid;          // trouvé !
    } else if (arr[mid] < target) {
      lo = mid + ___;      // chercher à droite
    } else {
      hi = mid - ___;      // chercher à gauche
    }
  }

  return -1;             // non trouvé
}`,
    blanks: ["0", "1", "hi", "hi", "target", "1", "1"],
  },
  {
    id: "lower_bound",
    title: "lower_bound — premier index ≥ target",
    description:
      "Complétez la variante lower_bound qui retourne le premier index i tel que arr[i] ≥ target. Si tous les éléments sont < target, retourne arr.length.",
    code:
`function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.___;       // hi commence APRÈS le dernier index

  while (lo < ___) {      // invariant : [lo, hi[ contient la réponse
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] < ___) {
      lo = mid + 1;       // trop petit : chercher à droite
    } else {
      hi = ___;           // potentielle réponse ou trop grand : aller à gauche
    }
  }

  return ___;             // lo === hi : position d'insertion
}`,
    blanks: ["length", "hi", "target", "mid", "lo"],
  },
  {
    id: "count",
    title: "Compter les occurrences",
    description:
      "En utilisant lower_bound et upper_bound, comptez le nombre de fois que target apparaît dans un tableau trié. Complétez la fonction count().",
    code:
`function lowerBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    arr[mid] < target ? (lo = mid + 1) : (hi = mid);
  }
  return lo;
}

function upperBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    arr[mid] <= ___ ? (lo = mid + 1) : (hi = mid); // ≤ au lieu de <
  }
  return ___;
}

function count(arr, target) {
  return upperBound(arr, ___) - lowerBound(arr, ___);
}`,
    blanks: ["target", "lo", "target", "target"],
  },
  {
    id: "rotated",
    title: "TP — Tableau trié rotatif",
    description:
      "Un tableau trié a été \"décalé\" circulairement (ex : [4,5,6,1,2,3]). Complétez la recherche binaire adaptée qui retrouve target en O(log n).",
    code:
`function searchRotated(arr, target) {
  let lo = 0, hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] === ___) return mid; // trouvé !

    // Moitié gauche est triée ?
    if (arr[lo] <= arr[___]) {
      if (arr[lo] <= target && target < arr[___]) {
        hi = mid - 1;         // target dans la moitié gauche triée
      } else {
        lo = ___ + 1;
      }
    } else {
      // Moitié droite est triée
      if (arr[mid + 1] <= ___ && target <= arr[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - ___;
      }
    }
  }

  return -1;
}`,
    blanks: ["target", "mid", "mid", "mid", "target", "1"],
    guide: [
      "Après la rotation, l'une des deux moitiés [lo..mid] ou [mid..hi] est forcément triée.",
      "On détermine laquelle est triée en comparant arr[lo] et arr[mid].",
      "Si la moitié gauche est triée (arr[lo] <= arr[mid]) : vérifier si target s'y trouve (arr[lo] <= target < arr[mid]).",
      "Si target est dans la moitié triée, ajuster hi ; sinon ajuster lo pour aller dans l'autre moitié.",
      "Répéter jusqu'à trouver ou lo > hi.",
    ],
    explanation:
      "Un tableau rotatif est un tableau trié décalé de k positions. La clé : après rotation, exactement une des deux moitiés est toujours triée. On l'identifie puis on vérifie si la cible s'y trouve — sinon on cherche dans l'autre moitié. Complexité : O(log n) comme la recherche binaire standard.",
  },
];

const en = [
  {
    id: "loop",
    title: "The main loop",
    description:
      "Complete the while loop of binary search: initialize the bounds, compute the midpoint, and update the pointers based on the comparison.",
    code:
`function binarySearch(arr, target) {
  let lo = ___;          // lower bound: first index
  let hi = arr.length - ___; // upper bound: last index

  while (lo <= ___) {    // while range is non-empty
    const mid = Math.floor((lo + ___) / 2); // midpoint

    if (arr[mid] === ___) {
      return mid;          // found!
    } else if (arr[mid] < target) {
      lo = mid + ___;      // search right
    } else {
      hi = mid - ___;      // search left
    }
  }

  return -1;             // not found
}`,
    blanks: ["0", "1", "hi", "hi", "target", "1", "1"],
  },
  {
    id: "lower_bound",
    title: "lower_bound — first index ≥ target",
    description:
      "Complete the lower_bound variant that returns the first index i such that arr[i] ≥ target. If all elements are < target, returns arr.length.",
    code:
`function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.___;       // hi starts AFTER the last index

  while (lo < ___) {      // invariant: [lo, hi) contains the answer
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] < ___) {
      lo = mid + 1;       // too small: search right
    } else {
      hi = ___;           // potential answer or too large: go left
    }
  }

  return ___;             // lo === hi: insertion position
}`,
    blanks: ["length", "hi", "target", "mid", "lo"],
  },
  {
    id: "count",
    title: "Count occurrences",
    description:
      "Using lower_bound and upper_bound, count the number of times target appears in a sorted array. Complete the count() function.",
    code:
`function lowerBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    arr[mid] < target ? (lo = mid + 1) : (hi = mid);
  }
  return lo;
}

function upperBound(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    arr[mid] <= ___ ? (lo = mid + 1) : (hi = mid); // ≤ instead of <
  }
  return ___;
}

function count(arr, target) {
  return upperBound(arr, ___) - lowerBound(arr, ___);
}`,
    blanks: ["target", "lo", "target", "target"],
  },
  {
    id: "rotated",
    title: "TP — Rotated sorted array",
    description:
      "A sorted array has been circularly shifted (e.g. [4,5,6,1,2,3]). Complete the adapted binary search that finds target in O(log n).",
    code:
`function searchRotated(arr, target) {
  let lo = 0, hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] === ___) return mid; // found!

    // Is the left half sorted?
    if (arr[lo] <= arr[___]) {
      if (arr[lo] <= target && target < arr[___]) {
        hi = mid - 1;         // target in the sorted left half
      } else {
        lo = ___ + 1;
      }
    } else {
      // Right half is sorted
      if (arr[mid + 1] <= ___ && target <= arr[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - ___;
      }
    }
  }

  return -1;
}`,
    blanks: ["target", "mid", "mid", "mid", "target", "1"],
    guide: [
      "After rotation, exactly one of the two halves [lo..mid] or [mid..hi] is always sorted.",
      "Determine which is sorted by comparing arr[lo] and arr[mid].",
      "If the left half is sorted (arr[lo] <= arr[mid]): check if target falls there (arr[lo] <= target < arr[mid]).",
      "If target is in the sorted half, adjust hi; otherwise adjust lo to go to the other half.",
      "Repeat until found or lo > hi.",
    ],
    explanation:
      "A rotated array is a sorted array shifted by k positions. The key: after rotation, exactly one of the two halves is always sorted. Identify it, then check if the target falls there — otherwise search the other half. Complexity: O(log n) like standard binary search.",
  },
];

export const BINARY_SEARCH_EXERCISES = { fr, en };
