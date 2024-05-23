import React from 'react';
import '../styles/LandingPage.css'
import '../styles/Section.css'
import Section from '../common/Section';
import Card from '../common/Card';


const redirect = async event => {
  window.location.href = '/register';
}
const LandingPage = () => {

  return (
    <div>
      {/* Hero Section */}
      
<section className="hero">
  <div className="hero-content">
    <h1>Track Student Progress, Simplify Your Teaching</h1>
    <p>An intuitive platform for organizing assignments, monitoring grades, and streamlining communication.</p>
    <button className="register-button" onClick={redirect}>Sign Up Now</button>
  </div>
</section>


      {/* Features Section */}
  <Section title="Features">
  <Card 
    title="Admin Dashboard"
    description="Manage all aspects of your platform with our intuitive admin dashboard."
    icon="/icons/dashboard.svg" // Update the path
  />
  <Card
    title="Student Assignments"
    description="Effortlessly assign tasks and track progress with our integrated assignment system."
    icon="/icons/assignments.svg"
  />
  <Card
    title="Feedback Board"
    description="Collect feedback from teachers and students to continuously improve academic performance."
    icon="/icons/feedback.svg" 
  />
</Section>


      {/* Testimonials Section (if desired) */}
      <section className="testimonials">
        {/* Testimonials...*/}
      </section>

       {/* Secondary CTA */}
      <section className="call-to-action">
        {/* Repeat button */}
      </section>
      
    </div>
  );
};

export default LandingPage;