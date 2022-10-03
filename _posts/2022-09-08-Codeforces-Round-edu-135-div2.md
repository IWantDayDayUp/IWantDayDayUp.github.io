---
layout: post
title: Codeforces Round edu 135 D(DP) 
date: 2022-09-08 15:37 +0800
categories: [Classical Algorithm, 区间DP]
tags: [Codeforces, 区间dp, dp]
render_with_liquid: false
math: true
---

## D. Letter Picking

[Letter Picking](https://codeforces.com/contest/1728/problem/D)

题目: Alice和Bob又双叒叕在玩游戏, 有一个由小写字母组成的字符串, 长度为偶数, 两个玩家每次从字符串左边或者右边拿掉一个字符, 添加在自己字符串的头部, 问最后谁能赢

分析: `区间DP`

定义 $dp[l][r]$: 只考虑区间 $[l, r]$, 两个人都在最优策略下执行完所有操作之后的结果

> `区间DP`枚举思路: 先枚举长度短的区间, 再枚举长度大的区间, 然后用长度短的区间去更新长度大的区间的答案
{: .prompt-tip }

其中, 用 `1` 表示 Alice 赢, 用 `0` 表示 平局Draw, 用 `-1` 表示 Bob 赢

显然:

- 对先手Alice来说, 想要的结果的优先级如下: $1 > 0 > -1$
- 对后手Bob来说, 想要的结果的优先级如下: $-1 > 0 > 1$

转移, 只有四种情况:

- Alice先手拿$s_l$, Bob后手拿$s_{l + 1}$, 考虑从 $dp[l + 2][r]$ 进行转移

> 1. $dp[l + 2][r] \not ={0}$: 不是平局, 直接转移
> 2. $dp[l + 2][r] = 0$: 平局, 就要分析 $s_l$ 与 $s_{l + 1}$ 的大小关系

- Alice先手拿$s_l$, Bob后手拿$s_r$, 考虑从 $dp[l + 1][r - 1]$ 进行转移

> 1. $dp[l + 1][r - 1] \not ={0}$: 不是平局, 直接转移
> 2. $dp[l + 1][r - 1] = 0$: 平局, 就要分析 $s_l$ 与 $s_r$ 的大小关系

对于后手Bob来说, 他有选择权, 会从上面两种走法中尽量选择小的(-1 表示Bob赢), 用 $val_l$ 表示

- Alice先手拿$s_r$, Bob后手拿$s_l$, 考虑从 $dp[l + 1][r - 1]$ 进行转移

> 1. $dp[l + 1][r - 1] \not ={0}$: 不是平局, 直接转移
> 2. $dp[l + 1][r - 1] = 0$: 平局, 就要分析 $s_r$ 与 $s_l$ 的大小关系

- Alice先手拿$s_r$, Bob后手拿$s_{r - 1}$, 考虑从 $dp[l][r - 2]$ 进行转移

> 1. $dp[l][r - 2] \not ={0}$: 不是平局, 直接转移
> 2. $dp[l][r - 2] = 0$: 平局, 就要分析 $s_r$ 与 $s_{r - 1}$ 的大小关系

对于后手Bob来说, 他有选择权, 会从上面两种走法中尽量选择小的(-1 表示Bob赢), 用 $val_r$ 表示

而对于先手Alice来说, 她更倾向于选择大的(1表示Alice赢), 显然:

$$dp[l][r] = \max (val_l, val_r)$$

```c++
#include <bits/stdc++.h>

using namespace std;

int cmp(char a, char b) {
    if (a < b) {
        return -1;
    } else if (a == b) {
        return 0;
    } else {
        return 1;
    }
}

void solve() {
    string s;
    cin >> s;

    int n = s.length();
    
    vector<vector<int>> dp(n + 1, vector<int>(n + 1));
    for (int r = 0; r <= n; r++) {
        for (int l = r; l >= 0; l--) {
            if (l == r) {
                dp[l][r] = 0;
            } else if (r - l >= 2) {
                // Alice先取左边第一个, Bob可以取左边第二个, 或者右边第一个
                int v1 = dp[l + 1][r - 1] != 0 ? dp[l + 1][r - 1] : cmp(s[l], s[r - 1]);
                int v2 = dp[l + 2][r] != 0 ? dp[l + 2][r] : cmp(s[l], s[l + 1]);

                // Alice先取右边第一个, Bob可以取左边第一个, 或者右边第二个
                int v3 = dp[l + 1][r - 1] != 0 ? dp[l + 1][r - 1] : cmp(s[r - 1], s[l]);
                int v4 = dp[l][r - 2] != 0 ? dp[l][r - 2] : cmp(s[r - 1], s[r - 2]);

                // Bob肯定是要从剩余的两个选择中, 选择小的(-1表示Bob赢)
                // 而Alice要选择大的(1表示Alice赢)
                dp[l][r] = max(min(v1, v2), min(v3, v4));
            }
        }
    }
    
    int ans;
    
    // 这里Jiangly还考虑到了 n 为奇数的情况
    if (n % 2 == 0) {
        ans = dp[0][n];
    } else {
        ans = min(dp[0][n - 1], dp[1][n]);
        if (ans == 0) {
            ans = 1;
        }
    }
    
    cout << (ans == 1 ? "Alice" : ans == 0 ? "Draw" : "Bob") << "\n";
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