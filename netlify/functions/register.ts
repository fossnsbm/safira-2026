import type { Handler } from '@netlify/functions';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const handler: Handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body || '{}');
    
    // Validate required fields
    const { fullName, email, batch, studentId, contactNo } = data;
    
    if (!fullName || !email || !batch || !studentId || !contactNo) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required' })
      };
    }

    // Initialize Firebase Admin SDK
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
      });
    }

    const db = getFirestore();
    
    // Save to Firestore
    await db.collection('registrations').add({
      fullName,
      email,
      batch,
      studentId,
      contactNo,
      registeredAt: new Date().toISOString(),
      timestamp: Date.now()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Registration successful!',
        data: { fullName, email, batch, studentId, contactNo }
      })
    };
  } catch (error) {
    console.error('Error saving registration:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Failed to save registration',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
