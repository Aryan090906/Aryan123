import { Topic, Badge, LeaderboardEntry } from '@/types';

export const badges: Badge[] = [
  {
    id: 'first-solve',
    name: 'First Blood',
    description: 'Solve your first problem',
    icon: 'Zap',
    requirement: 1,
    type: 'problems',
  },
  {
    id: 'problem-hunter',
    name: 'Problem Hunter',
    description: 'Solve 10 problems',
    icon: 'Target',
    requirement: 10,
    type: 'problems',
  },
  {
    id: 'problem-slayer',
    name: 'Problem Slayer',
    description: 'Solve 50 problems',
    icon: 'Sword',
    requirement: 50,
    type: 'problems',
  },
  {
    id: 'dsa-master',
    name: 'DSA Master',
    description: 'Solve 100 problems',
    icon: 'Crown',
    requirement: 100,
    type: 'problems',
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: 'Flame',
    requirement: 3,
    type: 'streak',
  },
  {
    id: 'streak-7',
    name: 'Unstoppable',
    description: 'Maintain a 7-day streak',
    icon: 'Fire',
    requirement: 7,
    type: 'streak',
  },
  {
    id: 'streak-30',
    name: 'Legendary',
    description: 'Maintain a 30-day streak',
    icon: 'Star',
    requirement: 30,
    type: 'streak',
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: 'TrendingUp',
    requirement: 5,
    type: 'level',
  },
  {
    id: 'level-10',
    name: 'Expert Coder',
    description: 'Reach level 10',
    icon: 'Award',
    requirement: 10,
    type: 'level',
  },
  {
    id: 'level-25',
    name: 'Grandmaster',
    description: 'Reach level 25',
    icon: 'Trophy',
    requirement: 25,
    type: 'level',
  },
  {
    id: 'topic-master',
    name: 'Topic Master',
    description: 'Complete all problems in a topic',
    icon: 'BookOpen',
    requirement: 1,
    type: 'topic',
  },
  {
    id: 'boss-slayer',
    name: 'Boss Slayer',
    description: 'Defeat your first boss',
    icon: 'Shield',
    requirement: 1,
    type: 'special',
  },
  {
    id: 'daily-champion',
    name: 'Daily Champion',
    description: 'Complete 7 daily challenges',
    icon: 'Calendar',
    requirement: 7,
    type: 'special',
  },
  {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    description: 'Score 100% on 5 quizzes',
    icon: 'Brain',
    requirement: 5,
    type: 'special',
  },
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
    description: 'Master the fundamental data structure for storing collections of elements',
    icon: 'LayoutGrid',
    color: 'from-blue-500 to-cyan-500',
    notes: `# Arrays - Complete Guide

## What is an Array?
An array is a linear data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index.

## Key Characteristics
- **Fixed Size**: Traditional arrays have a fixed size (though dynamic arrays exist)
- **Contiguous Memory**: Elements are stored in adjacent memory locations
- **Zero-Based Indexing**: First element is at index 0
- **Random Access**: O(1) time complexity for accessing any element

## Time Complexities
| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(1)           |
| Search    | O(n)           |
| Insertion | O(n)           |
| Deletion  | O(n)           |

## Common Operations

### Traversal
\`\`\`python
for i in range(len(arr)):
    print(arr[i])
\`\`\`

### Insertion
\`\`\`python
arr.insert(index, value)  # O(n)
\`\`\`

### Deletion
\`\`\`python
arr.pop(index)  # O(n)
\`\`\`

## Common Patterns
1. **Two Pointer Technique**: Used for searching pairs, palindromes
2. **Sliding Window**: For subarray/substring problems
3. **Prefix Sum**: For range sum queries
4. **Kadane's Algorithm**: For maximum subarray sum

## Applications
- Storing and accessing sequential data
- Implementing other data structures (stacks, queues)
- Matrix operations
- Lookup tables`,
    problems: [
      // Easy
      {
        id: 'arrays-1',
        title: 'Find Maximum Element',
        difficulty: 'easy',
        description: 'Given an array of integers, find the maximum element in the array.',
        examples: [
          { input: 'arr = [3, 7, 2, 9, 1]', output: '9', explanation: '9 is the largest element in the array' },
          { input: 'arr = [10, 5, 20, 8]', output: '20' },
        ],
        constraints: ['1 <= arr.length <= 10^5', '-10^9 <= arr[i] <= 10^9'],
        starterCode: `def find_max(arr):
    # Write your code here
    pass`,
        solution: `def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val`,
        hints: ['Initialize max with first element', 'Iterate through array comparing each element'],
        xpReward: 10,
      },
      {
        id: 'arrays-2',
        title: 'Reverse Array',
        difficulty: 'easy',
        description: 'Reverse the given array in-place without using extra space.',
        examples: [
          { input: 'arr = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
          { input: 'arr = [10, 20, 30]', output: '[30, 20, 10]' },
        ],
        constraints: ['1 <= arr.length <= 10^5', 'Modify array in-place'],
        starterCode: `def reverse_array(arr):
    # Write your code here
    pass`,
        solution: `def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
        hints: ['Use two pointers', 'Swap elements from both ends'],
        xpReward: 10,
      },
      {
        id: 'arrays-3',
        title: 'Contains Duplicate',
        difficulty: 'easy',
        description: 'Given an array, determine if it contains any duplicates.',
        examples: [
          { input: 'arr = [1, 2, 3, 1]', output: 'true' },
          { input: 'arr = [1, 2, 3, 4]', output: 'false' },
        ],
        constraints: ['1 <= arr.length <= 10^5', '-10^9 <= arr[i] <= 10^9'],
        starterCode: `def contains_duplicate(arr):
    # Write your code here
    pass`,
        solution: `def contains_duplicate(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False`,
        hints: ['Use a hash set', 'Check if element already exists'],
        xpReward: 10,
      },
      {
        id: 'arrays-4',
        title: 'Two Sum',
        difficulty: 'easy',
        description: 'Given an array and a target sum, find two numbers that add up to the target.',
        examples: [
          { input: 'arr = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'arr[0] + arr[1] = 2 + 7 = 9' },
          { input: 'arr = [3, 2, 4], target = 6', output: '[1, 2]' },
        ],
        constraints: ['2 <= arr.length <= 10^4', '-10^9 <= arr[i] <= 10^9'],
        starterCode: `def two_sum(arr, target):
    # Write your code here
    pass`,
        solution: `def two_sum(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        hints: ['Use a hash map', 'Store complement of each number'],
        xpReward: 10,
      },
      {
        id: 'arrays-5',
        title: 'Missing Number',
        difficulty: 'easy',
        description: 'Given an array containing n distinct numbers from 0 to n, find the missing number.',
        examples: [
          { input: 'arr = [3, 0, 1]', output: '2' },
          { input: 'arr = [0, 1]', output: '2' },
        ],
        constraints: ['n == arr.length', '0 <= arr[i] <= n'],
        starterCode: `def missing_number(arr):
    # Write your code here
    pass`,
        solution: `def missing_number(arr):
    n = len(arr)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    return expected_sum - actual_sum`,
        hints: ['Use sum formula', 'Calculate expected vs actual sum'],
        xpReward: 10,
      },
      // Medium
      {
        id: 'arrays-6',
        title: 'Maximum Subarray Sum',
        difficulty: 'medium',
        description: 'Find the contiguous subarray with the largest sum using Kadane\'s algorithm.',
        examples: [
          { input: 'arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'Subarray [4, -1, 2, 1] has maximum sum 6' },
          { input: 'arr = [1]', output: '1' },
        ],
        constraints: ['1 <= arr.length <= 10^5', '-10^4 <= arr[i] <= 10^4'],
        starterCode: `def max_subarray_sum(arr):
    # Write your code here
    pass`,
        solution: `def max_subarray_sum(arr):
    max_sum = current_sum = arr[0]
    for num in arr[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
        hints: ['Use Kadane\'s algorithm', 'Track current and maximum sum'],
        xpReward: 25,
      },
      {
        id: 'arrays-7',
        title: 'Product of Array Except Self',
        difficulty: 'medium',
        description: 'Return an array where each element is the product of all other elements.',
        examples: [
          { input: 'arr = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' },
          { input: 'arr = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]' },
        ],
        constraints: ['2 <= arr.length <= 10^5', '-30 <= arr[i] <= 30'],
        starterCode: `def product_except_self(arr):
    # Write your code here
    pass`,
        solution: `def product_except_self(arr):
    n = len(arr)
    result = [1] * n
    
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= arr[i]
    
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= arr[i]
    
    return result`,
        hints: ['Use prefix and suffix products', 'Two passes - left to right, right to left'],
        xpReward: 25,
      },
      {
        id: 'arrays-8',
        title: '3Sum',
        difficulty: 'medium',
        description: 'Find all unique triplets that sum to zero.',
        examples: [
          { input: 'arr = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' },
          { input: 'arr = [0, 1, 1]', output: '[]' },
        ],
        constraints: ['3 <= arr.length <= 3000', '-10^5 <= arr[i] <= 10^5'],
        starterCode: `def three_sum(arr):
    # Write your code here
    pass`,
        solution: `def three_sum(arr):
    arr.sort()
    result = []
    for i in range(len(arr) - 2):
        if i > 0 and arr[i] == arr[i-1]:
            continue
        left, right = i + 1, len(arr) - 1
        while left < right:
            total = arr[i] + arr[left] + arr[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([arr[i], arr[left], arr[right]])
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1
                left += 1
                right -= 1
    return result`,
        hints: ['Sort the array first', 'Use two pointers technique'],
        xpReward: 25,
      },
      {
        id: 'arrays-9',
        title: 'Container With Most Water',
        difficulty: 'medium',
        description: 'Find two lines that form a container holding the most water.',
        examples: [
          { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', explanation: 'Lines at index 1 and 8 form container with area 49' },
          { input: 'height = [1, 1]', output: '1' },
        ],
        constraints: ['2 <= height.length <= 10^5', '0 <= height[i] <= 10^4'],
        starterCode: `def max_area(height):
    # Write your code here
    pass`,
        solution: `def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        max_water = max(max_water, min(height[left], height[right]) * width)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
        hints: ['Use two pointers', 'Move pointer with smaller height'],
        xpReward: 25,
      },
      {
        id: 'arrays-10',
        title: 'Next Permutation',
        difficulty: 'medium',
        description: 'Rearrange numbers to the next lexicographically greater permutation.',
        examples: [
          { input: 'arr = [1, 2, 3]', output: '[1, 3, 2]' },
          { input: 'arr = [3, 2, 1]', output: '[1, 2, 3]' },
        ],
        constraints: ['1 <= arr.length <= 100', '0 <= arr[i] <= 100'],
        starterCode: `def next_permutation(arr):
    # Write your code here
    pass`,
        solution: `def next_permutation(arr):
    i = len(arr) - 2
    while i >= 0 and arr[i] >= arr[i + 1]:
        i -= 1
    if i >= 0:
        j = len(arr) - 1
        while arr[j] <= arr[i]:
            j -= 1
        arr[i], arr[j] = arr[j], arr[i]
    left, right = i + 1, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
        hints: ['Find first decreasing element from right', 'Swap and reverse suffix'],
        xpReward: 25,
      },
      // Hard
      {
        id: 'arrays-11',
        title: 'Trapping Rain Water',
        difficulty: 'hard',
        description: 'Calculate how much water can be trapped after raining.',
        examples: [
          { input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', output: '6' },
          { input: 'height = [4, 2, 0, 3, 2, 5]', output: '9' },
        ],
        constraints: ['1 <= height.length <= 2 * 10^4', '0 <= height[i] <= 10^5'],
        starterCode: `def trap(height):
    # Write your code here
    pass`,
        solution: `def trap(height):
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water`,
        hints: ['Two pointer approach', 'Track max from left and right'],
        xpReward: 50,
      },
      {
        id: 'arrays-12',
        title: 'First Missing Positive',
        difficulty: 'hard',
        description: 'Find the smallest missing positive integer in O(n) time and O(1) space.',
        examples: [
          { input: 'arr = [1, 2, 0]', output: '3' },
          { input: 'arr = [3, 4, -1, 1]', output: '2' },
        ],
        constraints: ['1 <= arr.length <= 5 * 10^5', '-2^31 <= arr[i] <= 2^31 - 1'],
        starterCode: `def first_missing_positive(arr):
    # Write your code here
    pass`,
        solution: `def first_missing_positive(arr):
    n = len(arr)
    for i in range(n):
        while 1 <= arr[i] <= n and arr[arr[i] - 1] != arr[i]:
            arr[arr[i] - 1], arr[i] = arr[i], arr[arr[i] - 1]
    for i in range(n):
        if arr[i] != i + 1:
            return i + 1
    return n + 1`,
        hints: ['Use array as hash map', 'Place each number at its correct index'],
        xpReward: 50,
      },
      {
        id: 'arrays-13',
        title: 'Merge Intervals',
        difficulty: 'hard',
        description: 'Merge all overlapping intervals.',
        examples: [
          { input: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]', output: '[[1, 6], [8, 10], [15, 18]]' },
          { input: 'intervals = [[1, 4], [4, 5]]', output: '[[1, 5]]' },
        ],
        constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
        starterCode: `def merge_intervals(intervals):
    # Write your code here
    pass`,
        solution: `def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    return merged`,
        hints: ['Sort by start time', 'Compare with last merged interval'],
        xpReward: 50,
      },
      {
        id: 'arrays-14',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'hard',
        description: 'Find the median of two sorted arrays in O(log(m+n)) time.',
        examples: [
          { input: 'nums1 = [1, 3], nums2 = [2]', output: '2.0' },
          { input: 'nums1 = [1, 2], nums2 = [3, 4]', output: '2.5' },
        ],
        constraints: ['nums1.length + nums2.length >= 1', 'Both arrays are sorted'],
        starterCode: `def find_median(nums1, nums2):
    # Write your code here
    pass`,
        solution: `def find_median(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    while left <= right:
        partition_x = (left + right) // 2
        partition_y = (m + n + 1) // 2 - partition_x
        max_left_x = float('-inf') if partition_x == 0 else nums1[partition_x - 1]
        min_right_x = float('inf') if partition_x == m else nums1[partition_x]
        max_left_y = float('-inf') if partition_y == 0 else nums2[partition_y - 1]
        min_right_y = float('inf') if partition_y == n else nums2[partition_y]
        if max_left_x <= min_right_y and max_left_y <= min_right_x:
            if (m + n) % 2 == 0:
                return (max(max_left_x, max_left_y) + min(min_right_x, min_right_y)) / 2
            else:
                return max(max_left_x, max_left_y)
        elif max_left_x > min_right_y:
            right = partition_x - 1
        else:
            left = partition_x + 1`,
        hints: ['Binary search on smaller array', 'Find correct partition'],
        xpReward: 50,
      },
      {
        id: 'arrays-15',
        title: 'Sliding Window Maximum',
        difficulty: 'hard',
        description: 'Find the maximum in each sliding window of size k.',
        examples: [
          { input: 'arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3', output: '[3, 3, 5, 5, 6, 7]' },
          { input: 'arr = [1], k = 1', output: '[1]' },
        ],
        constraints: ['1 <= arr.length <= 10^5', '-10^4 <= arr[i] <= 10^4', '1 <= k <= arr.length'],
        starterCode: `def max_sliding_window(arr, k):
    # Write your code here
    pass`,
        solution: `from collections import deque

def max_sliding_window(arr, k):
    result = []
    dq = deque()
    for i in range(len(arr)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(arr[dq[0]])
    return result`,
        hints: ['Use monotonic deque', 'Maintain decreasing order in deque'],
        xpReward: 50,
      },
      // Boss
      {
        id: 'arrays-boss',
        title: 'Array Boss: Maximum Rectangle in Histogram',
        difficulty: 'boss',
        description: 'Find the largest rectangular area possible in a histogram. This is the ultimate test of your array skills!',
        examples: [
          { input: 'heights = [2, 1, 5, 6, 2, 3]', output: '10', explanation: 'The largest rectangle has area 10 (5 * 2)' },
          { input: 'heights = [2, 4]', output: '4' },
        ],
        constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
        starterCode: `def largest_rectangle(heights):
    # Write your code here - this is the BOSS challenge!
    pass`,
        solution: `def largest_rectangle(heights):
    stack = []
    max_area = 0
    heights.append(0)
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area`,
        hints: ['Use monotonic stack', 'Calculate area when height decreases', 'Think about width calculation'],
        xpReward: 100,
      },
    ],
    quizzes: [
      { id: 'arrays-q1', question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'Array access by index is O(1) due to contiguous memory allocation.' },
      { id: 'arrays-q2', question: 'Which algorithm finds the maximum sum of a contiguous subarray?', options: ['Binary Search', 'Kadane\'s Algorithm', 'Merge Sort', 'Quick Sort'], correctAnswer: 1, explanation: 'Kadane\'s Algorithm efficiently finds the maximum subarray sum in O(n) time.' },
      { id: 'arrays-q3', question: 'What is the space complexity of reversing an array in-place?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'In-place reversal uses only O(1) extra space with two pointers.' },
      { id: 'arrays-q4', question: 'Which sorting algorithm has the best average case time complexity?', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'], correctAnswer: 2, explanation: 'Quick Sort has O(n log n) average case time complexity.' },
      { id: 'arrays-q5', question: 'What data structure is best for finding duplicates in an array?', options: ['Array', 'Hash Set', 'Stack', 'Queue'], correctAnswer: 1, explanation: 'Hash Set provides O(1) lookup time for checking duplicates.' },
      { id: 'arrays-q6', question: 'In the Two Sum problem, what is the optimal time complexity?', options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'], correctAnswer: 2, explanation: 'Using a hash map, we can solve Two Sum in O(n) time.' },
      { id: 'arrays-q7', question: 'What technique is used in the sliding window algorithm?', options: ['Recursion', 'Two Pointers', 'Dynamic Programming', 'Backtracking'], correctAnswer: 1, explanation: 'Sliding window typically uses two pointers to maintain a window.' },
      { id: 'arrays-q8', question: 'What is the time complexity of binary search on a sorted array?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 1, explanation: 'Binary search divides the search space in half each iteration, giving O(log n) complexity.' },
      { id: 'arrays-q9', question: 'Which operation is most efficient in a dynamic array (ArrayList)?', options: ['Insertion at beginning', 'Insertion at end', 'Deletion from middle', 'Search'], correctAnswer: 1, explanation: 'Insertion at the end is amortized O(1) in dynamic arrays.' },
      { id: 'arrays-q10', question: 'What is a key characteristic of arrays?', options: ['Dynamic size', 'Contiguous memory', 'Non-linear access', 'Heterogeneous elements'], correctAnswer: 1, explanation: 'Arrays store elements in contiguous memory locations.' },
    ],
  },
  // Strings Topic
  {
    id: 'strings',
    name: 'Strings',
    description: 'Master string manipulation, pattern matching, and text processing algorithms',
    icon: 'Type',
    color: 'from-pink-500 to-rose-500',
    notes: `# Strings - Complete Guide

## What are Strings?
Strings are sequences of characters used to store and manipulate text. In most programming languages, strings are immutable.

## Key Characteristics
- **Immutable**: Cannot be changed after creation (in many languages)
- **Sequence**: Ordered collection of characters
- **Unicode Support**: Modern strings support international characters

## Common Operations

### String Concatenation
\`\`\`python
s1 = "Hello"
s2 = "World"
result = s1 + " " + s2  # "Hello World"
\`\`\`

### Substring
\`\`\`python
s = "Hello World"
sub = s[0:5]  # "Hello"
\`\`\`

### String Reversal
\`\`\`python
s = "Hello"
reversed_s = s[::-1]  # "olleH"
\`\`\`

## Pattern Matching Algorithms
1. **Naive Pattern Search**: O(m*n)
2. **KMP Algorithm**: O(m+n)
3. **Rabin-Karp**: Average O(m+n)
4. **Boyer-Moore**: Sub-linear in practice

## Common Patterns
1. **Two Pointer**: Palindrome check, reverse
2. **Sliding Window**: Substring problems
3. **Hash Map**: Anagram problems
4. **Trie**: Prefix matching
5. **Dynamic Programming**: Edit distance, longest common subsequence

## Time Complexities
| Operation | Time |
|-----------|------|
| Access | O(1) |
| Concatenation | O(n+m) |
| Substring | O(k) |
| Search | O(n*m) naive, O(n+m) KMP |
| Compare | O(min(n,m)) |`,
    problems: [
      // Easy
      {
        id: 'strings-1',
        title: 'Reverse String',
        difficulty: 'easy',
        description: 'Reverse a string in-place.',
        examples: [
          { input: 's = ["h", "e", "l", "l", "o"]', output: '["o", "l", "l", "e", "h"]' },
          { input: 's = ["H", "a", "n", "n", "a", "h"]', output: '["h", "a", "n", "n", "a", "H"]' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ASCII character'],
        starterCode: `def reverse_string(s):
    # Write your code here
    pass`,
        solution: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
        hints: ['Use two pointers', 'Swap characters from both ends'],
        xpReward: 10,
      },
      {
        id: 'strings-2',
        title: 'Valid Palindrome',
        difficulty: 'easy',
        description: 'Check if a string is a palindrome, considering only alphanumeric characters.',
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
          { input: 's = "race a car"', output: 'false' },
        ],
        constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters'],
        starterCode: `def is_palindrome(s):
    # Write your code here
    pass`,
        solution: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
        hints: ['Use two pointers', 'Skip non-alphanumeric characters'],
        xpReward: 10,
      },
      {
        id: 'strings-3',
        title: 'Valid Anagram',
        difficulty: 'easy',
        description: 'Determine if two strings are anagrams of each other.',
        examples: [
          { input: 's = "anagram", t = "nagaram"', output: 'true' },
          { input: 's = "rat", t = "car"', output: 'false' },
        ],
        constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters'],
        starterCode: `def is_anagram(s, t):
    # Write your code here
    pass`,
        solution: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    return sorted(s) == sorted(t)`,
        hints: ['Sort both strings', 'Or use character count'],
        xpReward: 10,
      },
      {
        id: 'strings-4',
        title: 'First Unique Character',
        difficulty: 'easy',
        description: 'Find the first non-repeating character in a string.',
        examples: [
          { input: 's = "leetcode"', output: '0', explanation: 'The first non-repeating character is \'l\' at index 0' },
          { input: 's = "loveleetcode"', output: '2' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters'],
        starterCode: `def first_uniq_char(s):
    # Write your code here
    pass`,
        solution: `def first_uniq_char(s):
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    return -1`,
        hints: ['Count character frequencies', 'Find first with count 1'],
        xpReward: 10,
      },
      {
        id: 'strings-5',
        title: 'Implement strStr()',
        difficulty: 'easy',
        description: 'Return the index of the first occurrence of needle in haystack.',
        examples: [
          { input: 'haystack = "hello", needle = "ll"', output: '2' },
          { input: 'haystack = "aaaaa", needle = "bba"', output: '-1' },
        ],
        constraints: ['0 <= haystack.length, needle.length <= 5 * 10^4'],
        starterCode: `def str_str(haystack, needle):
    # Write your code here
    pass`,
        solution: `def str_str(haystack, needle):
    if not needle:
        return 0
    return haystack.find(needle)`,
        hints: ['Use built-in find method', 'Or implement sliding window'],
        xpReward: 10,
      },
      // Medium
      {
        id: 'strings-6',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'medium',
        description: 'Find the length of the longest substring without repeating characters.',
        examples: [
          { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc" with length 3' },
          { input: 's = "bbbbb"', output: '1' },
        ],
        constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
        starterCode: `def length_of_longest_substring(s):
    # Write your code here
    pass`,
        solution: `def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_length = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    return max_length`,
        hints: ['Use sliding window', 'Track characters in current window'],
        xpReward: 25,
      },
      {
        id: 'strings-7',
        title: 'Group Anagrams',
        difficulty: 'medium',
        description: 'Group all anagrams together from a list of strings.',
        examples: [
          { input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]', output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]' },
          { input: 'strs = [""]', output: '[[""]]' },
        ],
        constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
        starterCode: `def group_anagrams(strs):
    # Write your code here
    pass`,
        solution: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
        hints: ['Use sorted string as key', 'Group by character signature'],
        xpReward: 25,
      },
      {
        id: 'strings-8',
        title: 'Longest Palindromic Substring',
        difficulty: 'medium',
        description: 'Find the longest palindromic substring.',
        examples: [
          { input: 's = "babad"', output: '"bab" or "aba"' },
          { input: 's = "cbbd"', output: '"bb"' },
        ],
        constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters'],
        starterCode: `def longest_palindrome(s):
    # Write your code here
    pass`,
        solution: `def longest_palindrome(s):
    if len(s) < 2:
        return s
    start, max_len = 0, 1
    
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    for i in range(len(s)):
        len1 = expand_around_center(i, i)
        len2 = expand_around_center(i, i + 1)
        length = max(len1, len2)
        if length > max_len:
            max_len = length
            start = i - (length - 1) // 2
    return s[start:start + max_len]`,
        hints: ['Expand around center', 'Check both odd and even length palindromes'],
        xpReward: 25,
      },
      {
        id: 'strings-9',
        title: 'String to Integer (atoi)',
        difficulty: 'medium',
        description: 'Implement the myAtoi(string s) function.',
        examples: [
          { input: 's = "42"', output: '42' },
          { input: 's = "   -42"', output: '-42' },
        ],
        constraints: ['0 <= s.length <= 200', 's consists of English letters, digits, and spaces'],
        starterCode: `def my_atoi(s):
    # Write your code here
    pass`,
        solution: `def my_atoi(s):
    s = s.strip()
    if not s:
        return 0
    sign = 1
    index = 0
    if s[0] == '-':
        sign = -1
        index = 1
    elif s[0] == '+':
        index = 1
    result = 0
    while index < len(s) and s[index].isdigit():
        result = result * 10 + int(s[index])
        index += 1
    result *= sign
    INT_MAX, INT_MIN = 2**31 - 1, -2**31
    return max(INT_MIN, min(result, INT_MAX))`,
        hints: ['Handle whitespace', 'Check for overflow'],
        xpReward: 25,
      },
      {
        id: 'strings-10',
        title: 'Zigzag Conversion',
        difficulty: 'medium',
        description: 'Write the string in a zigzag pattern on a given number of rows.',
        examples: [
          { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
          { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
        ],
        constraints: ['1 <= s.length <= 1000', '1 <= numRows <= 1000'],
        starterCode: `def convert(s, num_rows):
    # Write your code here
    pass`,
        solution: `def convert(s, num_rows):
    if num_rows == 1 or num_rows >= len(s):
        return s
    rows = [''] * num_rows
    current_row, step = 0, -1
    for char in s:
        rows[current_row] += char
        if current_row == 0 or current_row == num_rows - 1:
            step = -step
        current_row += step
    return ''.join(rows)`,
        hints: ['Use list of strings for rows', 'Track direction change'],
        xpReward: 25,
      },
      // Hard
      {
        id: 'strings-11',
        title: 'Regular Expression Matching',
        difficulty: 'hard',
        description: 'Implement regular expression matching with support for \'.\' and \'*\'.',
        examples: [
          { input: 's = "aa", p = "a"', output: 'false' },
          { input: 's = "aa", p = "a*"', output: 'true' },
        ],
        constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30'],
        starterCode: `def is_match(s, p):
    # Write your code here
    pass`,
        solution: `def is_match(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    for j in range(2, len(p) + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            elif p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                dp[i][j] = dp[i - 1][j - 1]
    return dp[len(s)][len(p)]`,
        hints: ['Use dynamic programming', 'Handle * carefully'],
        xpReward: 50,
      },
      {
        id: 'strings-12',
        title: 'Edit Distance',
        difficulty: 'hard',
        description: 'Find the minimum number of operations to convert word1 to word2.',
        examples: [
          { input: 'word1 = "horse", word2 = "ros"', output: '3' },
          { input: 'word1 = "intention", word2 = "execution"', output: '5' },
        ],
        constraints: ['0 <= word1.length, word2.length <= 500'],
        starterCode: `def min_distance(word1, word2):
    # Write your code here
    pass`,
        solution: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]`,
        hints: ['Use dynamic programming', 'Consider insert, delete, replace'],
        xpReward: 50,
      },
      {
        id: 'strings-13',
        title: 'Minimum Window Substring',
        difficulty: 'hard',
        description: 'Find the minimum window in s which contains all characters in t.',
        examples: [
          { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
          { input: 's = "a", t = "a"', output: '"a"' },
        ],
        constraints: ['1 <= s.length, t.length <= 10^5', 's and t consist of uppercase and lowercase English letters'],
        starterCode: `def min_window(s, t):
    # Write your code here
    pass`,
        solution: `from collections import Counter

def min_window(s, t):
    if not t or not s:
        return ""
    dict_t = Counter(t)
    required = len(dict_t)
    l, r = 0, 0
    formed = 0
    window_counts = {}
    ans = float("inf"), None, None
    while r < len(s):
        character = s[r]
        window_counts[character] = window_counts.get(character, 0) + 1
        if character in dict_t and window_counts[character] == dict_t[character]:
            formed += 1
        while l <= r and formed == required:
            character = s[l]
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            window_counts[character] -= 1
            if character in dict_t and window_counts[character] < dict_t[character]:
                formed -= 1
            l += 1
        r += 1
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]`,
        hints: ['Use sliding window', 'Track character counts'],
        xpReward: 50,
      },
      {
        id: 'strings-14',
        title: 'Wildcard Matching',
        difficulty: 'hard',
        description: 'Implement wildcard pattern matching with support for \'?\' and \'*\'.',
        examples: [
          { input: 's = "aa", p = "a"', output: 'false' },
          { input: 's = "aa", p = "*"', output: 'true' },
        ],
        constraints: ['0 <= s.length, p.length <= 2000'],
        starterCode: `def is_match(s, p):
    # Write your code here
    pass`,
        solution: `def is_match(s, p):
    s_len, p_len = len(s), len(p)
    s_idx = p_idx = 0
    star_idx = s_tmp_idx = -1
    while s_idx < s_len:
        if p_idx < p_len and p[p_idx] in ['?', s[s_idx]]:
            s_idx += 1
            p_idx += 1
        elif p_idx < p_len and p[p_idx] == '*':
            star_idx = p_idx
            s_tmp_idx = s_idx
            p_idx += 1
        elif star_idx == -1:
            return False
        else:
            p_idx = star_idx + 1
            s_tmp_idx += 1
            s_idx = s_tmp_idx
    return all(x == '*' for x in p[p_idx:])`,
        hints: ['Greedy approach', 'Track last star position'],
        xpReward: 50,
      },
      {
        id: 'strings-15',
        title: 'Interleaving String',
        difficulty: 'hard',
        description: 'Determine if s3 is formed by interleaving s1 and s2.',
        examples: [
          { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: 'true' },
          { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', output: 'false' },
        ],
        constraints: ['0 <= s1.length, s2.length <= 100', '0 <= s3.length <= 200'],
        starterCode: `def is_interleave(s1, s2, s3):
    # Write your code here
    pass`,
        solution: `def is_interleave(s1, s2, s3):
    if len(s1) + len(s2) != len(s3):
        return False
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    dp[0][0] = True
    for i in range(1, len(s1) + 1):
        dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
    for j in range(1, len(s2) + 1):
        dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]) or (dp[i][j - 1] and s2[j - 1] == s3[i + j - 1])
    return dp[len(s1)][len(s2)]`,
        hints: ['Use 2D DP', 'Check if characters match'],
        xpReward: 50,
      },
      // Boss
      {
        id: 'strings-boss',
        title: 'String Boss: Shortest Palindrome',
        difficulty: 'boss',
        description: 'Find the shortest palindrome by adding characters in front. The ultimate string manipulation challenge!',
        examples: [
          { input: 's = "aacecaaa"', output: '"aaacecaaa"' },
          { input: 's = "abcd"', output: '"dcbabcd"' },
        ],
        constraints: ['0 <= s.length <= 5 * 10^4', 's consists of lowercase English letters only'],
        starterCode: `def shortest_palindrome(s):
    # Write your code here - this is the BOSS challenge!
    pass`,
        solution: `def shortest_palindrome(s):
    if not s:
        return s
    rev_s = s[::-1]
    new_s = s + "#" + rev_s
    lps = [0] * len(new_s)
    for i in range(1, len(new_s)):
        j = lps[i - 1]
        while j > 0 and new_s[i] != new_s[j]:
            j = lps[j - 1]
        if new_s[i] == new_s[j]:
            j += 1
        lps[i] = j
    return rev_s[:len(s) - lps[-1]] + s`,
        hints: ['Use KMP algorithm', 'Compute LPS array', 'Find longest palindromic prefix'],
        xpReward: 100,
      },
    ],
    quizzes: [
      { id: 'strings-q1', question: 'What is the time complexity of finding a substring using the KMP algorithm?', options: ['O(n)', 'O(m*n)', 'O(m+n)', 'O(n^2)'], correctAnswer: 2, explanation: 'KMP algorithm achieves O(m+n) time complexity where m and n are lengths of pattern and text.' },
      { id: 'strings-q2', question: 'Which data structure is best for prefix matching?', options: ['Hash Map', 'Trie', 'Stack', 'Queue'], correctAnswer: 1, explanation: 'Trie (prefix tree) is specifically designed for efficient prefix matching operations.' },
      { id: 'strings-q3', question: 'What is the space complexity of the Edit Distance DP solution?', options: ['O(1)', 'O(n)', 'O(m*n)', 'O(m+n)'], correctAnswer: 2, explanation: 'The standard DP solution uses O(m*n) space for the 2D table.' },
      { id: 'strings-q4', question: 'In a palindrome check using two pointers, when do we stop?', options: ['When left > right', 'When left == right', 'When left >= right', 'After n iterations'], correctAnswer: 2, explanation: 'We stop when left pointer crosses or meets the right pointer.' },
      { id: 'strings-q5', question: 'What does the asterisk (*) match in regex?', options: ['Exactly one character', 'Zero or more of preceding element', 'Any character', 'End of string'], correctAnswer: 1, explanation: '* matches zero or more occurrences of the preceding element.' },
      { id: 'strings-q6', question: 'Which algorithm is used for pattern matching in DNA sequences?', options: ['Bubble Sort', 'Rabin-Karp', 'Merge Sort', 'Binary Search'], correctAnswer: 1, explanation: 'Rabin-Karp with rolling hash is efficient for multiple pattern matching like in DNA.' },
      { id: 'strings-q7', question: 'What is a key characteristic of strings in Python?', options: ['Mutable', 'Immutable', 'Dynamic size', 'Stack-based'], correctAnswer: 1, explanation: 'Python strings are immutable, meaning they cannot be changed after creation.' },
      { id: 'strings-q8', question: 'What technique finds the longest substring without repeating characters?', options: ['Binary Search', 'Sliding Window', 'Divide and Conquer', 'Backtracking'], correctAnswer: 1, explanation: 'Sliding window technique efficiently tracks the current window of unique characters.' },
      { id: 'strings-q9', question: 'What is the Boyer-Moore algorithm used for?', options: ['Sorting', 'String searching', 'Graph traversal', 'Dynamic programming'], correctAnswer: 1, explanation: 'Boyer-Moore is an efficient string searching algorithm.' },
      { id: 'strings-q10', question: 'What does the LPS array in KMP algorithm represent?', options: ['Longest Prefix Suffix', 'Longest Palindromic Substring', 'Last Position Search', 'Linear Pattern Search'], correctAnswer: 0, explanation: 'LPS stands for Longest Proper Prefix which is also a Suffix.' },
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}

export function getProblemById(id: string): { problem: typeof topics[0]['problems'][0]; topic: Topic } | undefined {
  for (const topic of topics) {
    const problem = topic.problems.find(p => p.id === id);
    if (problem) {
      return { problem, topic };
    }
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
