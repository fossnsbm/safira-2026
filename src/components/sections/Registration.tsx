import { useNavigate } from "react-router-dom"
import "../../styles/registration.css"
import { ParticlesBackground } from "../ui/ParticlesBackground"
import { useState } from "react"
import { useFormStatus } from "react-dom"

type Registration = {
  fullName: string
  email: string
  batch: string
  studentId: string
  contactNo: string
}

const validateStudentId = (id: string): boolean => /^\d{5}$/.test(id);
const validateBatch = (batch: string): boolean => /^\d{2}\.[1-3]$/.test(batch);
const validateEmail = (email: string): boolean => email.toLowerCase().endsWith('@students.nsbm.ac.lk');
const validateContactNo = (contact: string): boolean => /^0\d{9}$/.test(contact);

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  function Submit() {
    const { pending } = useFormStatus()
    return (
      <button
        type="submit"
        className="submit-btn"
        disabled={pending}
      >
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    )
  }

  async function submitForm(formData: FormData) {
    setMessage(null);

    const {
      fullName,
      email,
      batch,
      studentId,
      contactNo,
    } = Object.fromEntries(formData) as Registration

    try {

      if (!fullName || !email || !batch || !studentId || !contactNo) {
        throw new Error("All fields are required")
      }

      if (!validateEmail(email)) {
        throw new Error("Please use your NSBM student email (@students.nsbm.ac.lk)")
      }

      if (!validateStudentId(studentId)) {
        throw new Error("Student ID must be exactly 5 digits")
      }

      if (!validateBatch(batch)) {
        throw new Error("Batch format should be like 24.1, 23.2, or 25.3")
      }

      if (!validateContactNo(contactNo)) {
        throw new Error("Contact number must be 10 digits starting with 0 (e.g. 0714445234)")
      }

      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          batch,
          studentId,
          contactNo
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Welcome to Safira \'26' });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to register' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Network error. Please try again.'
      });
    }
  }

  return (
    <div className="register-page">
      <ParticlesBackground />
      <button
        className="back-btn"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
      <div className="form-card">
        <h1 className="form-title">Register for Safira</h1>

        <form action={submitForm}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Student Email (e.g. name@students.nsbm.ac.lk)"
            pattern=".+@students\.nsbm\.ac\.lk$"
            title="Please use your NSBM student email"
            required
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch (e.g. 24.1)"
            pattern="\d{2}\.[1-3]"
            title="Format: 24.1, 23.2, 25.3"
            required
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID (5 digits)"
            pattern="\d{5}"
            title="Student ID must be exactly 5 digits"
            maxLength={5}
            required
          />
          <input
            type="tel"
            name="contactNo"
            placeholder="Contact No (e.g. 0714445234)"
            pattern="0\d{9}"
            title="10 digits starting with 0"
            maxLength={10}
            required
          />
          <Submit />
        </form>

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            background: message.type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
            border: `1px solid ${message.type === 'success' ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'}`,
            color: message.type === 'success' ? '#4CAF50' : '#F44336',
            backdropFilter: 'blur(8px)',
            fontSize: '0.9rem'
          }}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
