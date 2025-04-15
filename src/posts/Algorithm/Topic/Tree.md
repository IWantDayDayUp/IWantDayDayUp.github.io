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
---

# 🧩 Tree

|                  Problem                   | Data Structure / Algo | 🔥 Key Insight / Mark |
| :----------------------------------------: | :-------------------: | :-------------------: |
| [Tree Diameter](#🌳-tree-diameter-via-bfs) |          BFS          |        ⭐🛠️🔥         |

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
