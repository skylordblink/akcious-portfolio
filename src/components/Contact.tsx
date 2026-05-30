import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Work With Me</h4>
            <p>
              Available for select engagements — bots, trading automation,
              iGaming, DeFi, and full-stack revenue platforms.
            </p>
            <h4>Reach Out</h4>
            <p>Get in touch to discuss your project.</p>
          </div>
          <div className="contact-box">
            <h4>Services</h4>
            <p>Trading &amp; Telegram Bots</p>
            <p>Casino &amp; Sportsbook Platforms</p>
            <p>DeFi Protocols &amp; Smart Contracts</p>
            <p>AI Agents &amp; Workflow Automation</p>
            <p>Full-Stack Web &amp; Mobile</p>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Akcious Pison</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
