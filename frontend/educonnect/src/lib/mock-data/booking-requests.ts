export interface BookingRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  requestedDate: string;  // e.g. "Mon, 23 Jun 2025"
  requestedTime: string;  // e.g. "4:00 PM – 5:00 PM"
  format: 'online' | 'in-person';
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  price: number;          // PKR amount tutor would earn
}

export const bookingRequests: BookingRequest[] = [
  {
    id: "br-1",
    studentName: "Hamid Ali",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamid%20Ali",
    subject: "MDCAT Biology",
    requestedDate: "Mon, 23 Jun 2025",
    requestedTime: "4:00 PM - 5:00 PM",
    format: "online",
    message: "Hi, I need help understanding Genetics specifically for MDCAT.",
    status: "pending",
    price: 1500
  },
  {
    id: "br-2",
    studentName: "Sana Ijaz",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sana%20Ijaz",
    subject: "O-Level Math",
    requestedDate: "Tue, 24 Jun 2025",
    requestedTime: "5:30 PM - 6:30 PM",
    format: "online",
    message: "I struggle with trigonometry and need someone to walk me through past papers.",
    status: "pending",
    price: 1200
  },
  {
    id: "br-3",
    studentName: "Tariq Mehmood",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tariq%20Mehmood",
    subject: "A-Level Physics",
    requestedDate: "Wed, 25 Jun 2025",
    requestedTime: "3:00 PM - 4:00 PM",
    format: "in-person",
    message: "Looking for an intensive session on Quantum Physics before my mocks.",
    status: "accepted",
    price: 2000
  },
  {
    id: "br-4",
    studentName: "Hira Baig",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hira%20Baig",
    subject: "MDCAT Chemistry",
    requestedDate: "Thu, 26 Jun 2025",
    requestedTime: "6:00 PM - 7:30 PM",
    format: "online",
    message: "Organic chemistry is really tough for me, could we do a 90 min session?",
    status: "pending",
    price: 1800
  },
  {
    id: "br-5",
    studentName: "Kamran Sheikh",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kamran%20Sheikh",
    subject: "ECAT Math",
    requestedDate: "Fri, 27 Jun 2025",
    requestedTime: "7:00 PM - 8:00 PM",
    format: "online",
    message: "I need to revise integration shortcuts.",
    status: "declined",
    price: 1400
  },
  {
    id: "br-6",
    studentName: "Zara Iqbal",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zara%20Iqbal",
    subject: "MDCAT Biology",
    requestedDate: "Sat, 28 Jun 2025",
    requestedTime: "2:00 PM - 3:00 PM",
    format: "in-person",
    message: "Would love to go over human physiology diagrams.",
    status: "accepted",
    price: 1600
  },
  {
    id: "br-7",
    studentName: "Faisal Nawaz",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal%20Nawaz",
    subject: "O-Level Math",
    requestedDate: "Sun, 29 Jun 2025",
    requestedTime: "11:00 AM - 12:00 PM",
    format: "online",
    message: "Just need a quick revision on statistics.",
    status: "pending",
    price: 1200
  },
  {
    id: "br-8",
    studentName: "Maira Yousuf",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maira%20Yousuf",
    subject: "A-Level Physics",
    requestedDate: "Mon, 30 Jun 2025",
    requestedTime: "5:00 PM - 6:00 PM",
    format: "online",
    message: "Need help with electromagnetism concepts.",
    status: "declined",
    price: 1500
  }
];
