import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";
import "./styles/Contact.css";

const SERVICES_LIST = [
  { slug: "trading-bots", label: "Trading & Telegram Bots" },
  { slug: "casino-sportsbook", label: "Casino & Sportsbook Platforms" },
  { slug: "defi-smart-contracts", label: "DeFi Protocols & Smart Contracts" },
  { slug: "ai-agents", label: "AI Agents & Workflow Automation" },
  { slug: "fullstack", label: "Full-Stack Web & Mobile" },
];

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
            {SERVICES_LIST.map((s) => (
              <p key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="contact-service-link"
                  data-cursor="disable"
                >
                  {s.label}
                </Link>
              </p>
            ))}
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
