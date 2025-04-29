---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-15

# Original
# isOriginal: true

# Category
category:
  - Topic
  - Algorithm

# Tag
tag:
  - BFS
  - DFS
  - Tree DP
---

# 🧩 Tree

|                   Problem                    | Data Structure / Algo | 🔥 Key Insight / Mark |
| :------------------------------------------: | :-------------------: | :-------------------: |
|  [Tree Diameter](#🌳-tree-diameter-via-bfs)  |          BFS          |        ⭐🛠️🔥         |
| [Subtree Size](#🧩-subtree-size-calculation) |          DFS          |        ⭐🛠️🔥         |

<!-- |       [E](#E)       |          DSU          |        ⭐🔥🛠️         | -->

<!-- @include: ../Readme.md#Emoji -->

---

## 🌳 Tree Diameter via BFS

### 📌 What is Tree Diameter?

The diameter of a tree is the length (number of edges or total weight) of the longest path between any two nodes in the tree

### 💡 BFS-Based Strategy

To compute the diameter of a tree using two BFS traversals, we use this key property:

::: note
In a tree, the farthest node from any arbitrary node lies at one end of the diameter
:::

✅ Steps:

- Start `BFS` from any node (say node `0`):
  - Find the farthest node `u` from this start.
- Start `BFS` from node `u`:
  - Find the farthest node `v` from `u`
  - The distance between `u` and `v` is the diameter

This works because trees have no cycles, so the longest path is always between two leaves

### 🧪 C++ Code Example

::: details Annotated C++ Template

```cpp
auto solve()
{
    int n;
    cin >> n;

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

    vector<int> dis(n, -1);

    // Find the diameter of the tree
    auto bfs = [&](int s)
    {
        queue<int> q;
        q.push(s);

        dis.assign(n, -1);
        dis[s] = 0;

        while (!q.empty())
        {
            int u = q.front();
            q.pop();

            for (auto v : adj[u])
            {
                if (dis[v] == -1)
                {
                    // updates the `dis` vector to store distances from the source
                    dis[v] = dis[u] + 1;
                    q.push(v);
                }
            }
        }
        // Returns the farthest node from the source
        return max_element(dis.begin(), dis.end()) - dis.begin();
    };

    // a is the furthest node from 0
    auto a = bfs(0);
    // now b is the furthest node from a ⇒ [a, b] is diameter
    auto b = bfs(a);

    // After `b = bfs(a)`: dis[i] means the distance of node `i` to node `a`
    // After `bfs(b)`: we reuse the vertor `dis`, now, dis[i] means the distance of node `i` to node `b`
    vector<int> f(n);
    f = dis;
    bfs(b);

    for (int i = 0; i < n; i++)
    {
        // f[i] now holds the max distance of node `i` to either endpoint of the diameter
        f[i] = max(f[i], dis[i]);
    }

    return pair(f[b], f);
}
```

:::

```cpp
auto solve()
{
    int n;
    cin >> n;

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

    vector<int> dis(n, -1);

    auto bfs = [&](int s)
    {
        queue<int> q;
        q.push(s);

        dis.assign(n, -1);
        dis[s] = 0;

        while (!q.empty())
        {
            int u = q.front();
            q.pop();

            for (auto v : adj[u])
            {
                if (dis[v] == -1)
                {
                    dis[v] = dis[u] + 1;
                    q.push(v);
                }
            }
        }
        return max_element(dis.begin(), dis.end()) - dis.begin();
    };

    auto a = bfs(0);
    auto b = bfs(a);

    vector<int> f(n);
    f = dis;
    bfs(b);

    for (int i = 0; i < n; i++)
    {
        f[i] = max(f[i], dis[i]);
    }

    return pair(f[b], f);
}
```

👇 Use it like this:

```cpp
// dia: current maximum diameter of the tree
// f: max distances from diameter ends
auto [dia, f] = solve();
```

### 📝 Recommended Practice

| `Contest ID` | `Problem ID` |    `Title`     | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :------------: | :----------: | :-------------------------------------------------------: |
|    ABC401    |     `F`      | Add One Edge 3 |      5       | [Link](https://atcoder.jp/contests/abc401/tasks/abc401_f) |

---

## 🧩 Subtree Size Calculation

### 📌 Description

The task of subtree size calculation involves determining the number of nodes in the subtree rooted at each node in a tree. This is typically done using a `Depth First Search (DFS)` traversal, where we **recursively calculate the size of each subtree by visiting its children and accumulating their sizes**

Common Use Cases:

- **Tree DP**: Many tree-based dynamic programming problems require knowing the size of subtrees
- **Tree Queries**: Subtree size calculation is useful in problems like subtree sum, subtree product, or finding the number of nodes in a subtree
- **Graph Theory**: Often used to solve problems like finding the centroid of a tree or partitioning trees into subtrees

### 💡 Key Idea

- **DFS Traversal**: Perform a DFS on the tree to calculate the size of each subtree
- **Subtree Size Definition**: For a node $u$, the size of the subtree rooted at $u$ is the number of nodes in the tree including $u$ and all of its descendants
- **Bottom-Up Calculation**: Start with leaf nodes (whose subtree size is $1$) and propagate the size calculation upwards towards the root

### 🧪 C++ Code Example

::: details Annotated C++ Template

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;

    vector<vector<int>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Initialize subtree size as 1 for each node
    vector<int> size(N, 1);

    auto dfs = [&](auto &&self, int u, int p = -1) -> int {
        // Start with size 1 for the current node (itself)
        int sum = 1;

        // Visit all children of node 'u'
        for (int v : adj[u]) {
            // Skip the parent node
            if (v != p) {
                // Recursively calculate the size of the subtree rooted at 'v'
                sum += self(self, v, u);
            }
        }
        // Store the size of the subtree rooted at 'u'
        size[u] = sum;

        // Return the total size of the subtree rooted at 'u'
        return sum;
    };

    // Start the DFS from node 0 (root node)
    dfs(dfs, 0);

    for (int i = 0; i < N; i++) {
        cout << size[i] << "\n"[i = N - 1];
    }

    return 0;
}
```

:::

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int N, M;
    cin >> N >> M;

    vector<vector<int>> adj(N);
    for (int i = 0; i < M; i++) {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> size(N, 1);

    auto dfs = [&](auto &&self, int u, int p = -1) -> int {
        int sum = 1;
        for (int v : adj[u]) {
            if (v != p) {
                sum += self(self, v, u);
            }
        }
        size[u] = sum;

        return sum;
    };

    dfs(dfs, 0);

    for (int i = 0; i < N; i++) {
        cout << size[i] << "\n"[i = N - 1];
    }

    return 0;
}
```

### 📝 Recommended Practice

| `Contest ID` | `Problem ID` |           `Title`            | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :--------------------------: | :----------: | :-------------------------------------------------------: |
|    ABC397    |     `E`      | Path Decomposition of a Tree |      5       | [Link](https://atcoder.jp/contests/abc397/tasks/abc397_e) |

---
