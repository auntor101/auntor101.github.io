# Auntor Chakma - Portfolio Website

## 🎉 Netlify CMS Setup Instructions

Your portfolio now has a **secure admin panel** where you can edit all content without touching code!

### 📋 Setup Steps (One-time, takes 5 minutes):

#### Step 1: Deploy to Netlify
1. Go to [Netlify](https://app.netlify.com/)
2. Sign up with your **GitHub account** (important!)
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" and select repository: `auntor101/auntor101.github.io`
5. Deploy settings:
   - **Build command:** Leave empty
   - **Publish directory:** `/`
6. Click "Deploy site"

#### Step 2: Enable Netlify Identity
1. In your Netlify site dashboard, go to **"Identity"** tab
2. Click **"Enable Identity"**
3. Under "Registration preferences", select **"Invite only"** (for security)
4. Under "External providers", enable **GitHub** (optional but recommended)
5. Click **"Invite users"** and invite yourself with your email

#### Step 3: Enable Git Gateway
1. In Identity tab, click **"Settings and usage"**
2. Scroll to **"Services"** → **"Git Gateway"**
3. Click **"Enable Git Gateway"**
4. This allows the CMS to save changes to GitHub

#### Step 4: Access Your Admin Panel
1. Go to: `https://YOUR-SITE-NAME.netlify.app/admin/`
2. You'll see a login screen
3. Click the invite link from your email
4. Set your password
5. Login and start editing! 🎉

---

## 🎨 How to Use the Admin Panel

### Editing Your Info:
1. Go to `https://YOUR-SITE-NAME.netlify.app/admin/`
2. Login with your credentials
3. Click **"Site Configuration"** → **"Personal Info"**
4. Edit:
   - Name
   - Tagline
   - Email, phone, location
   - About me paragraphs
   - Upload profile picture
   - Upload CV PDF
5. Click **"Publish"** → **"Publish now"**
6. Changes go live in ~1 minute!

### Managing Publications:
1. Click **"Publications"** in the sidebar
2. Click **"New Publication"** to add
3. Fill in title, authors, venue, abstract
4. Upload PDF or add external link
5. Click **"Publish"**

### Managing Projects/Experience/Research:
- Same process as publications
- Click respective section in sidebar
- Add/Edit/Delete entries
- All changes auto-save to GitHub

---

## 🔒 Security Features:

✅ **GitHub OAuth** - Login with your GitHub account
✅ **Invite-only** - No one can access admin without your invite
✅ **Git Gateway** - All changes tracked in GitHub commits
✅ **Encrypted** - Netlify Identity uses industry-standard encryption
✅ **No exposed passwords** - Unlike the old admin panel

---

## 📱 Alternative: Use GitHub Pages URL

If you prefer to keep using `auntor101.github.io` instead of Netlify URL:

1. In Netlify dashboard → **"Domain settings"**
2. Add custom domain: `auntor101.github.io`
3. Follow Netlify's DNS instructions
4. Your site will work on both URLs
5. Admin panel: `https://auntor101.github.io/admin/`

---

## ❓ Troubleshooting:

**Can't login to admin?**
- Check you've enabled Identity in Netlify
- Make sure you clicked the invite email link
- Try clearing browser cache

**Changes not showing?**
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check GitHub repository for new commits
- Clear browser cache and refresh

**Forgot password?**
- Go to admin login page
- Click "Forgot password?"
- Check email for reset link

---

## 🚀 What You Can Edit:

- ✅ Personal info (name, email, bio, etc.)
- ✅ Profile picture and CV
- ✅ All publications (add/edit/delete)
- ✅ Work experience entries
- ✅ Research projects
- ✅ Personal projects
- ✅ Education history
- ✅ Achievements
- ✅ Extracurricular activities
- ✅ Upload PDFs and images directly

---

## 📞 Need Help?

If you get stuck, contact me or check:
- [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- [Netlify Identity Docs](https://docs.netlify.com/visitor-access/identity/)

---

**Developed by:** Auntor Chakma  
**Last Updated:** January 2026