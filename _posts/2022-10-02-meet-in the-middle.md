---
layout: post
title: Meet in the middle
date: 2022-10-02 15:37 +0800
categories: [Template, 双向搜索]
tags: [data structure, 双向搜索]
render_with_liquid: false
math: true
---

## 1. 双向搜索 Meet-in-the-middle

> 适用于输入数据较小, 但还没小到能直接暴力搜索的情况
{: .prompt-tip }

双向广搜的一般步骤:

```markdown
将开始结点和目标结点加入队列 q
标记开始结点为 1
标记目标结点为 2
while (队列 q 不为空)
{
    从 q.front() 扩展出新的 s 个结点

    如果 新扩展出的结点已经被其他数字标记过
        那么 表示搜索的两端碰撞
        那么 循环结束

    如果 新的 s 个结点是从开始结点扩展来的
        那么 将这个 s 个结点标记为 1 并且入队 q 

    如果 新的 s 个结点是从目标结点扩展来的
        那么 将这个 s 个结点标记为 2 并且入队 q
}
```

## 2. 例题1

[USACO09NOV](https://www.luogu.com.cn/problem/P2962)

题目:
有 $n$ 盏灯, 每盏灯与若干盏灯相连, 每盏灯上都有一个开关, 如果按下一盏灯上的开关, 这盏灯以及与之相连的所有灯的开关状态都会改变.

一开始所有灯都是关着的, 你需要将所有灯打开, 求最小的按开关次数

$1 \le n \le 35$

思路:

1. 暴力DFS: 时间复杂度 $O(2^n)$, 显然超时
2. meet-in-the-middle: 时间复杂度 $O(n \cdot 2 ^ {\frac{n}{2}})$

具体:

1. 先找只使用编号 $1$ 到 $mid$ 的开关能够到达的状态
2. 再找只使用另一半开关能够到达的状态
3. 如果前半段和后半段的状态 `互补`, 两段合起来就得到一种开关灯方案

```c++
#include <bits/stdc++.h>

using namespace std;

int n, m, ans = 0x7fffffff;
map<long long, int> f;
long long a[40];

int main() {
    cin >> n >> m;
    // 1: 表示该灯泡处于打开状态
    a[0] = 1;
    for (int i = 1; i < n; ++i) a[i] = a[i - 1] * 2;

    // 对输入的边的情况进行处理
    for (int i = 1; i <= m; ++i) {
        int u, v;
        cin >> u >> v;
        --u;
        --v;
        a[u] |= ((long long)1 << v);
        a[v] |= ((long long)1 << u);
    }

    // 对前一半进行搜索
    for (int i = 0; i < (1 << (n / 2)); ++i) 
    {
        long long t = 0;
        int cnt = 0;
        for (int j = 0; j < n / 2; ++j) 
        {
            if ((i >> j) & 1) 
            {
                t ^= a[j];
                ++cnt;
            }
        }
        if (!f.count(t)) 
        {
            f[t] = cnt;
        }
        else {
            f[t] = min(f[t], cnt);
        }
    }

    // 对后一半进行搜索
    for (int i = 0; i < (1 << (n - n / 2)); ++i) 
    {
        long long t = 0;
        int cnt = 0;
        for (int j = 0; j < (n - n / 2); ++j) 
        {
            if ((i >> j) & 1) 
            {
                t ^= a[n / 2 + j];
                ++cnt;
            }
        }
        if (f.count((((long long)1 << n) - 1) ^ t))
        {
            ans = min(ans, cnt + f[(((long long)1 << n) - 1) ^ t]);
        }
    }

    cout << ans << endl;

    return 0;
}
```

## 3. 例题2

[SPOJ ABCDEF](https://www.spoj.com/problems/ABCDEF/)

题目: 在$[-30000, 30000]$的范围内, 给出一组整数集合$S$, 找到满足下列公式的六元组的总数

$$\frac{a \cdot b + c}{d} - e = f$$

并且保证元组 $(a, b, c, d, e, f): a, b, c, e, d, f \in S; d \not ={0}$

思路:

我们可以将公式转化为 $a \codt b + c = d \codt (e + f)$

> 使等式两边未知数个数相等或尽量均匀分布, 是使用 meet-in-the-middle 算法解决`等式问题`的常见做法
{: .prompt-tip }

```c++
#include <bits/stdc++.h>

using namespace std;

const int maxn = 1e3;

int n, m;
long long s[maxn + 5];
long long num[maxn * maxn * maxn + 5];

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    int l, r;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
    {
        scanf("%lld", &s[i]);
    }
    for (int i = 1; i <= n; i++)
    { //搜索出a数组
        for (int j = 1; j <= n; j++)
        {
            for (int k = 1; k <= n; k++)
            {
                num[++m] = s[i] * s[j] + s[k];
            }
        }
    }
    sort(num + 1, num + 1 + m);
    long long ans = 0;
    for (int i = 1; i <= n; i++)
    {
        if (s[i] == 0)
            continue;
        for (int j = 1; j <= n; j++)
        {
            for (int k = 1; k <= n; k++)
            {                                                                          //搜索出b数组, 为了节约空间, 此处不必存储
                l = lower_bound(num + 1, num + 1 + m, s[i] * (s[j] + s[k])) - num;     //第一个=a[i]的数的位置
                r = upper_bound(num + 1, num + 1 + m, s[i] * (s[j] + s[k])) - num - 1; //最后一个一个=a[i]的数的位置
                if (r >= l)
                    ans += (r - l + 1);
            }
        }
    }
    printf("%lld\n", ans);

    return 0;
}
```
