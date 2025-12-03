# 🔧 Update Exam Form Table - Add Missing Fields

## ⚠️ IMPORTANT: Run This SQL in Supabase

Your exam form now collects **Educational Qualification** data, but your database table needs to be updated to store these fields.

---

## 📋 What You Need to Do:

### **Step 1: Go to Supabase SQL Editor**
1. Open your Supabase Dashboard: https://app.supabase.com
2. Select your `acc-computer-centre` project
3. Click **SQL Editor** in the left sidebar
4. Click **"New Query"**

### **Step 2: Copy and Paste This SQL**

```sql
-- Add Educational Qualification Fields to exam_submissions table

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
```

### **Step 3: Run the Query**
1. Click the **"Run"** button (or press F5)
2. You should see: "Success. No rows returned"

### **Step 4: Verify Columns Were Added**

Run this query to verify:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'exam_submissions' 
ORDER BY ordinal_position;
```

You should see all the new columns listed!

---

## ✅ What This Adds to Your Database:

The exam_submissions table will now store:

### **10th Standard:**
- tenth_subject
- tenth_board
- tenth_year
- tenth_percent

### **Intermediate/12th:**
- inter_subject
- inter_board
- inter_year
- inter_percent

### **Degree:**
- degree_subject
- degree_board
- degree_year
- degree_percent

### **Others:**
- other_subject
- other_board
- other_year
- other_percent

---

## 📊 What This Fixes:

### **Before:**
- ❌ Exam form had education fields but data wasn't saved
- ❌ Only showing basic info in admin dashboard
- ❌ Excel export missing education data

### **After:**
- ✅ All educational qualification data is saved
- ✅ Admin can view complete education details
- ✅ Excel export includes all 4 education levels (10th, Inter, Degree, Others)

---

## 🎯 After Running the SQL:

### **Test It:**
1. Go to: http://localhost:3000/exam-form
2. Fill in the educational qualification table
3. Submit the form
4. Go to admin → **Applications** → **Exam Forms** tab
5. Click **"View"** on any submission
6. You should see all educational details!
7. Click **"Export to Excel"** - all education data will be included

---

## 📄 Excel Export Now Includes:

**Exam Forms Export** will have these columns:
```
ID | Submission Date | Name | Father's Name | Mother's Name | DOB | Gender | 
Mobile | Email | Address | ID Number | Course | Branch | Reg No | Duration | 
Admission Date | Fees | Paid | Dues | Place | Date | 
10th Subject | 10th Board | 10th Year | 10th % | 
Inter Subject | Inter Board | Inter Year | Inter % | 
Degree Subject | Degree Board | Degree Year | Degree % | 
Other Subject | Other Board | Other Year | Other %
```

**Total: 36 columns with complete data!**

---

## ⏱️ This Takes 30 Seconds:

1. Copy SQL from above
2. Paste in Supabase SQL Editor
3. Click Run
4. Done! ✅

---

**Run this migration now to capture all exam form data!** 🚀

