# 🔥 Firebase Admin Setup for Safira

## Your Current Firebase Project (Frontend ✅)
- **Project ID**: `safira-workshop`
- **Auth Domain**: `safira-workshop.firebaseapp.com`
- **Storage Bucket**: `safira-workshop.firebasestorage.app`

## Step 1: Get Firebase Admin Credentials

### Follow these exact steps:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: **"safira-workshop"**

2. **Open Project Settings**
   - Click the ⚙️ (gear icon) next to "Project Overview"
   - Or click "Project settings" button

3. **Go to Service Accounts Tab**
   - Click on "Service accounts" tab at the top
   - Click "Generate new private key" button
   - Click "Generate key" to confirm
   - A JSON file will download automatically

4. **Extract the Information**
   Open the downloaded JSON file - it will look like this:

```json
{
  "type": "service_account",
  "project_id": "safira-workshop",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@safira-workshop.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

5. **Copy These 3 Values**
   You need:
   - `project_id` → `"safira-workshop"`
   - `client_email` → `"firebase-adminsdk-xxxxx@safira-workshop.iam.gserviceaccount.com"`
   - `private_key` → The entire key including `-----BEGIN...` and `\n` characters

## Step 2: Set Up Netlify Environment Variables

### Option A: Using Netlify CLI (Recommended)

Run these commands in your terminal:

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Login
netlify login

# Link to your Netlify site (or create one)
netlify link

# Set the environment variables
netlify env:set FIREBASE_PROJECT_ID safira-workshop
netlify env:set FIREBASE_CLIENT_EMAIL firebase-adminsdk-xxxxx@safira-workshop.iam.gserviceaccount.com
netlify env:set FIREBASE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

⚠️ **IMPORTANT**: When setting `FIREBASE_PRIVATE_KEY`:
- Keep the quotes around the entire key
- Keep the `\n` characters (they represent line breaks)
- Replace `YOUR_KEY_HERE` with your actual private key content

### Option B: Using Netlify Dashboard

1. Go to https://app.netlify.com/
2. Select your site (or create new one)
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add these three:

| Key | Value |
|-----|-------|
| `FIREBASE_PROJECT_ID` | `safira-workshop` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxxxx@safira-workshop.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` |

## Step 3: Test the Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the form:**
   - Go to `http://localhost:5177/` (or your port)
   - Fill out the registration form
   - Click Submit

3. **Check the results:**
   - Success message should appear
   - Go to Firebase Console → Firestore Database
   - You should see a `registrations` collection with your data!

## Troubleshooting

### ❌ "Failed to save registration"
- Check that all 3 environment variables are set correctly
- Verify the private key includes `\n` characters
- Make sure the client email is correct

### ❌ "Permission denied" in Firestore
- Go to Firebase Console → Firestore Database
- Click "Rules" tab
- Update rules to allow writes (for testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document} {
      allow read, write: if true; // For testing only!
    }
  }
}
```

⚠️ **Security Warning**: After testing, update the rules to restrict access properly.

### ❌ Function returns 500 error
- Check Netlify function logs:
  ```bash
  netlify functions:invoke register
  ```
- Verify Firebase Admin SDK is installed:
  ```bash
  npm list firebase-admin
  ```

## Security Best Practices

🔒 **For Production:**

1. **Never commit credentials**
   - Don't commit `.env` files
   - Don't commit the downloaded JSON key file

2. **Update Firestore Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /registrations/{document} {
         allow read, write: if false; // Only Cloud Functions can access
       }
     }
   }
   ```

3. **Add rate limiting** to prevent abuse

4. **Validate and sanitize** all input data

## Need Help?

If you're stuck, share:
1. The error message you're seeing
2. Screenshot of your Netlify environment variables (hide the actual key values)
3. Netlify function logs

## Next Steps

Once working:
1. ✅ Deploy to Netlify: `netlify deploy --prod`
2. ✅ Set the same environment variables in Netlify Dashboard
3. ✅ Monitor registrations in Firebase Console
4. ✅ Export data when needed from Firestore

---

**Current Status:**
- ✅ Frontend Firebase config: Complete
- ✅ Registration form: Ready
- ⏳ Backend Admin credentials: Waiting for you to generate
- ⏳ Netlify environment variables: Waiting for setup
