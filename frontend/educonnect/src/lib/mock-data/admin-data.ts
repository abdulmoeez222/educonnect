export interface VerificationRequest {
  id: string;
  name: string;
  role: 'tutor' | 'consultant';
  subject?: string;
  expertise?: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  cnic: string;
  degree: string;
  institution: string;
  experience: string;
  mdcatScore?: number;
  eeatScore?: number;
  documents: string[];
}

export interface Dispute {
  id: string;
  bookingId: string;
  student: string;
  tutor: string;
  amount: number;
  issueType: 'no-show' | 'quality' | 'refund' | 'technical';
  issueSummary: string;
  status: 'open' | 'resolved' | 'escalated';
  openedDate: string;
  messages: { sender: string; role: 'student' | 'tutor' | 'admin'; text: string; time: string }[];
}

export const VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'vr-1',
    name: 'Muhammad Kamran',
    role: 'tutor',
    subject: 'Biology',
    submittedDate: 'Jun 20, 2025',
    status: 'pending',
    cnic: '35202-1234567-1',
    degree: 'MBBS',
    institution: 'King Edward Medical University, Lahore',
    experience: '4 years tutoring FSc and MDCAT students',
    mdcatScore: 182,
    documents: ['CNIC Front', 'CNIC Back', 'Degree Certificate', 'MDCAT Result Card'],
  },
  {
    id: 'vr-2',
    name: 'Sana Mirza',
    role: 'tutor',
    subject: 'Chemistry',
    submittedDate: 'Jun 19, 2025',
    status: 'pending',
    cnic: '35201-9876543-2',
    degree: 'BSc Chemistry (Hons)',
    institution: 'University of the Punjab, Lahore',
    experience: '2 years as academy instructor, 3 years private tutoring',
    documents: ['CNIC Front', 'CNIC Back', 'Degree Certificate', 'Experience Letter'],
  },
  {
    id: 'vr-3',
    name: 'Faisal Iqbal',
    role: 'consultant',
    expertise: 'CSS Preparation & Career Guidance',
    submittedDate: 'Jun 18, 2025',
    status: 'pending',
    cnic: '35202-5555555-3',
    degree: 'MA Political Science',
    institution: 'Quaid-i-Azam University, Islamabad',
    experience: 'CSS 2019 (Score: 690). 5 years consulting for CSS aspirants.',
    documents: ['CNIC Front', 'CNIC Back', 'CSS Result', 'Allocation Letter'],
  },
  {
    id: 'vr-4',
    name: 'Amna Baig',
    role: 'tutor',
    subject: 'Physics',
    submittedDate: 'Jun 15, 2025',
    status: 'approved',
    cnic: '35202-7777777-4',
    degree: 'BS Physics',
    institution: 'LUMS, Lahore',
    experience: '3 years tutoring A-levels and FSc Physics',
    documents: ['CNIC Front', 'CNIC Back', 'Degree Certificate', 'Transcript'],
  },
];

export const DISPUTES: Dispute[] = [
  {
    id: 'ds-1',
    bookingId: 'BK-20250618-001',
    student: 'Hamza Khan',
    tutor: 'Ali Hassan',
    amount: 2500,
    issueType: 'no-show',
    issueSummary: 'Tutor did not join the session. Student waited 30 minutes with no response.',
    status: 'open',
    openedDate: 'Jun 19, 2025',
    messages: [
      { sender: 'Hamza Khan', role: 'student', text: 'I waited for 30 minutes and the tutor never joined the session. I want a full refund.', time: 'Jun 19, 10:05 AM' },
      { sender: 'Ali Hassan', role: 'tutor', text: 'I had a medical emergency. I tried to contact the student but my messages were delayed. I apologise and am happy to reschedule at no charge.', time: 'Jun 19, 2:30 PM' },
      { sender: 'Hamza Khan', role: 'student', text: 'I appreciate the apology but I would still prefer a refund. I found another tutor for that slot.', time: 'Jun 19, 3:00 PM' },
    ],
  },
  {
    id: 'ds-2',
    bookingId: 'BK-20250614-007',
    student: 'Sara Memon',
    tutor: 'Dr. Tariq Hussain',
    amount: 3500,
    issueType: 'quality',
    issueSummary: 'Student reports session content did not match advertised expertise area.',
    status: 'open',
    openedDate: 'Jun 15, 2025',
    messages: [
      { sender: 'Sara Memon', role: 'student', text: 'The tutor advertised MDCAT-specific preparation but spent the entire session on general biology theory that I already knew.', time: 'Jun 15, 4:15 PM' },
      { sender: 'Dr. Tariq Hussain', role: 'tutor', text: 'I assessed Sara\'s level and felt we needed to cover foundational material first. This is standard pedagogical practice.', time: 'Jun 15, 6:00 PM' },
    ],
  },
  {
    id: 'ds-3',
    bookingId: 'BK-20250601-004',
    student: 'Omar Qureshi',
    tutor: 'Nadia Siddiqui',
    amount: 2000,
    issueType: 'technical',
    issueSummary: 'Platform video call dropped repeatedly. Both parties unable to complete session.',
    status: 'resolved',
    openedDate: 'Jun 2, 2025',
    messages: [
      { sender: 'Omar Qureshi', role: 'student', text: 'The video call dropped 4 times. We barely covered 20 minutes of content. Requesting partial refund.', time: 'Jun 2, 11:00 AM' },
      { sender: 'EduConnect Admin', role: 'admin', text: 'We reviewed the session logs and confirmed platform instability during this time window. A 50% refund (PKR 1,000) has been issued to both parties.', time: 'Jun 3, 10:00 AM' },
    ],
  },
];
