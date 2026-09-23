// Self-introduction (written fresh — NOT copied from the resume summary) + HR questions.

export const selfIntro = {
  short: `Hi, I'm Chaitanya Kishore, a final-year Computer Science graduate from KL University with a CGPA of 9.05. I'm a full-stack developer who enjoys building and testing real, working applications — mostly with Java and Spring Boot on the backend, and AWS on the cloud side. I'm also an AWS Certified Developer. Outside of coding, I led my university's competitive coding club and organized a few inter-college hackathons, which taught me a lot about teamwork and taking ownership. I'm excited to start my career somewhere I can keep learning fast and contribute to products that people actually use.`,

  paragraphs: [
    `Good morning / afternoon, and thank you for the opportunity. My name is Chaitanya Kishore, and I recently completed my B.Tech in Computer Science and Engineering from KL University with a CGPA of 9.05.`,
    `I'd describe myself as a full-stack developer who likes to see things end to end — designing the API, writing the business logic, connecting the database, and then actually testing that it all works. Most of my hands-on work is in Java and Spring Boot, and I've built REST APIs and microservices, worked with MySQL and MongoDB, and I'm comfortable writing unit tests with JUnit and Mockito. On the cloud side I've worked with AWS — Lambda, S3 and Rekognition — and I'm an AWS Certified Developer – Associate.`,
    `To give a quick example: I built a serverless facial-emotion-recognition system on AWS where an image upload triggers a Lambda that analyzes emotions using Rekognition. That project even turned into a published IEEE paper, which I'm proud of. I've also built an e-commerce platform and a homestay-booking system, and in both I focused a lot on getting the database and queries right — I was able to improve performance by around 25–30% through indexing and caching.`,
    `Beyond the technical side, I led my college's competitive coding club with 50+ members and organized three inter-collegiate hackathons. That leadership experience taught me how to communicate, coordinate a team, and stay calm under pressure.`,
    `I'm now looking to join a team where I can keep growing as an engineer, take real ownership of features, and contribute to a product that's actually used by people. That's a bit about me — I'd be happy to go deeper into any of it.`,
  ],

  tips: [
    'Keep the spoken version to about 60–90 seconds — practice out loud.',
    'Start with name + education, then skills, then ONE strong project, then a soft-skill/leadership point, then why you want the role.',
    'End by connecting yourself to the company/role — tailor the last line to the specific job.',
    'Do not just read your resume — tell a short story and sound natural.',
  ],
}

// level: basic | inter | adv (used just to group by difficulty of the question)
export const hrQuestions = [
  {
    level: 'basic',
    q: 'Tell me about yourself.',
    a: 'Use the self-introduction above: name → education (B.Tech CSE, KL University, 9.05 CGPA) → core skills (Java, Spring Boot, AWS, testing) → one strong project (serverless emotion recognition / IEEE paper) → leadership (coding club, hackathons) → why you want this role. Keep it ~60–90 seconds and conversational, not a resume read-out.',
  },
  {
    level: 'basic',
    q: 'Why should we hire you?',
    a: 'Because I bring a strong CS foundation (9.05 CGPA), practical full-stack experience with Java, Spring Boot and AWS, and an AWS certification that proves my cloud skills. I have built and tested real, end-to-end applications and even published my work. I also learn quickly and take ownership — I led a 50+ member club and organized hackathons. I am confident I can start contributing early and grow with the team.',
  },
  {
    level: 'basic',
    q: 'What are your strengths?',
    a: 'My biggest strengths are strong fundamentals and a testing mindset — I do not just make things work, I verify them with unit tests, edge cases and database validation. I am a fast learner (I self-learned AWS and got certified), and I have leadership and communication skills from running the coding club and hackathons. I stay organized and document my work clearly.',
  },
  {
    level: 'basic',
    q: 'What is your greatest weakness?',
    a: 'I used to spend too long trying to make everything perfect before sharing it, which sometimes slowed me down. I have been working on this by setting time-boxes, sharing progress earlier for feedback, and focusing on delivering a working version first, then improving it. It has made me both faster and more collaborative.',
  },
  {
    level: 'inter',
    q: 'Where do you see yourself in 5 years?',
    a: 'In five years I see myself as a strong, well-rounded software engineer who can own significant parts of a system end to end — from design to deployment. I want to deepen my backend and cloud expertise, mentor newer developers the way I mentored club members, and ideally grow toward a technical lead role. Most importantly, I want to keep learning and delivering real value.',
  },
  {
    level: 'inter',
    q: 'Why do you want to work here / why this company?',
    a: 'I am drawn to your focus on [product/technology/impact — tailor this]. The role uses exactly the stack I enjoy — Java, backend systems and cloud — and I would get to work on problems at real scale. I also value learning, and I have heard your team invests in engineers\' growth. I want to contribute my strong fundamentals and grow alongside experienced people. (Always research the company and personalize this.)',
  },
  {
    level: 'inter',
    q: 'How do you handle pressure or tight deadlines?',
    a: 'I stay calm and break the work into prioritized, smaller tasks so I always know the next step. During hackathons I regularly worked to tight deadlines by planning early, focusing on the most important features first, and communicating clearly with my team about progress and blockers. Testing as I go also prevents last-minute surprises.',
  },
  {
    level: 'inter',
    q: 'Tell me about a challenge you faced and how you solved it.',
    a: 'In my Travel Buddy project, search was slow as data grew. I profiled the queries, found missing indexes and inefficient joins, added appropriate indexes and query optimization, and validated the results with test data. Search latency dropped by about 25%. The lesson was to measure first, then optimize based on evidence rather than guesses.',
  },
  {
    level: 'inter',
    q: 'Are you a team player or do you prefer working alone?',
    a: 'Both, depending on the task. I can focus deeply and deliver independently — like building and testing my projects solo. But I genuinely enjoy teamwork; leading a 50+ member coding club and organizing hackathons showed me how much better outcomes get with good collaboration and communication. I adapt to what the situation needs.',
  },
  {
    level: 'adv',
    q: 'Why should we hire a fresher over an experienced candidate?',
    a: 'A fresher like me brings up-to-date knowledge, high energy, adaptability and no outdated habits to unlearn. I am eager to learn your way of doing things and grow with the company for the long term. I have also proven I can deliver real, tested projects and even publish research — so I combine fresh enthusiasm with demonstrated ability to execute.',
  },
  {
    level: 'adv',
    q: 'Do you have any questions for us?',
    a: 'Always say yes. Good questions: "What does success look like in the first 3–6 months for this role?", "What does the team\'s tech stack and development process look like?", "How do you support learning and growth for junior engineers?", "What are the biggest challenges the team is working on right now?" This shows genuine interest and thoughtfulness.',
  },
  {
    level: 'adv',
    q: 'What are your salary expectations?',
    a: 'For a fresher role, I am primarily focused on the learning opportunity and growth. I am open to a package that is fair and aligned with industry standards and the company\'s structure for this role. If pushed for a number, give a researched range for the role/location and add that you are flexible and open to discussion.',
  },
  {
    level: 'adv',
    q: 'Are you willing to relocate / work in different technologies?',
    a: 'Yes, absolutely. I am flexible about location and open to learning new technologies — I already self-learned AWS and got certified, so picking up new stacks is something I enjoy. I care most about a good team and the chance to do meaningful work and keep growing.',
  },
]
