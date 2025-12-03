import { supabase, AdmissionSubmission, ExamSubmission, GalleryPhoto } from './supabase'

// Admission Submissions
export async function createAdmissionSubmission(data: AdmissionSubmission) {
  const { data: result, error } = await supabase
    .from('admission_submissions')
    .insert([data])
    .select()
    .single()
  
  if (error) throw error
  return result
}

export async function getAllAdmissionSubmissions() {
  const { data, error } = await supabase
    .from('admission_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function deleteAdmissionSubmission(id: number) {
  const { error } = await supabase
    .from('admission_submissions')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Exam Submissions
export async function createExamSubmission(data: ExamSubmission) {
  const { data: result, error } = await supabase
    .from('exam_submissions')
    .insert([data])
    .select()
    .single()
  
  if (error) throw error
  return result
}

export async function getAllExamSubmissions() {
  const { data, error } = await supabase
    .from('exam_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function deleteExamSubmission(id: number) {
  const { error } = await supabase
    .from('exam_submissions')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Gallery Photos
export async function createGalleryPhoto(data: GalleryPhoto) {
  const { data: result, error } = await supabase
    .from('gallery_photos')
    .insert([data])
    .select()
    .single()
  
  if (error) throw error
  return result
}

export async function getAllGalleryPhotos() {
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function deleteGalleryPhoto(id: number, imagePath: string) {
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('gallery')
    .remove([imagePath])
  
  if (storageError) console.error('Storage deletion error:', storageError)
  
  // Delete from database
  const { error } = await supabase
    .from('gallery_photos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Upload image to Supabase Storage
export async function uploadGalleryImage(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath)

  return {
    url: data.publicUrl,
    path: filePath
  }
}

// Admin Authentication
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}


