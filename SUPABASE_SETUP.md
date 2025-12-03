# Supabase Setup Guide for ACC - Ashwini Computer Centre

This guide will walk you through setting up Supabase for your application step-by-step.

## Prerequisites
- A Supabase account (free tier is sufficient)
- Your application code (already updated to use Supabase)

---

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"** if you have an account
3. Create a new account or sign in with GitHub/Google
4. Click **"New Project"**
5. Fill in the details:
   - **Project Name**: `acc-computer-centre` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to you (e.g., `Mumbai` for India)
   - **Pricing Plan**: Select **Free** tier
6. Click **"Create new project"**
7. Wait 2-3 minutes for the project to be provisioned

---

## Step 2: Get Your API Keys

1. Once your project is ready, go to **Settings** (gear icon in left sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`

4. **Copy these values** - you'll need them in Step 6

---

## Step 3: Create Database Tables

1. Click on **SQL Editor** in the left sidebar (database icon)
2. Click **"New Query"**
3. Copy and paste this SQL code:

```sql
-- Create Admission Submissions Table
CREATE TABLE admission_submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  id_number TEXT,
  course TEXT NOT NULL,
  branch TEXT NOT NULL,
  tenth_board TEXT,
  tenth_year TEXT,
  tenth_percent TEXT,
  twelve_board TEXT,
  twelve_year TEXT,
  twelve_percent TEXT
);

-- Create Exam Submissions Table
CREATE TABLE exam_submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  mother_name TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  id_number TEXT,
  branch TEXT NOT NULL,
  course TEXT NOT NULL,
  reg_no TEXT,
  duration TEXT,
  admission_date DATE,
  fees TEXT,
  paid TEXT,
  dues TEXT,
  place TEXT,
  date DATE,
  tenth_subject TEXT,
  tenth_board TEXT,
  tenth_year TEXT,
  tenth_percent TEXT,
  inter_subject TEXT,
  inter_board TEXT,
  inter_year TEXT,
  inter_percent TEXT,
  degree_subject TEXT,
  degree_board TEXT,
  degree_year TEXT,
  degree_percent TEXT,
  other_subject TEXT,
  other_board TEXT,
  other_year TEXT,
  other_percent TEXT
);

-- Create Gallery Photos Table
CREATE TABLE gallery_photos (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE admission_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insert and admin read
-- Public can insert (submit forms)
CREATE POLICY "Anyone can submit admission forms" ON admission_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit exam forms" ON exam_submissions
  FOR INSERT WITH CHECK (true);

-- Authenticated users (admins) can read everything
CREATE POLICY "Authenticated users can read admission submissions" ON admission_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read exam submissions" ON exam_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Gallery policies
CREATE POLICY "Anyone can view gallery" ON gallery_photos
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert gallery" ON gallery_photos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery" ON gallery_photos
  FOR DELETE USING (auth.role() = 'authenticated');
```

4. Click **"Run"** button (or press F5)
5. You should see "Success. No rows returned" message

---

## Step 4: Create Storage Bucket for Gallery Images

1. Click on **Storage** in the left sidebar (folder icon)
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `gallery`
   - **Public bucket**: Toggle **ON** (so images are publicly accessible)
4. Click **"Create bucket"**

5. Click on the `gallery` bucket you just created
6. Click **"Policies"** tab
7. Click **"New Policy"**
8. Select **"Full customization"**
9. Add these policies:

**Policy 1: Allow public SELECT (read)**
```sql
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery');
```

**Policy 2: Allow authenticated INSERT (upload)**
```sql
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');
```

**Policy 3: Allow authenticated DELETE**
```sql
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery');
```

---

## Step 5: Create Admin User

1. Click on **Authentication** in the left sidebar (person icon)
2. Click **"Add user"** button
3. Select **"Create new user"**
4. Fill in:
   - **Email**: Your admin email (e.g., `admin@ashwinicomputer.com`)
   - **Password**: Create a strong password (save this!)
   - **Auto Confirm User**: Toggle **ON**
5. Click **"Create user"**

**Save these credentials** - you'll use them to log into your admin panel!

---

## Step 6: Configure Your Application

1. In your project folder, create a file named `.env.local`
2. Add these lines (replace with your actual values from Step 2):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx...
```

3. **IMPORTANT**: Replace the placeholder values with:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Project URL from Step 2
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon public key from Step 2

4. Save the file

---

## Step 7: Restart Your Development Server

1. Stop your current development server (press `Ctrl+C` in terminal)
2. Run: `pnpm run dev`
3. Your application will now connect to Supabase!

---

## Step 8: Test Your Setup

### Test Form Submissions
1. Go to `http://localhost:3000/admission`
2. Fill out and submit the admission form
3. Go to Supabase Dashboard → **Table Editor** → **admission_submissions**
4. You should see your submission!

### Test Admin Login
1. Go to `http://localhost:3000/admin/login`
2. Login with the admin email and password you created in Step 5
3. You should see the admin dashboard
4. Check **"Form Submissions"** - your test submission should appear

### Test Gallery Upload
1. In admin panel, go to **Gallery**
2. Click **"Add Photo"**
3. Upload an image with title and category
4. The image should appear in the gallery
5. Check Supabase → **Storage** → **gallery** bucket to see the uploaded file

---

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` file exists in project root
- Check that variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after creating `.env.local`

### "Failed to submit form"
- Check your internet connection
- Verify your Supabase project is active (check dashboard)
- Check browser console for detailed error messages
- Verify RLS policies are correctly set up in Step 3

### "Failed to upload image"
- Verify `gallery` bucket exists and is public
- Check that storage policies are correctly set up in Step 4
- Ensure image size is under 5MB

### "Cannot login to admin"
- Verify admin user was created in Step 5
- Check that **Auto Confirm User** was toggled ON
- Try resetting password in Supabase → Authentication → Users

---

## Database Schema Reference

### admission_submissions
- Stores all admission form submissions
- Auto-generates `id` and `created_at`

### exam_submissions
- Stores all exam form registrations
- Auto-generates `id` and `created_at`

### gallery_photos
- Stores gallery image metadata
- Actual images stored in Storage bucket
- Links to images via `image_url` and `image_path`

---

## Security Notes

- The `anon` key is safe to expose in frontend code
- It only allows public read/write as per RLS policies
- Admin operations require authentication
- Never commit `.env.local` to version control (it's already in `.gitignore`)

---

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard → **Logs** → **API**
2. Check browser console for errors
3. Verify all steps were completed in order
4. Ensure `.env.local` has correct values

---

## Next Steps

Once everything is working:
1. Consider adding more admin users via Supabase Authentication
2. Set up email notifications (Supabase Auth can send emails)
3. Enable backup policies in Supabase
4. For production, consider upgrading to Supabase Pro for better performance

---

**Your application is now fully integrated with Supabase! 🎉**

