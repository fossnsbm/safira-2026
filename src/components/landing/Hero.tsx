import bg from "../../assets/sbg.jpg";
import foss from "../../assets/foss.png";
import wif from "../../assets/wif.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay"></div>

      <div className="content">
        <h1 className="title">SAFIRA'26</h1>

        <p className="tagline">
          Empowered women empower the future.<br />
          By breaking barriers
        </p>

        <button className="register-btn" onClick={() => { navigate('/registration') }}>
          Register
        </button>

        <div className="logos">
          <img src={foss} alt="FOSS Logo" className="logo-image" />
          <img src={wif} alt="Women in FOSS Logo" className="logo-image" />
        </div>
      </div>
    </div>
  )

}
