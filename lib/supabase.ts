import { createClient } from '@supabase/supabase-js'

// These will be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface AdmissionSubmission {
  id?: number
  created_at?: string
  name: string
  father_name: string
  mother_name: string
  dob: string
  gender: string
  mobile: string
  email?: string
  address: string
  id_number?: string
  course: string
  branch: string
  tenth_board?: string
  tenth_year?: string
  tenth_percent?: string
  twelve_board?: string
  twelve_year?: string
  twelve_percent?: string
}

export interface ExamSubmission {
  id?: number
  created_at?: string
  name: string
  father_name: string
  mother_name: string
  dob: string
  gender: string
  mobile: string
  email?: string
  address: string
  id_number?: string
  branch: string
  course: string
  reg_no?: string
  duration?: string
  admission_date?: string
  fees?: string
  paid?: string
  dues?: string
  place?: string
  date?: string
  tenth_subject?: string
  tenth_board?: string
  tenth_year?: string
  tenth_percent?: string
  inter_subject?: string
  inter_board?: string
  inter_year?: string
  inter_percent?: string
  degree_subject?: string
  degree_board?: string
  degree_year?: string
  degree_percent?: string
  other_subject?: string
  other_board?: string
  other_year?: string
  other_percent?: string
}

export interface GalleryPhoto {
  id?: number
  created_at?: string
  title: string
  category: string
  image_url: string
  image_path: string
}

export interface AdminUser {
  id?: number
  username: string
  email: string
  created_at?: string
}

