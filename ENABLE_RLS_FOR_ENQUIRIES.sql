-- Enable Row Level Security (RLS) for enquiries table
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Enable RLS on the enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policy to allow public insert (anyone can submit enquiries)
CREATE POLICY "Anyone can submit enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Step 3: Create policy to allow authenticated users (admins) to read enquiries
CREATE POLICY "Authenticated users can read enquiries" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Step 4: Create policy to allow authenticated users (admins) to update enquiries
CREATE POLICY "Authenticated users can update enquiries" ON enquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Step 5: Create policy to allow authenticated users (admins) to delete enquiries
CREATE POLICY "Authenticated users can delete enquiries" ON enquiries
  FOR DELETE USING (auth.role() = 'authenticated');

-- Step 6: Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

