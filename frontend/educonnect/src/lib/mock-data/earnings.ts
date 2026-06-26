export interface EarningSession {
  id: string;
  date: string;
  studentName: string;
  subject: string;
  duration: number;  // minutes
  amount: number;    // PKR
  status: 'paid' | 'pending';
}

export interface EarningsSummary {
  totalEarned: number;
  pendingPayout: number;
  thisMonth: number;
  totalSessions: number;
}

export const earningsSummary: EarningsSummary = {
  totalEarned: 213000,
  pendingPayout: 18500,
  thisMonth: 51000,
  totalSessions: 127
};

export const monthlyEarnings = [
  { month: 'Jan', amount: 22000 },
  { month: 'Feb', amount: 31500 },
  { month: 'Mar', amount: 28000 },
  { month: 'Apr', amount: 42000 },
  { month: 'May', amount: 38500 },
  { month: 'Jun', amount: 51000 },
];

export const subjectDemand = [
  { subject: 'MDCAT Biology', Mon: 12, Tue: 8, Wed: 15, Thu: 10, Fri: 18, Sat: 22, Sun: 5 },
  { subject: 'MDCAT Chemistry', Mon: 9, Tue: 14, Wed: 11, Thu: 16, Fri: 12, Sat: 19, Sun: 4 },
  { subject: 'O-Level Math', Mon: 6, Tue: 7, Wed: 9, Thu: 8, Fri: 10, Sat: 15, Sun: 3 },
  { subject: 'A-Level Physics', Mon: 4, Tue: 5, Wed: 6, Thu: 5, Fri: 8, Sat: 11, Sun: 2 },
  { subject: 'ECAT Math', Mon: 7, Tue: 9, Wed: 8, Thu: 11, Fri: 9, Sat: 14, Sun: 3 },
];

export const studentProgress = [
  { name: 'Hamid Ali', subject: 'MDCAT Biology', attendance: 92, homeworkCompletion: 88, readinessTrend: 'up' },
  { name: 'Sana Ijaz', subject: 'MDCAT Chemistry', attendance: 78, homeworkCompletion: 72, readinessTrend: 'up' },
  { name: 'Tariq Mehmood', subject: 'O-Level Math', attendance: 95, homeworkCompletion: 91, readinessTrend: 'stable' },
  { name: 'Hira Baig', subject: 'A-Level Physics', attendance: 65, homeworkCompletion: 60, readinessTrend: 'down' },
  { name: 'Kamran Sheikh', subject: 'ECAT Math', attendance: 88, homeworkCompletion: 84, readinessTrend: 'up' },
  { name: 'Zara Iqbal', subject: 'MDCAT Biology', attendance: 100, homeworkCompletion: 95, readinessTrend: 'up' },
];

export const sessionHistory: EarningSession[] = [
  { id: "eh-1", date: "Jun 20, 2025", studentName: "Hamid Ali", subject: "MDCAT Biology", duration: 60, amount: 1500, status: "pending" },
  { id: "eh-2", date: "Jun 19, 2025", studentName: "Sana Ijaz", subject: "MDCAT Chemistry", duration: 90, amount: 2000, status: "pending" },
  { id: "eh-3", date: "Jun 18, 2025", studentName: "Tariq Mehmood", subject: "O-Level Math", duration: 60, amount: 1200, status: "pending" },
  { id: "eh-4", date: "Jun 15, 2025", studentName: "Hira Baig", subject: "A-Level Physics", duration: 60, amount: 1800, status: "paid" },
  { id: "eh-5", date: "Jun 14, 2025", studentName: "Kamran Sheikh", subject: "ECAT Math", duration: 60, amount: 1400, status: "paid" },
  { id: "eh-6", date: "Jun 12, 2025", studentName: "Zara Iqbal", subject: "MDCAT Biology", duration: 90, amount: 2200, status: "paid" },
  { id: "eh-7", date: "Jun 10, 2025", studentName: "Faisal Nawaz", subject: "O-Level Math", duration: 60, amount: 1200, status: "paid" },
  { id: "eh-8", date: "Jun 08, 2025", studentName: "Maira Yousuf", subject: "A-Level Physics", duration: 60, amount: 1800, status: "paid" },
  { id: "eh-9", date: "Jun 05, 2025", studentName: "Hamid Ali", subject: "MDCAT Biology", duration: 60, amount: 1500, status: "paid" },
  { id: "eh-10", date: "Jun 02, 2025", studentName: "Sana Ijaz", subject: "MDCAT Chemistry", duration: 90, amount: 2000, status: "paid" },
  { id: "eh-11", date: "May 28, 2025", studentName: "Tariq Mehmood", subject: "O-Level Math", duration: 60, amount: 1200, status: "paid" },
  { id: "eh-12", date: "May 25, 2025", studentName: "Hira Baig", subject: "A-Level Physics", duration: 60, amount: 1800, status: "paid" },
  { id: "eh-13", date: "May 20, 2025", studentName: "Kamran Sheikh", subject: "ECAT Math", duration: 60, amount: 1400, status: "paid" },
  { id: "eh-14", date: "May 15, 2025", studentName: "Zara Iqbal", subject: "MDCAT Biology", duration: 90, amount: 2200, status: "paid" },
  { id: "eh-15", date: "May 10, 2025", studentName: "Faisal Nawaz", subject: "O-Level Math", duration: 60, amount: 1200, status: "paid" },
];