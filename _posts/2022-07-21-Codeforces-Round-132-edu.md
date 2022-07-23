---
layout: post
title: Codeforces Round 132 (edu) (D) 线段树
date: 2022-07-21 15:37 +0800
categories: [Classical Algorithm, Segement Tree]
tags: [Codeforces, greedy, segement tree]
render_with_liquid: false
math: true
---

## D. Rorororobot

<https://codeforces.com/contest/1709/problem/D>

### Problem Statement

有一个 $n$ 行, $m$ 列的网格地图, 行号从下到上分别为 $1, 2, ..., n$, 列号从左到右分别为 $1, 2, ..., m$

第 $i$ 列, 有 $a_i$ 个方格处于 `锁定` 状态(位于 $1, 2, ..., a_i$), 剩余方格处于 `未锁定` 状态

有一个机器人, 按照指令可以向上, 向下, 向左, 向右运动, 但如果运动到`锁定`方格或者界外, 机器人会爆炸

但, 机器人程序出现bug, 会将接收到的指令重复 $k$ 次, 即: 单个指令 `向上`, 连续行动 k 次, 再执行下一个指令

现在, 给定机器人的出发点与目的地, 外加参数 $k$, 你需要给机器人发送指令, 问机器人最终是否可以 `恰好停在` 目的地???

### 分析

首先, 机器人需要停在目的地, 所以: 横坐标需要整除 $k$, 纵坐标也需要整除 $k$

![Desktop View](../assets/post_img/cf%20edu%20132/1.jpg)

直觉上, 机器人最多行动 $3$ 次(如果可以), 即: `先向上, 再向左(或右), 再向下`

特殊情况, 如果出发点与目的地位于 `同一列`, 则只需要行动 `一次`: 向上或向下

分析一般情况:

> 机器人向上或向下的过程中, 不会碰到 `锁定方格`, 只有向左或向右时才有可能碰到
>
> 因此, 我们需要知道区间 $[y1, y2]$ 中 `锁定方格` 数量的最大值, 这里就可以使用 `线段树` 来维护区间的最大值 $maxv$
>
> 分析区间最大值 $maxv$ 与 $x1, x2$ 的关系:
> >
> > 1. 若: $max(x1, x2) <= maxv$, 需要在 $h \in [maxv + 1, n])$ 中寻找答案
> >
> > 2. 若: $max(x1, x2) > maxv$, 则区间 $[y1, y2]$ 中间的 `锁定方格` 不会对路径产生影响

### code

```c++
#include <bits/stdc++.h>

using namespace std;

struct Node
{
    int l, r;
    // 当前区间最大值
    int val;
    // 懒惰标记
    int lazy;
} tr[1000000];

void pushup(int p)
{
    // 子节点更新父节点的最大值
    tr[p].val = max(tr[p << 1].val, tr[p << 1 | 1].val);
}
void pushdown(int p)
{
    // 懒惰标记下放
    if (tr[p].lazy)
    {
        tr[p << 1].lazy = 1;
        tr[p << 1].val = tr[p].val;

        tr[p << 1 | 1].lazy = 1;
        tr[p << 1 | 1].val = tr[p].val;

        tr[p].lazy = 0;
    }
    return;
}
void build(int p, int l, int r)
{
    // 初始化
    if (l == r)
        tr[p] = {l, r, 0, 0};
    else
    {
        tr[p] = {l, r, 0, 0};

        int mid = (l + r) >> 1;
        build(p << 1, l, mid);
        build(p << 1 | 1, mid + 1, r);

        pushup(p);
    }
}
void update(int p, int l, int r, int val)
{
    // 当前节点的区间是更新区间的子区间
    if (tr[p].l >= l && tr[p].r <= r)
    {
        tr[p].val = val;
        tr[p].lazy = 1;
        return;
    }

    pushdown(p);
    int mid = (tr[p].l + tr[p].r) >> 1;
    if (l <= mid)
        update(p << 1, l, r, val);
    if (r > mid)
        update(p << 1 | 1, l, r, val);
    pushup(p);
    return;
}
int query(int p, int l, int r)
{
    // 当前区间是查询区间的子区间
    if (tr[p].l >= l && tr[p].r <= r)
        return tr[p].val;
        
    pushdown(p);
    int mid = (tr[p].l + tr[p].r) >> 1;
    int res = 0;
    if (l <= mid)
        res = max(res, query(p << 1, l, r));
    if (r > mid)
        res = max(res, query(p << 1 | 1, l, r));
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    // 线段树
    build(1, 1, m);

    for (int i = 1; i <= m; i++)
    {
        int num;
        cin >> num;

        update(1, i, i, num);
    }

    int q;
    cin >> q;
    while(q--)
    {
        int xs, ys, xt, yt, k;
        cin >> xs >> ys >> xt >> yt >> k;

        if (xs > xt) swap(xs, xt);
        if (ys > yt) swap(ys, yt);

        if (abs(ys - yt) % k != 0 || abs(xs - xt) % k != 0)
        {
            cout << "NO" << endl;
        } else {
            int maxv = query(1, ys, yt);

            if (max(xs, xt) > maxv)
            {
                cout << "YES" << endl;
            } else {
                bool ok = false;
                for (int h = maxv + 1; h <= min(n, maxv + k); h++)
                {
                    if (abs(h - xs) % k == 0 && abs(h - xt) % k == 0)
                    {
                        ok = true;
                        break;
                    }
                }

                if (ok)
                {
                    cout << "YES" << endl;
                } else {
                    cout << "NO" << endl;
                }
            }
        }
    }

    return 0;
}
```
