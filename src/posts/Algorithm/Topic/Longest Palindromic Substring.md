---
# Author
author:
name: TayLock
url: https://iwantdaydayup.github.io
gmail: shaofeng.wang@ucdconnect.ie

# Date
date: 2025-04-02

# Original
# isOriginal: true

# Category
category:
  - Algorithm
  - Topic

# Tag
tag:
  - LPS
  - DP
  - Manacher

icon: pen-to-square
---

# Longest Palindromic Substring(LPS)

## Info

Given a string `S`, the task is to find the longest substring which is a palindrome. If there are multiple answers, then return the first appearing substring

Examples:

- Input: `forgeeksskeegfor`
- Output: `geeksskeeg`

Table of Content:

- `Native Approach`: Generating all sub-strings - $O(N^3)$ time and $O(1)$ space
- `Better Approach`: Using Dynamic Programming - $O(N^2)$ time and $O(N^2)$ space
- `Better Approach`: Using Expansion from center - $O(N^2)$ time and $O(1)$ space
- `Expected Approach`: Using `Manacher Algorithm` - $O(N)$ time and $O(N)$ space

## `Native Approach`: Generating all sub-strings

$O(N^3)$ time and $O(1)$ space

Main idea:

- For each substring, check if it is a palindrome or not
- If substring is palindrome, then update the result on the basis of longest palindromic substring found till now

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    int n = s.size();
    // All substrings of length 1 are palindromes
    int maxLen = 1, start = 0;

    // Function to check is a substring S[left:right] is a palindrome
    auto checkPal = [&](string &s, int left, int right) -> bool
    {
        while (left < right)
        {
            if (s[left] != s[right])
            {
                return false;
            }

            left++;
            right--;
        }

        return true;
    };

    // Iterate through all substrings of S
    for (int i = 0; i < n; i++)
    {
        for (int j = i; j < n; j++)
        {
            // Update the longest palindrome
            if (checkPal(s, i, j) && (j - i + 1) > maxLen)
            {
                start = i;
                maxLen = j - i + 1;
            }
        }
    }

    cout << s.substr(start, maxLen) << endl;

    return 0;
}
```

## `Better Approach`: Using Dynamic Programming

$O(N^2)$ time and $O(N^2)$ space

Main idea:

- If we know the status(i.e. palindromic or not) of the substring ranging `[i, j]`, we can find the status of the substring ranging `[i - 1, j + 1]` by only matching the character `str[i - 1]` and `[j + 1]`
  - Let `dp[i][j]` be a boolean value that indicates whether the substring `str[i...j]` is a palindrome
  - Single-character substring: `dp[i][i] == true` for all $i$
  - Two-character substring: `dp[i][i + 1] = (str[i] == str[i + 1])`
  - Substring longer than two characters: `dp[i][j] = (str[i] == str[j]) && dp[i + 1][j - 1]`
  - The longest palindrome will be the maximum length $j - i + 1$ where `dp[i][j] = true`

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    int n = s.size();
    // dp[i][j] = true if s[i..j] is a palindrome
    vector<vector<bool>> dp(n, vector<bool>(n, false));

    int start = 0, maxLen = 1;

    // Base case: single-character palindrome
    for (int i = 0; i < n; i++)
    {
        dp[i][i] = true;
    }

    // Base case: two-character palindrome
    for (int i = 0; i < n - 1; i++)
    {
        if (s[i] == s[i + 1])
        {
            dp[i][i + 1] = true;
            if (maxLen < 2)
            {
                start = i;
                maxLen = 2;
            }
        }
    }

    // Check for palindromes of length 3 or more
    for (int k = 3; k <= n; k++)
    {
        for (int i = 0; i < n - k + 1; i++)
        {
            int j = i + k - 1;

            if (dp[i + 1][j - 1] && s[i] == s[j])
            {
                dp[i][j] = true;

                if (maxLen < k)
                {
                    start = i;
                    maxLen = k;
                }
            }
        }
    }

    cout << s.substr(start, maxLen) << endl;

    return 0;
}
```

## `Better Approach`: Using Expansion from center

$O(N^2)$ time and $O(1)$ space

Main idea:

- Traverse each character in the string and treat it as a `potential center` of a palindrome. Trying to expand around it in both directions while checking if the expanded substring remains a palindrome
  - For each position, we check for both `odd-length`(where the current character is the center) and `even-length palindrome`(where the current character and the next character together form the center)
  - As we expand outward from each center, we keep track of the start position and length of the longest palindrome found so far, updating these values whenever we find a longer valid palindrome
- To find longest palindromic substring of a string of length $N$, we need to take possible $2*N + 1$ centers (the $N$ character positions, $N - 1$ between two characters positions and $2$ positions at left and right ends), do the character match in both left and right directions at each $2 * N + 1$ centers and keep track of longest palindromic substring

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    int n = s.size();
    if (n == 0)
    {
        cout << "" << endl;
        return 0;
    }

    int start = 0, maxLen = 1;

    // Traverse the string and check for palindrome
    for (int i = 0; i < n; i++)
    {
        // Run two times for odd-length(j = 0) and even-length(j = 1) palindromes
        for (int j = 0; j <= 1; j++)
        {
            // the left and right end of the current palindromic substring
            int left = i, right = i + j;

            // Expand the window as long as the characters are equal and in bounds
            while (left >= 0 && right < n && s[left] == s[right])
            {
                int currLen = right - left + 1;
                if (currLen > maxLen)
                {
                    start = left;
                    maxLen = currLen;
                }

                left--;
                right++;
            }
        }
    }

    cout << s.substr(start, maxLen) << endl;

    return 0;
}
```

## `Expected Approach`: Using `Manacher Algorithm` - $O(N)$ time and $O(N)$ space

Let's consider two strings `abababa` and `abaaba`

| Position  | 0    | 1   | 2    | 3   | 4    | 5   | 6    | 7   | 8    | 9   | 10   | 11  | 12   | 13  | 14   |
| --------- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- |
| `abababa` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` |
| `abaaba`  | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` |     |      |

- If there is a palindrome of some length $L$ centered at any position $P$, then we may not need to compare all characters in left and right side at position $P + 1$
- We already calculated LPS at position before $P$ and they can help to avoid some of the comparisons after position $P$, this use of informations from previous positions at a later point of time makes the `Manacher` algorithm linear

We need to calculate length of longest palindromic string at each of these $2 * N + 1$ positions:

| Position   | 0    | 1   | 2    | 3   | 4    | 5   | 6    | 7   | 8    | 9   | 10   | 11  | 12   | 13  | 14   |
| ---------- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- | --- | ---- |
| `abababa`  | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` |
| LPS length | 0    | 1   | 0    | 3   | 0    | 5   | 0    | 7   | 0    | 5   | 0    | 3   | 0    | 1   | 0    |
| `abaaba`   | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` | `a` | `\|` | `b` | `\|` | `a` | `\|` |     |      |
| LPS length | 0    | 1   | 0    | 3   | 0    | 1   | 6    | 1   | 0    | 3   | 0    | 1   | 0    |     |      |

In LPS Array, we can see that:

- LPS length value at `odd` positions(the actual character positions) will be odd and greater than or equal to $1$
  - $1$ will come from the center character itself if nothing else matched in left and right side of it
- LPS length value at `even` positions(the positions between two characters, extreme left and right positions) will be even and greater than or equal to $0$
  - $0$ will come from where there is no match in left and right side

Position and index for the string are two different things here. For a given string `S` of length $N$, indexes will be from $0$ to $N - 1$(total $N$ indexes) and positions will be from $0$ to $2 * N$(total $2 * N + 1$ positions)

LPS length value can be interpreted in two ways, one in terms of index and second in terms of positions. LPS value $d$ at position $I$($p[i] = d$) tells that:

- Substring from position $i - d$ to $i + d$ is a palindrome of length $d$(in terms of position)
  - e.g. in string `abaaba`, $p[3] = 3$ means substring from position $0$($3 - 3$) to $6$($3 + 3$) is a palindrome which is `aba` of length $3$
- Substring form index $(i - d) / 2$ to $(i + d) / 2 - 1$ is a palindrome of length $d$(in terms of index)
  - $p[3] = 3$ also means that substring from index $0$($(3 - 3) / 2$) to $2$($(3 + 3) / 2 - 1$) is a palindrome which is `aba` of length $3$

Once this LPS value Array is computed efficiently, LPS of string `S` will be centered at position with maximum LPS length value

```cpp
#include <bits/stdc++.h>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);

    string s;
    cin >> s;

    // 1. Preprocess the string
    string t = "#";
    for (char c : s)
    {
        t += c;
        t += "#";
    }

    int n = t.size();
    // r[i] = length of the longest palindrome centered at i
    vector<int> p(n, 0);

    // Center and right boundary of the current longest palindrome
    int c = 0, r = 0;

    int max_len = 0, center_index = 0;

    for (int i = 0; i < n; i++)
    {
        // Find the mirroe of the current position i
        int mirror = 2 * c - i;
        if (i < r)
        {
            p[i] = min(r - i, p[mirror]);
        }

        // Expand the palindrome centered at i
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0 && t[i + p[i] + 1] == t[i - p[i] - 1])
        {
            p[i]++;
        }

        // If the palindrome centered at i expands past r, adjust the center and right boundry
        if (i + p[i] > r)
        {
            c = i;
            r = i + p[i];
        }

        // Update max_len and center_index if we find a longer palindrome
        if (p[i] > max_len)
        {
            max_len = p[i];
            center_index = i;
        }
    }

    // Start index of the longest palindromic substring in the original string
    int start = (center_index - max_len) / 2;

    cout << s.substr(start, max_len) << endl;

    return 0;
}
```

```cpp
vector<int> manacher(string s)
{
    // Preprocess the string
    string t = "#";
    for (auto c : s)
    {
        t += c;
        t += '#';
    }

    int n = t.size();
    // r[i] = length of the longest palindrome centered at i
    vector<int> r(n, 0);

    // i: current center of the palindrome
    // j: center of the rightmost palidrome found so far
    for (int i = 0, j = 0; i < n; i++)
    {
        // Precompute the Palindrome Length Using Symmetry:
        if (2 * j - i >= 0 && j + r[j] > i)
        {
            r[i] = min(r[2 * j - i], j + r[j] - i);
        }

        // Expand palindrome around cnter
        while (i - r[i] >= 0 && i + r[i] < n && t[i - r[i]] == t[i + r[i]])
        {
            r[i]++;
        }

        // Update rightmost palindrome
        if (i + r[i] > j + r[j])
        {
            j = i;
        }
    }

    return r;
}
```

Breakdown:

```cpp
// Precompute the Palindrome Length Using Symmetry:
// i: current center of the palindrome
// j: center of the rightmost palindrome found so far
for (int i = 0, j = 0; i < n; i++)
{
    if (2 * j - i >= 0 && j + r[j] > i)
    {
        r[i] = min(r[2 * j - i], j + r[j] - i);
    }
}
```

If $i$ lies within the rightmost palindrome(i.e., `i < j + r[j]`), we can use the previously computed palindrome to avoid redundant comparisons:

$$r[i] = min(r[2 * j - i], j + r[j] - i)$$

This means we can take the minimum of the palindrome length:

- If $i$ lies within the rightmost palindrome, the palindrome centered at $i$ is **at least** as long as the palindrome at its mirror $2 * j - i$
- and how far $i$ is from the boundary of the rightmost palindrome(`j + r[j] - i`)

```cpp
// Expand palindrome around cnter
while (i - r[i] >= 0 && i + r[i] < n && t[i - r[i]] == t[i + r[i]])
{
    r[i]++;
}
```

- `i - r[i] >= 0 && i + r[i] < n`: ensures we stay within bounds of the string
- `t[i - r[i]] == t[i + r[i]]`: checks if the characters on both sides of $i$ match

```cpp
// Update rightmost palindrome
if (i + r[i] > j + r[j])
{
    j = i;
}
```

If the right boundary of the palindrome centered at $i$(`i + r[i]`) is beyond the rightmost boundary(`j + r[j]`), we update the center $j$

- This ensures that $j$ always points to the center of the current rightmost palindrome
