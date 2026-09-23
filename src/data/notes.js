// Notes content — full interview syllabus. Each topic has sections.
// `html` is authored/trusted static markup. level: 'basic' | 'inter' | 'adv'.

export const notesTopics = [
  {
    id: 'java',
    label: 'Java',
    icon: '☕',
    sections: [
      {
        heading: 'Java Basics',
        level: 'basic',
        html: `
          <p><b>Java</b> is a class-based, object-oriented, platform-independent language. Source (<code>.java</code>) → compiled by <code>javac</code> → <b>bytecode</b> (<code>.class</code>) → runs on any <b>JVM</b> ("Write Once, Run Anywhere").</p>
          <ul>
            <li><b>JDK</b> = compiler + tools + JRE (to develop). <b>JRE</b> = JVM + libraries (to run). <b>JVM</b> = executes bytecode.</li>
            <li><b>8 primitives:</b> byte, short, int, long, float, double, char, boolean.</li>
            <li><b>Wrapper classes</b> (Integer, Double...) let primitives act as objects — autoboxing/unboxing.</li>
            <li><b>main:</b> <code>public static void main(String[] args)</code>.</li>
          </ul>`,
      },
      {
        heading: 'Keywords: static, final, this, super',
        level: 'basic',
        html: `
          <ul>
            <li><b>static</b> — belongs to the class, not an object (shared). Static methods/variables/blocks.</li>
            <li><b>final</b> — final variable = constant, final method = cannot override, final class = cannot extend.</li>
            <li><b>this</b> — current object; <b>super</b> — parent class (call parent constructor/method).</li>
            <li><b>Access modifiers:</b> private (class only), default (package), protected (package + subclass), public (everywhere).</li>
          </ul>`,
      },
      {
        heading: 'Strings & Immutability',
        level: 'inter',
        html: `
          <ul>
            <li><b>String</b> is immutable — kept in the <b>String pool</b>; edits create new objects.</li>
            <li><b>StringBuilder</b> (fast, not thread-safe) vs <b>StringBuffer</b> (synchronized, thread-safe).</li>
            <li><code>==</code> compares references; <code>.equals()</code> compares content.</li>
            <li><b>equals() & hashCode() contract:</b> equal objects must have equal hashCodes — vital for HashMap/HashSet keys.</li>
          </ul>`,
      },
      {
        heading: 'Collections Framework',
        level: 'inter',
        html: `
          <ul>
            <li><b>List</b> (ordered, duplicates): ArrayList (fast access), LinkedList (fast insert/delete), Vector (legacy).</li>
            <li><b>Set</b> (unique): HashSet, LinkedHashSet (insertion order), TreeSet (sorted).</li>
            <li><b>Map</b>: HashMap, LinkedHashMap, TreeMap (sorted), Hashtable/ConcurrentHashMap (thread-safe).</li>
            <li><b>Queue/Deque:</b> ArrayDeque, PriorityQueue.</li>
            <li><b>Comparable</b> (natural order, compareTo) vs <b>Comparator</b> (custom order).</li>
          </ul>
          <p><b>HashMap internals:</b> array of buckets → hash(key) → index; collisions form a list that becomes a balanced tree after 8 nodes (Java 8+). Avg O(1).</p>`,
      },
      {
        heading: 'Exception Handling',
        level: 'inter',
        html: `
          <ul>
            <li><b>Checked</b> (compile-time: IOException, SQLException) vs <b>Unchecked</b> (runtime: NPE, ArithmeticException).</li>
            <li><b>Hierarchy:</b> Throwable → Error / Exception → RuntimeException.</li>
            <li><code>try / catch / finally</code> (finally always runs); <code>throw</code> vs <code>throws</code>; <b>try-with-resources</b> auto-closes.</li>
            <li>Custom exceptions by extending Exception/RuntimeException.</li>
          </ul>`,
      },
      {
        heading: 'Generics, Enums & Annotations',
        level: 'inter',
        html: `
          <ul>
            <li><b>Generics</b> give type safety: <code>List&lt;String&gt;</code>, <code>&lt;T&gt;</code> methods, bounded types <code>&lt;T extends Number&gt;</code>, wildcards <code>&lt;? extends T&gt;</code>.</li>
            <li><b>Enum</b> — fixed set of constants, can have fields/methods.</li>
            <li><b>Annotations</b> — metadata (@Override, @Deprecated, @FunctionalInterface, custom).</li>
          </ul>`,
      },
      {
        heading: 'Multithreading & Concurrency',
        level: 'adv',
        html: `
          <ul>
            <li>Create: extend <code>Thread</code> or implement <code>Runnable</code>/<code>Callable</code> (returns a value via Future).</li>
            <li>Lifecycle: New → Runnable → Running → Blocked/Waiting → Terminated.</li>
            <li><b>synchronized</b> = mutual exclusion + visibility; <b>volatile</b> = visibility only.</li>
            <li><b>ExecutorService</b> + thread pools; <b>wait()/notify()</b>; <b>ConcurrentHashMap</b>, <b>AtomicInteger</b>, locks.</li>
            <li><b>Deadlock</b> — two threads each hold a lock the other needs.</li>
          </ul>`,
      },
      {
        heading: 'Java 8+ Features',
        level: 'adv',
        html: `
          <ul>
            <li><b>Lambdas:</b> <code>(a,b) -&gt; a+b</code>; <b>Functional interfaces:</b> Predicate, Function, Consumer, Supplier.</li>
            <li><b>Streams:</b> <code>list.stream().filter(..).map(..).collect(..)</code> — lazy, parallelizable.</li>
            <li><b>Optional</b> (avoid null), <b>default/static methods</b> in interfaces, new <b>Date/Time API</b>, method references (<code>User::getName</code>).</li>
            <li>Later: var (10), records, sealed classes, switch expressions, text blocks (14–17).</li>
          </ul>`,
      },
      {
        heading: 'JVM Architecture & Memory',
        level: 'adv',
        html: `
          <ul>
            <li><b>ClassLoader</b> → <b>Runtime data areas</b> (Heap, Stack, Method area/Metaspace, PC register) → <b>Execution engine</b> (interpreter + JIT + GC).</li>
            <li><b>Heap</b> (objects, shared) vs <b>Stack</b> (frames/locals, per thread).</li>
            <li><b>GC generations:</b> Young (Eden + Survivor) → Old; Minor/Major/Full GC. Algorithms: G1, Parallel, ZGC.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'python',
    label: 'Python',
    icon: '🐍',
    sections: [
      {
        heading: 'Python Basics',
        level: 'basic',
        html: `
          <p><b>Python</b> — interpreted, dynamically & strongly typed, indentation-based. Everything is an object.</p>
          <ul>
            <li>Types: int, float, str, bool, complex, NoneType.</li>
            <li><b>Mutable:</b> list, dict, set. <b>Immutable:</b> int, str, tuple, frozenset.</li>
          </ul>`,
      },
      {
        heading: 'Data Structures',
        level: 'basic',
        html: `
          <ul>
            <li><b>List</b> <code>[]</code> ordered/mutable; <b>Tuple</b> <code>()</code> ordered/immutable; <b>Set</b> <code>{}</code> unique; <b>Dict</b> <code>{k:v}</code> key-value.</li>
          </ul>
          <pre>squares = [x*x for x in range(5)]          # list comprehension
d = {k: v for k, v in items}               # dict comprehension</pre>`,
      },
      {
        heading: 'Functions & Args',
        level: 'inter',
        html: `
          <ul>
            <li><code>*args</code> (tuple of positionals), <code>**kwargs</code> (dict of keywords).</li>
            <li><b>Lambda</b>, <b>map/filter/reduce</b>, keyword & default args (avoid mutable defaults!).</li>
            <li><b>Scope:</b> LEGB rule (Local, Enclosing, Global, Built-in); <code>global</code>, <code>nonlocal</code>.</li>
          </ul>`,
      },
      {
        heading: 'OOP in Python',
        level: 'inter',
        html: `
          <ul>
            <li>Class with <code>__init__</code>; <code>self</code> = instance. Inheritance, <code>super()</code>.</li>
            <li>Dunder methods: <code>__str__</code>, <code>__len__</code>, <code>__eq__</code>. <code>@property</code>, <code>@staticmethod</code>, <code>@classmethod</code>.</li>
          </ul>`,
      },
      {
        heading: 'Advanced Concepts',
        level: 'adv',
        html: `
          <ul>
            <li><b>Decorators</b> — wrap functions (logging, timing, auth).</li>
            <li><b>Generators</b> (<code>yield</code>) — lazy, memory efficient; <b>iterators</b>.</li>
            <li><b>GIL</b> — one thread runs bytecode at a time → multiprocessing for CPU-bound, threads/asyncio for I/O-bound.</li>
            <li><b>Context managers</b> (<code>with</code>), <b>shallow vs deep copy</b>, exception handling (try/except/finally).</li>
          </ul>`,
      },
      {
        heading: 'Key Libraries',
        level: 'inter',
        html: `
          <ul>
            <li><b>NumPy/Pandas</b> (data), <b>Matplotlib</b> (plots), <b>OpenCV</b> (images), <b>boto3</b> (AWS SDK), <b>requests</b> (HTTP), <b>Flask/FastAPI/Django</b> (web).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'dsa',
    label: 'Data Structures',
    icon: '🧮',
    sections: [
      {
        heading: 'Complexity (Big-O)',
        level: 'basic',
        html: `
          <p>Big-O describes growth with input size. <code>O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ) &lt; O(n!)</code>.</p>
          <ul><li>Analyze time & space; consider best/avg/worst case; amortized cost (e.g. ArrayList add).</li></ul>`,
      },
      {
        heading: 'Arrays & Strings',
        level: 'basic',
        html: `
          <ul>
            <li><b>Array:</b> contiguous, O(1) index access, costly insert/delete (shift), fixed size.</li>
            <li>Dynamic array (ArrayList/vector) doubles capacity — amortized O(1) append.</li>
            <li>String problems: reversal, palindrome, anagrams, substrings.</li>
          </ul>`,
      },
      {
        heading: 'Linked List, Stack, Queue',
        level: 'inter',
        html: `
          <ul>
            <li><b>Linked List</b> — nodes + pointers; O(1) insert/delete, O(n) access. Singly, doubly, circular.</li>
            <li><b>Stack</b> (LIFO) — undo, recursion, expression eval, parentheses matching.</li>
            <li><b>Queue</b> (FIFO) — scheduling, BFS; variants: circular queue, deque, priority queue.</li>
          </ul>`,
      },
      {
        heading: 'Trees',
        level: 'inter',
        html: `
          <ul>
            <li><b>Binary Tree</b>, <b>BST</b> (left &lt; root &lt; right, search O(log n) if balanced).</li>
            <li>Traversals: <b>Inorder</b> (sorted for BST), Preorder, Postorder, Level-order (BFS).</li>
            <li>Balanced: <b>AVL</b>, <b>Red-Black</b>; <b>Heap</b> (min/max, priority queue); <b>Trie</b> (prefix search).</li>
          </ul>`,
      },
      {
        heading: 'Graphs & Hashing',
        level: 'adv',
        html: `
          <ul>
            <li><b>Graph</b> representation: adjacency list (sparse) vs matrix (dense). Directed/undirected, weighted.</li>
            <li>Traversal: <b>BFS</b> (queue, shortest path in unweighted), <b>DFS</b> (stack/recursion).</li>
            <li><b>Hash Table</b> — O(1) avg lookup; collisions via chaining or open addressing; good hash function matters.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'algorithms',
    label: 'Algorithms',
    icon: '⚙️',
    sections: [
      {
        heading: 'Searching & Sorting',
        level: 'basic',
        html: `
          <ul>
            <li><b>Search:</b> Linear O(n); Binary O(log n) on sorted data.</li>
            <li><b>Sort O(n²):</b> Bubble, Selection, Insertion. <b>O(n log n):</b> Merge (stable, divide & conquer), Quick (in-place, avg n log n, worst n²), Heap.</li>
            <li><b>Stable</b> sort preserves equal-element order (Merge, Insertion).</li>
          </ul>`,
      },
      {
        heading: 'Recursion & Backtracking',
        level: 'inter',
        html: `
          <ul>
            <li><b>Recursion</b> — a function calling itself with a base case (factorial, Fibonacci, tree traversal).</li>
            <li><b>Backtracking</b> — try, and undo if it fails: N-Queens, permutations, subsets, Sudoku, maze paths.</li>
          </ul>`,
      },
      {
        heading: 'Greedy & Divide-and-Conquer',
        level: 'inter',
        html: `
          <ul>
            <li><b>Greedy</b> — pick the local best each step (Activity selection, Huffman coding, Dijkstra, Kruskal/Prim).</li>
            <li><b>Divide & Conquer</b> — split, solve, combine (Merge sort, Quick sort, Binary search).</li>
          </ul>`,
      },
      {
        heading: 'Dynamic Programming',
        level: 'adv',
        html: `
          <ul>
            <li><b>DP</b> = overlapping subproblems + optimal substructure. Store results to avoid recomputation.</li>
            <li>Top-down (<b>memoization</b>) vs bottom-up (<b>tabulation</b>).</li>
            <li>Classics: Fibonacci, 0/1 Knapsack, LCS, LIS, coin change, edit distance, matrix chain.</li>
          </ul>`,
      },
      {
        heading: 'Patterns & Graph Algorithms',
        level: 'adv',
        html: `
          <ul>
            <li><b>Two pointers, Sliding window, Prefix sum, Fast & slow pointers, Binary search on answer.</b></li>
            <li><b>Graph:</b> Dijkstra (shortest path), Bellman-Ford (negative edges), Floyd-Warshall (all pairs), Topological sort, Union-Find (cycle/MST), Kruskal/Prim (MST).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'dbms',
    label: 'DBMS / SQL',
    icon: '🗄️',
    sections: [
      {
        heading: 'DBMS Fundamentals',
        level: 'basic',
        html: `
          <ul>
            <li><b>DBMS</b> manages data; <b>RDBMS</b> stores data in related tables.</li>
            <li><b>Keys:</b> Primary (unique + not null), Candidate, Super, Foreign (relationship), Composite, Unique.</li>
            <li><b>ACID:</b> Atomicity, Consistency, Isolation, Durability.</li>
            <li><b>ER model:</b> entities, attributes, relationships (1:1, 1:N, M:N), cardinality.</li>
          </ul>`,
      },
      {
        heading: 'SQL Commands',
        level: 'basic',
        html: `
          <ul>
            <li><b>DDL:</b> CREATE, ALTER, DROP, TRUNCATE. <b>DML:</b> SELECT, INSERT, UPDATE, DELETE.</li>
            <li><b>DCL:</b> GRANT, REVOKE. <b>TCL:</b> COMMIT, ROLLBACK, SAVEPOINT.</li>
          </ul>
          <pre>SELECT dept, COUNT(*) AS total
FROM employees
WHERE salary &gt; 50000
GROUP BY dept
HAVING COUNT(*) &gt; 5
ORDER BY total DESC
LIMIT 10;</pre>`,
      },
      {
        heading: 'Joins & Subqueries',
        level: 'inter',
        html: `
          <ul>
            <li><b>INNER</b> (matches both), <b>LEFT</b> / <b>RIGHT</b> (all of one side), <b>FULL OUTER</b>, <b>SELF</b>, <b>CROSS</b> (cartesian).</li>
            <li><b>Subquery</b> (query inside a query), <b>correlated subquery</b>, <b>EXISTS/IN</b>.</li>
            <li><b>Set ops:</b> UNION (distinct), UNION ALL, INTERSECT, EXCEPT.</li>
          </ul>`,
      },
      {
        heading: 'Normalization',
        level: 'inter',
        html: `
          <ul>
            <li><b>1NF</b> atomic values; <b>2NF</b> no partial dependency; <b>3NF</b> no transitive dependency; <b>BCNF</b> stricter 3NF.</li>
            <li>Goal: remove redundancy & anomalies. <b>Denormalization</b> trades redundancy for read speed.</li>
          </ul>`,
      },
      {
        heading: 'Indexing & Optimization',
        level: 'adv',
        html: `
          <ul>
            <li><b>Index</b> (B-Tree/B+Tree) speeds lookups; costs write time + storage.</li>
            <li><b>Clustered</b> (physical order, one/table) vs <b>Non-clustered</b> (pointers, many).</li>
            <li>Use <code>EXPLAIN</code>; index WHERE/JOIN/ORDER BY columns; avoid SELECT *, N+1; use caching & pagination.</li>
          </ul>`,
      },
      {
        heading: 'Transactions & Concurrency',
        level: 'adv',
        html: `
          <ul>
            <li><b>Isolation levels:</b> Read Uncommitted → Read Committed → Repeatable Read → Serializable.</li>
            <li>Anomalies: dirty read, non-repeatable read, phantom read.</li>
            <li><b>Locks</b> (shared/exclusive), deadlocks, optimistic vs pessimistic locking, MVCC.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'mongodb',
    label: 'MongoDB / NoSQL',
    icon: '🍃',
    sections: [
      {
        heading: 'NoSQL Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>NoSQL</b> = non-relational, flexible schema, horizontal scaling. Types: <b>Document</b> (MongoDB), <b>Key-Value</b> (Redis), <b>Column</b> (Cassandra), <b>Graph</b> (Neo4j).</li>
            <li><b>BASE</b> (Basically Available, Soft state, Eventual consistency) vs SQL's ACID.</li>
            <li><b>CAP theorem:</b> pick 2 of Consistency, Availability, Partition-tolerance.</li>
          </ul>`,
      },
      {
        heading: 'MongoDB Concepts',
        level: 'inter',
        html: `
          <ul>
            <li>Structure: <b>Database → Collections → Documents (BSON/JSON)</b>.</li>
            <li>CRUD: <code>insertOne</code>, <code>find</code>, <code>updateOne</code>, <code>deleteOne</code>.</li>
            <li><b>Embedding</b> (nested docs, fast reads) vs <b>Referencing</b> (normalized, avoids duplication).</li>
            <li><b>Indexes</b>, <b>Aggregation pipeline</b> (<code>$match</code>, <code>$group</code>, <code>$sort</code>).</li>
          </ul>`,
      },
      {
        heading: 'Scaling & When to Use',
        level: 'adv',
        html: `
          <ul>
            <li><b>Sharding</b> (horizontal partitioning) + <b>Replica sets</b> (high availability, failover).</li>
            <li>Use NoSQL for: flexible/changing schema, big data, high write throughput, real-time apps.</li>
            <li>Use SQL for: strong relationships, complex joins, transactions needing ACID.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'os',
    label: 'Operating Systems',
    icon: '🖥️',
    sections: [
      {
        heading: 'OS Basics',
        level: 'basic',
        html: `
          <p>An <b>OS</b> manages hardware/software resources. Functions: process, memory, file, device, security management.</p>
          <ul><li><b>Kernel</b> = core; <b>system calls</b> = user↔kernel interface; user vs kernel mode.</li>
          <li>Types: batch, time-sharing, distributed, real-time, embedded.</li></ul>`,
      },
      {
        heading: 'Process & Threads',
        level: 'inter',
        html: `
          <ul>
            <li><b>Process</b> = program in execution (own memory). <b>Thread</b> = unit within a process (shared memory).</li>
            <li>States: New, Ready, Running, Waiting, Terminated. <b>PCB</b> stores info; <b>context switch</b>.</li>
            <li><b>IPC</b> — pipes, shared memory, message passing.</li>
          </ul>`,
      },
      {
        heading: 'CPU Scheduling',
        level: 'inter',
        html: `
          <ul>
            <li><b>FCFS</b>, <b>SJF</b>, <b>Priority</b>, <b>Round Robin</b> (time quantum), Multilevel Queue.</li>
            <li>Metrics: waiting, turnaround, response time, throughput. Preemptive vs non-preemptive.</li>
          </ul>`,
      },
      {
        heading: 'Synchronization & Deadlock',
        level: 'adv',
        html: `
          <ul>
            <li><b>Critical section</b> — solved via mutex, semaphores (counting/binary), monitors.</li>
            <li><b>Race condition</b> = outcome depends on timing.</li>
            <li><b>Deadlock</b> 4 conditions: mutual exclusion, hold & wait, no preemption, circular wait. Handle: prevention, avoidance (Banker's), detection, recovery.</li>
          </ul>`,
      },
      {
        heading: 'Memory Management',
        level: 'adv',
        html: `
          <ul>
            <li><b>Paging</b> (fixed pages/frames) vs <b>Segmentation</b> (logical variable sizes).</li>
            <li><b>Virtual memory</b> uses disk; <b>page fault</b> → replacement (FIFO, LRU, Optimal).</li>
            <li><b>Thrashing</b> = excessive paging; internal/external <b>fragmentation</b>.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'networks',
    label: 'Computer Networks',
    icon: '🌐',
    sections: [
      {
        heading: 'OSI & TCP/IP',
        level: 'basic',
        html: `
          <ul>
            <li><b>OSI 7 layers:</b> Physical, Data Link, Network, Transport, Session, Presentation, Application.</li>
            <li><b>TCP/IP 4 layers:</b> Link, Internet, Transport, Application.</li>
            <li><b>TCP</b> (reliable, ordered, connection) vs <b>UDP</b> (fast, connectionless).</li>
          </ul>`,
      },
      {
        heading: 'Protocols & Addressing',
        level: 'inter',
        html: `
          <ul>
            <li><b>HTTP/HTTPS</b> (TLS), <b>DNS</b> (name→IP), <b>DHCP</b> (auto IP), <b>FTP, SMTP/IMAP</b>, <b>ARP</b>.</li>
            <li><b>IP:</b> IPv4 vs IPv6, subnetting, public vs private, <b>NAT</b>, MAC address.</li>
            <li>Ports: HTTP 80, HTTPS 443, SSH 22, DNS 53.</li>
          </ul>`,
      },
      {
        heading: 'Key Concepts & Security',
        level: 'adv',
        html: `
          <ul>
            <li><b>TCP 3-way handshake:</b> SYN → SYN-ACK → ACK.</li>
            <li>What happens on typing a URL: DNS → TCP → TLS → HTTP request → response → render.</li>
            <li><b>Firewall, VPN, load balancer, proxy, CDN.</b> Attacks: DDoS, MITM, spoofing.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'html',
    label: 'HTML',
    icon: '📄',
    sections: [
      {
        heading: 'HTML Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>HTML</b> = HyperText Markup Language — structure of a web page using tags/elements.</li>
            <li>Boilerplate: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code>.</li>
            <li>Common tags: headings h1–h6, p, a (link), img, ul/ol/li, div, span, table, form.</li>
            <li><b>Attributes:</b> id, class, src, href, alt.</li>
          </ul>`,
      },
      {
        heading: 'Semantic & Forms',
        level: 'inter',
        html: `
          <ul>
            <li><b>Semantic tags</b> (meaning + SEO + accessibility): header, nav, main, section, article, aside, footer.</li>
            <li><b>Forms:</b> input types (text, email, password, checkbox, radio, file), label, select, textarea, button; validation (required, pattern).</li>
            <li><b>Block</b> (div, p) vs <b>Inline</b> (span, a) elements.</li>
          </ul>`,
      },
      {
        heading: 'HTML5 Features',
        level: 'adv',
        html: `
          <ul>
            <li>Audio/video tags, canvas & SVG, geolocation, <b>localStorage/sessionStorage</b>, drag & drop, web workers.</li>
            <li><b>Accessibility (a11y):</b> alt text, ARIA roles, semantic structure.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'css',
    label: 'CSS',
    icon: '🎨',
    sections: [
      {
        heading: 'CSS Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>CSS</b> styles HTML. Ways: inline, internal (&lt;style&gt;), external (.css).</li>
            <li><b>Selectors:</b> element, .class, #id, *, descendant, child (&gt;), pseudo (:hover, ::before).</li>
            <li><b>Box model:</b> content → padding → border → margin.</li>
            <li><b>Specificity:</b> inline &gt; id &gt; class &gt; element; !important overrides.</li>
          </ul>`,
      },
      {
        heading: 'Layout: Flexbox & Grid',
        level: 'inter',
        html: `
          <ul>
            <li><b>Flexbox</b> (1D): <code>display:flex</code>, justify-content, align-items, flex-direction, flex-grow.</li>
            <li><b>Grid</b> (2D): <code>display:grid</code>, grid-template-columns, gap.</li>
            <li><b>Position:</b> static, relative, absolute, fixed, sticky. <b>Units:</b> px, %, em, rem, vw/vh.</li>
          </ul>`,
      },
      {
        heading: 'Responsive & Advanced',
        level: 'adv',
        html: `
          <ul>
            <li><b>Media queries</b> for responsive design; mobile-first approach.</li>
            <li><b>Transitions & animations</b> (@keyframes, transform), <b>CSS variables</b> (custom properties).</li>
            <li><b>Glassmorphism:</b> semi-transparent background + <code>backdrop-filter: blur()</code> + subtle border (used on this very site 😉).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'javascript',
    label: 'JavaScript',
    icon: '🟨',
    sections: [
      {
        heading: 'JS Basics',
        level: 'basic',
        html: `
          <ul>
            <li>Dynamically typed scripting language of the web (runs in browser & Node.js).</li>
            <li><b>var</b> (function-scoped), <b>let</b>/<b>const</b> (block-scoped). Types: string, number, boolean, null, undefined, object, symbol, bigint.</li>
            <li><code>==</code> (loose, type coercion) vs <code>===</code> (strict).</li>
          </ul>`,
      },
      {
        heading: 'Functions & Scope',
        level: 'inter',
        html: `
          <ul>
            <li><b>Arrow functions</b>, callbacks, higher-order functions (map/filter/reduce).</li>
            <li><b>Closures</b> — a function remembering its outer scope variables.</li>
            <li><b>Hoisting</b> — declarations moved to top; <b>this</b> keyword; <b>spread/rest</b> (...).</li>
          </ul>`,
      },
      {
        heading: 'Async JavaScript',
        level: 'adv',
        html: `
          <ul>
            <li><b>Event loop</b> — single-threaded, non-blocking via call stack + callback/microtask queue.</li>
            <li><b>Callbacks → Promises → async/await</b>; <code>fetch()</code> for HTTP.</li>
            <li><b>DOM manipulation</b>, event handling, event bubbling/delegation.</li>
          </ul>`,
      },
      {
        heading: 'ES6+ Features',
        level: 'inter',
        html: `
          <ul>
            <li>Template literals, destructuring, default params, modules (import/export), classes, optional chaining <code>?.</code>, nullish <code>??</code>.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'react',
    label: 'React',
    icon: '⚛️',
    sections: [
      {
        heading: 'React Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>React</b> = component-based JS library for building UIs (by Meta). Uses a <b>Virtual DOM</b> for efficient updates.</li>
            <li><b>JSX</b> — HTML-like syntax in JS. <b>Components</b> — reusable UI pieces (functional preferred).</li>
            <li><b>Props</b> — data passed parent→child (read-only). <b>State</b> — internal, changeable data.</li>
          </ul>`,
      },
      {
        heading: 'Hooks',
        level: 'inter',
        html: `
          <ul>
            <li><b>useState</b> — local state. <b>useEffect</b> — side effects (fetch, subscriptions, cleanup).</li>
            <li><b>useContext</b> — global data without prop drilling. <b>useRef</b>, <b>useMemo</b>, <b>useCallback</b> (performance).</li>
            <li>Rules: only call hooks at the top level of components.</li>
          </ul>`,
      },
      {
        heading: 'Advanced',
        level: 'adv',
        html: `
          <ul>
            <li><b>Conditional rendering</b>, <b>lists + keys</b>, <b>lifting state up</b>, controlled forms.</li>
            <li><b>React Router</b> (SPA routing — used on this site), <b>Context/Redux</b> (state management), lazy loading & code splitting.</li>
            <li><b>Reconciliation</b> — how React diffs the virtual DOM to update the real DOM.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'spring',
    label: 'Spring Boot',
    icon: '🌱',
    sections: [
      {
        heading: 'Spring & Spring Boot',
        level: 'basic',
        html: `
          <ul>
            <li><b>Spring</b> = Java enterprise framework; <b>Spring Boot</b> adds auto-config + starters + embedded server (no XML, standalone JAR).</li>
            <li><b>@SpringBootApplication</b> = @Configuration + @EnableAutoConfiguration + @ComponentScan.</li>
          </ul>`,
      },
      {
        heading: 'IoC & Dependency Injection',
        level: 'inter',
        html: `
          <ul>
            <li><b>IoC</b> — the container creates & wires beans. <b>DI</b> via constructor (preferred)/setter/field (@Autowired).</li>
            <li><b>Bean scopes:</b> singleton (default), prototype, request, session. Bean lifecycle: @PostConstruct/@PreDestroy.</li>
          </ul>`,
      },
      {
        heading: 'Core Annotations & Layers',
        level: 'inter',
        html: `
          <ul>
            <li><b>Stereotypes:</b> @Component, @Service, @Repository, @Controller/@RestController.</li>
            <li><b>Web:</b> @RequestMapping, @GetMapping/@PostMapping, @PathVariable, @RequestParam, @RequestBody.</li>
            <li><b>Layers:</b> Controller → Service → Repository → Database.</li>
          </ul>`,
      },
      {
        heading: 'Spring Data JPA & Security',
        level: 'adv',
        html: `
          <ul>
            <li><b>JpaRepository</b> gives CRUD; derived queries (findByEmail) + @Query. Hibernate is the ORM.</li>
            <li><b>Spring Security</b> — authentication vs authorization, role-based access, BCrypt, JWT for stateless REST.</li>
            <li><b>Global exceptions:</b> @ControllerAdvice + @ExceptionHandler; validation with @Valid.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'hibernate',
    label: 'Hibernate / JPA',
    icon: '💾',
    sections: [
      {
        heading: 'ORM & Hibernate',
        level: 'basic',
        html: `
          <ul>
            <li><b>ORM</b> maps Java objects ↔ database tables (no manual SQL). <b>JPA</b> = specification; <b>Hibernate</b> = popular implementation.</li>
            <li>Benefits: less boilerplate, DB independence, caching, lazy loading.</li>
          </ul>`,
      },
      {
        heading: 'Entities & Mappings',
        level: 'inter',
        html: `
          <ul>
            <li>@Entity, @Table, @Id, @GeneratedValue, @Column.</li>
            <li>Relationships: @OneToOne, @OneToMany, @ManyToOne, @ManyToMany, @JoinColumn.</li>
            <li><b>Fetch types:</b> LAZY (on demand) vs EAGER (immediately).</li>
          </ul>`,
      },
      {
        heading: 'Advanced',
        level: 'adv',
        html: `
          <ul>
            <li><b>Entity lifecycle:</b> Transient → Persistent → Detached → Removed.</li>
            <li><b>N+1 problem</b> → fix with JOIN FETCH / @EntityGraph / batch fetching.</li>
            <li><b>Caching:</b> first-level (session) & second-level; <b>HQL/JPQL</b>, Criteria API, transactions.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'microservices',
    label: 'Microservices',
    icon: '🧩',
    sections: [
      {
        heading: 'Monolith vs Microservices',
        level: 'basic',
        html: `
          <ul>
            <li><b>Monolith</b> — single unit, simple to start, hard to scale. <b>Microservices</b> — small, independent, own their data.</li>
            <li>Pros: independent deploy/scale, tech freedom, fault isolation. Cons: complexity, distributed data.</li>
          </ul>`,
      },
      {
        heading: 'Communication',
        level: 'inter',
        html: `
          <ul>
            <li><b>Sync:</b> REST, gRPC (RestTemplate, WebClient, OpenFeign). <b>Async:</b> Kafka, RabbitMQ, AWS SQS/SNS.</li>
          </ul>`,
      },
      {
        heading: 'Patterns',
        level: 'adv',
        html: `
          <ul>
            <li><b>API Gateway</b> (single entry, auth, routing), <b>Service Discovery</b> (Eureka), <b>Config Server</b>, <b>Circuit Breaker</b> (Resilience4j), <b>Load Balancing</b>.</li>
            <li><b>Database per service</b>, <b>Saga</b> (distributed transactions), <b>CQRS</b>, eventual consistency.</li>
            <li>Observability: centralized logging (ELK), tracing (Zipkin/Sleuth), metrics (Prometheus/Grafana).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'rest',
    label: 'REST APIs',
    icon: '🔗',
    sections: [
      {
        heading: 'REST Fundamentals',
        level: 'basic',
        html: `
          <ul>
            <li><b>REST</b> = architectural style over HTTP; resources via URIs; <b>stateless</b>; JSON.</li>
            <li><b>Methods:</b> GET, POST, PUT, PATCH, DELETE. <b>Idempotent:</b> GET, PUT, DELETE (not POST).</li>
          </ul>`,
      },
      {
        heading: 'Status Codes & Design',
        level: 'inter',
        html: `
          <ul>
            <li>2xx (200, 201, 204), 3xx redirect, 4xx (400, 401, 403, 404), 5xx (500, 503).</li>
            <li>Best practices: nouns/plurals (/users/1/orders), versioning (/api/v1), pagination, consistent errors, OpenAPI/Swagger docs.</li>
          </ul>`,
      },
      {
        heading: 'Security & Advanced',
        level: 'adv',
        html: `
          <ul>
            <li>HTTPS, JWT/OAuth2, API keys, CORS, rate limiting, caching (ETag), HATEOAS.</li>
            <li><b>REST vs SOAP</b> (XML, strict) & <b>REST vs GraphQL</b> (client picks fields).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'aws',
    label: 'AWS / Cloud',
    icon: '☁️',
    sections: [
      {
        heading: 'Cloud & AWS Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>Cloud models:</b> IaaS (EC2), PaaS (Beanstalk), SaaS. Deployment: public/private/hybrid.</li>
            <li><b>Region</b> vs <b>Availability Zone</b>; multi-AZ for high availability.</li>
            <li><b>Shared Responsibility:</b> AWS secures the cloud; you secure what's in it. Pay-as-you-go, elasticity, scalability.</li>
          </ul>`,
      },
      {
        heading: 'Compute & Storage',
        level: 'inter',
        html: `
          <ul>
            <li><b>EC2</b> (virtual servers), <b>Lambda</b> (serverless, event-driven, auto-scale, 15-min max), <b>Elastic Beanstalk</b>.</li>
            <li><b>S3</b> (object storage, 11 nines, versioning, lifecycle), <b>EBS</b> (block, per-EC2), <b>EFS</b> (shared file).</li>
          </ul>`,
      },
      {
        heading: 'Database, Network & AI',
        level: 'inter',
        html: `
          <ul>
            <li><b>RDS</b> (managed SQL), <b>DynamoDB</b> (NoSQL), <b>ElastiCache</b> (Redis).</li>
            <li><b>VPC</b>, subnets, <b>API Gateway</b>, <b>CloudFront</b> (CDN), Route 53 (DNS), <b>ELB</b> + Auto Scaling.</li>
            <li><b>Rekognition</b> (vision), SageMaker, Comprehend, Textract.</li>
          </ul>`,
      },
      {
        heading: 'Security & DevOps',
        level: 'adv',
        html: `
          <ul>
            <li><b>IAM</b> (users, groups, roles, least-privilege policies), MFA, Secrets Manager, KMS.</li>
            <li><b>CloudWatch</b> (logs/metrics/alarms), <b>CloudTrail</b> (audit), <b>CloudFormation/SAM</b> (IaC).</li>
            <li><b>SQS</b> (queue) & <b>SNS</b> (pub/sub) for decoupling; serverless patterns.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'devops',
    label: 'Docker & DevOps',
    icon: '🐳',
    sections: [
      {
        heading: 'DevOps & CI/CD',
        level: 'basic',
        html: `
          <ul>
            <li><b>DevOps</b> unites Dev + Ops for faster, reliable delivery (automation + culture).</li>
            <li><b>CI</b> (Continuous Integration) — merge & test often. <b>CD</b> (Continuous Delivery/Deployment) — automated release.</li>
            <li>Tools: Jenkins, GitHub Actions, GitLab CI.</li>
          </ul>`,
      },
      {
        heading: 'Docker (Containers)',
        level: 'inter',
        html: `
          <ul>
            <li><b>Container</b> = lightweight, isolated package of app + dependencies (vs a heavy VM — no full OS).</li>
            <li><b>Image</b> (blueprint) → <b>Container</b> (running instance). <b>Dockerfile</b> defines the image; <b>Docker Hub</b> = registry.</li>
            <li><b>docker-compose</b> for multi-container apps. Solves "works on my machine".</li>
          </ul>`,
      },
      {
        heading: 'Kubernetes & Advanced',
        level: 'adv',
        html: `
          <ul>
            <li><b>Kubernetes (K8s)</b> — orchestrates containers: scaling, self-healing, load balancing, rolling updates.</li>
            <li>Concepts: Pod, Node, Deployment, Service, ReplicaSet.</li>
            <li><b>IaC</b> (Terraform), monitoring (Prometheus/Grafana), artifact registries.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'linux',
    label: 'Linux / OS Commands',
    icon: '🐧',
    sections: [
      {
        heading: 'Linux Basics',
        level: 'basic',
        html: `
          <ul>
            <li>Open-source OS kernel; everything is a file; case-sensitive.</li>
            <li>Navigation: <code>pwd, ls, cd, mkdir, rm, cp, mv, touch</code>.</li>
            <li>Files: <code>cat, less, head, tail, nano/vi</code>. Search: <code>grep, find</code>.</li>
          </ul>`,
      },
      {
        heading: 'Permissions & Processes',
        level: 'inter',
        html: `
          <ul>
            <li><b>Permissions:</b> read/write/execute for user/group/others; <code>chmod</code>, <code>chown</code> (e.g. 755).</li>
            <li><b>Processes:</b> <code>ps, top, kill, &amp;, jobs</code>. <b>Pipes</b> <code>|</code> & redirection <code>&gt; &gt;&gt; &lt;</code>.</li>
            <li>Package managers: apt, yum. <code>sudo</code> for admin.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'sdlc',
    label: 'SDLC / Agile',
    icon: '🔄',
    sections: [
      {
        heading: 'SDLC',
        level: 'basic',
        html: `
          <ul>
            <li><b>SDLC phases:</b> Requirement → Design → Implementation → Testing → Deployment → Maintenance.</li>
            <li><b>Models:</b> Waterfall (sequential), Iterative, Spiral (risk-driven), <b>Agile</b> (iterative + flexible), V-model.</li>
          </ul>`,
      },
      {
        heading: 'Agile & Scrum',
        level: 'inter',
        html: `
          <ul>
            <li><b>Agile</b> — iterative, customer feedback, working software over documentation.</li>
            <li><b>Scrum:</b> Sprints (1–4 wks), roles (Product Owner, Scrum Master, Dev Team), ceremonies (standup, sprint planning, review, retrospective), artifacts (product/sprint backlog).</li>
            <li><b>Kanban</b> — visual board, continuous flow, WIP limits.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'systemdesign',
    label: 'System Design',
    icon: '🏗️',
    sections: [
      {
        heading: 'Core Concepts',
        level: 'inter',
        html: `
          <ul>
            <li><b>Scalability:</b> vertical (bigger server) vs horizontal (more servers).</li>
            <li><b>Load balancer</b> distributes traffic; <b>caching</b> (Redis/CDN) speeds reads; <b>database replication</b> (read replicas) & <b>sharding</b> (partitioning).</li>
            <li><b>CAP theorem</b>, latency vs throughput, availability & reliability.</li>
          </ul>`,
      },
      {
        heading: 'Building Blocks',
        level: 'adv',
        html: `
          <ul>
            <li><b>Message queues</b> (Kafka/SQS) for async decoupling, <b>API Gateway</b>, <b>microservices</b>, <b>rate limiting</b>.</li>
            <li><b>SQL vs NoSQL</b> choice, indexing, <b>consistent hashing</b>, blob/object storage for files.</li>
            <li><b>Approach:</b> clarify requirements → estimate scale → high-level design → deep dive → bottlenecks & trade-offs.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'git',
    label: 'Git / GitHub',
    icon: '🌿',
    sections: [
      {
        heading: 'Basics',
        level: 'basic',
        html: `
          <ul>
            <li><b>Git</b> = distributed version control; <b>GitHub</b> = hosting + collaboration.</li>
            <li>Areas: Working directory → Staging → Repository. Core: <code>init, clone, add, commit, status, log</code>.</li>
          </ul>`,
      },
      {
        heading: 'Branching & Collaboration',
        level: 'inter',
        html: `
          <ul>
            <li><code>branch, checkout -b, merge, rebase, pull, push, remote</code>.</li>
            <li><b>Merge</b> (keeps history) vs <b>rebase</b> (linear history). <b>Pull Requests</b>, code review, conflict resolution.</li>
            <li><code>stash, revert</code> (safe undo) vs <code>reset</code> (moves HEAD). Workflows: Git Flow, feature branch, trunk-based.</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'testing',
    label: 'Testing / JUnit',
    icon: '🧪',
    sections: [
      {
        heading: 'Testing Fundamentals',
        level: 'basic',
        html: `
          <ul>
            <li>Levels: <b>Unit → Integration → System → Acceptance</b>. Test pyramid: many unit, fewer integration, fewest E2E.</li>
            <li>Types: functional, regression, smoke, performance, manual vs automated.</li>
          </ul>`,
      },
      {
        heading: 'JUnit & Mockito',
        level: 'inter',
        html: `
          <ul>
            <li>@Test, @BeforeEach/@AfterEach, @BeforeAll/@AfterAll, @Disabled. Assertions: assertEquals, assertTrue, assertThrows.</li>
            <li><b>AAA</b> pattern (Arrange-Act-Assert). <b>Mockito</b> mocks dependencies: <code>when().thenReturn()</code>, <code>verify()</code>.</li>
            <li>Spring: @SpringBootTest, @WebMvcTest + MockMvc, @DataJpaTest. Coverage (JaCoCo), <b>TDD</b> (Red-Green-Refactor).</li>
          </ul>`,
      },
    ],
  },

  {
    id: 'security',
    label: 'Cyber Security',
    icon: '🔒',
    sections: [
      {
        heading: 'Fundamentals',
        level: 'basic',
        html: `
          <ul>
            <li><b>CIA triad:</b> Confidentiality, Integrity, Availability.</li>
            <li><b>Authentication</b> (who you are) vs <b>Authorization</b> (what you can do). MFA, SSO.</li>
            <li><b>Encryption:</b> symmetric (AES) vs asymmetric (RSA); <b>hashing</b> (SHA, bcrypt) is one-way.</li>
          </ul>`,
      },
      {
        heading: 'Web Security',
        level: 'adv',
        html: `
          <ul>
            <li><b>OWASP Top 10:</b> SQL Injection, XSS, CSRF, broken auth, security misconfiguration.</li>
            <li>Defenses: input validation, prepared statements, HTTPS/TLS, JWT/OAuth2, least privilege, salting passwords.</li>
          </ul>`,
      },
    ],
  },
]

export const notesMap = Object.fromEntries(notesTopics.map((t) => [t.id, t]))
