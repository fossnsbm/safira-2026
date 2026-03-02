import type { FC } from "react";
import "../styles/registration.css";

const Register: FC = () => {
  return (
    <div className="register-page">
      <div className="form-card">
        <h1 className="form-title">Register for Safira</h1>

        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Student Email" />
          <input type="text" placeholder="Batch" />
          <input type="text" placeholder="Student ID" />
          <input type="text" placeholder="Contact No" />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;