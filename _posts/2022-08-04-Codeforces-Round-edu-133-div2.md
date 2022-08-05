---
layout: post
title: Codeforces Round edu 133 (Div. 2) (C) DP (D) DP
date: 2022-08-04 15:37 +0800
categories: [Classical Algorithm, DP]
tags: [Codeforces, dp]
render_with_liquid: false
math: true
---

## 1. C - Robot in a Hallway DP

<https://codeforces.com/contest/1716/problem/C>

### 1.1 Problem Statement

这里有一个 $2 * n$ 的网格, 你在左上角 $(0, 0)$

每一秒可以选择如下行动:

- 1. 向邻接方格行动一步, 但不能超出网格范围
- 2. 停留在原地

一开始, 格子都被锁定, 每个格子里面存有一个数字 $a[i][j]$, 表示只有当前时间大于数字时, 网格才会解锁(比如: 数字为 `5`, 在第`6`秒时会解锁)

每个格子最多只能遍历一次

问: 遍历所有格子所需的最少时间是多少????

### 1.2 分析

> 格子只有两行, 行动方案是固定的
{: .prompt-info }

1. 直走: 沿着一行一直向右走, 到头, 向上(或下)进入另外一行, 接着向左走, 回到第一列

2. 蛇形: 先向下, 再向右, 再向上, 再向右, 一条龙, 直到最后一个格子

3. 蛇形 + 直走: 先蛇形运动到某一列, 转换成直行方式完成剩余路径

我们定义:

$b[i][j]$ 从 $(i, j)$ 出发, 采用 `直走` 的方式, 最后在 $(1 - i, j)$ 停止, 所需的最小时间

转移时:

1. 最后停在 $(1 - i, j)$, 需要解锁该网格, 所以最小时间至少 $a[1 - i][j] + 1$

2. 从出发点到目的地, 至少需要进行 $2 * (n - j) - 1$ 次行动, 每次行动花费 `1s`

3. 从 $(i, j + 1)$ 出发, 停在 $(1 - i, j + 1)$ 处, 再向左运动一次即可停在 $(1 - i, j)$, 所以最小时间至少 $b[i][j + 1] + 1$

因此, $b[i][j] = \max (a[1 - i][j] + 1, a[i][j] + 2 * (n - j) - 1, b[i][j + 1] + 1)$

计算完毕所有的 $b[i][j]$ 之后, 需要从左往右模拟一遍

> why??
>
> 首先我们得先从 $(0, 0)$ 运动到 $(i, j)$, 才能利用预处理的 $b[i][j]$
{: .prompt-info }

在模拟的过程中, 存在一种特殊情况:

在我们从出发点 $(0, 0)$ 运动到 $(i, j)$ 的过程中, `停留在原地`的操作耗费大量时间, 以至于从 $(i, j)$ 开始, 如果转换成 `直走` 的方式, 会畅通无阻, 后面所有的格子都会解锁, 此时, `直走` 运动方式需要花费的最小时间就是后面格子的数量, 即 $2 * (n - j) - 1$

因此, 模拟时, 设从初始出发点 $(0, 0)$ 到 $(i, j)$ 花费时间为 `cur`, 转换运动方式后, 整个过程需要花费的时间为: $\max (cur + 2 * (n - j) - 1, b[i][j])$

最后, 答案就是全局最小花费时间

### 1.3 code

```c++
#include <bits/stdc++.h>

using namespace std;

void slove() {
    int n;
    cin >> n;

    vector<vector<int>> a(2, vector<int>(n, 0));
    for(int i = 0; i < 2; i++)
    {
        for(int j = 0; j < n; j++) 
        {
            cin >> a[i][j];
        }
    }

    a[0][0] = -1;  //为了防止后面+1, 所以a[0][0] = - 1

    // 当前在(i, j), 一直往后走, 再向上(或下), 再转回来, 所需的最小时间
    vector<vector<int>> b(2, vector<int>(n + 1, 0));
    b[0][n] = b[1][n] = 0;
    
    for (int i = 0; i < 2; i++) {
        for (int j = n - 1; j >= 0; j--) {
            b[i][j] = max(
                {
                    // 需要解锁最后一个格子的最小时间
                    a[i ^ 1][j] + 1,
                    // 当前格子解锁条件, 再加上后面一路畅通无阻时所需要的必要步数
                    a[i][j] + 1 + 2 * (n - j) - 1,
                    // 在前一个目的地的基础上, 再向左运动一次, 即可到达这次的目的地
                    b[i][j + 1] + 1
                }
            );      
        }       
    }

    int ans = int(1e9) + int(1e8);
    int cur = 0;
    for (int j = 0; j < n; j++) {
        int k = j & 1;

        ans = min(ans, max(cur + 2 * (n - j) - 1, b[k][j]));

        // 走到[k][j], 解锁它
        cur = max(cur , a[k][j] + 1);

        // 向上(向下)走, 再解锁另一个
        cur++;
        cur = max(cur, a[k ^ 1][j] + 1);

        // 往下一列运动
        cur++;
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

### 1.4 方法 2

<https://zhuanlan.zhihu.com/p/550043197>

`关键是要能快速计算从某个位置开始一直走到最后或者从最后一直走到某个位置的答案`

1. 假设当前处于 $(i, j)$, 一直向右运动直到最后一列, 对于运动过程中任何一个格子 $(i, y), j \le y \le n - 1$, 首先需要解锁该格子, 最小花费 $a[i][y] + 1$, 然后以该格子为中转站, 运动到最后一列, 花费 $n - 1 - y$, 最小花费 $a[i][y] + 1 + (n - 1) - y = a[i][y] - y + n$, 其中 $n$ 为定值, 因为要解锁 $(i, j)$之后所有的格子, 因此需要维护 $a[i][j] - j$ 的 `最大值`

2. 同理, 当前处于最后一列 $(i, n - 1)$, 需要运动到 $(i, j)$, 需要经过中转站 $(i, y)$, 共花费 $(a[i][y] + 1) + (y - j) = a[i][y] + y + (1 - j)$, 因此只需要维护 $a[i][y] + y$ 的最大值即可

```c++
#include <bits/stdc++.h>

using namespace std;

void slove() {
    int n;
    cin >> n;

    vector<vector<int>> grid(2, vector<int>(n, 0));
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cin >> grid[i][j];
        }
    }

    vector<vector<int>> suf1(2, vector<int>(n + 1, -1e9)), suf2(2, vector<int>(n + 1, -1e9));
    for (int i = 0; i < 2; i++)
    {
        for (int j = n - 1; j >= 0; j--)
        {
            // 维护 a[i][y] + y 的最大值
            suf1[i][j] = max(suf1[i][j + 1], grid[i][j] + j);
            // 维护 a[i][y] - y 的最大值
            suf2[i][j] = max(suf2[i][j + 1], grid[i][j] - j);
        }
    }

    int ans = int(1e9) + int(1e8);
    int cur = 0;

    // 更方便的实现蛇形操作
    vector<vector<bool>> vis(2, vector<bool>(n, false));
    vis[0][0] = true;

    int i = 0, j = 0;
    while (1)
    {
        if (!vis[i ^ 1][j])
        {
            // 从 `j` 列走到 `n - 1` 列(0-based)的最短时间
            // 1. (全部解锁)从当前 j 列直接去 n - 1 列, 需要花费: cur + (n - 1) - j
            // 2. (部分解锁)从当前 j 列先去 y(j <= y <= n - 1) 列, 解锁 y 列, 然后去 n - 1 列, 需要花费: (grid[i][y] + 1) + (n - 1) - y
            int temp = max(cur + n - 1 - j, n - 1 + 1 + suf2[i][j + 1]);

            // 从 n - 1 列走回 j 列的最短时间
            // 1. (全部解锁)畅通无阻, 需要花费: temp + 1 + (n - 1) - j
            // 2. (部分解锁)中转站 y 列, 需要花费: (grid[i][j] + 1) + (y - j)
            ans = min(ans, max(temp + n - 1 - j + 1, suf1[i ^ 1][j] - j + 1));

            // 转换到另外一行
            i ^= 1;
        } else {
            j += 1;
        }

        if (j >= n)
        {
            break;
        }

        vis[i][j] = true;

        // 1. cur + 1: 从前一列的格子运动过来, 固定花费1秒
        // 2. grid[i][j] + 1: 解锁该格子的最小时间 
        cur = max(cur + 1, grid[i][j] + 1);
    }

    cout << min(ans, cur) << endl;

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

## 2. D DP

<https://codeforces.com/contest/1716/problem/D>

### 2.1 Problem Statement

起点为 $0$, 终点为 $n$, 给定初始步长 $k$, 第一次操作需要跳 $k$ 的倍数, 第二次操作需要跳 $k + 1$ 的倍数, 以此类推

问: [1, n] 中每个位置被走到的方案数 ???

### 2.2 分析

每次最少跳 $k + i - 1$ 步, 多次操作之后, 最短步数就是 $k, k + 1, ..., k + i - 1$ 的等差数列, 因此, 枚举操作数是 `根号级别`的

使用 $dp[i]$ 表示运动到位置 $i$ 的方案数, 第 $i$ 次操作的最小步数为 $cur = k + i - 1$

我们发现 $cur$ 这一步与上一步的起点是有差别的, 因此我们不能从上一个点的起点进行转移

> 比如这次的步长为3, 上一次的步长为2, 走完2的最少距离为3(前面还有1步), 这一步最少我们的起点为6
>
> 因此我们还需要修改一下 $sum[j] = sum[j - cur]$, 相当于右移 $cur$ 位, 是在上一步的基础上转移之后再改变起点的位置
>
> 也可以这么理解: 我们右移的step是我们必须要移动的位置, 而转移的是step的倍数的位置
{: .prompt-info }

转移:

1. $i < cur$ 时, $dp[i] = 0$,
2. 而当 $i \ge cur$ 时, $dp[i] = dp[i - cur]$, 正向枚举, $cur$ 的倍数也随之更新

### 2.3 code

```c++
#include <bits/stdc++.h>

using namespace std;

void slove() {
    int n, k;
    cin >> n >> k;

    vector<long long> dp(n + 1, 0), ans(n + 1, 0);
    long long mod = 998244353;
    dp[0] = 1;

    for (int i = 1; i <= n; i++)
    {
        // 第 i 次操作时的最小步长
        long long cur = k + i - 1;

        // 每次操作必须 `至少` 跳 cur
        // 整体右移, 表示跳 cur
        for (int j = n; j >= cur; j--)
        {
            dp[j] = dp[j - cur];
        }
        for (int j = 0; j < cur; j++)
        {
            dp[j] = 0;
        }

        // 转移, 正向枚举, cur 的倍数也随之更新
        for (int j = cur; j <= n; j++)
        {
            dp[j] = (dp[j] + dp[j - cur]) % mod;
        }

        // 累加答案
        for (int j = cur; j <= n; j++)
        {
            ans[j] = (ans[j] + dp[j]) % mod;
        }

        // 终止条件
        // 每次操作都必须跳 cur 步, 就是一个 [k, k + 1, k + 2, ..., k + i] 的等差数列求和
        if (1ll * i * (k + k + i - 1) > n * 2)
        {
            break;
        }
    }

    for (int i = 1; i <= n; i++)
    {
        cout << ans[i] << " \n"[i == n];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    slove();

    return 0;
}
```
