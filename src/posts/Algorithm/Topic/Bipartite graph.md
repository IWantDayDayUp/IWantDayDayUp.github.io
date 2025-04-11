---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-11

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Topic

# Tag
tag:
  - Bipartite Graph
  - BFS
  - DFS
---

# 🧩 Bipartite Graph

## 📌 Description

A **bipartite graph** is a type of graph where the set of vertices can be divided into two disjoint sets $U$ and $V$ such that:

- Every edge in the graph connects a vertex in $U$ to a vertex in $V$, and there are no edges between vertices within the same set

Formally, a graph $G = (V, E)$ is bipartite if:

- $V = U \cup V$(disjoint sets)
- $E$ consists only of edges between $U$ and $V$, i.e., there are no edges between vertices within the same set

---

## 💡 Properties of Bipartite Graphs

- ⭕ No Odd cycles:
  - A bipartite graph contains **no odd-length cycles**. This is a key property and is used to check whether a graph is bipartite
- ⭕ 2-Colorable:
  - A graph is bipartite if and only if it can be **colored with two colors** such that no two adjacent vertices have the same color
  - The two sets $U$ and $V$ can be thought of as two groups of vertices that alternate in color
- ⭕ Perfect Matching:
  - A **perfect matching** is a matching that covers all vertices of the graph. In bipartite graphs, the **Hall's marriage theorem** helps determine the existence of a perfect matching
- ⭕ Edge Types:
  - All edges in a bipartite graph are of the form $(u, v)$, where $u \in U$ and $v \in V$. There are no edges where both vertices are from the same set

---

## ⚡ Applications of Bipartite Graphs

- ⭕ Matching Problems:
  - **Job Assignment**: Matching employees (set $U$) with jobs (set $V$) based on some criteria.
  - **Dating/Marriage Problems**: Matching individuals based on preferences.
  - **Flow Networks**: Used in algorithms for computing maximum bipartite matching, like the **Ford-Fulkerson** algorithm.
- ⭕ Graph Coloring:
  - Bipartite graphs can be colored using only two colors, which is important in problems like **scheduling or register allocation** in compilers.
- ⭕ Social Networks:
  - Bipartite graphs can represent relationships in social networks, such as connections between users and groups.

---

## 🛠️ Usage Notes

### ✅ Checking if a Graph is Bipartite - BFS/DFS

- Start with an uncolored node and assign it one color (say, color `1`)
- Assign all adjacent nodes the opposite color (color `2`)
- Continue this process until all reachable nodes are colored
- If you encounter a node that is already colored and it conflicts with the current color, the graph is not bipartite
- Time Complexity: $O(V + E)$

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    // adjacency list for the tree
    vector<vector<int>> adj(n);
    // adjacency matrix for quick edge existence checks
    vector<vector<bool>> is_connected(n, vector<bool>(n, false));

    for (int i = 1; i < n; i++)
    {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        adj[u].push_back(v);
        adj[v].push_back(u);

        is_connected[u][v] = is_connected[v][u] = true;
    }

    // -1 means uncolored
    vector<int> visited(n, -1);
    visited[0] = 0; // Start coloring with 0

    queue<int> q;
    q.push(0);

    // Perform BFS to 2-color the tree (color 0 or 1)
    while (!q.empty())
    {
        int u = q.front();
        q.pop();

        for (auto v : adj[u])
        {
            if (visited[v] == -1)
            {
                // Assign opposite color
                visited[v] = visited[u] ^ 1;
                q.push(v);
            }
            else if (visited[v] == visited[u])
            {
                // Conflict in color, not bipartite
                cout << "No" << endl;
                return 0;
            }
        }
    }

    cout << "Yes" << endl;

    return 0;
}
```

### ✅ Maximum Bipartite Matching

The goal is to find the largest set of edges such that no two edges share a vertex

- **Hungarian Algorithm** (Kuhn’s Algorithm): It uses `DFS` to find augmenting paths and iteratively increases the matching, with $O(V * E)$ time complexity

```cpp
// Bipartite Graph: Annotated Version
// ----------------------------------------
// Purpose: finding the maximum bipartite matching in bipartite graphs
// Usage  : ...

#include <bits/stdc++.h>

using namespace std;

// Helper function to find an augmenting path
bool dfs(int u, vector<vector<int>>& adj, vector<int>& match_u, vector<int>& match_v, vector<bool>& visited) {
    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;

            if (match_v[v] == -1 || dfs(match_v[v], adj, match_u, match_v, visited)) {
                match_u[u] = v;
                match_v[v] = u;

                return true;
            }
        }
    }

    return false;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    // adjacency list for the tree
    vector<vector<int>> adj(n);
    for (int i = 1; i < n; i++)
    {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> match_u(n, -1); // match_u[i] is the node in V matched with i in U
    vector<int> match_v(n, -1); // match_v[i] is the node in U matched with i in V

    int matching = 0;

    for (int u = 0; u < n; u++) {
        vector<bool> visited(n, false);
        if (dfs(u, adj, match_u, match_v, visited)) {
            matching++;
        }
    }

    cout << matching << endl;

    return 0;
}
```

- **Ford-Fulkerson Method** for Maximum Flow: The `Ford-Fulkerson` algorithm can be applied on bipartite graphs by converting the graph into a **flow network**

```cpp
// Ford-Fulkerson for maximum bipartite matching
int bfs(vector<vector<int>>& residual, int source, int sink, vector<int>& parent) {
    vector<bool> visited(residual.size(), false);
    visited[source] = true;

    queue<int> q;
    q.push(source);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v = 0; v < residual.size(); v++) {
            if (!visited[v] && residual[u][v] > 0) {
                visited[v] = true;
                parent[v] = u;

                if (v == sink) return true;

                q.push(v);
            }
        }
    }

    return false;
}

int fordFulkerson(vector<vector<int>>& residual, int source, int sink) {
    vector<int> parent(residual.size(), -1);
    int maxFlow = 0;

    while (bfs(residual, source, sink, parent)) {
        int pathFlow = INT_MAX;

        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            pathFlow = min(pathFlow, residual[u][v]);
        }

        // Update residual capacities
        for (int v = sink; v != source; v = parent[v]) {
            int u = parent[v];
            residual[u][v] -= pathFlow;
            residual[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}
```

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` |  `Title`  | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :-------: | :----------: | :-------------------------------------------------------: |
|    ABC398    |     `E`      | Tree Game |      4       | [Link](https://atcoder.jp/contests/abc398/tasks/abc398_e) |

---

## 🧠 Conclusion

- 🧩 Bipartite graphs are essential in solving various **optimization problems**, especially in **matching** and **flow networks**. The two main algorithms for bipartite graph problems are:
  - **BFS/DFS with 2-coloring** to check for bipartiteness
  - **Matching algorithms** (e.g., `Kuhn's algorithm`, `Ford-Fulkerson`) to find maximum matchings
