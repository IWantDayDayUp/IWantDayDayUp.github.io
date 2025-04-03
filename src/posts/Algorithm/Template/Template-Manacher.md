---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io

# Date
date: 2025-04-02

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Template

# Tag
tag:
  - Manacher
---

# 🧩 Manacher

## 📌 Description

Manacher's algorithm finds all palindromic substrings in linear time. It’s especially useful for solving problems involving the **longest palindromic substring** or **counting palindromes** in a string.

---

## 💡 Key Idea

- ⭕ Insert `#` between all characters and at boundaries to handle even/odd palindromes uniformly.
- ⭕ Use the **mirror property** of palindromes to reduce redundant checks.
- ⭕ Expand around centers and maintain the **rightmost boundary** of known palindromes.

---

## 📘 Annotated C++ Template (for review & learning)

```cpp
// Manacher's Algorithm: Annotated Version
// ----------------------------------------
// Purpose : Find all palindromic substrings in O(n) time.
// Usage   : `r[i]` stores the radius of the palindrome centered at position i in the preprocessed string `t`.

/**
 * @brief Manacher's Algorithm – Linear Time Palindromic Substring Finder.
 *
 * This function computes the length of the longest palindromic substring centered at each character
 * in a preprocessed version of the input string (where special characters like '#' are inserted to handle
 * even and odd length palindromes uniformly).
 *
 * The returned vector `r` has size 2 * s.length() + 1. Each `r[i]` represents the "radius" of the longest
 * palindromic substring centered at position `i` in the transformed string.
 *
 * Example:
 *   Original string:      "abac"
 *   Transformed string:   "#a#b#a#c#"
 *   Output `r`:           [1,2,1,2,3,2,1,2,1]
 *
 * Usage notes:
 * - Longest palindrome length:    `max(r) - 1`
 * - To convert position `i` back to original: `(i - 1) / 2`
 * - Palindrome length in original string:     `r[i] - 1`
 *
 * @param s The original input string.
 * @return std::vector<int> The radius array of the transformed string.
 */
vector<int> manacher(string s)
{
    // Step 1: Preprocess the string to handle both even and odd length palindromes uniformly.
    // Insert '#' between each character and at the boundaries.
    string t = "#";
    for (char c : s)
    {
        t += c;
        t += '#';
    }

    int n = t.size(); // Length of the transformed string

    // r[i]: radius of the longest palindromic substring centered at position i in `t`
    vector<int> r(n, 0);

    // j: center of the rightmost palindrome found so far
    // i: current center being evaluated
    for (int i = 0, j = 0; i < n; i++)
    {
        // Step 2: Use previously computed palindrome (mirror optimization)
        // mirror = 2 * j - i is the mirrored index of i around center j
        if (2 * j - i >= 0 && j + r[j] > i)
        {
            r[i] = min(r[2 * j - i], j + r[j] - i);
        }

        // Step 3: Expand around center i as far as possible
        while (i - r[i] >= 0 && i + r[i] < n && t[i - r[i]] == t[i + r[i]])
        {
            r[i]++;
        }

        // Step 4: Update the rightmost palindrome center if needed
        if (i + r[i] > j + r[j])
        {
            j = i;
        }
    }

    return r;
}
```

## 🛠️ Usage Notes

- ✅ Longest palindrome length

`r[i]` includes the center itself, so the full palindrome in `t` spans `2*r[i] - 1` characters

```cpp
int max_len = *max_element(r.begin(), r.end()) - 1;
```

- ✅ To extract the longest palindrome from `S`

```cpp
int center = max_element(r.begin(), r.end()) - r.begin();
int radius = r[center];
int start_in_s = (center - radius + 1) / 2;
string longest_palindrome = s.substr(start_in_s, radius - 1);
```

- ✅ Mapping from `t[i]` to original string `s`

`(i - 1) / 2` gives the index in `s` if `t[i] != '#'`

- ✅ Total number of palindromic substrings

`sum((r[i] - 1) / 2)` or `sum(r[i] / 2)` depending on exact need

- ✅ Count all unique palindromic substrings

Use a hash set with all `(start, length)` pairs mapped back to `s`

---

## ⚡ Contest C++ Template (for contest use)

```cpp
vector<int> manacher(string s)
{
    string t = "#";
    for (auto c : s)
    {
        t += c;
        t += '#';
    }

    int n = t.size();
    vector<int> r(n, 0);

    for (int i = 0, j = 0; i < n; i++)
    {
        if (2 * j - i >= 0 && j + r[j] > i)
        {
            r[i] = min(r[2 * j - i], j + r[j] - i);
        }

        while (i - r[i] >= 0 && i + r[i] < n && t[i - r[i]] == t[i + r[i]])
        {
            r[i]++;
        }

        if (i + r[i] > j + r[j])
        {
            j = i;
        }
    }

    return r;
}
```

---

## 📝 Recommended Practice

| `Contest ID` | `Problem ID` | `Title` | `Difficulty` |                          `Link`                           |
| :----------: | :----------: | :-----: | :----------: | :-------------------------------------------------------: |
|   ABC-398    |     `F`      |  ABCBA  |      3       | [link](https://atcoder.jp/contests/abc398/tasks/abc398_f) |

---

## 🧠 Conclusion

- 🧩 `r[i]` represents radius, so palindrome `length = r[i] - 1`
- 🧩 Preprocessed length is $2n + 1$ with `#` characters
- 🧩 To map back to original string index: use $(i - 1)/2$
