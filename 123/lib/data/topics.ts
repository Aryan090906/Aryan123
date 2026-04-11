import { Topic, Badge, LeaderboardEntry } from '@/types';

export const badges: Badge[] = [
  { id: 'first-solve', name: 'First Blood', description: 'Solve your first problem', icon: 'Zap', requirement: 1, type: 'problems' },
  { id: 'problem-hunter', name: 'Problem Hunter', description: 'Solve 10 problems', icon: 'Target', requirement: 10, type: 'problems' },
  { id: 'problem-slayer', name: 'Problem Slayer', description: 'Solve 50 problems', icon: 'Sword', requirement: 50, type: 'problems' },
  { id: 'dsa-master', name: 'DSA Master', description: 'Solve 100 problems', icon: 'Crown', requirement: 100, type: 'problems' },
  { id: 'streak-3', name: 'On Fire', description: '3-day streak', icon: 'Flame', requirement: 3, type: 'streak' },
  { id: 'streak-7', name: 'Unstoppable', description: '7-day streak', icon: 'Fire', requirement: 7, type: 'streak' },
  { id: 'streak-30', name: 'Legendary', description: '30-day streak', icon: 'Star', requirement: 30, type: 'streak' },
  { id: 'level-5', name: 'Rising Star', description: 'Reach level 5', icon: 'TrendingUp', requirement: 5, type: 'level' },
  { id: 'level-10', name: 'Expert Coder', description: 'Reach level 10', icon: 'Award', requirement: 10, type: 'level' },
  { id: 'boss-slayer', name: 'Boss Slayer', description: 'Defeat a boss', icon: 'Shield', requirement: 1, type: 'special' },
  { id: 'daily-champion', name: 'Daily Champion', description: 'Complete 7 daily challenges', icon: 'Calendar', requirement: 7, type: 'special' },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'CodeNinja', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeNinja', xp: 2450, level: 24, problemsSolved: 89, streak: 15 },
  { id: '2', name: 'AlgoMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlgoMaster', xp: 2180, level: 21, problemsSolved: 76, streak: 12 },
  { id: '3', name: 'ByteWizard', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByteWizard', xp: 1950, level: 19, problemsSolved: 68, streak: 8 },
  { id: '4', name: 'DataQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DataQueen', xp: 1720, level: 17, problemsSolved: 61, streak: 20 },
  { id: '5', name: 'StackOverflow', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StackOverflow', xp: 1580, level: 15, problemsSolved: 54, streak: 5 },
  { id: '6', name: 'BinaryBoss', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BinaryBoss', xp: 1340, level: 13, problemsSolved: 47, streak: 7 },
  { id: '7', name: 'TreeHugger', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TreeHugger', xp: 1120, level: 11, problemsSolved: 39, streak: 4 },
  { id: '8', name: 'GraphGuru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraphGuru', xp: 980, level: 9, problemsSolved: 34, streak: 6 },
  { id: '9', name: 'LoopLord', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LoopLord', xp: 750, level: 7, problemsSolved: 26, streak: 3 },
  { id: '10', name: 'ArrayAce', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArrayAce', xp: 520, level: 5, problemsSolved: 18, streak: 2 },
];

export const topics: Topic[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    description: 'Master fundamental data structure for storing collections',
    icon: 'LayoutGrid',
    color: 'from-blue-500 to-cyan-500',
    notes: `# Arrays

## Key Characteristics
- **Contiguous Memory**: Elements in adjacent locations
- **Zero-Based Indexing**: First element at index 0
- **Random Access**: O(1) access by index

## Time Complexities
| Operation | Time |
|-----------|------|
| Access    | O(1) |
| Search    | O(n) |
| Insertion | O(n) |
| Deletion  | O(n) |

## Common Patterns
1. **Two Pointer**: Searching pairs
2. **Sliding Window**: Subarray problems
3. **Kadane's Algorithm**: Max subarray sum`,
    problems: [
      { id: 'arrays-1', title: 'Find Maximum', difficulty: 'easy', description: 'Find maximum element in array.', examples: [{ input: 'arr = [3, 7, 2, 9, 1]', output: '9' }], constraints: ['1 <= arr.length <= 10^5'], starterCode: 'def find_max(arr):\n    pass', solution: 'def find_max(arr):\n    return max(arr)', hints: ['Use max() or iterate'], xpReward: 10 },
      { id: 'arrays-2', title: 'Reverse Array', difficulty: 'easy', description: 'Reverse array in-place.', examples: [{ input: 'arr = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }], constraints: ['In-place'], starterCode: 'def reverse_array(arr):\n    pass', solution: 'def reverse_array(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr', hints: ['Two pointers'], xpReward: 10 },
      { id: 'arrays-3', title: 'Contains Duplicate', difficulty: 'easy', description: 'Check if array has duplicates.', examples: [{ input: 'arr = [1, 2, 3, 1]', output: 'True' }], constraints: ['1 <= arr.length <= 10^5'], starterCode: 'def contains_duplicate(arr):\n    pass', solution: 'def contains_duplicate(arr):\n    return len(arr) != len(set(arr))', hints: ['Use set'], xpReward: 10 },
      { id: 'arrays-4', title: 'Two Sum', difficulty: 'easy', description: 'Find two numbers adding to target.', examples: [{ input: 'arr = [2, 7, 11, 15], target = 9', output: '[0, 1]' }], constraints: ['2 <= arr.length <= 10^4'], starterCode: 'def two_sum(arr, target):\n    pass', solution: 'def two_sum(arr, target):\n    seen = {}\n    for i, n in enumerate(arr):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i\n    return []', hints: ['Use dict'], xpReward: 10 },
      { id: 'arrays-5', title: 'Missing Number', difficulty: 'easy', description: 'Find missing number in range.', examples: [{ input: 'arr = [3, 0, 1]', output: '2' }], constraints: ['n == arr.length'], starterCode: 'def missing_number(arr):\n    pass', solution: 'def missing_number(arr):\n    n = len(arr)\n    return n * (n + 1) // 2 - sum(arr)', hints: ['Sum formula'], xpReward: 10 },
      { id: 'arrays-6', title: 'Max Subarray', difficulty: 'medium', description: 'Find maximum subarray sum.', examples: [{ input: 'arr = [-2, 1, -3, 4, -1, 2, 1]', output: '6' }], constraints: ['1 <= arr.length <= 10^5'], starterCode: 'def max_subarray(arr):\n    pass', solution: 'def max_subarray(arr):\n    max_sum = curr = arr[0]\n    for n in arr[1:]:\n        curr = max(n, curr + n)\n        max_sum = max(max_sum, curr)\n    return max_sum', hints: ['Kadane algorithm'], xpReward: 25 },
      { id: 'arrays-7', title: 'Product Except Self', difficulty: 'medium', description: 'Product of all except self.', examples: [{ input: 'arr = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' }], constraints: ['No division'], starterCode: 'def product_except_self(arr):\n    pass', solution: 'def product_except_self(arr):\n    n = len(arr)\n    result = [1] * n\n    left = right = 1\n    for i in range(n):\n        result[i] *= left\n        result[n-1-i] *= right\n        left *= arr[i]\n        right *= arr[n-1-i]\n    return result', hints: ['Prefix/suffix products'], xpReward: 25 },
      { id: 'arrays-8', title: '3Sum', difficulty: 'medium', description: 'Find triplets summing to zero.', examples: [{ input: 'arr = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' }], constraints: ['3 <= arr.length <= 3000'], starterCode: 'def three_sum(arr):\n    pass', solution: 'def three_sum(arr):\n    arr.sort()\n    result = []\n    for i in range(len(arr) - 2):\n        if i > 0 and arr[i] == arr[i-1]: continue\n        l, r = i + 1, len(arr) - 1\n        while l < r:\n            total = arr[i] + arr[l] + arr[r]\n            if total < 0: l += 1\n            elif total > 0: r -= 1\n            else:\n                result.append([arr[i], arr[l], arr[r]])\n                while l < r and arr[l] == arr[l+1]: l += 1\n                while l < r and arr[r] == arr[r-1]: r -= 1\n                l, r = l + 1, r - 1\n    return result', hints: ['Sort + two pointers'], xpReward: 25 },
      { id: 'arrays-9', title: 'Trapping Rain Water', difficulty: 'hard', description: 'Calculate trapped rain water.', examples: [{ input: 'height = [0, 1, 0, 2, 1, 0, 1, 3]', output: '5' }], constraints: ['1 <= height.length <= 2*10^4'], starterCode: 'def trap(height):\n    pass', solution: 'def trap(height):\n    if not height: return 0\n    l, r = 0, len(height) - 1\n    left_max = right_max = water = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= left_max: left_max = height[l]\n            else: water += left_max - height[l]\n            l += 1\n        else:\n            if height[r] >= right_max: right_max = height[r]\n            else: water += right_max - height[r]\n            r -= 1\n    return water', hints: ['Two pointers'], xpReward: 50 },
      { id: 'arrays-10', title: 'Merge Intervals', difficulty: 'hard', description: 'Merge overlapping intervals.', examples: [{ input: 'intervals = [[1, 3], [2, 6], [8, 10]]', output: '[[1, 6], [8, 10]]' }], constraints: ['1 <= intervals.length <= 10^4'], starterCode: 'def merge_intervals(intervals):\n    pass', solution: 'def merge_intervals(intervals):\n    if not intervals: return []\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for curr in intervals[1:]:\n        if curr[0] <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], curr[1])\n        else:\n            merged.append(curr)\n    return merged', hints: ['Sort then merge'], xpReward: 50 },
      { id: 'arrays-boss', title: 'Max Rectangle in Histogram', difficulty: 'boss', description: 'Largest rectangle in histogram.', examples: [{ input: 'heights = [2, 1, 5, 6, 2, 3]', output: '10' }], constraints: ['1 <= heights.length <= 10^5'], starterCode: 'def largest_rectangle(heights):\n    pass', solution: 'def largest_rectangle(heights):\n    stack = []\n    max_area = 0\n    heights.append(0)\n    for i, h in enumerate(heights):\n        while stack and heights[stack[-1]] > h:\n            height = heights[stack.pop()]\n            width = i if not stack else i - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        stack.append(i)\n    return max_area', hints: ['Monotonic stack'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'arrays-q1', question: 'Array access time complexity?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'Direct access by index.' },
      { id: 'arrays-q2', question: 'Maximum subarray algorithm?', options: ['Binary Search', 'Kadane\'s Algorithm', 'Merge Sort', 'Quick Sort'], correctAnswer: 1, explanation: 'Kadane\'s for max subarray.' },
      { id: 'arrays-q3', question: 'Space for in-place reversal?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'Constant extra space.' },
      { id: 'arrays-q4', question: 'Best for finding duplicates?', options: ['Array', 'Hash Set', 'Stack', 'Queue'], correctAnswer: 1, explanation: 'O(1) lookup with set.' },
      { id: 'arrays-q5', question: 'Two Sum optimal complexity?', options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'], correctAnswer: 2, explanation: 'Using hash map.' },
    ],
  },
  {
    id: 'strings',
    name: 'Strings',
    description: 'Master string manipulation and pattern matching',
    icon: 'Type',
    color: 'from-pink-500 to-rose-500',
    notes: `# Strings

## Key Characteristics
- **Immutable**: Cannot change after creation
- **Sequence**: Ordered characters
- **Unicode Support**: International characters

## Common Operations
- Concatenation: O(n+m)
- Substring: O(k)
- Search: O(n*m) naive, O(n+m) KMP

## Patterns
1. Two Pointer: Palindrome check
2. Sliding Window: Substring problems
3. Hash Map: Anagram problems`,
    problems: [
      { id: 'strings-1', title: 'Reverse String', difficulty: 'easy', description: 'Reverse string in-place.', examples: [{ input: 's = "hello"', output: '"olleh"' }], constraints: ['1 <= s.length <= 10^5'], starterCode: 'def reverse_string(s):\n    pass', solution: 'def reverse_string(s):\n    return s[::-1]', hints: ['Use slicing'], xpReward: 10 },
      { id: 'strings-2', title: 'Valid Palindrome', difficulty: 'easy', description: 'Check if string is palindrome.', examples: [{ input: 's = "racecar"', output: 'True' }], constraints: ['Alphanumeric only'], starterCode: 'def is_palindrome(s):\n    pass', solution: 'def is_palindrome(s):\n    s = s.lower()\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l] != s[r]: return False\n        l, r = l + 1, r - 1\n    return True', hints: ['Two pointers'], xpReward: 10 },
      { id: 'strings-3', title: 'Valid Anagram', difficulty: 'easy', description: 'Check if two strings are anagrams.', examples: [{ input: 's = "anagram", t = "nagaram"', output: 'True' }], constraints: ['Same length'], starterCode: 'def is_anagram(s, t):\n    pass', solution: 'def is_anagram(s, t):\n    return sorted(s) == sorted(t)', hints: ['Sort and compare'], xpReward: 10 },
      { id: 'strings-4', title: 'First Unique Char', difficulty: 'easy', description: 'Find first non-repeating char index.', examples: [{ input: 's = "leetcode"', output: '0' }], constraints: ['1 <= s.length <= 10^5'], starterCode: 'def first_uniq_char(s):\n    pass', solution: 'def first_uniq_char(s):\n    count = {}\n    for c in s: count[c] = count.get(c, 0) + 1\n    for i, c in enumerate(s):\n        if count[c] == 1: return i\n    return -1', hints: ['Count frequencies'], xpReward: 10 },
      { id: 'strings-5', title: 'Longest Substring Without Repeating', difficulty: 'medium', description: 'Longest substring with unique chars.', examples: [{ input: 's = "abcabcbb"', output: '3' }], constraints: ['0 <= s.length <= 5*10^4'], starterCode: 'def length_of_longest(s):\n    pass', solution: 'def length_of_longest(s):\n    char_set = set()\n    left = max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len', hints: ['Sliding window'], xpReward: 25 },
      { id: 'strings-6', title: 'Group Anagrams', difficulty: 'medium', description: 'Group all anagrams together.', examples: [{ input: 'strs = ["eat", "tea", "tan"]', output: '[["eat", "tea"], ["tan"]]' }], constraints: ['1 <= strs.length <= 10^4'], starterCode: 'def group_anagrams(strs):\n    pass', solution: 'from collections import defaultdict\ndef group_anagrams(strs):\n    groups = defaultdict(list)\n    for s in strs:\n        key = "".join(sorted(s))\n        groups[key].append(s)\n    return list(groups.values())', hints: ['Use sorted string as key'], xpReward: 25 },
      { id: 'strings-7', title: 'Longest Palindromic Substring', difficulty: 'medium', description: 'Find longest palindrome.', examples: [{ input: 's = "babad"', output: '"bab"' }], constraints: ['1 <= s.length <= 1000'], starterCode: 'def longest_palindrome(s):\n    pass', solution: 'def longest_palindrome(s):\n    if len(s) < 2: return s\n    start, max_len = 0, 1\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]: l -= 1; r += 1\n        return r - l - 1\n    for i in range(len(s)):\n        length = max(expand(i, i), expand(i, i+1))\n        if length > max_len:\n            max_len = length\n            start = i - (length - 1) // 2\n    return s[start:start + max_len]', hints: ['Expand around center'], xpReward: 25 },
      { id: 'strings-8', title: 'Edit Distance', difficulty: 'hard', description: 'Minimum operations to convert strings.', examples: [{ input: 'word1 = "horse", word2 = "ros"', output: '3' }], constraints: ['0 <= word1.length, word2.length <= 500'], starterCode: 'def min_distance(word1, word2):\n    pass', solution: 'def min_distance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]\n            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]', hints: ['Dynamic programming'], xpReward: 50 },
      { id: 'strings-boss', title: 'Shortest Palindrome', difficulty: 'boss', description: 'Shortest palindrome by adding in front.', examples: [{ input: 's = "aacecaaa"', output: '"aaacecaaa"' }], constraints: ['0 <= s.length <= 5*10^4'], starterCode: 'def shortest_palindrome(s):\n    pass', solution: 'def shortest_palindrome(s):\n    if not s: return s\n    rev = s[::-1]\n    new_s = s + "#" + rev\n    lps = [0] * len(new_s)\n    for i in range(1, len(new_s)):\n        j = lps[i - 1]\n        while j > 0 and new_s[i] != new_s[j]: j = lps[j - 1]\n        if new_s[i] == new_s[j]: j += 1\n        lps[i] = j\n    return rev[:len(s) - lps[-1]] + s', hints: ['Use KMP LPS array'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'strings-q1', question: 'KMP time complexity?', options: ['O(n)', 'O(m*n)', 'O(m+n)', 'O(n^2)'], correctAnswer: 2, explanation: 'Linear time.' },
      { id: 'strings-q2', question: 'Best for prefix matching?', options: ['Hash Map', 'Trie', 'Stack', 'Queue'], correctAnswer: 1, explanation: 'Trie for prefix operations.' },
      { id: 'strings-q3', question: 'Python strings are?', options: ['Mutable', 'Immutable', 'Dynamic', 'Stack-based'], correctAnswer: 1, explanation: 'Cannot change after creation.' },
      { id: 'strings-q4', question: 'Longest unique substring technique?', options: ['Binary Search', 'Sliding Window', 'Divide/Conquer', 'Backtracking'], correctAnswer: 1, explanation: 'Sliding window for unique chars.' },
      { id: 'strings-q5', question: 'LPS in KMP means?', options: ['Longest Prefix Suffix', 'Last Position Search', 'Linear Pattern', 'None'], correctAnswer: 0, explanation: 'Longest proper prefix that is suffix.' },
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}

export function getProblemById(id: string): { problem: typeof topics[0]['problems'][0]; topic: Topic } | undefined {
  for (const topic of topics) {
    const problem = topic.problems.find(p => p.id === id);
    if (problem) return { problem, topic };
  }
  return undefined;
}

export function getAllProblems(): typeof topics[0]['problems'] {
  return topics.flatMap(topic => topic.problems);
}

export function getDailyChallenges(): typeof topics[0]['problems'] {
  const allProblems = getAllProblems();
  const easy = allProblems.filter(p => p.difficulty === 'easy');
  const medium = allProblems.filter(p => p.difficulty === 'medium');
  const hard = allProblems.filter(p => p.difficulty === 'hard');
  return [
    easy[Math.floor(Math.random() * easy.length)],
    medium[Math.floor(Math.random() * medium.length)],
    hard[Math.floor(Math.random() * hard.length)],
  ];
}
