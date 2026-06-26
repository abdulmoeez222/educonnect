export interface ConsultantSession {
  id: string;
  date: string;
  clientName: string;
  sessionType: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: 'paid' | 'pending';
}

export const consultantSessions: ConsultantSession[] = [
  { id: 'cs-1', date: 'Jun 20, 2025', clientName: 'Hania Arif', sessionType: 'Single Session', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'paid' },
  { id: 'cs-2', date: 'Jun 18, 2025', clientName: 'Bilal Chaudhry', sessionType: '3-Pack Session 1/3', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'paid' },
  { id: 'cs-3', date: 'Jun 15, 2025', clientName: 'Sara Memon', sessionType: 'Monthly Retainer', grossAmount: 5000, commission: 600, netAmount: 4400, status: 'paid' },
  { id: 'cs-4', date: 'Jun 12, 2025', clientName: 'Omar Qureshi', sessionType: 'Single Session', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'paid' },
  { id: 'cs-5', date: 'Jun 10, 2025', clientName: 'Fatima Rehan', sessionType: '3-Pack Session 2/3', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'paid' },
  { id: 'cs-6', date: 'Jun 8, 2025', clientName: 'Aisha Nawaz', sessionType: 'Single Session', grossAmount: 3000, commission: 360, netAmount: 2640, status: 'paid' },
  { id: 'cs-7', date: 'Jun 5, 2025', clientName: 'Hamza Malik', sessionType: '3-Pack Session 3/3', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'pending' },
  { id: 'cs-8', date: 'Jun 3, 2025', clientName: 'Nida Hussain', sessionType: 'Monthly Retainer', grossAmount: 5000, commission: 600, netAmount: 4400, status: 'pending' },
  { id: 'cs-9', date: 'May 28, 2025', clientName: 'Kashif Rana', sessionType: 'Single Session', grossAmount: 2500, commission: 300, netAmount: 2200, status: 'paid' },
  { id: 'cs-10', date: 'May 22, 2025', clientName: 'Rimsha Baig', sessionType: 'Single Session', grossAmount: 2000, commission: 240, netAmount: 1760, status: 'paid' },
  { id: 'cs-11', date: 'May 18, 2025', clientName: 'Shahzaib Mirza', sessionType: '3-Pack Session 1/3', grossAmount: 2000, commission: 240, netAmount: 1760, status: 'paid' },
  { id: 'cs-12', date: 'May 14, 2025', clientName: 'Lyla Qazi', sessionType: 'Monthly Retainer', grossAmount: 5000, commission: 600, netAmount: 4400, status: 'pending' },
];

export const consultantEarningsSummary = {
  totalEarned: 178500,
  pendingPayout: 22000,
  thisMonth: 45000,
  totalSessions: 48,
};
