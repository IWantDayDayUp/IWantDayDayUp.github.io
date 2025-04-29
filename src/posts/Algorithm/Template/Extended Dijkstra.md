---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-23

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Template

# Tag
tag:
  - Extended Dijkstra
---

# 🧩 Extended Dijkstra

## 📌 Description

`Extended Dijkstra` refers to a class of shortest path algorithms derived from Dijkstra, adapted to problems where each node must track **additional state information**, such as the number of operations used, remaining power, or whether a bonus has been applied

---

## 💡 Key Idea

- ⭕ Track not just the node but `(node, extra_state)` as a compound state
- ⭕ Each state has its own shortest path: `dist[u][state]`
- ⭕ Total state space becomes `node × state`
- ⭕ Use Dijkstra’s priority queue with `tuple<distance, node, state>`

---

## 🔎 Usage Examples: From Problem Description to State Modeling

### 🧪 Example 1: One-Time Free Edge

**Description**: You can use a **double speed mode once**, then you walk normally

Modeling:

- State: `usedFree = 0` (not used), `1` (used)
- Transitions:
  - Normal edge: cost $w$, no state change
  - Free edge: cost $0$, state flips $0 \rightarrow 1$

### 🧪 Example 2: Graph Flipping

**Description**: You can flip all edge directions with cost $X$

Modeling:

- State: `0 = normal`, `1 = reversed`
- Transitions:
  - Move along allowed edges: cost $1$
  - Flip: switch state with cost $X$

### 🧪 Example 3: Train with Timed Departures

**Description**: Each edge is a train that **departs every K minutes**. You must wait until departure

Modeling:

- State: current time mod $K$ (e.g., `0-K-1`)
- Transitions:
  - Wait until next multiple of $K$: $\lfloor \frac{t}{K} \rfloor * K + travelTime$

### 🧪 Example 4: Power-Ups or Modes

**Description**: You can use a **double speed mode once**, then you walk normally

Modeling:

- State: `mode = 0` (normal), `1` (used double-speed)
- Transitions:
  - Cost halves when `mode = 0` and used $\rightarrow$ move to `mode = 1`

---

## 📘 Annotated C++ Template (for review & learning)

```cpp
// Extended Dijkstra: Annotated Version
// ----------------------------------------
// Purpose: Solve shortest path with additional state tracking
// Usage  : Works for problems where rules vary by used options

// ABC 395 E
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    long long X;
    cin >> n >> m >> X;

    vector<vector<int>> g0(n), g1(n);
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        g0[u].push_back(v); // original graph
        g1[v].push_back(u); // reversed graph
    }

    // `dist[u][rev]` = minimum cost to reach node `u` with graph in state `rev`
    vector<vector<long long>> dist(n, vector<long long>(2, 1e18));
    dist[0][0] = 0;

    // tuple<long long, int, int>: (cost, node, state)
    priority_queue<tuple<long long, int, int>, vector<tuple<long long, int, int>>, greater<>> pq;
    pq.emplace(0, 0, 0); // cost, node, state (0 = normal, 1 = reversed)

    while (!pq.empty())
    {
        auto [d, u, rev] = pq.top();
        pq.pop();

        if (d > dist[u][rev])
        {
            continue;
        }

        // traverse edges
        for (int v : (rev == 0 ? g0[u] : g1[u]))
        {
            if (dist[v][rev] > d + 1)
            {
                dist[v][rev] = d + 1;
                pq.emplace(dist[v][rev], v, rev);
            }
        }

        // flip the graph at the current node
        // It costs `X` to flip, and you stay at the same node after flipping
        if (dist[u][rev ^ 1] > d + X)
        {
            dist[u][rev ^ 1] = d + X;
            pq.emplace(dist[u][rev ^ 1], u, rev ^ 1);
        }
    }

    long long ans = min(dist[n - 1][0], dist[n - 1][1]);

    cout << (ans == 1e18 ? -1 : ans) << '\n';

    return 0;
}
```

---

## 🛠️ Usage Notes

- ✅ Works well for **k-limited powers**, flags, cooldowns, etc
- ✅ State must be **discretizable** (e.g., `0` or `1`; `0` to `k`; `mod` cycle)
- ✅ Final answer is usually `min(dist[goal][*])`
- ✅ Common bug: forgetting to initialize all state combinations or pushing incorrect state

```cpp
// Example usage here
```

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` |  `Title`  | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :-------: | :----------: | :-------------------------------------------------------: |
|    ABC395    |     `E`      | Flip Edge |      5       | [Link](https://atcoder.jp/contests/abc395/tasks/abc395_e) |

---

## 🧠 Conclusion

- 🧩 Extended Dijkstra = Dijkstra + state dimension
- 🧩 Always use a 2D `dist[u][state]` array for tracking
- 🧩 Think of "state" as part of your virtual node
