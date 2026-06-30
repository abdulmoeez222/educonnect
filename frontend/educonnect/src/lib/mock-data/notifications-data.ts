export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n-1', type: 'booking', title: 'Session confirmed', body: 'Your Biology session with Dr. Ayesha Tariq is confirmed for tomorrow at 3:00 PM.', time: '1 hour ago', read: false, link: '/sessions' },
  { id: 'n-2', type: 'payment', title: 'Payment received', body: 'Your payment of PKR 2,500 for session BK-20250621-002 was successful.', time: '3 hours ago', read: false, link: '/subscription' },
  { id: 'n-4', type: 'system', title: 'Readiness score updated', body: 'Your weekly readiness score has been updated. You\'re now at 68% — up 5% from last week!', time: 'Yesterday', read: true, link: '/readiness' },
  { id: 'n-5', type: 'booking', title: 'Session reminder', body: 'You have a Chemistry session with Usman Raza in 1 hour.', time: 'Yesterday', read: true, link: '/sessions' },
  { id: 'n-6', type: 'payment', title: 'Subscription renewed', body: 'Your Student Pro plan has been renewed for PKR 999. Next billing date: Jul 22, 2025.', time: '3 days ago', read: true, link: '/subscription' },
  { id: 'n-7', type: 'booking', title: 'Booking request received', body: 'Hamza Khan has requested a session with you on June 25 at 4:00 PM.', time: '4 days ago', read: true, link: '/tutor/bookings' },
  { id: 'n-8', type: 'system', title: 'Profile verification approved', body: 'Your tutor profile has been verified. Your Verified Topper badge is now active.', time: '1 week ago', read: true },
];
