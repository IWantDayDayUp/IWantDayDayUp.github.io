---
layout: post
title: Codeforces Round 815 (Div. 2) D1(DP) D2(字典树+DP)
date: 2022-08-18 15:37 +0800
categories: [Classical Algorithm, DP]
tags: [Codeforces, dp, 字典树]
render_with_liquid: false
math: true
---

## D1. Xor-Subsequence (easy version) (DP)

<https://codeforces.com/contest/1720/problem/D1>

首先, 上来就是一个 $O(n^2)$ 的DP, 定义 $dp[i]$: 表示前 $i$数字可以形成的最长子序列

类比最长上升子序列的做法, 先枚举 $i$, 再枚举 $j$, 并维护 $dp[i]$ 的值

```c++
for (int i = 0; i < n; i++) {
    for (int j = i - 1; j >= 0; j--) {
        if ((a[j] ^ i) < (a[i] ^ j))
            dp[i] = max(dp[i], dp[j] + 1);
    }
}
```

对于D1, 因为 $a_i \le 200$, 所以如果 $i$ 和 $j$ 相差很大的话, $a_j \bigoplus i$ 一定大于 $a_i \bigoplus j$

这是因为 $a_i$ 最大只有 `200`, 小于 $2^8 = 256$, `异或`时, 最多只影响到 `第8位`

所以我们只需要加上个限制, 最多向前跑400个即可(具体是多少不用管, 反正400肯定是够的)

```c++
#include <bits/stdc++.h>

using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }

    vector<int> dp(n, 1);
    for (int i = 0; i < n; i++)
    {
        for (int j = i - 1; j >= 0 && (i - j) <= 400; j--)
        {
            if ((a[j] ^ i) < (a[i] ^ j))
            {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }

    cout << *max_element(dp.begin(), dp.end()) << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;
    while (t--) {
        solve();
    }

    return 0;
}
```

## D2. Xor-Subsequence (hard version) (字典树+DP)

<https://codeforces.com/contest/1720/problem/D2>

字典树还没掌握, 解法参照 <https://zhuanlan.zhihu.com/p/555425330>
