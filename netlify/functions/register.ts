import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { Context } from "@netlify/functions"

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

if (!serviceAccountString) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env is not set.")
}

const serviceAccount = JSON.parse(serviceAccountString)

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id
})

const db = getFirestore(app)

const validateStudentId = (id: string): boolean => /^\d{5}$/.test(id);
const validateBatch = (batch: string): boolean => /^\d{2}\.[1-3]$/.test(batch);
const validateEmail = (email: string): boolean => email.toLowerCase().endsWith('@students.nsbm.ac.lk');
const validateContactNo = (contact: string): boolean => /^0\d{9}$/.test(contact);

export default async (req: Request, _context: Context) => {
  const headers = { "Content-Type": "application/json" }
  const isRegistrationDisabled = !JSON.parse(process.env.VITE_REGISTRATION_ENABLED || 'true')

  console.log(isRegistrationDisabled)

  if (isRegistrationDisabled) {
    return new Response(JSON.stringify({ message: "Registration has been disabled" }), {
      status: 400,
      headers
    })
  }

  const data = await req.json()

  const { fullName, email, batch, studentId, contactNo } = data

  if (!fullName || !email || !batch || !studentId || !contactNo) {
    return new Response(JSON.stringify({ message: "All fields are required" }), {
      status: 400,
      headers
    })
  }

  if (!validateEmail(email)) {
    return new Response(JSON.stringify({ message: "Please use your NSBM student email (@students.nsbm.ac.lk)" }), {
      status: 400,
      headers
    })
  }

  if (!validateStudentId(studentId)) {
    return new Response(JSON.stringify({ message: "Student ID must be exactly 5 digits" }), {
      status: 400,
      headers
    })
  }

  if (!validateBatch(batch)) {
    return new Response(JSON.stringify({ message: "Batch format should be like 24.1, 23.2, or 25.3" }), {
      status: 400,
      headers
    })
  }

  if (!validateContactNo(contactNo)) {
    return new Response(JSON.stringify({ message: "Contact number must be 10 digits starting with 0" }), {
      status: 400,
      headers
    })
  }

  try {
    const docRef = await db.collection("registrations").add({
      fullName, email, batch, studentId, contactNo
    })
    console.log("Document written with ID: ", docRef.id)
    return new Response(JSON.stringify({
      message: "Registration successful!",
      data: { fullName, email, batch, studentId, contactNo }
    }), { headers })
  } catch (error) {
    console.error("Error saving registration:", error)
    return new Response(JSON.stringify({
      message: "Failed to save registration",
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { status: 500, headers })
  }
}

