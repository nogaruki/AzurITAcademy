// ─── Sections du cours BFS & DFS ───

const fr = [
  {
    id: "intro",
    title: "Qu'est-ce que BFS et DFS ?",
    icon: "◈",
    content: `**BFS (Breadth-First Search)** et **DFS (Depth-First Search)** sont les deux algorithmes fondamentaux de parcours de graphe.\n\n**BFS — Parcours en largeur** explore les voisins immédiats d'abord, puis leurs voisins, niveau par niveau. Imaginez une vague qui se propage depuis la source.\n\n**DFS — Parcours en profondeur** suit un chemin aussi loin que possible avant de revenir en arrière. Imaginez un explorateur qui s'enfonce dans un labyrinthe.`,
  },
  {
    id: "bfs",
    title: "BFS — File et niveaux",
    icon: "◇",
    content: `BFS utilise une **file FIFO** (First In, First Out) :\n\n1. Ajouter le nœud source dans la file et le marquer visité\n2. Tant que la file n'est pas vide :\n   - Retirer le premier nœud (dépiler)\n   - Pour chaque voisin non visité : le marquer et l'ajouter à la file\n\n**Propriété clé :** BFS garantit le **chemin le plus court** en nombre d'arêtes dans un graphe non pondéré, car il explore les nœuds par ordre de distance croissante.`,
  },
  {
    id: "dfs",
    title: "DFS — Pile et profondeur",
    icon: "◆",
    content: `DFS utilise une **pile LIFO** (implicite via la récursion) :\n\n1. Marquer le nœud courant comme visité\n2. Pour chaque voisin non visité : appeler DFS récursivement\n3. **Retour arrière** quand tous les voisins sont visités\n\n**Propriété clé :** DFS est idéal pour :\n- **Détecter des cycles** dans un graphe\n- **Tri topologique** (graphes orientés acycliques)\n- **Trouver des composantes connexes**\n- **Résoudre des labyrinthes**`,
  },
  {
    id: "usages",
    title: "Applications concrètes",
    icon: "◉",
    content: `**BFS en pratique :**\n- Calcul de distances dans les réseaux sociaux (degrés de séparation)\n- Navigation GPS (chemin le plus court en nombre d'étapes)\n- Moteurs de crawl web (exploration niveau par niveau)\n- Résolution de casse-tête (Rubik's Cube, taquin)\n\n**DFS en pratique :**\n- Compilation : analyse syntaxique et résolution de dépendances\n- Intelligence artificielle : exploration d'arbres de décision\n- Solveurs de Sudoku et backtracking\n- Détection de cycles dans les graphes de dépendances (npm, Maven)`,
  },
  {
    id: "complexity",
    title: "Complexité",
    icon: "⬡",
    content: `**Les deux algorithmes ont la même complexité asymptotique :**\n\n| | BFS | DFS |\n|---|---|---|\n| **Temps** | O(V + E) | O(V + E) |\n| **Espace** | O(V) | O(V) |\n\nOù V = nombre de sommets, E = nombre d'arêtes.\n\n**Différence pratique :** BFS peut nécessiter plus de mémoire si le graphe est large (beaucoup de voisins par niveau). DFS peut provoquer un **stack overflow** sur les très grands graphes récursifs.`,
  },
  {
    id: "comparison",
    title: "Quand utiliser lequel ?",
    icon: "▣",
    content: `**Choisissez BFS quand :**\n- Vous cherchez le **chemin le plus court** (non pondéré)\n- Vous voulez explorer par niveaux / distances\n- Le graphe est large mais peu profond\n\n**Choisissez DFS quand :**\n- Vous cherchez **un chemin** (existence, pas forcément le plus court)\n- Vous voulez détecter des cycles\n- Vous faites du **backtracking** (Sudoku, N-Reines)\n- Le graphe est profond et peu large\n\n**Règle pratique :** Pour le chemin le plus court → BFS. Pour l'exploration exhaustive → DFS.`,
  },
  {
    id: "recap",
    title: "Récapitulatif",
    icon: "⬢",
    content: `**5 points clés :**\n\n1. **BFS** utilise une **file** → exploration niveau par niveau\n2. **DFS** utilise une **pile** (ou récursion) → exploration en profondeur\n3. Les deux ont une complexité **O(V + E)**\n4. BFS garantit le **plus court chemin** (non pondéré), DFS non\n5. DFS est idéal pour le **backtracking** et la **détection de cycles**\n\n**Pour aller plus loin :** Dijkstra est une généralisation de BFS pour les graphes **pondérés**.`,
  },
];

const en = [
  {
    id: "intro",
    title: "What are BFS and DFS?",
    icon: "◈",
    content: `**BFS (Breadth-First Search)** and **DFS (Depth-First Search)** are the two fundamental graph traversal algorithms.\n\n**BFS** explores immediate neighbors first, then their neighbors, level by level. Think of a wave spreading outward from a source.\n\n**DFS** follows a path as far as possible before backtracking. Think of an explorer venturing deep into a maze.`,
  },
  {
    id: "bfs",
    title: "BFS — Queue and Levels",
    icon: "◇",
    content: `BFS uses a **FIFO queue** (First In, First Out):\n\n1. Add the source node to the queue and mark it visited\n2. While the queue is not empty:\n   - Remove the front node (dequeue)\n   - For each unvisited neighbor: mark it visited and add it to the queue\n\n**Key property:** BFS guarantees the **shortest path** by edge count in an unweighted graph, since it explores nodes in order of increasing distance.`,
  },
  {
    id: "dfs",
    title: "DFS — Stack and Depth",
    icon: "◆",
    content: `DFS uses a **LIFO stack** (implicit via recursion):\n\n1. Mark the current node as visited\n2. For each unvisited neighbor: call DFS recursively\n3. **Backtrack** when all neighbors are visited\n\n**Key property:** DFS is ideal for:\n- **Detecting cycles** in a graph\n- **Topological sort** (directed acyclic graphs)\n- **Finding connected components**\n- **Maze solving**`,
  },
  {
    id: "usages",
    title: "Practical Applications",
    icon: "◉",
    content: `**BFS in practice:**\n- Distances in social networks (degrees of separation)\n- GPS navigation (fewest hops)\n- Web crawlers (level-by-level exploration)\n- Puzzle solvers (Rubik's Cube, sliding puzzles)\n\n**DFS in practice:**\n- Compilers: syntax analysis and dependency resolution\n- AI: game tree exploration\n- Sudoku solvers and backtracking\n- Cycle detection in dependency graphs (npm, Maven)`,
  },
  {
    id: "complexity",
    title: "Complexity",
    icon: "⬡",
    content: `**Both algorithms have the same asymptotic complexity:**\n\n| | BFS | DFS |\n|---|---|---|\n| **Time** | O(V + E) | O(V + E) |\n| **Space** | O(V) | O(V) |\n\nWhere V = number of vertices, E = number of edges.\n\n**Practical difference:** BFS may need more memory if the graph is wide (many neighbors per level). DFS can cause a **stack overflow** on very large recursive graphs.`,
  },
  {
    id: "comparison",
    title: "When to use which?",
    icon: "▣",
    content: `**Choose BFS when:**\n- You need the **shortest path** (unweighted)\n- You want level-by-level / distance-based exploration\n- The graph is wide but shallow\n\n**Choose DFS when:**\n- You need to find **any path** (existence, not shortest)\n- You want to detect cycles\n- You're doing **backtracking** (Sudoku, N-Queens)\n- The graph is deep and narrow\n\n**Practical rule:** Shortest path → BFS. Exhaustive exploration → DFS.`,
  },
  {
    id: "recap",
    title: "Summary",
    icon: "⬢",
    content: `**5 key points:**\n\n1. **BFS** uses a **queue** → level-by-level exploration\n2. **DFS** uses a **stack** (or recursion) → depth-first exploration\n3. Both have **O(V + E)** complexity\n4. BFS guarantees the **shortest path** (unweighted), DFS does not\n5. DFS is ideal for **backtracking** and **cycle detection**\n\n**Going further:** Dijkstra is a generalization of BFS for **weighted** graphs.`,
  },
];

export const BFS_DFS_SECTIONS = { fr, en };
