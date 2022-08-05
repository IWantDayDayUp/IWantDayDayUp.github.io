---
layout: post
title: AtCoder Beginner Contest 262 (D)DP
date: 2022-07-31 15:37 +0800
categories: [Classical Algorithm, DP]
tags: [AtCoder, dp]
render_with_liquid: false
math: true
---

## 1. D DP

<https://atcoder.jp/contests/abc262/tasks/abc262_d>

### 1.1 Problem Statement

### 1.2 分析

### 1.3 code

```c++
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n);
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }

    long long mod = 998244353;
    long long ans = 0;

    // 枚举每次选择的数量 [1, n]
    for (int i = 1; i <= n; i++)
    {
        // dp[j][k][l]: 从前j个数中选择k个, mod i的余数等于 l, 的方案
        vector<vector<vector<long long>>> dp(n + 1, vector<vector<long long>>(i + 1, vector<long long>(i, 0)));
        dp[0][0][0] = 1;

        for (int j = 0; j < n; j++)
        {
            for (int k = 0; k <= i; k++)
            {   
                for (int l = 0; l < i; l++)
                {
                    dp[j + 1][k][l] += dp[j][k][l];
                    dp[j + 1][k][l] %= mod;

                    if (k != i)
                    {
                        dp[j + 1][k + 1][(l + a[j]) % i] += dp[j][k][l];
                        dp[j + 1][k + 1][(l + a[j]) % i] %= mod;
                    }
                }
            }
        }
        // cout << dp[n][i][0] << endl;
        ans = (ans + dp[n][i][0] % mod) % mod;
    }

    cout << ans << endl;

    return 0;
}
```
