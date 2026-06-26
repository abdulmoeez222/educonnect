export interface CreatorResource {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'video' | 'notes' | 'practice-test';
  price: number;
  isFree: boolean;
  downloads: number;
  revenue: number;  // PKR total earned
  rating: number;
  reviewCount: number;
  publishedDate: string;
  status: 'published' | 'draft';
}

export const creatorResources: CreatorResource[] = [
  {
    id: 'cr-1',
    title: 'Advanced Mathematics Formula Sheet',
    subject: 'Mathematics',
    type: 'pdf',
    price: 0,
    isFree: true,
    downloads: 5400,
    revenue: 0,
    rating: 4.8,
    reviewCount: 120,
    publishedDate: '2024-01-15',
    status: 'published',
  },
  {
    id: 'cr-2',
    title: 'Physics Mechanics Full Course',
    subject: 'Physics',
    type: 'video',
    price: 2500,
    isFree: false,
    downloads: 340,
    revenue: 595000, // 340 * 2500 * 0.7
    rating: 4.9,
    reviewCount: 85,
    publishedDate: '2024-02-10',
    status: 'published',
  },
  {
    id: 'cr-3',
    title: 'Chemistry Organic Reactions Guide',
    subject: 'Chemistry',
    type: 'notes',
    price: 1000,
    isFree: false,
    downloads: 850,
    revenue: 595000, // 850 * 1000 * 0.7
    rating: 4.7,
    reviewCount: 210,
    publishedDate: '2024-03-05',
    status: 'published',
  },
  {
    id: 'cr-4',
    title: 'Biology MCQs Bank',
    subject: 'Biology',
    type: 'practice-test',
    price: 500,
    isFree: false,
    downloads: 1200,
    revenue: 420000, // 1200 * 500 * 0.7
    rating: 4.6,
    reviewCount: 150,
    publishedDate: '2024-04-20',
    status: 'published',
  },
  {
    id: 'cr-5',
    title: 'English Grammar Masterclass',
    subject: 'English',
    type: 'video',
    price: 1500,
    isFree: false,
    downloads: 0,
    revenue: 0,
    rating: 0,
    reviewCount: 0,
    publishedDate: '2024-05-10',
    status: 'draft',
  },
  {
    id: 'cr-6',
    title: 'Urdu Essay Writing Templates',
    subject: 'Urdu',
    type: 'pdf',
    price: 300,
    isFree: false,
    downloads: 0,
    revenue: 0,
    rating: 0,
    reviewCount: 0,
    publishedDate: '2024-05-15',
    status: 'draft',
  },
];

export const creatorSummary = {
  totalDownloads: 7790,
  totalRevenue: 1610000,
  averageRating: 4.75,
  totalResources: 6,
};
