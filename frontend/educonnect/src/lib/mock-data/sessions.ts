export interface Session {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  dateTime: string;
  duration: 60 | 90;
  status: 'upcoming' | 'completed' | 'cancelled';
  format: 'online' | 'in-person';
  price: number;
  joinLink?: string;
  rating?: number;
  review?: string;
}

export const sessions: Session[] = [
  {
    id: 's-1',
    tutorName: 'Ahmed Khan',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed%20Khan',
    subject: 'MDCAT Biology',
    dateTime: 'Today, 6:00 PM',
    duration: 90,
    status: 'upcoming',
    format: 'online',
    price: 2250,
    joinLink: '/session/s-1/active',
  },
  {
    id: 's-2',
    tutorName: 'Sara Ali',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara%20Ali',
    subject: 'O-Level Math',
    dateTime: 'Tomorrow, 4:00 PM',
    duration: 60,
    status: 'upcoming',
    format: 'online',
    price: 1200,
    joinLink: '/session/s-2/active',
  },
  {
    id: 's-3',
    tutorName: 'Ali Raza',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali%20Raza',
    subject: 'MDCAT Physics',
    dateTime: 'Friday, 5:00 PM',
    duration: 60,
    status: 'upcoming',
    format: 'in-person',
    price: 1200,
  },
  {
    id: 's-4',
    tutorName: 'Ayesha Siddiqui',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha%20Siddiqui',
    subject: 'MDCAT Chemistry',
    dateTime: 'Mon, Oct 12, 11:00 AM',
    duration: 60,
    status: 'completed',
    format: 'online',
    price: 1300,
    rating: 5,
    review: 'Excellent explanation of organic chemistry concepts!',
  },
  {
    id: 's-5',
    tutorName: 'Muhammad Hassan',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad%20Hassan',
    subject: 'ECAT Math',
    dateTime: 'Sun, Oct 11, 2:00 PM',
    duration: 90,
    status: 'completed',
    format: 'in-person',
    price: 3000,
    rating: 4,
    review: 'Very rigorous problem solving session.',
  },
  {
    id: 's-6',
    tutorName: 'Fatima Malik',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima%20Malik',
    subject: 'A-Level Biology',
    dateTime: 'Sat, Oct 10, 10:00 AM',
    duration: 60,
    status: 'completed',
    format: 'online',
    price: 1800,
  }, // Completed, no review yet
  {
    id: 's-7',
    tutorName: 'Zainab Sheikh',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab%20Sheikh',
    subject: 'A-Level Economics',
    dateTime: 'Fri, Oct 9, 3:00 PM',
    duration: 60,
    status: 'cancelled',
    format: 'online',
    price: 1600,
  },
  {
    id: 's-8',
    tutorName: 'Ahmed Khan',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed%20Khan',
    subject: 'MDCAT Biology',
    dateTime: 'Wed, Oct 7, 6:00 PM',
    duration: 90,
    status: 'completed',
    format: 'online',
    price: 2250,
    rating: 5,
    review: 'Ahmed is the best MDCAT tutor. I feel so much more confident.',
  },
  {
    id: 's-9',
    tutorName: 'Mariam Tahir',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariam%20Tahir',
    subject: 'MDCAT Biology',
    dateTime: 'Tue, Oct 6, 5:00 PM',
    duration: 60,
    status: 'completed',
    format: 'in-person',
    price: 1100,
    rating: 4,
  },
  {
    id: 's-10',
    tutorName: 'Usman Raza',
    tutorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Usman%20Raza',
    subject: 'Computer Science',
    dateTime: 'Mon, Oct 5, 8:00 PM',
    duration: 60,
    status: 'cancelled',
    format: 'online',
    price: 1000,
  },
];
