---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-12

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Template

# Tag
tag:
  - DSU
---

# 🧩 DSU

## 📌 Description

**Disjoint Set Union (DSU)**, also known as `Union-Find`, is a data structure that efficiently manages a collection of disjoint sets. It supports two key operations:

- `find(x)`: determines the representative (or root) of the set containing $x$
- `merge(x, y)`: unites the sets that contain $x$ and $y$

`DSU` is commonly used in:

- Graph connectivity
- Kruskal's algorithm for `Minimum Spanning Tree(MST)`
- Dynamic connectivity queries
- Grouping and clustering problems

---

## 💡 Key Idea

- ⭕ `DSU` represents disjoint sets using a forest of trees, where **each node points to its parent**, and **the root of each tree is the set representative**
- ⭕ Two critical optimizations:
  - **Path compression** in `find()`: flattens the tree structure to make future queries faster
  - **Union by size/rank** in `merge()`: always attach the smaller tree under the larger, to keep trees shallow

---

## 📘 Annotated C++ Template (for review & learning)

```cpp
// DSU: Annotated Version
// ----------------------------------------
// Purpose: Efficiently manage disjoint sets with union & find operations
// Usage  : Connected components, MST, clustering, equivalence relations

/**
 * @brief Disjoint Set Union structure with path compression and union by size
 *
 * Supports efficient merge and find operations on disjoint sets.
 * Includes additional support to query the size of any connected component.
 *
 * @param n Number of elements (0-based indexed)
 * @return Merged structure to track components
 */

struct DSU
{
    // f[i]: parent of i, siz[i]: size of the component with root i
    vector<int> f, siz;

    DSU() {}
    DSU(int n)
    {
        init(n);
    }

    void init(int n)
    {
        // Initially, each node is its own parent
        f.resize(n);
        iota(f.begin(), f.end(), 0);

        // Each component has size 1
        siz.assign(n, 1);
    }

    int find(int x)
    {
        while (x != f[x])
        {
            // Path halving: make x point to its grandparent
            x = f[x] = f[f[x]];
        }
        return x;
    }

    // Are x and y in the same set?
    bool same(int x, int y)
    {
        return find(x) == find(y);
    }

    bool merge(int x, int y)
    {
        x = find(x);
        y = find(y);

        // Already connected
        if (x == y)
        {
            return false;
        }

        // Update size
        siz[x] += siz[y];
        // Attach y's root to x
        f[y] = x;

        return true;
    }

    // Size of the set containing x
    int size(int x)
    {
        return siz[find(x)];
    }
};
```

---

## 🛠️ Usage Notes

- ✅ Use `find(x)` to get the representative (or root) of `x`
- ✅ Always merge by `merge(x, y)` before checking their relation
- ✅ To count connected components: initialize $cc = n$, and decrement it every time `merge()` returns `true`
- ✅ Be mindful of $0$-based vs. $1$-based indexing in problems
- ✅ Can be extended to track `min`/`max`/`sum` of sets, or to support rollback(undo)

```cpp
// Example usage here
int cc = n;
DSU dsu(n);

for (auto [u, v] : edges)
{
    if (dsu.merge(u, v))
    {
        cc--;
    }
}
cout << "Number of connected components: " << cc << endl;
```

---

## ⚡ Contest C++ Template (for contest use)

```cpp
// DSU - Compact Version
struct DSU
{
    vector<int> f, siz;

    DSU() {}
    DSU(int n)
    {
        init(n);
    }

    void init(int n)
    {
        f.resize(n);
        iota(f.begin(), f.end(), 0);
        siz.assign(n, 1);
    }

    int find(int x)
    {
        while (x != f[x])
        {
            x = f[x] = f[f[x]];
        }
        return x;
    }

    bool same(int x, int y)
    {
        return find(x) == find(y);
    }

    bool merge(int x, int y)
    {
        x = find(x);
        y = find(y);

        if (x == y)
        {
            return false;
        }
        siz[x] += siz[y];
        f[y] = x;

        return true;
    }

    int size(int x)
    {
        return siz[find(x)];
    }
};
```

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` |    `Title`     | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :------------: | :----------: | :-------------------------------------------------------: |
|    ABC399    |     `C`      | Make it Forest |      1       | [Link](https://atcoder.jp/contests/abc399/tasks/abc399_c) |
|    ABC399    |     `E`      |    Replace     |      5       | [Link](https://atcoder.jp/contests/abc399/tasks/abc399_e) |
|    ABC401    |     `E`      | Reachable Set  |      5       | [Link](https://atcoder.jp/contests/abc401/tasks/abc401_e) |

---

## 🧠 Conclusion

- 🍉 `DSU` is a versatile tool for efficiently handling grouping and connectivity problems
- 🌐 With **path compression** and union by size/rank, `find()` and `merge()` are nearly constant time
- ⚠️ Common bugs:
  - Forgetting to compress path in `find()`
  - Wrong indexing ($0$ vs $1$-based)
  - Forgetting to update size
- 🌟 Prefer `DSU` over `BFS`/`DFS` when you only care about connectivity, not traversal order
