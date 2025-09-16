export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: 'STUDENT' | 'EMPLOYER' | 'ADMIN' | 'GOVERNMENT_ADMIN'
  isEmailVerified: boolean
  isPhoneVerified: boolean
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
  studentProfile?: StudentProfile
  companyProfile?: CompanyProfile
  adminProfile?: AdminProfile
}

export interface StudentProfile {
  id: string
  userId: string
  dateOfBirth?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  aadhaarNumber?: string
  panNumber?: string
  currentInstitution?: string
  degree?: string
  fieldOfStudy?: string
  graduationYear?: number
  cgpa?: number
  academicDocuments: string[]
  skills: string[]
  experience?: string
  projects: string[]
  certifications: string[]
  resumeUrl?: string
  portfolioUrl?: string
  preferredLocations: string[]
  preferredIndustries: string[]
  preferredCompanySize?: string
  minStipend?: number
  maxStipend?: number
  availableFrom?: string
  availableUntil?: string
  workMode?: string
  isPMSchemeEligible: boolean
  pmSchemeDocuments: string[]
  profileCompletion: number
  isProfileComplete: boolean
  createdAt: string
  updatedAt: string
}

export interface CompanyProfile {
  id: string
  userId: string
  companyName: string
  companyType?: string
  industry?: string
  companySize?: string
  foundedYear?: number
  website?: string
  description?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  gstNumber?: string
  panNumber?: string
  cultureValues: string[]
  workEnvironment?: string
  benefits: string[]
  isVerified: boolean
  verificationDocuments: string[]
  isPMSchemeParticipant: boolean
  pmSchemeCertificate?: string
  createdAt: string
  updatedAt: string
}

export interface AdminProfile {
  id: string
  userId: string
  department?: string
  designation?: string
  permissions: string[]
  createdAt: string
  updatedAt: string
}

export interface Internship {
  id: string
  companyId: string
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  skillsRequired: string[]
  qualifications: string[]
  location: string
  city: string
  state: string
  workMode: string
  duration: number
  startDate?: string
  endDate?: string
  stipend?: number
  stipendType?: string
  otherBenefits: string[]
  applicationDeadline?: string
  maxApplications?: number
  currentApplications: number
  status: 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'CLOSED' | 'EXPIRED'
  isActive: boolean
  isPMSchemeEligible: boolean
  pmSchemeType?: 'PRIME_MINISTERS_INTERNSHIP_SCHEME' | 'SKILL_INDIA_DIGITAL' | 'NEP_2020_INTERNSHIP' | 'STARTUP_INDIA_INTERNSHIP'
  pmSchemeBenefits: string[]
  governmentFunding?: number
  views: number
  createdAt: string
  updatedAt: string
  company?: User
}

export interface Application {
  id: string
  studentId: string
  internshipId: string
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'INTERVIEW_COMPLETED' | 'SELECTED' | 'REJECTED' | 'WITHDRAWN'
  coverLetter?: string
  resumeUrl?: string
  portfolioUrl?: string
  additionalDocuments: string[]
  skillMatchScore?: number
  locationMatchScore?: number
  cultureFitScore?: number
  overallScore?: number
  aiRecommendation?: string
  appliedAt: string
  reviewedAt?: string
  statusChangedAt?: string
  interviewedAt?: string
  feedback?: string
  rating?: number
  isPMSchemeApplication: boolean
  pmSchemeApplicationId?: string
  createdAt: string
  updatedAt: string
  student?: User
  internship?: Internship
}

export interface MatchingResult {
  id: string
  studentId: string
  internshipId: string
  skillCompatibility: number
  locationCompatibility: number
  cultureFit: number
  careerAlignment: number
  overallScore: number
  recommendationReason: string
  strengths: string[]
  improvementAreas: string[]
  isViewed: boolean
  isApplied: boolean
  createdAt: string
  updatedAt: string
  student?: User
  internship?: Internship
}

export interface PMSchemeApplication {
  id: string
  studentId: string
  schemeType: 'PRIME_MINISTERS_INTERNSHIP_SCHEME' | 'SKILL_INDIA_DIGITAL' | 'NEP_2020_INTERNSHIP' | 'STARTUP_INDIA_INTERNSHIP'
  applicationNumber: string
  status: string
  eligibilityScore?: number
  verificationStatus: string
  verifiedDocuments: string[]
  governmentRefNumber?: string
  approvalDate?: string
  disbursementDate?: string
  disbursementAmount?: number
  createdAt: string
  updatedAt: string
  student?: User
}

export interface Notification {
  id: string
  userId: string
  type: 'APPLICATION_SUBMITTED' | 'APPLICATION_STATUS_CHANGED' | 'NEW_INTERNSHIP_MATCH' | 'INTERVIEW_SCHEDULED' | 'REMINDER' | 'SYSTEM_ANNOUNCEMENT'
  title: string
  message: string
  data?: any
  isRead: boolean
  readAt?: string
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  messageType: string
  isRead: boolean
  readAt?: string
  createdAt: string
  sender?: User
  receiver?: User
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthResponse {
  user: User
  token: string
}


