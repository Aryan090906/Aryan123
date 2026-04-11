import { Topic } from '@/types';

export const moreTopics: Topic[] = [
  {
    id: 'linked-list',
    name: 'Linked List',
    description: 'Master dynamic data structures with pointers',
    icon: 'Link',
    color: 'from-green-500 to-emerald-500',
    notes: `# Linked List

## Types
- **Singly**: Points to next only
- **Doubly**: Points to next and prev
- **Circular**: Last points to first

## Node Structure
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
\`\`\`

## Time Complexities
| Operation | Time |
|-----------|------|
| Access    | O(n) |
| Insert head | O(1) |
| Delete    | O(n) |

## Patterns
- Fast/Slow pointers for cycle detection
- Dummy head for edge cases`,
    problems: [
      { id: 'll-1', title: 'Reverse Linked List', difficulty: 'easy', description: 'Reverse a singly linked list.', examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }], constraints: ['Nodes <= 5000'], starterCode: 'def reverse_list(head):\n    pass', solution: 'def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        next_temp = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_temp\n    return prev', hints: ['Use three pointers'], xpReward: 10 },
      { id: 'll-2', title: 'Middle Node', difficulty: 'easy', description: 'Find middle of linked list.', examples: [{ input: 'head = [1,2,3,4,5]', output: '[3,4,5]' }], constraints: ['1 <= nodes <= 100'], starterCode: 'def middle_node(head):\n    pass', solution: 'def middle_node(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow', hints: ['Fast/slow pointers'], xpReward: 10 },
      { id: 'll-3', title: 'Merge Two Lists', difficulty: 'easy', description: 'Merge two sorted lists.', examples: [{ input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' }], constraints: ['Both sorted'], starterCode: 'def merge_lists(l1, l2):\n    pass', solution: 'def merge_lists(l1, l2):\n    dummy = curr = ListNode(0)\n    while l1 and l2:\n        if l1.val < l2.val: curr.next, l1 = l1, l1.next\n        else: curr.next, l2 = l2, l2.next\n        curr = curr.next\n    curr.next = l1 or l2\n    return dummy.next', hints: ['Use dummy node'], xpReward: 10 },
      { id: 'll-4', title: 'Has Cycle', difficulty: 'easy', description: 'Detect cycle in linked list.', examples: [{ input: 'head = [3,2,0,-4]', output: 'True' }], constraints: ['O(1) space'], starterCode: 'def has_cycle(head):\n    pass', solution: 'def has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast: return True\n    return False', hints: ['Floyd cycle detection'], xpReward: 10 },
      { id: 'll-5', title: 'Remove Nth From End', difficulty: 'medium', description: 'Remove nth node from end.', examples: [{ input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' }], constraints: ['1 <= n <= length'], starterCode: 'def remove_nth(head, n):\n    pass', solution: 'def remove_nth(head, n):\n    dummy = ListNode(0)\n    dummy.next = head\n    fast = slow = dummy\n    for _ in range(n + 1): fast = fast.next\n    while fast: fast, slow = fast.next, slow.next\n    slow.next = slow.next.next\n    return dummy.next', hints: ['Two pointers with gap'], xpReward: 25 },
      { id: 'll-6', title: 'Add Two Numbers', difficulty: 'medium', description: 'Add numbers in linked lists.', examples: [{ input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]' }], constraints: ['Reverse order'], starterCode: 'def add_two(l1, l2):\n    pass', solution: 'def add_two(l1, l2):\n    dummy = curr = ListNode(0)\n    carry = 0\n    while l1 or l2 or carry:\n        v1, v2 = (l1.val if l1 else 0), (l2.val if l2 else 0)\n        total = v1 + v2 + carry\n        carry, curr.next = total // 10, ListNode(total % 10)\n        curr = curr.next\n        if l1: l1 = l1.next\n        if l2: l2 = l2.next\n    return dummy.next', hints: ['Track carry'], xpReward: 25 },
      { id: 'll-7', title: 'Merge k Lists', difficulty: 'hard', description: 'Merge k sorted lists.', examples: [{ input: 'lists = [[1,4,5],[1,3,4]]', output: '[1,1,3,4,4,5]' }], constraints: ['k == lists.length'], starterCode: 'def merge_k(lists):\n    pass', solution: 'import heapq\ndef merge_k(lists):\n    heap = [(lst.val, i, lst) for i, lst in enumerate(lists) if lst]\n    heapq.heapify(heap)\n    dummy = curr = ListNode(0)\n    while heap:\n        _, i, node = heapq.heappop(heap)\n        curr.next = node\n        curr = curr.next\n        if node.next: heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next', hints: ['Use min heap'], xpReward: 50 },
      { id: 'll-boss', title: 'Reverse K Groups', difficulty: 'boss', description: 'Reverse nodes in k-groups.', examples: [{ input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' }], constraints: ['1 <= k <= n'], starterCode: 'def reverse_k(head, k):\n    pass', solution: 'def reverse_k(head, k):\n    def reverse(head, k):\n        prev = None\n        curr = head\n        for _ in range(k):\n            next_temp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = next_temp\n        return prev, head, curr\n    dummy = ListNode(0)\n    dummy.next = head\n    prev = dummy\n    while head:\n        tail = head\n        for _ in range(k-1):\n            tail = tail.next\n            if not tail: return dummy.next\n        new_head, new_tail, head = reverse(head, k)\n        prev.next = new_head\n        prev = new_tail\n    return dummy.next', hints: ['Reverse segments'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'll-q1', question: 'Insert at head time complexity?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'O(1) - just update pointers.' },
      { id: 'll-q2', question: 'Cycle detection technique?', options: ['Single pointer', 'Fast/slow pointers', 'Triple pointer', 'Random pointer'], correctAnswer: 1, explanation: 'Floyd cycle detection.' },
      { id: 'll-q3', question: 'Space for iterative reversal?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'Constant extra space.' },
      { id: 'll-q4', question: 'Doubly linked list pointers per node?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'Next and previous.' },
      { id: 'll-q5', question: 'Dummy node purpose?', options: ['Store data', 'Simplify edge cases', 'Increase speed', 'Save memory'], correctAnswer: 1, explanation: 'Handle head modifications.' },
    ],
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Master LIFO data structure',
    icon: 'Layers',
    color: 'from-orange-500 to-amber-500',
    notes: `# Stack

## Key Operations
- **Push**: Add to top - O(1)
- **Pop**: Remove from top - O(1)
- **Peek**: View top - O(1)

## Applications
- Expression evaluation
- Backtracking/DFS
- Function calls
- Parenthesis matching

## Patterns
- Monotonic stack
- Two stacks for queue`,
    problems: [
      { id: 'stack-1', title: 'Valid Parentheses', difficulty: 'easy', description: 'Check if parentheses are valid.', examples: [{ input: 's = "()"', output: 'true' }], constraints: ['1 <= s.length <= 10^4'], starterCode: 'def is_valid(s):\n    pass', solution: 'def is_valid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for c in s:\n        if c in mapping:\n            if not stack or stack.pop() != mapping[c]: return False\n        else: stack.append(c)\n    return not stack', hints: ['Use stack'], xpReward: 10 },
      { id: 'stack-2', title: 'Min Stack', difficulty: 'easy', description: 'Stack with getMin in O(1).', examples: [{ input: 'MinStack(), push(-2), getMin()', output: '-2' }], constraints: ['O(1) operations'], starterCode: 'class MinStack:\n    def __init__(self): pass', solution: 'class MinStack:\n    def __init__(self): self.stack, self.mins = [], []\n    def push(self, x): self.stack.append(x); self.mins.append(min(x, self.mins[-1] if self.mins else x))\n    def pop(self): self.stack.pop(); self.mins.pop()\n    def top(self): return self.stack[-1]\n    def getMin(self): return self.mins[-1]', hints: ['Auxiliary stack'], xpReward: 10 },
      { id: 'stack-3', title: 'Queue using Stacks', difficulty: 'easy', description: 'Implement queue with two stacks.', examples: [{ input: 'MyQueue(), push(1), peek()', output: '1' }], constraints: ['Amortized O(1)'], starterCode: 'class MyQueue:\n    def __init__(self): pass', solution: 'class MyQueue:\n    def __init__(self): self.in_stack, self.out_stack = [], []\n    def push(self, x): self.in_stack.append(x)\n    def pop(self): self.peek(); return self.out_stack.pop()\n    def peek(self):\n        if not self.out_stack:\n            while self.in_stack: self.out_stack.append(self.in_stack.pop())\n        return self.out_stack[-1]', hints: ['Two stacks'], xpReward: 10 },
      { id: 'stack-4', title: 'Next Greater Element', difficulty: 'easy', description: 'Find next greater for each element.', examples: [{ input: 'nums = [4,1,2]', output: '[-1, 2, -1]' }], constraints: ['All unique'], starterCode: 'def next_greater(nums):\n    pass', solution: 'def next_greater(nums):\n    result = [-1] * len(nums)\n    stack = []\n    for i, n in enumerate(nums):\n        while stack and nums[stack[-1]] < n: result[stack.pop()] = n\n        stack.append(i)\n    return result', hints: ['Monotonic stack'], xpReward: 10 },
      { id: 'stack-5', title: 'Daily Temperatures', difficulty: 'medium', description: 'Days until warmer temperature.', examples: [{ input: 't = [73,74,75,71]', output: '[1,1,0,2]' }], constraints: ['1 <= t.length <= 10^5'], starterCode: 'def daily_temps(t):\n    pass', solution: 'def daily_temps(t):\n    result = [0] * len(t)\n    stack = []\n    for i, temp in enumerate(t):\n        while stack and t[stack[-1]] < temp:\n            prev = stack.pop()\n            result[prev] = i - prev\n        stack.append(i)\n    return result', hints: ['Monotonic decreasing stack'], xpReward: 25 },
      { id: 'stack-6', title: 'Largest Rectangle', difficulty: 'hard', description: 'Largest rectangle in histogram.', examples: [{ input: 'heights = [2,1,5,6,2,3]', output: '10' }], constraints: ['1 <= heights.length <= 10^5'], starterCode: 'def largest_rectangle(heights):\n    pass', solution: 'def largest_rectangle(heights):\n    stack = []\n    max_area = 0\n    heights.append(0)\n    for i, h in enumerate(heights):\n        while stack and heights[stack[-1]] > h:\n            height = heights[stack.pop()]\n            width = i if not stack else i - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        stack.append(i)\n    return max_area', hints: ['Monotonic stack'], xpReward: 50 },
      { id: 'stack-boss', title: 'Longest Valid Parentheses', difficulty: 'boss', description: 'Longest valid parentheses substring.', examples: [{ input: 's = ")()())"', output: '4' }], constraints: ['0 <= s.length <= 3*10^4'], starterCode: 'def longest_valid(s):\n    pass', solution: 'def longest_valid(s):\n    stack = [-1]\n    max_len = 0\n    for i, c in enumerate(s):\n        if c == "(": stack.append(i)\n        else:\n            stack.pop()\n            if not stack: stack.append(i)\n            else: max_len = max(max_len, i - stack[-1])\n    return max_len', hints: ['Store indices'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'stack-q1', question: 'Stack follows?', options: ['FIFO', 'LIFO', 'FILO', 'Random'], correctAnswer: 1, explanation: 'Last-In-First-Out.' },
      { id: 'stack-q2', question: 'Push time complexity?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 0, explanation: 'O(1) - add to top.' },
      { id: 'stack-q3', question: 'Used for function calls?', options: ['Queue', 'Stack', 'Heap', 'Tree'], correctAnswer: 1, explanation: 'Call stack uses stack.' },
      { id: 'stack-q4', question: 'Monotonic stack?', options: ['One element', 'Sorted order', 'Circular', 'Dynamic'], correctAnswer: 1, explanation: 'Elements in sorted order.' },
      { id: 'stack-q5', question: 'Stacks for queue?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'Two stacks for queue.' },
    ],
  },
];
