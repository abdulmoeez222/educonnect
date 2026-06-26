export interface IntakeQuestion {
  id: string;
  type: 'short-text' | 'long-text' | 'multiple-choice';
  question: string;
  options?: string[];
  required: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Consultant {
  id: string;
  name: string;
  avatarUrl: string;
  expertise: string[];
  rating: number;
  reviews: number;
  packages: {
    single: number;
    threePack: number;
    retainer: number;
  };
  isVerified: boolean;
  bio: string;
  background?: string;
  yearsExperience: number;
  category?: string;
  categories?: string[];
  industries?: string[];
  sessionFormats?: ('video' | 'async-qa' | 'document-review')[];
  portfolioLink?: string;
  intakeQuestions?: IntakeQuestion[];
  testimonials?: Testimonial[];
}

export const consultants: Consultant[] = [
  {
    id: 'c-1',
    name: 'Dr. Tariq Mahmood',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tariq%20Mahmood',
    expertise: ['MDCAT Strategy', 'Career Counseling', 'University Admissions'],
    rating: 4.9,
    reviews: 120,
    packages: { single: 2500, threePack: 7000, retainer: 18000 },
    isVerified: true,
    bio: 'Guiding pre-medical students on their journey to top medical colleges in Pakistan. Strategic planning and motivation.',
    background: 'With over 12 years of experience in medical education consulting, I have helped more than 500 students secure seats in MBBS programs across Pakistan. My approach combines personalised study plans, psychological preparation, and mock interview coaching.\n\nI hold a PhD in Educational Psychology and have worked with top academies including Kips and Lectura. I understand the MDCAT system inside-out and provide strategies that actually work under exam pressure.',
    yearsExperience: 12,
    category: 'Study Strategy',
    categories: ['Study Strategy', 'Career Guidance'],
    industries: ['Education', 'Healthcare'],
    sessionFormats: ['video', 'async-qa'],
    portfolioLink: 'linkedin.com/in/dr-tariq-mahmood',
    intakeQuestions: [
      { id: 'iq-1-1', type: 'long-text', question: 'What specific MDCAT challenge are you facing — conceptual gaps, time management, or test anxiety?', required: true },
      { id: 'iq-1-2', type: 'multiple-choice', question: 'How many months away is your MDCAT exam?', options: ['Less than 1 month', '1–3 months', '3–6 months', 'More than 6 months'], required: true },
      { id: 'iq-1-3', type: 'short-text', question: 'What is your current mock test score range?', required: false },
    ],
    testimonials: [
      { id: 't-1-1', clientName: 'Hania Arif', rating: 5, date: 'May 2025', comment: 'Dr. Tariq completely changed my approach to studying. I went from 140 to 175 in mock tests after just 3 sessions.' },
      { id: 't-1-2', clientName: 'Bilal Chaudhry', rating: 5, date: 'Apr 2025', comment: 'Incredibly detailed feedback on my weak areas. Got into King Edward Medical University!' },
      { id: 't-1-3', clientName: 'Sara Memon', rating: 4, date: 'Mar 2025', comment: 'Very knowledgeable. Would have liked more availability on weekends but the sessions were excellent.' },
    ],
  },
  {
    id: 'c-2',
    name: 'Zahra Farooq',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zahra%20Farooq',
    expertise: ['Study Abroad', 'IELTS Prep', 'University Admissions'],
    rating: 4.8,
    reviews: 95,
    packages: { single: 3000, threePack: 8000, retainer: 20000 },
    isVerified: true,
    bio: 'Helping Pakistani students secure scholarships in US, UK, and Australia. Comprehensive application reviews.',
    background: 'I am a former admissions counsellor at a UK university who returned to Pakistan to help local students navigate international university applications. I have personally reviewed over 300 SOP and personal statement drafts.\n\nMy expertise covers IELTS strategy, scholarship hunting, visa guidance, and building competitive profiles from scratch. Whether you are applying to Oxbridge or a US liberal arts college, I provide realistic, honest advice.',
    yearsExperience: 8,
    category: 'Career Guidance',
    categories: ['Career Guidance', 'Study Strategy'],
    industries: ['Education', 'International Affairs'],
    sessionFormats: ['video', 'document-review'],
    portfolioLink: 'linkedin.com/in/zahra-farooq-edu',
    intakeQuestions: [
      { id: 'iq-2-1', type: 'multiple-choice', question: 'Which countries are you targeting for study?', options: ['UK', 'USA', 'Australia', 'Canada', 'Europe', 'Multiple'], required: true },
      { id: 'iq-2-2', type: 'short-text', question: 'What is your current IELTS score or target score?', required: true },
      { id: 'iq-2-3', type: 'long-text', question: 'Describe your academic background and the programs you are interested in.', required: false },
    ],
    testimonials: [
      { id: 't-2-1', clientName: 'Aisha Nawaz', rating: 5, date: 'Jun 2025', comment: 'Got into 3 UK universities and a full scholarship at one of them. Zahra is simply incredible.' },
      { id: 't-2-2', clientName: 'Omar Qureshi', rating: 5, date: 'May 2025', comment: 'My SOP went from generic to genuinely compelling after her feedback. Highly recommend.' },
      { id: 't-2-3', clientName: 'Fatima Rehan', rating: 4, date: 'Apr 2025', comment: 'Very detailed document review. A bit expensive but worth every rupee.' },
    ],
  },
  {
    id: 'c-3',
    name: 'Ali Jinnah',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali%20Jinnah',
    expertise: ['CSS Preparation', 'Career Counseling'],
    rating: 5.0,
    reviews: 200,
    packages: { single: 3000, threePack: 8500, retainer: 22000 },
    isVerified: true,
    bio: 'CSP officer sharing insights on cracking the CSS exams. From essay writing to interview prep.',
    background: 'As a serving CSP officer, I know exactly what the FPSC looks for in CSS candidates. I have cleared the CSS examination myself and have since mentored over 150 aspirants — 40+ of whom have qualified.\n\nI cover every stage: optional subject selection, essay and précis technique, current affairs frameworks, and the all-important psychological assessment and viva preparation.',
    yearsExperience: 10,
    category: 'Career Guidance',
    categories: ['Career Guidance', 'Study Strategy'],
    industries: ['Government', 'Law', 'Education'],
    sessionFormats: ['video', 'async-qa'],
    intakeQuestions: [
      { id: 'iq-3-1', type: 'multiple-choice', question: 'Which CSS attempt is this for you?', options: ['First attempt', 'Second attempt', 'Third or more'], required: true },
      { id: 'iq-3-2', type: 'short-text', question: 'Which optional subjects are you planning to take?', required: true },
      { id: 'iq-3-3', type: 'long-text', question: 'What areas of CSS preparation are you most struggling with?', required: false },
    ],
    testimonials: [
      { id: 't-3-1', clientName: 'Hamza Malik', rating: 5, date: 'Jun 2025', comment: 'Ali Jinnah is the reason I am a CSS qualifier today. His insider knowledge is priceless.' },
      { id: 't-3-2', clientName: 'Nida Hussain', rating: 5, date: 'May 2025', comment: 'Exceptional essay feedback. My marks went from 45 to 63 in just two attempts.' },
      { id: 't-3-3', clientName: 'Kashif Rana', rating: 5, date: 'Apr 2025', comment: 'Best investment I made in my CSS journey. Clear, actionable advice every time.' },
    ],
  },
  {
    id: 'c-4',
    name: 'Sana Qureshi',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sana%20Qureshi',
    expertise: ['Freelancing', 'Digital Marketing', 'Startup Advice'],
    rating: 4.7,
    reviews: 150,
    packages: { single: 2000, threePack: 5500, retainer: 15000 },
    isVerified: true,
    bio: 'Learn how to start your freelance career on Upwork and Fiverr. Specialized guidance for IT and design students.',
    background: 'I went from a broke student to earning $5,000/month on Upwork within 18 months — entirely while studying for my CS degree. Today I help others replicate that journey with a clear, step-by-step roadmap.\n\nMy consultations cover profile optimisation, proposal writing, niche selection, client communication, and scaling your freelance income into a sustainable business. I specialise in IT, design, and digital marketing niches.',
    yearsExperience: 6,
    category: 'Agency & Freelancing',
    categories: ['Agency & Freelancing', 'Digital Marketing', 'Startup & Business'],
    industries: ['Technology', 'Marketing', 'E-commerce'],
    sessionFormats: ['video', 'async-qa'],
    portfolioLink: 'linkedin.com/in/sana-qureshi-freelance',
    intakeQuestions: [
      { id: 'iq-4-1', type: 'multiple-choice', question: 'What is your current freelancing status?', options: ['Complete beginner', 'Have an account but no sales', 'Some earnings but inconsistent', 'Looking to scale existing business'], required: true },
      { id: 'iq-4-2', type: 'short-text', question: 'What skill or service do you want to offer?', required: true },
      { id: 'iq-4-3', type: 'long-text', question: 'What is your monthly income target and timeline?', required: false },
    ],
    testimonials: [
      { id: 't-4-1', clientName: 'Zeeshan Ahmed', rating: 5, date: 'Jun 2025', comment: 'Got my first $500 client within 3 weeks of following Sana\'s profile advice. Mind-blowing results.' },
      { id: 't-4-2', clientName: 'Maira Ali', rating: 5, date: 'May 2025', comment: 'She knows the Upwork algorithm inside out. Worth every penny of the retainer.' },
      { id: 't-4-3', clientName: 'Usman Farhan', rating: 4, date: 'Apr 2025', comment: 'Very practical advice, no fluff. Helped me pick the right niche for my skillset.' },
    ],
  },
  {
    id: 'c-5',
    name: 'Hassan Abbas',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan%20Abbas',
    expertise: ['Career Counseling', 'University Admissions'],
    rating: 4.6,
    reviews: 45,
    packages: { single: 2000, threePack: 5000, retainer: 14000 },
    isVerified: false,
    bio: 'Not sure what to do after FSC? I help you explore diverse career paths beyond the traditional doctor/engineer route.',
    background: 'With a background in psychology and career coaching, I specialise in helping FSc and A-Level graduates who feel lost about their future. I provide structured career assessments, interest mapping, and realistic roadmaps for 20+ career paths in Pakistan.\n\nI believe there is no single right path — only the right path for you. My sessions are judgment-free and focused on helping you discover what genuinely excites you.',
    yearsExperience: 5,
    category: 'Career Guidance',
    categories: ['Career Guidance', 'Life & Mindset'],
    industries: ['Education', 'Human Resources'],
    sessionFormats: ['video'],
    intakeQuestions: [
      { id: 'iq-5-1', type: 'multiple-choice', question: 'What is your current academic level?', options: ['In FSc / A-Levels', 'Just finished FSc / A-Levels', 'In undergrad', 'Graduated'], required: true },
      { id: 'iq-5-2', type: 'long-text', question: 'What careers are you considering and what is holding you back from deciding?', required: true },
      { id: 'iq-5-3', type: 'short-text', question: 'What do you enjoy doing outside of academics?', required: false },
    ],
    testimonials: [
      { id: 't-5-1', clientName: 'Rimsha Baig', rating: 5, date: 'May 2025', comment: 'Hassan genuinely listened and helped me see options I never considered. Chose UX design and loving it.' },
      { id: 't-5-2', clientName: 'Shahzaib Mirza', rating: 4, date: 'Apr 2025', comment: 'Good session, very non-judgmental. Helped me structure my thinking about career options.' },
      { id: 't-5-3', clientName: 'Lyla Qazi', rating: 5, date: 'Mar 2025', comment: 'Best career advice I have ever received. Completely changed my perspective.' },
    ],
  },
  {
    id: 'c-6',
    name: 'Amina Baig',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina%20Baig',
    expertise: ['IELTS Prep', 'Study Abroad'],
    rating: 4.9,
    reviews: 110,
    packages: { single: 2500, threePack: 7000, retainer: 18000 },
    isVerified: true,
    bio: 'Former British Council examiner offering targeted IELTS coaching and study abroad planning.',
    background: 'As a former British Council examiner with 9 years of experience, I understand exactly how IELTS papers are marked. I provide band-specific feedback on Writing and Speaking that cuts straight to what holds students back.\n\nBeyond IELTS, I also help students plan their study abroad journey — from choosing the right country and institution to scholarship applications and visa interviews.',
    yearsExperience: 9,
    category: 'Study Strategy',
    categories: ['Study Strategy', 'Career Guidance'],
    industries: ['Education', 'International Affairs'],
    sessionFormats: ['video', 'document-review', 'async-qa'],
    portfolioLink: 'linkedin.com/in/amina-baig-ielts',
    intakeQuestions: [
      { id: 'iq-6-1', type: 'short-text', question: 'What is your current IELTS overall band score?', required: true },
      { id: 'iq-6-2', type: 'multiple-choice', question: 'Which IELTS skill needs the most work?', options: ['Listening', 'Reading', 'Writing', 'Speaking', 'All equally'], required: true },
      { id: 'iq-6-3', type: 'short-text', question: 'What band score do you need and for which institution?', required: false },
    ],
    testimonials: [
      { id: 't-6-1', clientName: 'Nadia Khan', rating: 5, date: 'Jun 2025', comment: 'Jumped from 6.0 to 7.5 overall after her writing feedback. Absolute legend.' },
      { id: 't-6-2', clientName: 'Asad Malik', rating: 5, date: 'May 2025', comment: 'Her examiner background means she knows exactly what to fix. No guesswork.' },
      { id: 't-6-3', clientName: 'Huma Shafiq', rating: 5, date: 'Apr 2025', comment: 'Got Band 8 in speaking after two sessions. Cannot recommend her enough.' },
    ],
  },
  {
    id: 'c-7',
    name: 'Kamran Ali',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran%20Ali',
    expertise: ['Digital Marketing', 'Freelancing'],
    rating: 4.5,
    reviews: 60,
    packages: { single: 2200, threePack: 6000, retainer: 16000 },
    isVerified: true,
    bio: 'Scale your agency or freelance profile. I help students become financially independent while studying.',
    background: 'I run a 7-figure digital marketing agency from Karachi that I started as a university student. My specialty is helping other young Pakistanis build profitable online businesses — specifically in Facebook ads, SEO, and social media management.\n\nI consult on everything from landing your first client to building and managing a small remote team. My goal is to help you earn in dollars while spending in rupees.',
    yearsExperience: 4,
    category: 'Digital Marketing',
    categories: ['Digital Marketing', 'Agency & Freelancing'],
    industries: ['Marketing', 'E-commerce', 'Technology'],
    sessionFormats: ['video', 'async-qa'],
    intakeQuestions: [
      { id: 'iq-7-1', type: 'multiple-choice', question: 'Which digital marketing area do you want to focus on?', options: ['Facebook / Meta Ads', 'Google Ads / SEO', 'Social Media Management', 'Email Marketing', 'Content Creation', 'Full Stack'], required: true },
      { id: 'iq-7-2', type: 'short-text', question: 'Do you have any current clients or ongoing projects?', required: false },
      { id: 'iq-7-3', type: 'long-text', question: 'Describe your business or freelance goal for the next 6 months.', required: true },
    ],
    testimonials: [
      { id: 't-7-1', clientName: 'Farhan Siddiqui', rating: 5, date: 'Jun 2025', comment: 'My Meta Ads ROAS went from 1.2 to 4.8 after implementing Kamran\'s strategy. Insane ROI.' },
      { id: 't-7-2', clientName: 'Aisha Tariq', rating: 4, date: 'Apr 2025', comment: 'Very practical and results-focused. No theoretical nonsense.' },
      { id: 't-7-3', clientName: 'Bilal Raza', rating: 5, date: 'Mar 2025', comment: 'Built my first agency of 3 people within 6 months using his blueprint.' },
    ],
  },
  {
    id: 'c-8',
    name: 'Mona Yaseen',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mona%20Yaseen',
    expertise: ['MDCAT Strategy', 'University Admissions'],
    rating: 4.8,
    reviews: 80,
    packages: { single: 2000, threePack: 5500, retainer: 15000 },
    isVerified: true,
    bio: 'Focused on stress management and study schedules for MDCAT aspirants.',
    background: 'I combine mindset coaching with academic strategy to help MDCAT students perform at their best under pressure. After clearing MDCAT myself and scoring in the top 5%, I now coach full-time.\n\nI specialise in building personalised study schedules, managing pre-exam anxiety, and helping students recover from mock test failures. My clients report significant improvements in both scores and mental wellbeing.',
    yearsExperience: 7,
    category: 'Life & Mindset',
    categories: ['Life & Mindset', 'Study Strategy'],
    industries: ['Education', 'Healthcare', 'Wellness'],
    sessionFormats: ['video'],
    intakeQuestions: [
      { id: 'iq-8-1', type: 'multiple-choice', question: 'How is your stress level affecting your studies?', options: ['Manageable', 'Occasionally overwhelming', 'Severely impacting performance', 'I feel burnt out'], required: true },
      { id: 'iq-8-2', type: 'long-text', question: 'Describe your current daily study routine and how it is working for you.', required: true },
      { id: 'iq-8-3', type: 'short-text', question: 'When is your MDCAT exam date?', required: false },
    ],
    testimonials: [
      { id: 't-8-1', clientName: 'Saba Zafar', rating: 5, date: 'Jun 2025', comment: 'Mona helped me overcome my exam anxiety. I was freezing on mocks — now I am consistent. Life changing.' },
      { id: 't-8-2', clientName: 'Talha Iqbal', rating: 5, date: 'May 2025', comment: 'Her study schedule design is meticulous. She accounts for everything — rest, revision, weak areas.' },
      { id: 't-8-3', clientName: 'Zara Anwar', rating: 4, date: 'Apr 2025', comment: 'Really caring and motivating. Great for students who are feeling lost.' },
    ],
  },
];
