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
  - 0-1 BFS
---

# 🧩 0-1 BFS

## 📌 Description

`0-1 BFS` is a variation of the **Breadth-First-Search(BFS)** algorithm, optimized for graphs where edge weights are either `0` or `1`. This optimization takes advantage of the **deque** data structure to achieve **faster performance** compared to standard BFS or Dijkstra's algorithm

- Edge weights: `0` or `1`
- Goal: Find the shortest path from a source node to all other nodes(similar to Dijkstra's algorithm but only works for 0/1 weights)

---

## 💡 Key Idea

- ⭕ Graph Representation:
  - **adjacency list** or **adjaceny matrix**
  - edge weights: `0` or `1`
- ⭕ Deque(Double-Ended Queue):
  - It allows us to efficiently add elements to both ends, leading to $O(E)$ time complexity
  - For an edge weight of `0`, the destination node is pushed to the **front** of the deque
  - For an edge weight of `1`, the destination node is pushed to the **back** of the deque

---

## 📘 Applications of `0-1 BFS`

- **Shortest Path in Graphs with 0/1 Weights**: A very direct application is finding the shortest path in graphs where edge weights are restricted to `0` and `1`, as it avoids the complexity of Dijkstra’s algorithm.
- **Network Routing**: In network routing algorithms where the costs are either `0` (free) or `1` (a cost to be incurred).
- **Grid Problems**: Useful in problems involving grids where movement between cells can have `0` or `1` cost (for example, pathfinding).

---

## 📝 Annotated C++ Template (for review & learning)

```cpp
// TayLock

#include <bits/stdc++.h>

using namespace std;

constexpr int dx[] = {1, 0, -1, 0};
constexpr int dy[] = {0, 1, 0, -1};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    int h, w;
    cin >> h >> w;

    vector<string> grid(h);
    for (int i = 0; i < h; i++)
    {
        cin >> grid[i];
    }

    int a, b, c, d;
    cin >> a >> b >> c >> d;
    a--;
    b--;
    c--;
    d--;

    // store the shortest distance from the source node to all other nodes
    // Set the distance to infinity for all nodes except the source node (distance to source is 0)
    vector<vector<int>> dis(h, vector<int>(w, 1e9));
    dis[a][b] = 0;

    // Use a deque to store the nodes and start with the source node
    deque<array<int, 3>> q;
    q.push_back({0, a, b});

    // We process each node in the deque and update the distances based on the edge weights.
    // The algorithm terminates once all reachable nodes have been processed and the shortest distances have been computed
    while (!q.empty())
    {
        auto [d, x, y] = q.front();
        q.pop_front();

        for (int k = 0; k < 4; k++)
        {
            int nx = x + dx[k];
            int ny = y + dy[k];

            if (nx < 0 || nx >= h || ny < 0 || ny >= w)
            {
                continue;
            }

            // If there is an edge (u,v) with weight 0, we update the distance of v and push it to the `front` of the deque
            if (grid[nx][ny] == '.')
            {
                if (dis[nx][ny] > d)
                {
                    dis[nx][ny] = d;
                    q.push_front({d, nx, ny});
                }
            }
            // If there is an edge (u,v) with weight 1, we update the distance of v and push it to the `back` of the deque
            else
            {
                if (dis[nx][ny] > d + 1)
                {
                    dis[nx][ny] = d + 1;
                    q.push_back({d + 1, nx, ny});
                }
            }
        }
    }

    cout << dis[c][d] << endl;

    return 0;
}
```

```cpp
// Better version

#include <bits/stdc++.h>

using namespace std;

constexpr int dx[] = {1, 0, -1, 0};
constexpr int dy[] = {0, 1, 0, -1};

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    int h, w;
    cin >> h >> w;

    vector<string> grid(h);
    for (int i = 0; i < h; i++)
    {
        cin >> grid[i];
    }

    int a, b, c, d;
    cin >> a >> b >> c >> d;
    a--;
    b--;
    c--;
    d--;

    vector<vector<int>> dis(h, vector<int>(w, -1));

    deque<array<int, 3>> q;
    q.push_back({0, a, b});

    while (!q.empty())
    {
        auto [d, x, y] = q.front();
        q.pop_front();

        // once you visit a cell with the minimum cost, you never need to revisit it
        // because deque guarantees that any later visit will have equal or worse cost
        if (dis[x][y] != -1)
        {
            continue;
        }
        // sets the minimum cost to reach cell (x, y), we only do this once
        dis[x][y] = d;

        for (int k = 0; k < 4; k++)
        {
            int nx = x + dx[k];
            int ny = y + dy[k];

            if (nx < 0 || nx >= h || ny < 0 || ny >= w)
            {
                continue;
            }

            // weight 0
            if (grid[nx][ny] == '.')
            {
                q.push_front({d, nx, ny});
            }
            // weight 1
            else
            {
                q.push_back({d + 1, nx, ny});
            }
        }
    }

    cout << dis[c][d] << endl;

    return 0;
}
```

---

## 🛠️ Usage Notes

- ✅ How to move between cells

```cpp
constexpr int dx[] = {1, 0, -1, 0};
constexpr int dy[] = {0, 1, 0, -1};

for (int k = 0; k < 4; k++)
{
    int nx = x + dx[k];
    int ny = y + dy[k];

    if (nx < 0 || nx >= h || ny < 0 || ny >= w)
    {
        continue;
    }

    // Process the valid (nx, ny) position
}
```

- ✅ Variable step movement

In some pathfinding or simulation problems, we may need to move **multiple steps** in a particular direction to model `long jumps` or `larger strides` while keeping the option for one-step movement

::: tip

Using an additional loop (like `s` for controlling step sizes) is a clever trick to generalize the solution for both `single-step` and `multi-step` movements

:::

```cpp
// For example: ABC-400 D

constexpr int dx[] = {1, 0, -1, 0};
constexpr int dy[] = {0, 1, 0, -1};

for (int k = 0; k < 4; k++)
{
    for (int s = 1; s <= n; s++)
    {
        int nx = x + dx[k] * s;
        int ny = y + dy[k] * s;

        if (nx < 0 || nx >= h || ny < 0 || ny >= w)
        {
            continue;
        }

        // Process the valid (nx, ny) position
    }
}
```

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` |          `Title`           | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :------------------------: | :----------: | :-------------------------------------------------------: |
|   ABC-400    |     `D`      | Takahashi the Wall Breaker |      ⭐      | [link](https://atcoder.jp/contests/abc400/tasks/abc400_d) |

---

## 🧠 Conclusion

- 🧩 `0-1 BFS` is an efficient algorithm for graphs with edge weights of `0` and `1`. By using a deque and updating distances based on edge weights, we can compute the shortest path in **linear time relative to the number of edges and vertices** — $O(V + E)$. It’s faster than traditional Dijkstra’s algorithm in these cases and provides an optimal solution.
