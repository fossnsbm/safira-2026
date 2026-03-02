# 🚀 How to Run Your Safira Website (With Firestore Integration)

## ⚠️ Important: You Must Use `netlify dev`

The "Failed to fetch" error happens because you're running only Vite, which can't access Netlify functions.

## ✅ Correct Way to Run:

### Option 1: Using npm (RECOMMENDED)
```bash
npm run dev
```

This runs **both** the frontend AND the Netlify functions together!

### Option 2: Using Netlify CLI directly
```bash
netlify dev
```

## 🌐 URLs You'll Get:

When you run `npm run dev`, you'll see TWO URLs:

1. **Netlify Dev URL**: `http://localhost:8888` ← Use this one!
   - This serves your frontend
   - AND has access to Netlify functions
   
2. **Vite Dev URL**: `http://localhost:5173` (or similar)
   - Don't use this for testing forms
   - Functions won't work here

## 📋 Complete Setup Checklist:

### 1. Install Dependencies (if not done)
```bash
npm install
cd frontend && npm install
cd ..
```

### 2. Set Up Firebase Admin Credentials

Open `.env` file and replace the placeholder private key with your actual Firebase Admin private key:

```env
FIREBASE_PROJECT_ID=safira-workshop
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@safira-workshop.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_KEY\n-----END PRIVATE KEY-----\n"
```

**Where to get the key:**
1. Go to https://console.firebase.google.com/project/safira-workshop
2. Click ⚙️ → Project settings
3. Service accounts tab
4. Generate new private key
5. Copy values from downloaded JSON file

### 3. Run the Server
```bash
npm run dev
```

You should see:
```
◈ Netlify Dev ✓ ready
◈ Overriding local port: 8888
◈ Server now ready on http://localhost:8888
```

### 4. Open Your Browser
Go to: **http://localhost:8888** (NOT port 5173!)

### 5. Test the Registration Form
1. Click "Registration" button
2. Fill out the form
3. Click Submit
4. Should see "Registration successful!" message
5. Check Firebase Console → Firestore → registrations collection

## 🔧 Troubleshooting

### "Failed to fetch" Error
**Cause:** Running Vite directly instead of using `netlify dev`

**Fix:** 
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### "Firebase Admin credentials missing" Error
**Cause:** .env file not configured or incomplete

**Fix:** Update `.env` with your actual Firebase Admin credentials

### Port Already in Use
If port 8888 is taken, Netlify will automatically use another port (e.g., 8889, 8890)

Just use whatever port it shows you!

## 📝 What Each Command Does:

| Command | What It Runs | Access to Functions | Use For |
|---------|--------------|---------------------|---------|
| `npm run dev` | Netlify Dev + Vite | ✅ YES | Testing forms, full app |
| `npm run dev:frontend` | Vite only | ❌ NO | UI development only |
| `netlify dev` | Netlify Dev + Vite | ✅ YES | Same as npm run dev |

## 🎯 Quick Start Commands:

```bash
# Full setup from scratch
npm install
cd frontend && npm install
cd ..

# Edit .env file with your Firebase Admin credentials
# Then run:
npm run dev

# Open browser to http://localhost:8888
```

## 🔒 Security Reminder:

- Never commit `.env` to Git
- Keep Firebase Admin private key secure
- Only use for local development
- For production: Set environment variables in Netlify Dashboard

---

Run `npm run dev` and go to http://localhost:8888! 🚀
