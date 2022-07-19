---
layout: post
title: Codeforces Round 809 (Div. 2) C(前缀和, 后缀和)
date: 2022-07-18 15:37 +0800
categories: [Classical Algorithm, Prefix]
tags: [Codeforces, prefix, suffix]
render_with_liquid: false
math: true
---

## 1. C - 前缀数组 后缀数组

<https://codeforces.com/contest/1706/problem/C>

### 1.1 Problem Statement

有 $n(1 \le i \le n)$ 个建筑, 每个建筑的高度为 $h_i$

`cool building`: it is taller than both building $i - 1$ and building $i + 1$ (and both of them exist)

可以给任意建筑添加额外的楼层$(\ge 0)$, 使之变为 `cool`

问: 为了使 `cool building` 数目最大化, 需要添加的楼层的最少数目?

### 1.2 分析

首先, 两个`相邻`建筑不可以同时都为 `cool building`

1. $n$ 为奇数:
    > `cool building` 最大数目必须是 $\frac{n - 1}{2}$, 并按照如下方式排列:
    >
    > $$01010...01010$$
    >
    > 计算时: `cool building` 位置已经确定, 直接计算需要额外添加的楼层数目即可

2. $n$ 为偶数:
    > `cool building` 最大数目必须是 $\frac{n - 2}{2}$, 并且存在一对 `邻接普通建筑`, 最终按照如下方式之一进行排列:
    >
    > $$001010...01010$$
    > $$\vdots$$
    > $$01010...001010$$
    > $$01010...010010$$
    > $$01010...010100$$
    >
    > 计算时: 由于 `邻接普通建筑` 位置不确定, 需要枚举所有可能的位置, 计算相应的额外楼层数量, 最后确定最小值
    >
    > > 1. 为了简化计算, 可以预先计算出每个建筑变成 `cool building` 所需的额外楼层数量,
    > >
    > > 2. `需要的额外楼层数目 = 邻接普通建筑左边 + 邻接普通建筑 + 邻接普通建筑右边`
    > >
    > > 3. `邻接普通建筑` 中任意一个都能作为 `cool building`, 当然取最小值
    >

### 1.3 code

```c++
#include <bits/stdc++.h>

using namespace std;

void slove() {
    int n;
    cin >> n;

    vector<long long> h(n);
    for (int i = 0; i < n; i++)
    {
        cin >> h[i];
    }

    long long ans = 0;

    if (n % 2 == 0)
    {
        ans = 1e18;

        // 这里预先计算了方案一需要的数目
        long long right = 0;
        for (int i = n - 2; i >= 1; i -= 2)
        {
            if (h[i - 1] < h[i] && h[i] > h[i + 1])
            {
                right += 0;
            } else {
                right += max(h[i - 1] - h[i], h[i + 1] - h[i]) + 1;
            }
        }
        // cout << "right" << right << endl;

        // 统计邻接普通建筑右边需要的数目
        long long left = 0;
        for (int i = 1; i < n - 1; i += 2)
        {
            // 邻接普通建筑各自需要的数目
            long long num1 = 0, num2 = 0;
            if (h[i - 1] < h[i] && h[i] > h[i + 1])
            {
                num1 += 0;
            } else {
                num1 += max(h[i - 1] - h[i], h[i + 1] - h[i]) + 1;
            }
            if (h[i] < h[i + 1] && h[i + 1] > h[i + 2])
            {
                num2 += 0;
            } else {
                num2 += max(h[i] - h[i + 1], h[i + 2] - h[i + 1]) + 1;
            }

            // 右边向后退
            right -= num2;

            // 当前方案需要的数目 = 左边 + min(邻接) + 右边
            ans = min(ans, left + min(num1, num2) + right);

            // 左边向右进
            left += num1;
        }

    } else {
        // n 为奇数时, 位置确定, 直接计算
        for (int i = 1; i < n; i += 2)
        {
            if (h[i - 1] < h[i] && h[i] > h[i + 1])
            {
                ans += 0;
            } else {
                ans += max(h[i - 1] - h[i], h[i + 1] - h[i]) + 1;
            }
        }
    }

    cout << ans << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int t;
    cin >> t;
    while (t--) {
        slove();
    }

    return 0;
}
```

Jiangly:

```c++
#include <bits/stdc++.h>

using i64 = long long;

void solve() {
    int n;
    std::cin >> n;
    
    std::vector<int> h(n);
    for (int i = 0; i < n; i++) {
        std::cin >> h[i];
    }
    
    i64 res = 0;
    for (int i = 1; i + 1 < n; i += 2) {
        res += std::max({h[i - 1] + 1, h[i + 1] + 1, h[i]}) - h[i];
    }
    
    i64 ans = res;
    if (n % 2 == 0) {
        for (int i = n - 2; i > 0; i--) {
            res += (i % 2 == 0 ? 1 : -1) * (std::max({h[i - 1] + 1, h[i + 1] + 1, h[i]}) - h[i]);
            ans = std::min(ans, res);
        }
    }
    std::cout << ans << "\n";
}

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    
    int t;
    std::cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}

```
