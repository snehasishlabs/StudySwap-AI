export type UserRole = 'buyer' | 'seller' | 'admin';

export type ListingCategory = 'Books' | 'Handwritten Notes' | 'Study Accessories';

export type ExamCategory = 
  | 'UPSC' 
  | 'SSC' 
  | 'Banking' 
  | 'Railways' 
  | 'JEE' 
  | 'NEET' 
  | 'GATE' 
  | 'CAT' 
  | 'WBPSC';

export type ItemCondition = 
  | 'New' 
  | 'Used - Like New' 
  | 'Used - Good' 
  | 'Used - Fair' 
  | 'Used - Acceptable'
  | 'Like New' 
  | 'Excellent'
  | 'Good' 
  | 'Fair' 
  | 'Acceptable'
  | 'Heavily Annotated';

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: 'seller' | 'buyer' | 'community';
  dateEarned: string;
}

export type Badge = UserBadge;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  location: string;
  collegeOrCity: string;
  targetExam?: string;
  rating?: number;
  reviewCount?: number;
  isVerifiedStudent: boolean;
  trustScore: number;
  memberSince: string;
  joinedDate?: string;
  phone?: string;
  bio?: string;
  booksSold?: number;
  totalEarnings?: number;
  badges?: UserBadge[];
}

export interface NoteAiAnalysis {
  overallScore: number; // e.g. 92
  metrics: {
    readability: number;
    completeness: number;
    organization: number;
    topicCoverage: number;
    visualClarity: number;
  };
  summary: string;
  strengths: string[];
  recommendations: string[];
  estimatedStudyHoursSaved?: number;
  badgeEarned?: string;
}

export type SellerReputationBadge = 'New Seller' | 'Trusted Seller' | 'Top Seller' | 'Verified Seller';
export type BuyerReputationBadge = 'Active Learner' | 'Top Buyer' | 'Community Contributor';

export interface StudyBundleItem {
  title: string;
  category: 'Book' | 'Handwritten Notes' | 'Mock Tests' | 'PYQ' | 'Accessory';
  originalPrice: number;
  condition: string;
  description?: string;
}

export interface StudyBundle {
  id: string;
  title: string;
  subtitle: string;
  exam: ExamCategory;
  category: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerBadge: SellerReputationBadge;
  items: StudyBundleItem[];
  totalOriginalPrice: number;
  bundlePrice: number;
  savingsPercent: number;
  image: string;
  popularBadge?: string;
  description: string;
}

export interface SmartPricingResult {
  suggestedPrice: number;
  priceRange: { min: number; max: number };
  demandLevel: 'High' | 'Medium' | 'Low';
  competitivenessScore: number; // 0-100
  marketInsight: string;
  historicalAverage: number;
  confidenceScore: number;
}

export interface DiscoveryRecommendation {
  listingId: string;
  listingTitle: string;
  price: number;
  originalPrice: number;
  category: ListingCategory;
  exam: ExamCategory;
  matchScore: number; // e.g. 96
  whyRecommended: string;
  studyTip: string;
  sellerName: string;
  sellerRating: number;
  sellerBadge: string;
  image: string;
}

export interface SpamAlertItem {
  id: string;
  listingId: string;
  listingTitle: string;
  sellerName: string;
  flagReason: string;
  riskScore: number; // 0-100
  reportedAt: string;
  status: 'flagged' | 'approved' | 'removed';
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: ListingCategory;
  exam: ExamCategory;
  subject: string;
  price: number;
  originalPrice: number;
  condition: ItemCondition;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  sellerTrustScore: number;
  isVerifiedSeller: boolean;
  pickupLocation: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  subCategory?: string;
  creator?: string;
  author?: string;
  publisher?: string;
  aiScore?: number | {
    overall: number;
    legibility?: number;
    completeness?: number;
    diagramAccuracy?: number;
    structure?: number;
  };
  aiAnalysis?: NoteAiAnalysis;
  isFeatured?: boolean;
  isTopSelling?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
  isRecentlyAdded?: boolean;
  wishlistCount?: number;
  pages?: number;
  readabilityScore?: number;
  completenessScore?: number;
  topicCoverageScore?: number;
  status: 'active' | 'sold' | 'reserved';
  views: number;
  inquiryCount: number;
  createdAt: string;
  editionOrYear?: string;
  deliveryOption: 'Campus Meetup' | 'Courier Delivery' | 'Both Available';
}

export interface MarketplaceSeller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  city: string;
  collegeOrCampus: string;
  isVerified: boolean;
  joinedYear?: string;
  bio?: string;
}

export interface MarketplaceStats {
  totalBooksListed: number;
  totalNotesListed: number;
  totalAccessoriesListed: number;
  totalSellers: number;
  moneySavedRupees: number;
  resourcesReused: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  content: string;
  text?: string; // alias for content
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerPrice?: number; // alias for offerAmount
  offerStatus?: 'pending' | 'accepted' | 'declined';
  read: boolean;
}

export interface Review {
  id: string;
  sellerId?: string;
  buyerId?: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerExam?: string;
  rating: number;
  date: string;
  comment: string;
  itemTitle?: string;
  listingTitle?: string;
  role?: 'buyer_review' | 'seller_review';
}

export interface ChatThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  buyerId?: string;
  buyerName?: string;
  buyerAvatar?: string;
  buyerCollege?: string;
  sellerId?: string;
  sellerName?: string;
  sellerAvatar?: string;
  sellerCollege?: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  otherUserRating: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface InquiryItem {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerExam: string;
  message: string;
  date: string;
  status: 'new' | 'replied' | 'converted';
}
