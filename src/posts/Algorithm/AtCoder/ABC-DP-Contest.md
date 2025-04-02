---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io
gmail: shaofeng.wang@ucdconnect.ie

# Date
date: 2022-08-12

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - AtCoder Educational Contest
  - AtCoder Beginner Contest

# Tag
tag:
  - DP
  - Tree DP

icon: pen-to-square
---

# AtCoder Educational DP Contest - TODO

## # Info & Summary

- **Date:** `2022-08-12`
- **Completion Status:** A ✅ / B ✅ / C ✅ / D ✅ / E ❌ / F ❌ / G ❌
- **Problem Type**:
  - E: `Tree DP`

---

## A. Forg 1 (DP)

<https://atcoder.jp/contests/dp/tasks/dp_a>

转移:

当前在 第 $i$ 块石头上, 可以从第 $i-1$ 和 $i-2$ 块石头转移过来

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }

    vector<int> dp(n + 1, 1e9);
    dp[1] = 0;
    for (int i = 1; i <= n; i++)
    {
        if (i > 1)
        {
            dp[i] = min(dp[i], dp[i - 1] + abs(a[i] - a[i - 1]));
        }
        if (i > 2)
        {
            dp[i] = min(dp[i], dp[i - 2] + abs(a[i] - a[i - 2]));
        }
    }

    cout << dp[n] << endl;

    return 0;
}
```

## B. Forg 2 (DP)

<https://atcoder.jp/contests/dp/tasks/dp_b>

在第一题的基础上, 可以从多个石头转移过来, 直接遍历并维护最小代价即可

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }

    vector<int> dp(n + 1, 1e9);
    dp[1] = 0;

    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= k; j++)
        {
            if (i - j >= 1)
            {
                dp[i] = min(dp[i], dp[i - j] + abs(a[i] - a[i - j]));
            }
        }
    }

    cout << dp[n] << endl;

    return 0;
}
```

## C. Vacation (多维 DP)

<https://atcoder.jp/contests/dp/tasks/dp_c>

定义 $dp[k][i]$: 第$i$天的最大幸福值, $k$ 表示活动类别

转移时, 注意不能有连续两天参加同种活动, 从其他活动转移过来, 并维护最大幸福值即可

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n + 1), b(n + 1), c(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i] >> b[i] >> c[i];
    }

    vector<vector<long long>> dp(3, vector<long long>(n + 1, 0));
    for (int i = 1; i <= n; i++)
    {
        dp[0][i] = max(dp[1][i - 1], dp[2][i - 1]) + a[i];
        dp[1][i] = max(dp[0][i - 1], dp[2][i - 1]) + b[i];
        dp[2][i] = max(dp[0][i - 1], dp[1][i - 1]) + c[i];
    }

    cout << max({dp[0][n], dp[1][n], dp[2][n]}) << endl;

    return 0;
}
```

## D. Knapsack 1 (01 背包)

<https://atcoder.jp/contests/dp/tasks/dp_d>

定义 $dp[i][j]$: 表示在前 $i$ 个物品, 重量为 $j$ 时, 能都获得的最大价值

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<long long> w(n), v(n);
    for (int i = 0; i < n; i++)
    {
        cin >> w[i] >> v[i];
    }

    vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
    for (int j = w[0]; j <= m; j++)
    {
        dp[0][j] = v[0];
    }

    for (int i = 1; i < n; i++)
    {
        for (int j = 0; j <= m; j++)
        {
            if (j < w[i])
            {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
            }
        }
    }

    cout << dp[n - 1][m] << endl;

    return 0;
}
```

## E. Knapsack 2 (01 背包+换意 DP)

<https://atcoder.jp/contests/dp/tasks/dp_e>

注意到物品的体积达到了 $10^9$ 级别, 会暴内存, 第 4 题的 dp 定义不能用, 而物品的价值才 $10^5$ 级别

因此, 转换思路, 定义 $dp[i][j]$: 考虑前 $i$ 件物品, 价值为 $j$ 时的最小体积

同等价值的情况下, 体积更小, 可以在之后容纳更多的物品, 增加总价值

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<long long> w(n), v(n);
    long long sum = 0;
    for (int i = 0; i < n; i++)
    {
        cin >> w[i] >> v[i];
        sum += v[i];
    }

    vector<vector<long long>> dp(n + 1, vector<long long>(sum + 1, 2e9));
    dp[0][0] = 0;

    long long ans = 0;
    for (int i = 1; i <= n; i++)
    {
        for (long long j = sum; j >= 0; j--)
        {
            if (j < v[i - 1])
            {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = min(dp[i - 1][j], dp[i - 1][j - v[i - 1]] + w[i - 1]);
            }

            if (dp[i][j] <= m)
            {
                ans = max(ans, j);
            }
        }
    }

    cout << ans << endl;

    return 0;
}
```

## F. LCS (DP)

<https://atcoder.jp/contests/dp/tasks/dp_f>

定义 $dp[i][j]$: 字符串 `s` 枚举到 $i$, 字符串 `t` 枚举到 $j$, 所能达到的最大最长公共子序列

转移时:

- $s[i] = t[j]$: $i, j$ 都向后移动
- $s[i] \not ={t[j]}$: $dp[i][j] = \max(dp[i - 1][j], dp[i][j - 1])$

输出具体方案时, 使用递归

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s, t;
    cin >> s >> t;

    s = "1" + s;
    t = "1" + t;

    int n = s.size(), m = t.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));

    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m; j++)
        {
            if (s[i] == t[j])
            {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    string ans = "";

    function<void(int, int)> getans = [&](int i, int j)
    {
        if (i == 0 || j == 0)
        {
            return ;
        }

        if (s[i] == t[j])
        {
            ans += s[i];
            getans(i - 1, j - 1);
        } else if (dp[i][j] == dp[i][j - 1])
        {
            getans(i, j - 1);
        } else {
            getans(i - 1, j);
        }
    };

    getans(n - 1, m - 1);

    reverse(ans.begin(), ans.end());

    cout << ans << endl;

    return 0;
}
```

## G. Longest Path (DP+dfs)

<https://atcoder.jp/contests/dp/tasks/dp_g>

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> adj(n);
    vector<bool> vis(n, false);
    for (int i = 0; i < m; i++)
    {
        int u, v;
        cin >> u >> v;
        u--;
        v--;

        vis[v] = true;
        adj[u].emplace_back(v);
    }

    vector<int> dp(n, -1);

    function<int(int)> dfs = [&](int u)
    {
        if (dp[u] != -1)
        {
            return dp[u];
        }

        dp[u] = 0;
        for (auto & v : adj[u])
        {
            dp[u] = max(dp[u], dfs(v) + 1);
        }
        return dp[u];
    };

    int ans = 0;
    for (int i = 0; i < n; i++)
    {
        if (!vis[i])
        {
            ans = max(ans, dfs(i));
        }
    }

    cout << ans << endl;

    return 0;
}
```

## H. Grid (DP)

<https://atcoder.jp/contests/dp/tasks/dp_h>

模板题, 就只有两个方向可以转移

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    vector<vector<char>> grid(n, vector<char>(m));
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cin >> grid[i][j];
        }
    }

    vector<vector<long long>> dp(n, vector<long long>(m, 0));
    dp[0][0] = 1;

    long long mod = 1e9 + 7;

    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (i == 0 && j == 0 || grid[i][j] == '#')
            {
                continue;
            } else if (i == 0)
            {
                dp[i][j] = dp[i][j - 1] % mod;
            } else if (j == 0)
            {
                dp[i][j] = dp[i - 1][j] % mod;
            } else {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % mod;
            }
        }
    }

    cout << dp[n - 1][m - 1] << endl;

    return 0;
}
```

## I. Coins (概率 DP)

<https://atcoder.jp/contests/dp/tasks/dp_i>

定义 $dp[i][j]$: 考虑前 $i$ 个硬币, 其中 $j$ 个硬币朝上的概率

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<double> a(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }

    vector<vector<double>> dp(n + 1, vector<double>(n + 2, 0.0));
    dp[0][0] = 1;

    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            dp[i][j] += dp[i - 1][j] * (1 - a[i]);
            dp[i][j + 1] += dp[i - 1][j] * a[i];
        }
    }

    double ans = 0.0;
    for (int i = 1; i <= n; i++)
    {
        if (2 * i > n)
        {
            ans += dp[n][i];
        }
    }

    cout << fixed << setprecision(11) << ans <<  endl;

    return 0;
}
```

## J.Sushi (期望 DP)

<https://atcoder.jp/contests/dp/tasks/dp_j>

定义 $dp[i][j][k]$: 表示有 $i/j/k$ 个盘中剩余 $1/2/3$ 块寿司的期望

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    map<int, int> mp;
    for (int i = 0; i < n; i++)
    {
        int num;
        cin >> num;

        mp[num] += 1;
    }

    vector<vector<vector<double>>> dp(n + 2, vector<vector<double>>(n + 2, vector<double>(n + 2, 0)));

    for (int k = 0; k <= n; k++)
    {
        for (int j = 0; j <= n; j++)
        {
            for (int i = 0; i <= n; i++)
            {
                if (i || j || k)
                {
                    int d = i + j + k;

                    if (i > 0) dp[i][j][k] += dp[i - 1][j][k] * i / d;
                    if (j > 0) dp[i][j][k] += dp[i + 1][j - 1][k] * j / d;
                    if (k > 0) dp[i][j][k] += dp[i][j + 1][k - 1] * k / d;

                    dp[i][j][k] += 1.0 * n / d;
                }
            }
        }
    }

    cout << fixed << setprecision(15) << dp[mp[1]][mp[2]][mp[3]] << endl;;

    return 0;
}
```

## K.Stones (博弈 DP)

<https://atcoder.jp/contests/dp/tasks/dp_k>

定义 $dp[i]$: 表示剩余 $i$ 个石头, 先手赢记为 1, 后手赢记为 0

转移时:

判断当前状态是先手赢还是后手赢，需看前一状态。若前一状态的先手赢了，那么这一状态的先手就输了，反之亦然

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, k;
    cin >> n >> k;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }

    vector<bool> dp(k + 1, false);
    for (int i = 1; i <= k; i++)
    {
        bool ok = true;
        for (int j = 1; j <= n; j++)
        {
            if (i >= a[j])
            {
                ok &= dp[i - a[j]];
            }
        }

        if (!ok)
        {
            dp[i] = true;
        }
    }

    cout << (dp[k] ? "First" : "Second") << endl;

    return 0;
}
```

## L.Deque (区间 DP)

<https://atcoder.jp/contests/dp/tasks/dp_l>

定义 $dp[i][j]$: 表示区间 $[i, j]$ 插值

转移时:

- Taro: 插值尽可能大, $dp[i][j] = \max (dp[i + 1][j] + a[i], dp[i][j - 1] + a[j])$
- Jiro: 插值尽可能小, $dp[i][j] = \min (dp[i + 1][j] - a[i], dp[i][j - 1] - a[j])$

总区间长度为 $n$, 当前区间为 $[i, j]$, 通过判断已经执行过的操作数量 $n - (j - i + 1)$ 的奇偶性来选择对应的转移函数

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;

    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }

    vector<vector<long long>> dp(n + 2, vector<long long>(n + 2, 0));
    for (int len = 1; len <= n; len++)
    {
        for (int l = 1; l + len - 1 <= n; l++)
        {
            int r = l + len - 1;

            if ((n - len) % 2 == 1)
            {
                dp[l][r] = min(dp[l + 1][r] - a[l], dp[l][r - 1] - a[r]);
            } else {
                dp[l][r] = max(dp[l + 1][r] + a[l], dp[l][r - 1] + a[r]);
            }
        }
    }

    cout << dp[1][n] << endl;

    return 0;
}
```

## M. Candies ()

```cpp

```

## N. Slimes

```cpp

```

## O. Matching ()

```cpp

```

## P. Independent Set ()

```cpp

```

## Q. Flowers ()

```cpp

```

## R. Walk ()

```cpp

```

## S. Digit Sum ()

```cpp

```

## T. Permutation ()

```cpp

```

## U.Grouping ()

```cpp

```

## V. Subtree ()

```cpp

```

## W. Itervals ()

```cpp

```

## X. Tower ()

```cpp

```

## Y. Grid 2 ()

```cpp

```

## Z. Forg 3 ()

```cpp

```
