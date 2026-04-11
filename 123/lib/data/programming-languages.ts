import { Topic } from '@/types';

export const programmingLanguages: Topic[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Master JavaScript - the language of the web',
    icon: 'Code2',
    color: 'from-yellow-400 to-orange-500',
    notes: `# JavaScript Guide

## Key Characteristics
- **Interpreted**: Executed at runtime
- **Dynamic Typing**: Types determined at runtime
- **First-Class Functions**: Functions as values
- **Event-Driven**: Handle user interactions
- **Asynchronous**: Supports async/await

## Variable Declarations
\`\`\`javascript
var oldWay = 'legacy';    // function scoped
let mutable = 'changeable'; // block scoped
const constant = 'fixed';   // block scoped, immutable
\`\`\`

## Functions
\`\`\`javascript
// Arrow function
const greet = (name) => \`Hello, \${name}!\`;

// Regular function
function add(a, b) { return a + b; }
\`\`\``,
    problems: [
      { id: 'js-1', title: 'Reverse String', difficulty: 'easy', description: 'Reverse a string.', examples: [{ input: 's = "hello"', output: '"olleh"' }], constraints: ['1 <= s.length <= 1000'], starterCode: 'function reverseString(s) {\n  // Write code here\n}', solution: 'function reverseString(s) {\n  return s.split(\'\').reverse().join(\'\');\n}', hints: ['Use split(), reverse(), join()'], xpReward: 10 },
      { id: 'js-2', title: 'FizzBuzz', difficulty: 'easy', description: 'Print 1 to n. Multiples of 3 = "Fizz", 5 = "Buzz", both = "FizzBuzz".', examples: [{ input: 'n = 15', output: '[1, 2, "Fizz", 4, "Buzz", ...]' }], constraints: ['1 <= n <= 1000'], starterCode: 'function fizzBuzz(n) {\n  const result = [];\n  return result;\n}', solution: 'function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) result.push("FizzBuzz");\n    else if (i % 3 === 0) result.push("Fizz");\n    else if (i % 5 === 0) result.push("Buzz");\n    else result.push(i);\n  }\n  return result;\n}', hints: ['Check divisibility'], xpReward: 10 },
      { id: 'js-3', title: 'Two Sum', difficulty: 'easy', description: 'Find indices of two numbers that add to target.', examples: [{ input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' }], constraints: ['2 <= nums.length <= 10^4'], starterCode: 'function twoSum(nums, target) {\n  // Write code here\n}', solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}', hints: ['Use Map for O(n)'], xpReward: 10 },
      { id: 'js-4', title: 'Palindrome Check', difficulty: 'easy', description: 'Check if string is palindrome.', examples: [{ input: 's = "racecar"', output: 'true' }], constraints: ['1 <= s.length <= 1000'], starterCode: 'function isPalindrome(s) {\n  // Write code here\n}', solution: 'function isPalindrome(s) {\n  return s === s.split(\'\').reverse().join(\'\');\n}', hints: ['Compare with reverse'], xpReward: 10 },
      { id: 'js-5', title: 'Debounce', difficulty: 'medium', description: 'Implement debounce function.', examples: [{ input: 'debounce(fn, 1000)', output: 'Delayed function' }], constraints: ['wait >= 0'], starterCode: 'function debounce(func, wait) {\n  // Write code here\n}', solution: 'function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}', hints: ['Use setTimeout'], xpReward: 25 },
      { id: 'js-6', title: 'Flatten Array', difficulty: 'medium', description: 'Flatten nested array.', examples: [{ input: 'arr = [1, [2, [3]], 4]', output: '[1, 2, 3, 4]' }], constraints: ['Any depth'], starterCode: 'function flatten(arr) {\n  // Write code here\n}', solution: 'function flatten(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n}', hints: ['Use reduce recursively'], xpReward: 25 },
      { id: 'js-7', title: 'Deep Clone', difficulty: 'medium', description: 'Deep copy an object.', examples: [{ input: 'obj = { a: 1, b: { c: 2 } }', output: 'Deep copy' }], constraints: ['Handle nested objects'], starterCode: 'function deepClone(obj) {\n  // Write code here\n}', solution: 'function deepClone(obj) {\n  if (obj === null || typeof obj !== \'object\') return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  const copy = {};\n  for (let key in obj) copy[key] = deepClone(obj[key]);\n  return copy;\n}', hints: ['Recursive approach'], xpReward: 25 },
      { id: 'js-8', title: 'Promise.all', difficulty: 'hard', description: 'Implement Promise.all.', examples: [{ input: 'promiseAll([p1, p2])', output: 'Promise with results' }], constraints: ['Return in order'], starterCode: 'function promiseAll(promises) {\n  // Write code here\n}', solution: 'function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let count = 0;\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then(v => { results[i] = v; if (++count === promises.length) resolve(results); })\n        .catch(reject);\n    });\n  });\n}', hints: ['Track completion count'], xpReward: 50 },
      { id: 'js-9', title: 'Event Emitter', difficulty: 'hard', description: 'Implement EventEmitter with on, emit, off.', examples: [{ input: 'emitter.on("e", fn)', output: 'Subscribe' }], constraints: ['Multiple listeners'], starterCode: 'class EventEmitter {\n  constructor() {}\n  on(event, cb) {}\n  emit(event, ...args) {}\n  off(event, cb) {}\n}', solution: 'class EventEmitter {\n  constructor() { this.events = {}; }\n  on(e, cb) { (this.events[e] ||= []).push(cb); }\n  emit(e, ...args) { (this.events[e] || []).forEach(cb => cb(...args)); }\n  off(e, cb) { this.events[e] = (this.events[e] || []).filter(c => c !== cb); }\n}', hints: ['Use object with arrays'], xpReward: 50 },
      { id: 'js-boss', title: 'Custom Promise', difficulty: 'boss', description: 'Implement Promise class from scratch.', examples: [{ input: 'new MyPromise(r => r(42))', output: 'Promise resolving 42' }], constraints: ['Support then, catch'], starterCode: 'class MyPromise {\n  constructor(executor) {}\n  then(onFulfilled) {}\n  catch(onRejected) {}\n}', solution: 'class MyPromise {\n  constructor(executor) {\n    this.state = "pending";\n    this.value = null;\n    const resolve = v => { if (this.state === "pending") { this.state = "fulfilled"; this.value = v; } };\n    const reject = r => { if (this.state === "pending") { this.state = "rejected"; this.value = r; } };\n    executor(resolve, reject);\n  }\n  then(cb) { return this; }\n  catch(cb) { return this; }\n}', hints: ['Track state'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'js-q1', question: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"number"'], correctAnswer: 2, explanation: 'Historical bug in JavaScript.' },
      { id: 'js-q2', question: 'What does === check?', options: ['Value only', 'Value and type', 'Reference', 'None'], correctAnswer: 1, explanation: 'Strict equality.' },
      { id: 'js-q3', question: 'What is hoisting?', options: ['Moving code up', 'Declarations moved to top of scope', 'Event bubbling', 'None'], correctAnswer: 1, explanation: 'Declarations are hoisted.' },
      { id: 'js-q4', question: 'What is a closure?', options: ['Function with lexical scope', 'Loop', 'Data type', 'Error'], correctAnswer: 0, explanation: 'Closure remembers its scope.' },
      { id: 'js-q5', question: 'let vs var?', options: ['No diff', 'let is block-scoped, var is function-scoped', 'var is faster', 'let is global'], correctAnswer: 1, explanation: 'Block vs function scope.' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Master Python - versatile language for web, AI, and automation',
    icon: 'Terminal',
    color: 'from-blue-500 to-cyan-500',
    notes: `# Python Guide

## Key Characteristics
- **Readable**: Clean syntax
- **Interpreted**: No compilation
- **Dynamic Typing**: Types at runtime
- **OOP**: Everything is an object
- **Cross-Platform**: Runs everywhere

## Data Types
- **int, float, complex**: Numbers
- **str**: Strings (immutable)
- **list, tuple**: Sequences
- **dict**: Key-value pairs
- **set, frozenset**: Unique collections
- **bool**: True/False
- **None**: Absence of value

## Functions
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Lambda
square = lambda x: x ** 2
\`\`\``,
    problems: [
      { id: 'py-1', title: 'Reverse String', difficulty: 'easy', description: 'Reverse a string.', examples: [{ input: 's = "hello"', output: '"olleh"' }], constraints: ['1 <= len(s) <= 1000'], starterCode: 'def reverse_string(s):\n    pass', solution: 'def reverse_string(s):\n    return s[::-1]', hints: ['Use slicing'], xpReward: 10 },
      { id: 'py-2', title: 'FizzBuzz', difficulty: 'easy', description: 'Print 1 to n. 3 = "Fizz", 5 = "Buzz", both = "FizzBuzz".', examples: [{ input: 'n = 15', output: '[1, 2, "Fizz", ...]' }], constraints: ['1 <= n <= 1000'], starterCode: 'def fizz_buzz(n):\n    result = []\n    return result', solution: 'def fizz_buzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0: result.append("FizzBuzz")\n        elif i % 3 == 0: result.append("Fizz")\n        elif i % 5 == 0: result.append("Buzz")\n        else: result.append(i)\n    return result', hints: ['Check divisibility'], xpReward: 10 },
      { id: 'py-3', title: 'Two Sum', difficulty: 'easy', description: 'Find indices of two numbers adding to target.', examples: [{ input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]' }], constraints: ['2 <= len(nums) <= 10^4'], starterCode: 'def two_sum(nums, target):\n    pass', solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i\n    return []', hints: ['Use dict'], xpReward: 10 },
      { id: 'py-4', title: 'Palindrome', difficulty: 'easy', description: 'Check if string is palindrome.', examples: [{ input: 's = "racecar"', output: 'True' }], constraints: ['1 <= len(s) <= 1000'], starterCode: 'def is_palindrome(s):\n    pass', solution: 'def is_palindrome(s):\n    return s == s[::-1]', hints: ['Compare with reverse'], xpReward: 10 },
      { id: 'py-5', title: 'List Comprehension', difficulty: 'easy', description: 'Return even numbers squared.', examples: [{ input: 'nums = [1, 2, 3, 4, 5, 6]', output: '[4, 16, 36]' }], constraints: ['1 <= len(nums) <= 1000'], starterCode: 'def even_squares(nums):\n    pass', solution: 'def even_squares(nums):\n    return [x**2 for x in nums if x % 2 == 0]', hints: ['Use list comprehension'], xpReward: 10 },
      { id: 'py-6', title: 'Decorator', difficulty: 'medium', description: 'Create timing decorator.', examples: [{ input: '@timer', output: 'Times function' }], constraints: ['Print time'], starterCode: 'import time\ndef timer(func):\n    pass', solution: 'import time\nfrom functools import wraps\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__}: {time.time()-start:.4f}s")\n        return result\n    return wrapper', hints: ['Use wraps'], xpReward: 25 },
      { id: 'py-7', title: 'Generator Fibonacci', difficulty: 'medium', description: 'Generator yielding Fibonacci numbers.', examples: [{ input: 'list(fibonacci(5))', output: '[0, 1, 1, 2, 3]' }], constraints: ['Use yield'], starterCode: 'def fibonacci(n):\n    pass', solution: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b', hints: ['Use yield'], xpReward: 25 },
      { id: 'py-8', title: 'Context Manager', difficulty: 'medium', description: 'Timer context manager.', examples: [{ input: 'with Timer(): pass', output: 'Prints time' }], constraints: ['__enter__, __exit__'], starterCode: 'import time\nclass Timer:\n    pass', solution: 'import time\nclass Timer:\n    def __enter__(self): self.start = time.time(); return self\n    def __exit__(self, *args): print(f"Time: {time.time()-self.start:.4f}s")', hints: ['Use __enter__/__exit__'], xpReward: 25 },
      { id: 'py-9', title: 'Singleton Metaclass', difficulty: 'hard', description: 'Metaclass ensuring single instance.', examples: [{ input: 'class A(metaclass=Singleton)', output: 'Single instance' }], constraints: ['Use metaclass'], starterCode: 'class Singleton(type):\n    pass', solution: 'class Singleton(type):\n    _instances = {}\n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]', hints: ['Override __call__'], xpReward: 50 },
      { id: 'py-10', title: 'Rate Limiter', difficulty: 'hard', description: 'Async rate limiter decorator.', examples: [{ input: '@rate_limit(5)', output: '5 calls/second' }], constraints: ['Use asyncio'], starterCode: 'import asyncio\ndef rate_limit(calls_per_second):\n    pass', solution: 'import asyncio\nfrom functools import wraps\ndef rate_limit(cps):\n    def decorator(func):\n        interval = 1.0 / cps\n        last = [0]\n        @wraps(func)\n        async def wrapper(*args, **kwargs):\n            await asyncio.sleep(max(0, interval - (asyncio.get_event_loop().time() - last[0])))\n            last[0] = asyncio.get_event_loop().time()\n            return await func(*args, **kwargs)\n        return wrapper\n    return decorator', hints: ['Use asyncio.sleep'], xpReward: 50 },
      { id: 'py-boss', title: 'Mini Web Framework', difficulty: 'boss', description: 'Build minimal web framework with routing.', examples: [{ input: '@app.route("/")', output: 'Web server' }], constraints: ['Support routing'], starterCode: 'class MiniWeb:\n    def __init__(self): pass\n    def route(self, path): pass', solution: 'class MiniWeb:\n    def __init__(self): self.routes = {}\n    def route(self, path):\n        def decorator(func):\n            self.routes[path] = func\n            return func\n        return decorator', hints: ['Use decorators'], xpReward: 100 },
    ],
    quizzes: [
      { id: 'py-q1', question: '3 // 2 returns?', options: ['1.5', '1', '2', '1.0'], correctAnswer: 1, explanation: 'Floor division.' },
      { id: 'py-q2', question: 'What is a list comprehension?', options: ['Concise list creation', 'Sorting', 'Copying', 'Deletion'], correctAnswer: 0, explanation: 'Shorthand for creating lists.' },
      { id: 'py-q3', question: 'What does yield do?', options: ['Returns value', 'Creates generator', 'Breaks loop', 'Raises error'], correctAnswer: 1, explanation: 'Creates generator function.' },
      { id: 'py-q4', question: 'is vs ==?', options: ['No diff', 'is checks identity, == checks equality', 'is is faster', '== deprecated'], correctAnswer: 1, explanation: 'Identity vs equality.' },
      { id: 'py-q5', question: 'What is GIL?', options: ['Security', 'Mutex for one thread at a time', 'Memory manager', 'Compiler'], correctAnswer: 1, explanation: 'Global Interpreter Lock.' },
    ],
  },
];

export function getProgrammingLanguageTopics(): Topic[] {
  return programmingLanguages;
}

export function getProgrammingLanguageById(id: string): Topic | undefined {
  return programmingLanguages.find(topic => topic.id === id);
}
