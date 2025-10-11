---
# Author
author:
  name: TayLock
  url: https://iwantdaydayup.github.io

# Date
date: 2025-10-04

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Template

# Tag
tag:
  - DSU
  - DSU Jump
---
# ⚙️ DSU Jump (Skip-Union)

## 📌 Description

**DSU Jump (Disjoint Set Union Jump)** — also called **Union-Find with Skip Links** — is a data structure optimization based on `Union-Find`.
It efficiently maintains *the next available (alive) position* after performing **one-way, irreversible operations**, such as:

- Deleting elements that will never be restored
- Upgrading or merging all elements ≤ X to a new value Y
- Scanning and skipping "processed" indices in a monotonic sequence

The idea is to use a `find()` function with **path compression** to "jump" directly to the next valid index, avoiding repeated linear scans.

---

## 💡 Key Idea

- ⭕ Each element `i` initially points to itself (`f[i] = i`)
- ⭕ Once an element is **processed or deleted**, it is "skipped" by linking it to its next available index (`f[i] = find(i + 1)`)
- ⭕ `find(x)` returns the **next alive index ≥ x**, using path compression for amortized constant time
- 🧠 Analogy: Think of it as a "linked list" that automatically shortcuts deleted nodes.

---

## 📘 Annotated C++ Template (for review & learning)

```cpp
// DSU Jump: Annotated Version
// ----------------------------------------
// Purpose: Efficiently skip over processed/deleted elements
// Usage  : One-way merging, version upgrades, interval deletions, etc.

struct DSUJump
{
    // f[i]: next alive index ≥ i
    vector<int> f;

    DSUJump() {}
    DSUJump(int n)
    {
        init(n);
    }

    void init(int n)
    {
        // Include sentinel at n+1 for boundary safety
        f.resize(n + 2);
        iota(f.begin(), f.end(), 0);
    }

    // Find the next alive index (with path compression)
    int find(int x)
    {
        return x == f[x] ? x : f[x] = find(f[x]);
    }

    // Mark x as processed/deleted
    void erase(int x)
    {
        f[x] = find(x + 1);
    }
};
```

## 🧩 Usage Example

Suppose there are $N$ PCs, each with OS version $i$ (1-indexed). For each operation $(X, Y)$, upgrade all PCs whose version $\le X$ to version $Y$, and print the number of upgraded PCs.

```cpp
int N, Q;
cin >> N >> Q;
vector<long long> cnt(N + 2, 1);
DSUJump dsu(N);

while (Q--)
{
    int X, Y;
    cin >> X >> Y;
    X--; Y--;

    long long upgraded = 0;
    int j = dsu.find(0);

    while (j <= X)
    {
        upgraded += cnt[j];
        cnt[Y] += cnt[j];
        cnt[j] = 0;

        // Jump
        dsu.erase(j);
        j = dsu.find(j);
    }
    cout << upgraded << '\n';
}
```

## 🛠️ Usage Notes

- ✅ One-way only: Elements are permanently removed or merged
- ✅ Sentinel protection: Always initialize $n + 1$ to avoid out-of-range find calls
- ✅ Single traversal guarantee: Each index is erased once -> no double counting
- ✅ Perfect for monotonic operations, e.g. "merge all $\le X$"
- ⚠️ DSU Jump is not suitable for reversible or dynamic insertions

## ⚡ Contest C++ Template (for contest use)

```cpp
// DSU Jump - Compact Contest Version
struct DSUJump
{
    vector<int> f;

    DSUJump() {}
    DSUJump(int n) { init(n); }

    void init(int n)
    {
        f.resize(n + 2);
        iota(f.begin(), f.end(), 0);
    }

    int find(int x)
    {
        return x == f[x] ? x : f[x] = find(f[x]);
    }

    void erase(int x)
    {
        f[x] = find(x + 1);
    }
};
```

## 🧠 Applications

| Category                 | Typical Task                      | Example                               |
| :----------------------- | :-------------------------------- | :------------------------------------ |
| **Monotonic Simulation** | Delete/upgrade once and skip next | OS version upgrades, batch processing |
| **Set Skipping**         | Find next unprocessed index       | Range clearing, next-available search |
| **Value Compression**    | Merge $\le X$ to $Y$                    | DSU on values, bucket merging         |
| **Offline Queries**      | Efficient one-way updates         | Interval sweeps, dynamic merging      |

## 🧪 Example Problems

| `Platform` | `Problem`                 | `Topic`                           | `Difficulty` | `Link`                                                   |
| :--------: | :------------------------ | :-------------------------------- | :----------- | :------------------------------------------------------- |
|   AtCoder  | **ABC256 E**              | Monotonic deletion using DSU Jump | 4         | [Link](https://atcoder.jp/contests/abc256)               |
| Codeforces | **1418D – Trash Problem** | Next-alive maintenance            | 4         | [Link](https://codeforces.com/problemset/problem/1418/D) |
| Yandex Cup | **Upgrade Machines**      | Value merging with skipping       | 5        | (Conceptually similar to this OS-version problem)        |

## 🧩 Relation to Classic DSU

| Feature        | Classic DSU               | DSU Jump              |
| :------------- | :------------------------ | :-------------------- |
| Purpose        | Merge sets / connectivity | Skip deleted elements |
| Data meaning   | Root of component         | Next alive index      |
| Supports undo? | ❌ No                      | ❌ No                  |
| Suitable for   | Graph connectivity        | Monotonic processing  |
| Key operation  | `merge(x, y)`             | `erase(x)`            |
| Complexity     | O(α(N))                   | O(α(N))               |

## 🧠 Conclusion

- 🌟 DSU Jump is a specialized variant of DSU designed for one-way, skip-based simulations
- ⚙️ Each element is visited once — ideal for problems with irreversible state transitions
- 🔍 Recognize it when you see:
  - "Find the next unprocessed index"
  - "Upgrade all $\le X$"
  - "Remove elements once and for all"
- 💪 Easy to implement, blazing fast, and a hidden gem in competitive programming
