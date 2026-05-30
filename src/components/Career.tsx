import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Independent Developer</h4>
                <h5>Bots, DeFi, iGaming &amp; AI Agents</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Engineering revenue platforms and automation for clients worldwide —
              trading bots, Telegram and Discord automation, casino and sportsbook
              engines, DeFi protocols, AI agents, and full-stack production systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Full-Stack Developer</h4>
                <h5>Contract &amp; Freelance</h5>
              </div>
              <h3>2021–24</h3>
            </div>
            <p>
              Delivered production fintech, iGaming, and Web3 platforms end to end —
              architecture, smart contracts, real-time backends, payments, and
              deployment infrastructure. Long-term contracts with revenue-stage teams.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Developer</h4>
                <h5>Bots &amp; Automation Specialist</h5>
              </div>
              <h3>2018–21</h3>
            </div>
            <p>
              Built and shipped Telegram, Discord, and trading bots for crypto and
              fintech operators. Pipeline automation, exchange integrations, signal
              engines, and high-throughput notification systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Early Career</h5>
              </div>
              <h3>2015–18</h3>
            </div>
            <p>
              Software engineering across enterprise projects, contributing to
              design, development, and delivery of business applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
