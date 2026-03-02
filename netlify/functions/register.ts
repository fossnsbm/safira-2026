import type { Handler } from '@netlify/functions';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
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
        headers,
        body: JSON.stringify({ message: 'All fields are required' })
      };
    }

    // Check if Firebase Admin credentials are configured
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.error('Firebase Admin credentials not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          message: 'Server configuration error: Firebase Admin credentials missing',
          details: 'Please configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in Netlify environment variables'
        })
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
      headers,
      body: JSON.stringify({ 
        message: 'Registration successful!',
        data: { fullName, email, batch, studentId, contactNo }
      })
    };
  } catch (error) {
    console.error('Error saving registration:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to save registration',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
