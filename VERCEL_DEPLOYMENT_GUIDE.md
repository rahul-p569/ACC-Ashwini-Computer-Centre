# Vercel Deployment Guide for ACC Computer Center

## ✅ Your Deployment Status

Based on your logs, the deployment **completed successfully**! However, if the site isn't working, you need to configure environment variables in Vercel.

---

## 🔧 Step 1: Add Environment Variables in Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `v0-computer-center-website`
3. Click on **Settings** (gear icon in the top navigation)
4. Click on **Environment Variables** in the left sidebar
5. Add these two variables:

   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase project URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key (starts with `eyJ...`)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

6. **IMPORTANT:** After adding variables, you need to **redeploy**:
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger a new deployment

### Option B: Via Vercel CLI

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📋 Where to Get Supabase Credentials

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🔍 Verify Your Deployment

After adding environment variables and redeploying:

1. Visit your deployed site
2. Check the browser console (F12) for any errors
3. Test these features:
   - ✅ Homepage loads
   - ✅ Forms can be submitted (Admission, Exam, Enquiry)
   - ✅ Admin login works
   - ✅ Gallery images load

---

## ⚠️ Common Issues

### Issue 1: "Missing Supabase environment variables"
**Solution:** Make sure you added both environment variables in Vercel and redeployed.

### Issue 2: Forms not submitting
**Solution:** 
- Check Supabase RLS policies are set correctly
- Verify environment variables are added to all environments (Production, Preview, Development)

### Issue 3: Images not loading
**Solution:**
- Check if `gallery` bucket exists in Supabase Storage
- Verify bucket is set to **public**
- Check storage policies allow public read access

### Issue 4: Admin login not working
**Solution:**
- Verify admin user exists in Supabase Authentication
- Check that user has "Auto Confirm User" enabled
- Make sure you're using the correct email/password

---

## 🚀 Quick Checklist

- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` in Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed the application
- [ ] Tested the deployed site
- [ ] Verified forms work
- [ ] Verified admin login works

---

## 📞 Need Help?

If you're still experiencing issues:

1. Check Vercel deployment logs for specific error messages
2. Check browser console (F12) for client-side errors
3. Verify Supabase project is active and accessible
4. Make sure all database tables are created (run SQL from `SUPABASE_SETUP.md`)

---

## ✅ Your Deployment is Successful!

The build completed successfully. You just need to add the environment variables and redeploy to make everything work! 🎉

