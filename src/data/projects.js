// Resume projects with likely interviewer questions (basic → advanced).

export const projects = [
  {
    id: 'brewbean',
    name: 'Brew & Bean — Coffee E-Commerce Platform',
    tagline: 'Full-stack e-commerce with microservices, role-based auth & tested REST APIs.',
    link: 'https://github.com/Chaitanya060/BrewBean',
    stack: ['Spring Boot', 'Spring Security', 'Microservices', 'MySQL', 'JUnit', 'JSP', 'JavaScript', 'OpenAPI'],
    summary: [
      'Developed and unit-tested a full-stack e-commerce platform using Spring Boot and Microservices, validating role-based authentication flows and verifying outcomes across service boundaries.',
      'Designed RESTful APIs with OpenAPI documentation, prepared structured test data for MySQL validation, and optimized queries via indexing and caching for a ~30% performance gain.',
    ],
    questions: [
      { level: 'basic', q: 'What does this project do?', a: 'It is an online coffee store where users can browse products, add to cart and place orders, while admins manage products and orders. It is built as a set of Spring Boot microservices with role-based access for users and admins.' },
      { level: 'basic', q: 'Which technologies did you use and why?', a: 'Spring Boot for rapid backend development, Microservices to keep features independent and scalable, Spring Security for authentication/authorization, MySQL for relational data, JUnit for testing, and JSP/JavaScript for the frontend. OpenAPI documented the REST APIs.' },
      { level: 'basic', q: 'What are the main modules/services?', a: 'Typically a user/auth service, a product catalog service, a cart/order service. Each owns its responsibility and exposes REST endpoints, communicating over HTTP.' },
      { level: 'inter', q: 'How did you implement role-based authentication?', a: 'Using Spring Security — I configured a security filter chain, stored users with hashed passwords (BCrypt), and assigned roles like USER and ADMIN. Endpoints were restricted by role so only admins could manage products, while users could shop. I then wrote tests to verify these access flows.' },
      { level: 'inter', q: 'How did the microservices communicate?', a: 'Through REST APIs over HTTP. Each service exposed documented endpoints (OpenAPI), and services called each other for cross-cutting needs. This kept them loosely coupled and independently deployable.' },
      { level: 'inter', q: 'How did you test it?', a: 'I wrote JUnit unit tests for service logic (mocking dependencies), prepared structured test data for MySQL validation, and verified expected outcomes across service boundaries — including the authentication flows and edge cases.' },
      { level: 'adv', q: 'How did you get the 30% performance improvement?', a: 'I profiled slow queries, added indexes on frequently filtered/joined columns (like product and order lookups), introduced caching for repeated reads, and avoided unnecessary SELECT * and N+1 queries. Measuring before and after confirmed roughly a 30% gain.' },
      { level: 'adv', q: 'What were the challenges of using microservices here, and would you do it differently?', a: 'The main challenges were handling communication, keeping data consistent across services, and more complex testing/deployment. For a project this size a modular monolith might have been simpler, but I chose microservices deliberately to learn the architecture — independent scaling, fault isolation and clear boundaries. With more time I would add an API gateway and centralized logging.' },
      { level: 'adv', q: 'How would you scale this to handle high traffic (e.g. a sale)?', a: 'Scale services horizontally behind a load balancer, add caching (Redis) for the product catalog, use a message queue for order processing to smooth spikes, add database read replicas and connection pooling, and put a circuit breaker around inter-service calls to prevent cascading failures.' },
    ],
  },

  {
    id: 'travelbuddy',
    name: 'Travel Buddy — Homestay Booking System',
    tagline: 'Booking platform connecting travelers with local homestays; CRUD + query optimization.',
    link: 'https://github.com/Chaitanya060/Travelbuddy',
    stack: ['Spring Boot', 'Spring Data JPA', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
    summary: [
      'Built and tested a platform connecting travelers with local homestays, performing CRUD validation using Spring Data JPA and verifying data integrity across booking workflows.',
      'Executed database checks and query optimization that reduced search latency by ~25%, documenting test results and edge cases.',
    ],
    questions: [
      { level: 'basic', q: 'Explain this project in simple terms.', a: 'Travel Buddy lets travelers search and book homestays offered by local hosts. Hosts can list properties and travelers can browse, check availability and make bookings — a simpler Airbnb-style system built with Spring Boot.' },
      { level: 'basic', q: 'What is Spring Data JPA and why did you use it?', a: 'Spring Data JPA is an abstraction over JPA/Hibernate that removes boilerplate database code. By extending JpaRepository I got CRUD operations for free and could write derived queries like findByLocation, letting me focus on business logic instead of SQL plumbing.' },
      { level: 'basic', q: 'What are the main entities?', a: 'Typically User/Host, Homestay/Property, and Booking. Relationships: a host has many properties, a property has many bookings, and a booking links a traveler to a property for given dates.' },
      { level: 'inter', q: 'How did you validate CRUD operations and data integrity?', a: 'I tested create, read, update and delete for each entity, checked that relationships and constraints held (e.g. no double-booking, valid foreign keys), and verified data integrity across the booking workflow using test data and edge cases, documenting the results.' },
      { level: 'inter', q: 'How did you handle booking conflicts / availability?', a: 'By checking existing bookings for overlapping date ranges before confirming a new one, enforced in the service layer with validation, so the same property cannot be double-booked for the same dates. I tested these edge cases explicitly.' },
      { level: 'adv', q: 'How did you reduce search latency by 25%?', a: 'Search was slow as data grew, so I analyzed the queries with EXPLAIN, added indexes on searched columns (like location and dates), optimized joins and avoided fetching unnecessary data. Measuring before/after showed about a 25% latency reduction.' },
      { level: 'adv', q: 'How would you handle the N+1 query problem in JPA here?', a: 'The N+1 problem happens when loading a list triggers one extra query per item (e.g. each property\'s bookings). I would fix it with fetch joins (JOIN FETCH), @EntityGraph, or batch fetching so related data loads in fewer queries.' },
      { level: 'adv', q: 'If two users try to book the same homestay at the same time, how do you prevent a race condition?', a: 'Use database-level control: optimistic locking (a @Version field) so the second update fails if the row changed, or pessimistic locking on the availability row during booking, wrapped in a transaction. This ensures only one booking succeeds.' },
    ],
  },

  {
    id: 'emotion',
    name: 'Serverless Facial Emotion Recognition',
    tagline: 'AWS serverless pipeline (Lambda + S3 + Rekognition) for real-time emotion analysis — IEEE published.',
    link: 'https://github.com/Chaitanya060/ServerLessProject',
    stack: ['AWS Lambda', 'AWS S3', 'AWS Rekognition', 'Python', 'OpenCV'],
    summary: [
      'Built and validated an AWS serverless pipeline (Lambda, S3, Rekognition) for real-time emotion analysis, verifying ~95% recognition accuracy against defined benchmarks.',
      'Tested an OpenCV image-preprocessing pipeline, reducing processing time by ~40%, and published the work (IEEE ICICV 2024).',
    ],
    questions: [
      { level: 'basic', q: 'What does this project do?', a: 'It automatically detects the emotion on a face in an uploaded image (happy, sad, angry, etc.) using AWS. When an image is uploaded to S3, a Lambda function processes it and uses Amazon Rekognition to analyze the emotion — all serverless, with no servers to manage.' },
      { level: 'basic', q: 'What is serverless and why did you choose it?', a: 'Serverless means running code without provisioning or managing servers — AWS runs my function on demand and scales automatically, and I pay only per execution. I chose it because the workload is event-driven (per image) and spiky, so it is cost-efficient and scales effortlessly.' },
      { level: 'basic', q: 'What is Amazon Rekognition?', a: 'A managed AWS computer-vision service. I send it an image and it returns analysis as JSON — including detected faces and their emotions with confidence scores — without me training any ML model.' },
      { level: 'inter', q: 'Walk me through the full pipeline / architecture.', a: 'A user uploads an image to an S3 bucket → the S3 upload event triggers a Lambda function → Lambda preprocesses the image with OpenCV (resize, normalize) → it calls Rekognition\'s detect_faces to get emotions → the result is stored/returned. Everything is connected by AWS events, fully serverless.' },
      { level: 'inter', q: 'How did OpenCV help and how did you cut processing time by 40%?', a: 'OpenCV handled preprocessing — resizing, grayscale/normalization and cropping to the face region — so Rekognition received cleaner, smaller inputs. Optimizing these steps (efficient resizing, removing redundant operations) cut processing time by about 40%.' },
      { level: 'inter', q: 'How did you validate 95% accuracy?', a: 'I prepared a labeled test dataset across multiple emotion categories, ran it through the pipeline, and compared the predicted emotions against the known labels, computing accuracy. It reached about 95%, which I documented against defined benchmarks.' },
      { level: 'adv', q: 'How does Lambda get permission to access S3 and Rekognition securely?', a: 'Through an IAM role attached to the Lambda function granting least-privilege permissions (read the specific S3 bucket, call Rekognition). Credentials are never hardcoded — the Lambda assumes the role and boto3 uses those temporary credentials automatically.' },
      { level: 'adv', q: 'What is a cold start and did it affect real-time performance?', a: 'A cold start is added latency when Lambda spins up a new environment after being idle. It can affect the first request. I kept the package small and heavy initialization outside the handler so it is reused on warm invocations; the system still achieved ~300ms latency at high throughput (10K RPM).' },
      { level: 'adv', q: 'How would you improve or extend this system?', a: 'Add API Gateway for a clean REST interface, store results in DynamoDB, add SNS notifications, and use provisioned concurrency to remove cold starts. For accuracy or custom emotions beyond Rekognition, I could train a custom model with SageMaker. I would also add CloudWatch dashboards and alarms for monitoring.' },
      { level: 'adv', q: 'This became a published paper — what was your contribution?', a: 'I designed and validated the serverless pipeline, ran the benchmarking (achieving 95.4% accuracy and ~300ms latency at 10K RPM), prepared the test data, and documented outcomes across emotion categories for HCI and sentiment-analysis use cases. It was published at IEEE ICICV 2024.' },
    ],
  },
]
