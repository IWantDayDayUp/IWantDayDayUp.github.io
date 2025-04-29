---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-19

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Topic

# Tag
tag:
  - Meet-in-the-Middle
---

# 🧩 Meet-in-the-Middle

## 📌 Description

The **Meet-in-the-Middle (MITM)** technique is a problem-solving strategy commonly used to reduce the time complexity of brute-force solutions **by dividing a problem into two smaller subproblems**. It is particularly useful when the size of the problem is too large to solve directly using brute force, but splitting it into two halves can make it computationally feasible:

- The technique typically works by dividing the problem into two halves, solving both halves independently, and then combining the results
- It is most commonly used in problems involving **combinatorics**, **subsets**, **searching** or **dynamic programming**

---

## 💡 Key Idea

- ⭕ **Divide the problem into two parts**: Split the problem into two parts and solve each part separately
- ⭕ **Enumerate all possible solutions in the smaller parts**: Instead of solving the entire problem directly, solve each half independently and then combine their results
- ⭕ **Combine the results**: After solving both parts, combine the results in an efficient manner (often through binary search or two-pointer techniques)

---

## 📘 Annotated C++ Template (for review & learning)

```cpp
// Meet-in-the-Middle: Annotated Version
// ----------------------------------------
// Purpose: Solve the problem of finding the maximum subset sum
//         such that the sum is less than or equal to a given target.
// Usage  : This technique is useful for reducing time complexity
//         when dealing with large input sizes in combinatorial problems.

 /**
 * @brief Meet-in-the-Middle algorithm for solving subset sum problems
 *
 * This approach splits the input array into two halves, calculates all possible subset sums for each half,
 * and then combines the results using binary search to find the largest sum that is <= target.
 *
 * The idea behind this method is to reduce the problem size to a manageable level by solving smaller subproblems
 * and then combining their results efficiently.
 *
 * Example:
 * Input:
 * n = 4, target = 7
 * arr = [3, 1, 4, 2]
 * The subsets of the left half (arr[0, 1]) are [0, 1, 3, 4],
 * and the subsets of the right half (arr[2, 3]) are [0, 2, 4, 6].
 * The result will be the largest sum of a subset from the left and right halves that is <= 7.
 *
 * @param n The number of elements in the array.
 * @param target The maximum allowable sum.
 * @return The largest possible sum that is <= target from the sum of any subset of arr.
 */
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n, target;
    cin >> n >> target;

    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    // Step 1: Split the input array into two halves
    int half = n / 2;
    vector<int> left, right;

    // Step 2: Generate all subset sums for the left half
    for (int mask = 0; mask < (1 << half); mask++) {
        int sum = 0;
        for (int i = 0; i < half; i++) {
            if (mask & (1 << i)) {
                sum += arr[i];
            }
        }
        left.push_back(sum);
    }

    // Step 3: Generate all subset sums for the right half
    for (int mask = 0; mask < (1 << (n - half)); mask++) {
        int sum = 0;
        for (int i = 0; i < (n - half); i++) {
            if (mask & (1 << i)) {
                sum += arr[half + i];
            }
        }
        right.push_back(sum);
    }

    sort(right.begin(), right.end());

    // Step 4: Find the best combination of sums using binary search
    int maxSum = 0;
    for (int sum : left) {
        int remaining = target - sum;
        auto it = lower_bound(right.begin(), right.end(), remaining);
        if (it != right.begin()) {
            it--;
            maxSum = max(maxSum, sum + *it);
        }
    }

    cout << maxSum << endl;
    return 0;
}
```

---

## 🛠️ Usage Notes

- ✅ **Time Complexity**: The time complexity of the `Meet-in-the-Middle` approach typically becomes $O(2^{n/2})$, where $n$ is the size of the input. This is a significant improvement over brute-force approaches when $n$ is large
- ✅ **Space Complexity**: The space complexity will also depend on the number of subsets you are storing for each half
- ✅ **Applications**:

  - **Subset sum problem**: Given a set of numbers, find subsets whose sum equals a specific target
  - **Knapsack problem**: Especially for large-scale knapsack problems, splitting the problem into two halves and then combining the results is often a practical solution
  - **String matching**: Some pattern matching problems or similar ones can be optimized using this method
  - **Maximum Subarray or Path Problems**: Problems where you need to find a maximum (or minimum) value over all possible paths can also be solved efficiently by splitting the problem into two halves

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` |     `Title`      | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :--------------: | :----------: | :-------------------------------------------------------: |
|    ABC271    |     `F`      | XOR on Grid Path |      5       | [Link](https://atcoder.jp/contests/abc271/tasks/abc271_f) |
|    ABC396    |     `G`      | Filp Row or Col  |      5       | [Link](https://atcoder.jp/contests/abc396/tasks/abc396_g) |
|    ABC402    |     `F`      | Path to Integer  |      5       | [Link](https://atcoder.jp/contests/abc402/tasks/abc402_f) |

---

## 🧠 Conclusion

- 🧩 Summary of key implementation points:
  - `Meet-in-the-Middle` reduces the number of states to consider by splitting the problem into two smaller subproblems
  - You typically use `bitmask` to represent subsets and store all possible results
  - Sorting one half of the results allows you to efficiently find combinations using `binary search`
- 🧩 Common bugs or indexing issues:
  - Pay attention to the off-by-one errors when handling indices, especially when working with subsets
  - Ensure that you properly handle the case where no valid combination exists
- 🧩 When to prefer this algorithm over others:
  - This technique is optimal when the problem size is large and brute force isn't feasible, but splitting the problem into smaller subproblems significantly reduces the complexity
