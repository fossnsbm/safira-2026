import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registration.css";
import { ParticlesBackground } from "../ui/ParticlesBackground";
import { useState, FormEvent } from "react";

const Register: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    batch: '',
    studentId: '',
    contactNo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Welcome to Safira \'26' });
        setFormData({
          fullName: '',
          email: '',
          batch: '',
          studentId: '',
          contactNo: ''
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to register' });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Network error. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Student Email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="batch"
            placeholder="Batch" 
            value={formData.batch}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="studentId"
            placeholder="Student ID" 
            value={formData.studentId}
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="contactNo"
            placeholder="Contact No" 
            value={formData.contactNo}
            onChange={handleChange}
            required
          />

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
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
  );
};

export default Register;