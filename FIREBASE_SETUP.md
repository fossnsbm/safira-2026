# Firebase & Netlify Functions Setup Guide

## Prerequisites
- Firebase account
- Netlify account
- Node.js installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Enable Firestore Database in **production mode**
4. Go to Project Settings (gear icon) > General tab

## Step 2: Get Firebase Config (Frontend)

In Firebase Console > Project Settings > General:
- Scroll down to "Your apps" section
- Click on the web app icon (</>)
- Register your app if not done
- Copy the `firebaseConfig` values

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 3: Get Firebase Admin Credentials (Backend)

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values for your `.env` file:
   - `FIREBASE_PROJECT_ID`: Your project ID
   - `FIREBASE_CLIENT_EMAIL`: The service account email
   - `FIREBASE_PRIVATE_KEY`: The private key (keep the quotes and \n characters)

Example:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"
```

## Step 4: Set Up Firestore Database

1. Go to Firebase Console > Firestore Database
2. Click "Create database" if not created
3. Start in **production mode** or set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to registrations collection via Cloud Functions
    // Only allow reads from authenticated users or Cloud Functions
    match /registrations/{document} {
      allow read, write: if false; // Direct access denied, use Cloud Functions
    }
  }
}
```

## Step 5: Configure Netlify

### Option A: Using Netlify CLI (Recommended for Development)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Link or create your site:
```bash
netlify link  # if site exists
# or
netlify init  # create new site
```

4. Set environment variables:
```bash
netlify env:set FIREBASE_PROJECT_ID your_project_id
netlify env:set FIREBASE_CLIENT_EMAIL firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
netlify env:set FIREBASE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

5. Run development server:
```bash
npm run dev
```

### Option B: Using Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site (or create new one)
3. Go to Site settings > Environment variables
4. Add all three Firebase Admin variables:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

## Step 6: Deploy to Netlify

1. Push your code to Git repository
2. Connect to Netlify (if not done)
3. Deploy:
```bash
netlify deploy --prod
```

Or connect your Git repository for automatic deployments.

## Testing the Form

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:5173` (or the port shown)
3. Fill out the registration form
4. Submit and check for success message
5. Verify data in Firebase Console > Firestore Database

## Troubleshooting

### Function returns 500 error
- Check Netlify function logs: `netlify functions:invoke register`
- Verify Firebase Admin credentials are correct
- Ensure environment variables are set

### CORS errors
- The function already includes CORS headers
- Make sure you're calling `/.netlify/functions/register`

### Data not appearing in Firestore
- Check Firestore security rules
- Verify Firebase Admin SDK has proper permissions
- Check Netlify function logs for errors

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit `.env` file to Git
- Keep your Firebase Admin private key secure
- Use Firestore security rules in production
- Consider adding rate limiting to prevent abuse
- Add input validation and sanitization

## Firestore Data Structure

Each registration will be stored as:
```javascript
{
  fullName: string,
  email: string,
  batch: string,
  studentId: string,
  contactNo: string,
  registeredAt: ISO 8601 timestamp,
  timestamp: Unix timestamp (milliseconds)
}
```

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
