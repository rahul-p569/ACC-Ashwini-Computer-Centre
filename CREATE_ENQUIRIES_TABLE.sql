-- Create Enquiries Table for ACC Computer Center
-- Run this SQL in your Supabase SQL Editor

-- Create Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  mobile TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  course_interest TEXT,
  status TEXT DEFAULT 'new'
);

-- Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert and admin read
-- Public can insert (submit enquiries)
CREATE POLICY "Anyone can submit enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Authenticated users (admins) can read everything
CREATE POLICY "Authenticated users can read enquiries" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users (admins) can update enquiries
CREATE POLICY "Authenticated users can update enquiries" ON enquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users (admins) can delete enquiries
CREATE POLICY "Authenticated users can delete enquiries" ON enquiries
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

