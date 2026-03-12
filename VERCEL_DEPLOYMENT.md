# Vercel Deployment Guide

## Quick Setup

### Option 1: Direct Vercel CLI (Recommended)

1. **Install Vercel CLI globally**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from project directory**
```bash
cd "c:\Users\MINO\Downloads\final-deply\luxe-store-final"
vercel
```

Follow the prompts:
- Confirm project settings
- Set project name (e.g., "luxe-store")
- Connect to GitHub (optional but recommended)

---

### Option 2: GitHub Integration (Best for Updates)

1. **Initialize Git and push to GitHub**
```bash
cd "c:\Users\MINO\Downloads\final-deply\luxe-store-final"
git init
git add .
git commit -m "Initial commit: Luxe Store"
git remote add origin https://github.com/YOUR_USERNAME/luxe-store.git
git branch -M main
git push -u origin main
```

2. **Deploy via Vercel Dashboard**
- Go to https://vercel.com/dashboard
- Click "Add New..." → "Project"
- Select your GitHub repository
- Click "Import"
- Vercel auto-detects Next.js settings
- Click "Deploy"

---

### Option 3: Manual Git + Vercel

1. **Initialize git locally**
```bash
cd "c:\Users\MINO\Downloads\final-deply\luxe-store-final"
git init
git add .
git commit -m "Initial commit"
```

2. **Connect to Vercel**
```bash
vercel link
```

3. **Deploy**
```bash
vercel --prod
```

---

## Environment Variables (If Needed)

Add environment variables in Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add any required variables (if using APIs)

---

## Build Settings

The `vercel.json` file includes:
- ✅ Build command optimization
- ✅ Output directory configuration  
- ✅ Cache headers for performance
- ✅ Security headers
- ✅ Redirects configuration

---

## Deployment Preview

After deployment, you'll get:
- **Production URL**: `https://luxe-store.vercel.app`
- **Preview URLs**: For each git push (if using GitHub)

---

## Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test collection page
- [ ] Test cart functionality
- [ ] Verify images load
- [ ] Check mobile responsiveness
- [ ] Test hero carousel
- [ ] Verify 75% zoom works
- [ ] Check animations (desktop vs mobile)

---

## Troubleshooting

**Build fails?**
- Run locally: `npm run build`
- Check for TypeScript errors: `npm run lint`

**Images not loading?**
- Verify image paths in `/public` folder
- Check Next.js Image component imports

**Slow performance?**
- All optimizations are already in place
- Vercel CDN handles caching automatically

---

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Wait 24-48 hours for propagation

---

**That's it! Your site will be live on Vercel within minutes! 🚀**
