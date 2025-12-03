-- Migration Script: Add Educational Qualification Fields to exam_submissions table
-- Run this in Supabase SQL Editor to add missing educational fields

-- Add 10th class fields
ALTER TABLE exam_submissions 
ADD COLUMN IF NOT EXISTS tenth_subject TEXT,
ADD COLUMN IF NOT EXISTS tenth_board TEXT,
ADD COLUMN IF NOT EXISTS tenth_year TEXT,
ADD COLUMN IF NOT EXISTS tenth_percent TEXT;

-- Add Intermediate/12th fields
ALTER TABLE exam_submissions 
ADD COLUMN IF NOT EXISTS inter_subject TEXT,
ADD COLUMN IF NOT EXISTS inter_board TEXT,
ADD COLUMN IF NOT EXISTS inter_year TEXT,
ADD COLUMN IF NOT EXISTS inter_percent TEXT;

-- Add Degree fields
ALTER TABLE exam_submissions 
ADD COLUMN IF NOT EXISTS degree_subject TEXT,
ADD COLUMN IF NOT EXISTS degree_board TEXT,
ADD COLUMN IF NOT EXISTS degree_year TEXT,
ADD COLUMN IF NOT EXISTS degree_percent TEXT;

-- Add Other qualification fields
ALTER TABLE exam_submissions 
ADD COLUMN IF NOT EXISTS other_subject TEXT,
ADD COLUMN IF NOT EXISTS other_board TEXT,
ADD COLUMN IF NOT EXISTS other_year TEXT,
ADD COLUMN IF NOT EXISTS other_percent TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'exam_submissions' 
ORDER BY ordinal_position;


