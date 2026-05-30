import { lazy, Suspense, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SERVICE_BY_SLUG, type ServiceKey } from "./servicesData";
import Contact from "../components/Contact";
import SocialIcons from "../components/SocialIcons";
import "./styles/ServicePage.css";

const Service3D = lazy(() => import("../components/Service3D"));

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? SERVICE_BY_SLUG[slug as ServiceKey] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="service-page">
        <div className="service-not-found">
          <h2>Service not found</h2>
          <Link to="/" className="service-back">
            ← back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-page">
      <header className="service-header">
        <Link to="/" className="service-logo" data-cursor="disable">
          AP
        </Link>
        <button
          onClick={() => navigate("/")}
          className="service-back-link"
          data-cursor="disable"
        >
          ← back to home
        </button>
      </header>

      <SocialIcons />

      <section className="service-hero">
        <div className="service-hero-left">
          <span className="service-eyebrow">{service.shortTitle}</span>
          <h1 className="service-title">{service.title}</h1>
          <p className="service-tagline">{service.tagline}</p>
        </div>
        <div className="service-hero-right">
          <Suspense fallback={<div className="service-three-fallback" />}>
            <Service3D kind={service.threeKind} />
          </Suspense>
        </div>
      </section>

      <section className="service-body section-container">
        <div className="service-block">
          <h3 className="service-block-title">The problem</h3>
          <p className="service-paragraph">{service.problem}</p>
        </div>

        <div className="service-block">
          <h3 className="service-block-title">What I deliver</h3>
          <ul className="service-delivers">
            {service.delivers.map((d, i) => (
              <li key={i}>
                <span className="service-glyph">{">"}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-block">
          <h3 className="service-block-title">Stack</h3>
          <div className="service-stack">
            {service.stack.map((s, i) => (
              <span key={i} className="what-tags">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="service-block service-cta-block">
          <h3 className="service-block-title">Start a project</h3>
          <p className="service-paragraph">
            Get in touch and let's scope it. I take a small number of
            engagements at a time — when it's a fit, I move fast.
          </p>
          <Link to="/#contact" className="service-cta">
            Reach out →
          </Link>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ServicePage;
