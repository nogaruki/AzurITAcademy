// ─── Données du cours Dijkstra ───

const fr = [
  {
    id: "intro",
    title: "C'est quoi un graphe ?",
    icon: "◈",
    content: `Imagine une carte simplifiée. Tu as des **villes** (des **sommets**) et des **routes** entre elles (des **arêtes**). Les chiffres sur les routes s'appellent des **poids** — une distance en km, un temps, un prix…\n\nCe graphe est **orienté** (flèches à sens unique) et **pondéré** (chaque route a un coût).`,
  },
  {
    id: "shortest",
    title: "Le chemin le plus court",
    icon: "◇",
    content: `Le **chemin le plus court** n'est pas forcément celui avec le moins d'étapes. C'est celui dont **la somme des poids est la plus petite**.\n\n**Analogie GPS :** L'autoroute qui fait un détour est parfois plus rapide que la route directe !`,
  },
  {
    id: "purpose",
    title: "À quoi sert Dijkstra ?",
    icon: "◆",
    content: `Dijkstra répond à : « Depuis un point de départ, quel est le coût minimum pour atteindre chacun des autres points ? »\n\n**Usages :** GPS & navigation, routage réseau, pathfinding dans les jeux vidéo (ou A*), logistique & tournées.`,
  },
  {
    id: "algorithm",
    title: "Comment fonctionne Dijkstra ?",
    icon: "▣",
    content: `**L'idée en une phrase :** À chaque étape, on choisit le sommet non visité avec la plus petite distance connue, puis on regarde si en passant par lui, on peut améliorer les distances de ses voisins.\n\nC'est comme un explorateur prudent : il va toujours vers l'endroit **le plus proche qu'il n'a pas encore visité**.`,
  },
  {
    id: "structures",
    title: "Structures de données",
    icon: "⬡",
    content: `**Tableau dist :** meilleure distance connue vers chaque sommet.\n**Tableau visited :** booléens pour savoir quels sommets sont traités.\n**File de priorité (min-heap) :** liste d'attente où le sommet le plus proche sort en premier — en O(log n) au lieu de O(n).`,
  },
  {
    id: "relaxation",
    title: "La relaxation des arêtes",
    icon: "⟐",
    content: `C'est le cœur de Dijkstra. Pour chaque voisin v du sommet u :\n\n**nouveau_coût = distance_jusqu'à_u + poids(u→v)**\n\nSi nouveau_coût < dist[v], c'est un raccourci !\n\n**Analogie :** Un ami te dit « En passant par Dijon, Paris→Lyon prend 4h au lieu de 5h ». Tu mets à jour ton estimation.`,
  },
  {
    id: "complexity",
    title: "Complexité & récapitulatif",
    icon: "⬢",
    content: `**Complexité temporelle :** O((V + E) × log V) avec file de priorité.\n**Complexité spatiale :** O(V + E).\n\n**5 points clés :** Init dist à ∞ (sauf source = 0) → Push source → Boucle : pop le min, relaxe ses voisins → File vide = terminé → La file de priorité rend tout ça efficace.`,
  },
];

const en = [
  {
    id: "intro",
    title: "What is a graph?",
    icon: "◈",
    content: `Imagine a simplified map. You have **cities** (**vertices**) and **roads** between them (**edges**). The numbers on the roads are called **weights** — a distance in km, a time, a cost…\n\nThis graph is **directed** (one-way arrows) and **weighted** (each road has a cost).`,
  },
  {
    id: "shortest",
    title: "The shortest path",
    icon: "◇",
    content: `The **shortest path** is not necessarily the one with the fewest steps. It is the one where **the sum of weights is smallest**.\n\n**GPS analogy:** The highway that takes a detour is sometimes faster than the direct route!`,
  },
  {
    id: "purpose",
    title: "What is Dijkstra used for?",
    icon: "◆",
    content: `Dijkstra answers: "From a starting point, what is the minimum cost to reach each of the other points?"\n\n**Uses:** GPS & navigation, network routing, pathfinding in video games (or A*), logistics & routing.`,
  },
  {
    id: "algorithm",
    title: "How does Dijkstra work?",
    icon: "▣",
    content: `**The idea in one sentence:** At each step, we choose the unvisited vertex with the smallest known distance, then check if passing through it can improve the distances to its neighbors.\n\nIt's like a cautious explorer: they always go toward the **closest place they haven't visited yet**.`,
  },
  {
    id: "structures",
    title: "Data structures",
    icon: "⬡",
    content: `**dist array:** best known distance to each vertex.\n**visited array:** booleans to track which vertices have been processed.\n**Priority queue (min-heap):** a waiting list where the closest vertex comes out first — in O(log n) instead of O(n).`,
  },
  {
    id: "relaxation",
    title: "Edge relaxation",
    icon: "⟐",
    content: `This is the heart of Dijkstra. For each neighbor v of vertex u:\n\n**new_cost = distance_to_u + weight(u→v)**\n\nIf new_cost < dist[v], we found a shortcut!\n\n**Analogy:** A friend tells you "Via Lyon, Paris→Marseille takes 4h instead of 5h". You update your estimate.`,
  },
  {
    id: "complexity",
    title: "Complexity & recap",
    icon: "⬢",
    content: `**Time complexity:** O((V + E) × log V) with priority queue.\n**Space complexity:** O(V + E).\n\n**5 key points:** Init dist to ∞ (except source = 0) → Push source → Loop: pop min, relax neighbors → Empty queue = done → Priority queue makes it efficient.`,
  },
];

export const COURSE_SECTIONS = { fr, en };
