export interface Volunteer {
  id: string
  name: string
  email: string
  phone: string
  referralCode: string
  isActive: boolean
  createdAt: string
}

export interface Donation {
  id: string
  amount: number
  donorName: string
  donorEmail: string
  donorPhone: string
  donorPAN?: string
  volunteerCode: string | null
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
  status: 'pending' | 'success' | 'failed'
  message?: string | null
  createdAt: string
}

export interface Application {
  id: string
  name: string
  email: string
  phone: string
  city: string
  occupation: string
  motivation: string
  availability: 'weekends' | 'weekdays' | 'both'
  linkedIn?: string | null
  heardFrom: string
  referredBy: string | null
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  createdAt: string
}

export interface DonorFormData {
  name: string
  email: string
  phone: string
  pan?: string
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}
