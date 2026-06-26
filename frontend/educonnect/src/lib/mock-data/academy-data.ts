export interface AcademyTutor {
  id: string;
  name: string;
  subject: string;
  students: number;
  sessionsThisMonth: number;
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar: string;
}

export interface AcademyStudent {
  id: string;
  name: string;
  grade: string;
  tutor: string;
  sessionsAttended: number;
  lastSession: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface AcademyActivity {
  id: string;
  type: 'session' | 'enrollment' | 'payment' | 'assignment';
  description: string;
  time: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  description: string;
}

export const ACADEMY_TUTORS: AcademyTutor[] = [
  { id: 'at-1', name: 'Dr. Ayesha Tariq', subject: 'Biology', students: 24, sessionsThisMonth: 42, status: 'active', joinedDate: 'Jan 15, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha' },
  { id: 'at-2', name: 'Usman Raza', subject: 'Chemistry', students: 18, sessionsThisMonth: 31, status: 'active', joinedDate: 'Feb 3, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Usman' },
  { id: 'at-3', name: 'Fatima Malik', subject: 'Physics', students: 21, sessionsThisMonth: 38, status: 'active', joinedDate: 'Jan 28, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima' },
  { id: 'at-4', name: 'Bilal Ahmed', subject: 'Mathematics', students: 15, sessionsThisMonth: 27, status: 'active', joinedDate: 'Mar 10, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal' },
  { id: 'at-5', name: 'Sara Khan', subject: 'English', students: 12, sessionsThisMonth: 19, status: 'inactive', joinedDate: 'Apr 1, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
  { id: 'at-6', name: 'Omar Farooq', subject: 'Logical Reasoning', students: 9, sessionsThisMonth: 14, status: 'active', joinedDate: 'Mar 22, 2025', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },
];

export const ACADEMY_STUDENTS: AcademyStudent[] = [
  { id: 'as-1', name: 'Hania Arif', grade: 'FSc Year 2', tutor: 'Dr. Ayesha Tariq', sessionsAttended: 18, lastSession: 'Jun 20, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hania' },
  { id: 'as-2', name: 'Zain Ul Abidin', grade: 'FSc Year 1', tutor: 'Usman Raza', sessionsAttended: 12, lastSession: 'Jun 19, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zain' },
  { id: 'as-3', name: 'Maryam Siddiqui', grade: 'Matric Year 2', tutor: 'Fatima Malik', sessionsAttended: 24, lastSession: 'Jun 21, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam' },
  { id: 'as-4', name: 'Talha Butt', grade: 'FSc Year 2', tutor: 'Bilal Ahmed', sessionsAttended: 9, lastSession: 'Jun 18, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Talha' },
  { id: 'as-5', name: 'Nimra Sheikh', grade: 'FSc Year 1', tutor: 'Dr. Ayesha Tariq', sessionsAttended: 15, lastSession: 'Jun 17, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nimra' },
  { id: 'as-6', name: 'Asad Javed', grade: 'Matric Year 1', tutor: 'Sara Khan', sessionsAttended: 4, lastSession: 'Jun 10, 2025', status: 'inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asad' },
  { id: 'as-7', name: 'Rabia Noor', grade: 'FSc Year 2', tutor: 'Omar Farooq', sessionsAttended: 20, lastSession: 'Jun 21, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rabia' },
  { id: 'as-8', name: 'Daniyal Hassan', grade: 'FSc Year 1', tutor: 'Usman Raza', sessionsAttended: 8, lastSession: 'Jun 15, 2025', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniyal' },
];

export const ACADEMY_ACTIVITY: AcademyActivity[] = [
  { id: 'ac-1', type: 'session', description: 'Dr. Ayesha Tariq completed session with Hania Arif — Biology: Genetics', time: '2 hours ago' },
  { id: 'ac-2', type: 'enrollment', description: 'Daniyal Hassan enrolled in Chemistry with Usman Raza', time: '4 hours ago' },
  { id: 'ac-3', type: 'payment', description: 'Monthly invoice PKR 85,000 received from Lahore Medical Academy', time: 'Yesterday' },
  { id: 'ac-4', type: 'session', description: 'Fatima Malik completed session with Maryam Siddiqui — Physics: Mechanics', time: 'Yesterday' },
  { id: 'ac-5', type: 'assignment', description: 'Bilal Ahmed assigned homework to 3 students — Mathematics Chapter 7', time: '2 days ago' },
  { id: 'ac-6', type: 'enrollment', description: 'Rabia Noor enrolled in Logical Reasoning with Omar Farooq', time: '3 days ago' },
];

export const SCHEDULE_TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export const SCHEDULE_DAYS = ['Mon Jun 23', 'Tue Jun 24', 'Wed Jun 25', 'Thu Jun 26', 'Fri Jun 27'];

export const MOCK_SCHEDULE: Record<string, Record<string, string>> = {
  'at-1': { 'Mon Jun 23-9:00 AM': 'Hania Arif', 'Mon Jun 23-11:00 AM': 'Nimra Sheikh', 'Wed Jun 25-2:00 PM': 'Hania Arif', 'Thu Jun 26-10:00 AM': 'Nimra Sheikh' },
  'at-2': { 'Mon Jun 23-10:00 AM': 'Zain Ul Abidin', 'Tue Jun 24-3:00 PM': 'Daniyal Hassan', 'Fri Jun 27-9:00 AM': 'Zain Ul Abidin' },
  'at-3': { 'Tue Jun 24-9:00 AM': 'Maryam Siddiqui', 'Thu Jun 26-11:00 AM': 'Maryam Siddiqui', 'Fri Jun 27-2:00 PM': 'Talha Butt' },
  'at-4': { 'Mon Jun 23-2:00 PM': 'Talha Butt', 'Wed Jun 25-10:00 AM': 'Talha Butt' },
};

export const ACADEMY_INVOICES: Invoice[] = [
  { id: 'inv-1', date: 'Jun 1, 2025', amount: 85000, status: 'paid', description: 'Monthly subscription — 6 tutors, 24 students' },
  { id: 'inv-2', date: 'May 1, 2025', amount: 85000, status: 'paid', description: 'Monthly subscription — 6 tutors, 22 students' },
  { id: 'inv-3', date: 'Apr 1, 2025', amount: 72000, status: 'paid', description: 'Monthly subscription — 5 tutors, 18 students' },
  { id: 'inv-4', date: 'Mar 1, 2025', amount: 60000, status: 'paid', description: 'Monthly subscription — 4 tutors, 15 students' },
  { id: 'inv-5', date: 'Jul 1, 2025', amount: 85000, status: 'pending', description: 'Monthly subscription — 6 tutors, 26 students (upcoming)' },
];
