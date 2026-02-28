import "./index.css";

function App() {
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <div className="nav-left">
          <span className="logo">AnonTag</span>
        </div>

        <div className="nav-right">
          <button className="nav-btn">Register</button>
          <button className="nav-btn">Scan QR</button>
          <button className="nav-btn">History</button>
          <button className="nav-btn">About Us</button>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>
          Lost and Found using <span>QR</span>
        </h1>

        <p>
          Securely connect with finders without revealing your phone number.
        </p>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">
        <div className="glass-card">

          {/* Left Side Content */}
          <div className="how-left">
            <h2>How It Works</h2>

            <div className="step">
              <span>1</span>
              <p>Attach your unique QR tag to your keys or wallet.</p>
            </div>

            <div className="step">
              <span>2</span>
              <p>If someone finds it, they scan the QR code.</p>
            </div>

            <div className="step">
              <span>3</span>
              <p>
                They send you a secure message without seeing your phone number.
              </p>
            </div>

            <div className="step">
              <span>4</span>
              <p>You coordinate pickup safely and privately.</p>
            </div>
          </div>

          {/* Right Side QR Visual */}
          <div className="how-right">
            <div className="qr-container">
              <div className="qr-box"></div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default App;