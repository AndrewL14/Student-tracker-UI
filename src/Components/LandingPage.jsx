import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Section from '../common/Section';
import Card from '../common/Card';
import localDb from '../services/localDb';

const LandingPage = () => {
  const navigate = useNavigate();

  const tryDemo = () => {
    localDb.loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="landing">
      <Navbar />

      {/* Hero */}
      <header className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Gradebook, reimagined</span>
          <h1>Track student progress, simplify your teaching</h1>
          <p>
            An intuitive gradebook for organizing assignments, monitoring grades,
            and keeping every class on track — all in one clean dashboard.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={tryDemo}>Try the live demo</button>
            <button className="btn btn-outline" onClick={() => navigate('/register')}>
              Create an account
            </button>
          </div>
          <p className="hero-note">No sign-up required — the demo runs entirely in your browser.</p>
        </div>
      </header>

      {/* Features */}
      <div id="features">
        <Section
          title="Everything you need to run your class"
          subtitle="Built for teachers who want less busywork and a clearer view of how students are doing."
        >
          <Card
            title="Class dashboard"
            description="See every student, their period, and overall grade at a glance — with at-risk students surfaced automatically."
            icon="📊"
          />
          <Card
            title="Assignment tracking"
            description="Organize homework, quizzes, tests and projects, and track completion and grades for each student."
            icon="📝"
          />
          <Card
            title="Instant insights"
            description="Class averages and status badges update as you go, so you always know where things stand."
            icon="💡"
          />
        </Section>
      </div>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to take a look?</h2>
          <p>Jump straight into a fully populated demo gradebook.</p>
          <button className="btn btn-primary" onClick={tryDemo}>Launch the demo</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
