// Dedicated OOP page content: easy explanations + real-life examples + notes + questions.

export const oopIntro = {
  what: `Object-Oriented Programming (OOP) is a way of writing code by thinking in terms of real-world "objects" instead of just steps and functions. An object bundles together data (its properties) and behavior (what it can do) — just like real things around us.`,
  analogy: `Think of a Car 🚗. A car HAS properties: color, brand, speed. A car CAN DO things: start, accelerate, brake. In OOP we make a "Car" class as a blueprint, and every real car (your car, my car) is an "object" created from that blueprint. This way code becomes organized, reusable, and easy to understand — the way we naturally think about the world.`,
  why: [
    'Organized code — data and the functions that use it stay together.',
    'Reusability — write once (a class), reuse it many times (objects), and extend it with inheritance.',
    'Easy to maintain & scale — change one class without breaking everything.',
    'Models the real world — easier to design big applications (e.g. an e-commerce app has User, Product, Cart, Order objects).',
  ],
}

// level: basic | inter | adv
export const oopNotes = [
  {
    heading: 'Class vs Object (the foundation)',
    level: 'basic',
    html: `
      <p>A <b>Class</b> is a blueprint/template. An <b>Object</b> is a real thing made from that blueprint.</p>
      <div class="callout ex"><b>Real-life example:</b> A <b>house blueprint</b> is the class. The actual <b>houses</b> built from it are objects. One blueprint → many houses, each with its own address and color.</div>
      <pre>class Car {              // blueprint (class)
    String brand;
    int speed;
    void start() { System.out.println(brand + " started"); }
}

Car myCar = new Car();   // object (real car)
myCar.brand = "Tesla";
myCar.start();           // Tesla started</pre>`,
  },
  {
    heading: '1️⃣ Encapsulation — "Protect the data"',
    level: 'basic',
    html: `
      <p><b>Encapsulation</b> means wrapping data (variables) and the code (methods) into one unit (a class), and <b>hiding the data</b> from outside direct access using <code>private</code>. Others use it only through safe methods (getters/setters).</p>
      <div class="callout ex"><b>Real-life example:</b> A <b>medical capsule</b> 💊 — the medicine (data) is wrapped and protected inside a shell. Also a <b>bank ATM</b>: you can't open the machine and grab cash directly; you use buttons (methods). Your balance is <code>private</code> — you can only <code>withdraw()</code> or <code>checkBalance()</code>.</div>
      <pre>class BankAccount {
    private double balance;                 // hidden data

    public void deposit(double amt) {       // safe method
        if (amt > 0) balance += amt;
    }
    public double getBalance() { return balance; }
}</pre>
      <p><b>Benefit:</b> data safety — no one can set a negative balance directly.</p>`,
  },
  {
    heading: '2️⃣ Abstraction — "Hide the complexity"',
    level: 'basic',
    html: `
      <p><b>Abstraction</b> means showing only the <b>essential features</b> and hiding the internal details. You know <i>what</i> it does, not <i>how</i> it does it. Done using <b>abstract classes</b> and <b>interfaces</b>.</p>
      <div class="callout ex"><b>Real-life example:</b> Driving a <b>car</b> — you press the accelerator to go faster. You don't need to know how the engine, fuel injection and pistons work. That complexity is hidden. Same with a <b>TV remote</b> 📺 or a <b>coffee machine</b> ☕ — one button, complex work hidden inside.</div>
      <pre>abstract class Shape {
    abstract double area();      // WHAT: every shape has an area
}
class Circle extends Shape {
    double r;
    double area() { return 3.14 * r * r; }   // HOW: circle's own way
}</pre>`,
  },
  {
    heading: '3️⃣ Inheritance — "Reuse & extend"',
    level: 'basic',
    html: `
      <p><b>Inheritance</b> lets one class (child) reuse the properties and methods of another class (parent) using <code>extends</code>. It represents an <b>"is-a"</b> relationship.</p>
      <div class="callout ex"><b>Real-life example:</b> A <b>child inherits</b> features from parents 👨‍👩‍👦. In tech: a <b>Car</b>, <b>Bike</b> and <b>Truck</b> are all <b>Vehicles</b> — they share common things (wheels, start(), stop()) from the Vehicle parent, and add their own extras.</div>
      <pre>class Vehicle {
    void start() { System.out.println("Vehicle started"); }
}
class Car extends Vehicle {           // Car IS-A Vehicle
    void openTrunk() { System.out.println("Trunk open"); }
}
Car c = new Car();
c.start();       // reused from Vehicle
c.openTrunk();   // Car's own</pre>
      <p><b>Types:</b> Single, Multilevel (A→B→C), Hierarchical (one parent, many children). Java does <b>not</b> support multiple inheritance with classes (uses interfaces instead) — avoids the "diamond problem".</p>`,
  },
  {
    heading: '4️⃣ Polymorphism — "One name, many forms"',
    level: 'basic',
    html: `
      <p><b>Polymorphism</b> means the same action behaves differently based on the object. "Poly" = many, "morph" = forms.</p>
      <div class="callout ex"><b>Real-life example:</b> The word <b>"run"</b> — a person runs, a machine runs, a program runs — same word, different meaning. Or a <b>single "Pay" button</b> 💳 that works differently for Card, UPI, or Cash.</div>
      <p><b>Two types:</b></p>
      <ul>
        <li><b>Compile-time (Overloading):</b> same method name, different parameters, in the same class.</li>
        <li><b>Runtime (Overriding):</b> child class rewrites a parent's method with the same signature.</li>
      </ul>
      <pre>// Overloading (compile-time)
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Overriding (runtime)
class Animal { void sound() { System.out.println("Some sound"); } }
class Dog extends Animal { void sound() { System.out.println("Bark"); } }
Animal a = new Dog();
a.sound();   // Bark  (decided at runtime)</pre>`,
  },
  {
    heading: 'Class Relationships (Association, Aggregation, Composition)',
    level: 'inter',
    html: `
      <ul>
        <li><b>Association</b> — a general "uses-a" link. <span class="muted">Example: a Teacher and a Student.</span></li>
        <li><b>Aggregation</b> — a "has-a" with independent lifetimes (weak). <span class="muted">Example: a Department has Teachers, but teachers exist even if the department closes.</span></li>
        <li><b>Composition</b> — a "has-a" with dependent lifetime (strong ownership). <span class="muted">Example: a House has Rooms — no house, no rooms.</span></li>
      </ul>`,
  },
  {
    heading: 'Abstract Class vs Interface',
    level: 'inter',
    html: `
      <table class="tbl">
        <tr><th>Abstract Class</th><th>Interface</th></tr>
        <tr><td>Can have both abstract & normal methods</td><td>Mainly method declarations (default/static allowed since Java 8)</td></tr>
        <tr><td>Can have constructors & instance fields</td><td>Only constants (public static final)</td></tr>
        <tr><td>A class extends only ONE</td><td>A class implements MANY</td></tr>
        <tr><td>Use for shared base + state</td><td>Use for a capability/contract</td></tr>
      </table>
      <div class="callout tip"><b>Quick rule:</b> "IS-A with shared code" → abstract class. "CAN-DO capability" (e.g. Comparable, Runnable) → interface.</div>`,
  },
  {
    heading: 'Constructors, this & super',
    level: 'inter',
    html: `
      <ul>
        <li><b>Constructor</b> — a special method (same name as class, no return type) that runs when an object is created, used to initialize it. Can be <b>overloaded</b>.</li>
        <li><b>Default constructor</b> is added by the compiler if you write none.</li>
        <li><code>this</code> — refers to the current object. <code>super</code> — refers to the parent class (call parent constructor/method).</li>
      </ul>`,
  },
  {
    heading: 'SOLID Principles (writing good OOP)',
    level: 'adv',
    html: `
      <ul>
        <li><b>S</b> — Single Responsibility: a class should have only one reason to change.</li>
        <li><b>O</b> — Open/Closed: open for extension, closed for modification.</li>
        <li><b>L</b> — Liskov Substitution: a child object should replace its parent without breaking things.</li>
        <li><b>I</b> — Interface Segregation: many small specific interfaces beat one fat interface.</li>
        <li><b>D</b> — Dependency Inversion: depend on abstractions, not concrete classes.</li>
      </ul>
      <div class="callout tip"><b>Why care:</b> SOLID makes code flexible, testable and easy to maintain — interviewers love this in senior-ish discussions.</div>`,
  },
  {
    heading: 'Common OOP Design Patterns',
    level: 'adv',
    html: `
      <ul>
        <li><b>Singleton</b> — only one instance exists (e.g. one settings/config or DB connection object).</li>
        <li><b>Factory</b> — a method decides which object to create (e.g. <code>ShapeFactory.get("circle")</code>).</li>
        <li><b>Observer</b> — when one object changes, its subscribers are notified (e.g. YouTube subscribers get notified on a new video 🔔).</li>
        <li><b>Builder</b> — build a complex object step by step.</li>
        <li><b>Strategy</b> — swap algorithms at runtime (e.g. different payment strategies).</li>
      </ul>`,
  },
]

// level: basic | inter | adv
export const oopQuestions = [
  { level: 'basic', q: 'What is OOP? Explain in simple words.', a: 'OOP (Object-Oriented Programming) is a programming style based on real-world objects. Each object combines data (properties) and behavior (methods). Instead of writing code as a long list of instructions, we model things — like Car, User, Account — as objects. This makes code organized, reusable and easy to maintain. Its four pillars are Encapsulation, Abstraction, Inheritance and Polymorphism.' },
  { level: 'basic', q: 'What is the difference between a class and an object?', a: 'A class is a blueprint or template that defines properties and behaviors. An object is a real instance created from that class. Example: "Car" is a class; your specific Tesla is an object. One class can create many objects, each with its own data.' },
  { level: 'basic', q: 'What are the four pillars of OOP?', a: '1) Encapsulation — bundling data + methods and hiding data with access modifiers. 2) Abstraction — showing only essentials, hiding complexity. 3) Inheritance — a child class reusing a parent class ("is-a"). 4) Polymorphism — one name behaving in many forms (overloading/overriding).' },
  { level: 'basic', q: 'What is encapsulation? Give a real example.', a: 'Encapsulation wraps data and methods into one unit and hides the data using private, exposing it only through getters/setters. Real example: a bank account — your balance is private; you can only change it through deposit()/withdraw() methods, so nobody can set an invalid value directly. It ensures data security and control.' },
  { level: 'basic', q: 'What is abstraction? How is it different from encapsulation?', a: 'Abstraction hides complexity and shows only essential features (what an object does) using abstract classes/interfaces — like driving a car without knowing the engine internals. Encapsulation hides the data itself (how it is stored) using access modifiers. Abstraction is about design (hiding implementation), encapsulation is about data protection (hiding state).' },
  { level: 'basic', q: 'What is inheritance and what are its types?', a: 'Inheritance lets a child class reuse properties/methods of a parent class using extends, representing an "is-a" relationship (a Dog is an Animal). Types: Single (A→B), Multilevel (A→B→C), Hierarchical (one parent, many children), and Multiple (via interfaces in Java). It promotes code reuse.' },
  { level: 'basic', q: 'What is polymorphism? Explain its types.', a: 'Polymorphism means "many forms" — the same method behaves differently based on the object. Compile-time polymorphism = method overloading (same name, different parameters). Runtime polymorphism = method overriding (child redefines a parent method, resolved at runtime based on the actual object). Example: an Animal reference pointing to a Dog calls Dog\'s sound().' },
  { level: 'inter', q: 'What is the difference between method overloading and overriding?', a: 'Overloading: same method name with different parameter lists within the same class; resolved at compile time; used to provide flexibility. Overriding: a subclass provides a new implementation of a parent method with the same signature; resolved at runtime; used to change inherited behavior. Overloading = compile-time polymorphism, overriding = runtime polymorphism.' },
  { level: 'inter', q: 'Why does Java not support multiple inheritance with classes?', a: 'To avoid the "diamond problem" — if class C inherits from two classes A and B that both have the same method, the compiler cannot decide which one to use, causing ambiguity. Java allows a class to implement multiple interfaces instead, which resolves this because interfaces provide contracts (and default methods must be explicitly resolved).' },
  { level: 'inter', q: 'Difference between abstract class and interface?', a: 'An abstract class can have constructors, instance fields, and both abstract and concrete methods; a class can extend only one. An interface is a contract with (traditionally) only abstract methods and constants — default/static methods allowed since Java 8 — and a class can implement many. Use an abstract class for a shared base with state; use an interface for a capability like Comparable or Runnable.' },
  { level: 'inter', q: 'What is a constructor? Can it be overloaded?', a: 'A constructor is a special method with the same name as the class and no return type; it runs automatically when an object is created and initializes it. Yes, constructors can be overloaded — multiple constructors with different parameter lists let you create objects in different ways. If you write none, the compiler adds a default (no-arg) constructor.' },
  { level: 'inter', q: 'What is the difference between association, aggregation and composition?', a: 'Association is a general relationship between objects ("uses-a"). Aggregation is a weak "has-a" where parts can exist independently (a Department has Teachers who survive if the department closes). Composition is a strong "has-a" where parts cannot exist without the whole (a House has Rooms — destroy the house and the rooms go too).' },
  { level: 'inter', q: 'What is the difference between this and super?', a: '"this" refers to the current object — used to access current-class fields/methods or call another constructor of the same class (this()). "super" refers to the immediate parent class — used to access parent methods/fields or call the parent constructor (super()). super() is implicitly the first call in a subclass constructor.' },
  { level: 'inter', q: 'Can you override a static method?', a: 'No. Static methods belong to the class, not the object, so they are not overridden but "hidden" (method hiding) — the version called depends on the reference type, not the runtime object. Static methods are resolved at compile time, so runtime polymorphism does not apply to them.' },
  { level: 'inter', q: 'What is the difference between a shallow copy and a deep copy of an object?', a: 'A shallow copy copies the object but shares references to nested objects — changing a nested object affects both copies. A deep copy duplicates the object and all objects it references, so the two are fully independent. Deep copy is needed when objects contain mutable nested objects you must isolate.' },
  { level: 'adv', q: 'Explain the SOLID principles.', a: 'Single Responsibility (one reason to change per class), Open/Closed (extend behavior without modifying existing code), Liskov Substitution (subtypes must be usable in place of their base type without breaking behavior), Interface Segregation (prefer many small interfaces over one large one), Dependency Inversion (depend on abstractions, not concretions). Together they make code maintainable, flexible and testable.' },
  { level: 'adv', q: 'What is the Singleton pattern and how do you make it thread-safe?', a: 'Singleton ensures a class has only one instance with a global access point (used for config, logging, connection pools). Implement with a private constructor and a static getInstance(). For thread safety use eager initialization, synchronized getInstance, double-checked locking with a volatile field, or the Bill Pugh static-inner-class holder idiom (lazy and thread-safe without synchronization overhead).' },
  { level: 'adv', q: 'What is the difference between composition and inheritance? Which is preferred?', a: 'Inheritance is an "is-a" relationship that reuses a parent (tightly coupled, fixed at compile time). Composition is a "has-a" relationship where an object contains other objects and delegates work (loosely coupled, flexible at runtime). "Favor composition over inheritance" — composition avoids fragile deep hierarchies and allows behavior to be changed by swapping components.' },
  { level: 'adv', q: 'What is dynamic method dispatch?', a: 'Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than compile time. When a parent-type reference points to a child object and calls an overridden method, the JVM uses the actual object\'s type (via the virtual method table) to decide which implementation runs. This is how runtime polymorphism works.' },
  { level: 'adv', q: 'How do the four OOP pillars appear in a real project (e.g. e-commerce)?', a: 'Encapsulation: a User class hides password/balance behind methods. Abstraction: a PaymentGateway interface hides how each payment provider works. Inheritance: Admin and Customer extend a base User. Polymorphism: a single processPayment() works for Card, UPI or Wallet objects. This keeps the system modular, secure and easy to extend with new payment types or user roles.' },
]
