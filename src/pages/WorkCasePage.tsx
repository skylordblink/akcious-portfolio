import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  WORK_CASE_BY_SLUG,
  type WorkCaseSlug,
  type WorkCaseBlock,
} from "./workCasesData";
import Contact from "../components/Contact";
import SocialIcons from "../components/SocialIcons";
import "./styles/WorkCasePage.css";

const renderBlock = (block: WorkCaseBlock, i: number) => {
  if (block.kind === "paragraph") {
    return (
      <p className="case-paragraph" key={i}>
        {block.text}
      </p>
    );
  }
  if (block.kind === "bullets") {
    return (
      <ul className="case-bullets" key={i}>
        {block.items.map((item, j) => (
          <li key={j}>
            <span className="case-bullet-glyph">{">"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <figure className="case-figure" key={i}>
      <img src={block.src} alt={block.alt} loading="lazy" />
      {block.caption && (
        <figcaption className="case-figcaption">{block.caption}</figcaption>
      )}
    </figure>
  );
};

const WorkCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = slug ? WORK_CASE_BY_SLUG[slug as WorkCaseSlug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="case-page">
        <div className="case-not-found">
          <h2>Case study not found</h2>
          <Link to="/" className="case-back">
            &larr; back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="case-page">
      <header className="case-header">
        <Link to="/" className="case-logo" data-cursor="disable">
          AP
        </Link>
        <button
          onClick={() => navigate("/")}
          className="case-back-link"
          data-cursor="disable"
        >
          &larr; back to home
        </button>
      </header>

      <SocialIcons />

      <section className="case-hero">
        <div className="case-hero-inner">
          <span className="case-eyebrow">Case study</span>
          <h1 className="case-title">{study.title}</h1>
          <p className="case-subtitle">{study.subtitle}</p>
          <p className="case-tagline">{study.heroTagline}</p>

          <ul className="case-meta">
            {study.meta.map((m, i) => (
              <li key={i}>
                <span className="case-meta-label">{m.label}</span>
                <span className="case-meta-value">{m.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="case-hero-image">
          <img
            src={study.coverImage}
            alt={`${study.title} cover image`}
            loading="eager"
          />
        </div>
      </section>

      <section className="case-body section-container">
        {study.sections.map((section, i) => (
          <article className="case-section" key={i}>
            <span className="case-section-eyebrow">{section.eyebrow}</span>
            <h2 className="case-section-heading">{section.heading}</h2>
            <div className="case-section-content">
              {section.blocks.map((b, j) => renderBlock(b, j))}
            </div>
          </article>
        ))}

        <article className="case-section case-stack-section">
          <span className="case-section-eyebrow">Stack</span>
          <h2 className="case-section-heading">Built with</h2>
          <div className="case-stack">
            {study.techStack.map((t, i) => (
              <span key={i} className="what-tags">
                {t}
              </span>
            ))}
          </div>
        </article>

        <article className="case-section case-cta-block">
          <span className="case-section-eyebrow">Next</span>
          <h2 className="case-section-heading">Have a similar build in mind?</h2>
          <p className="case-paragraph">
            Trading tools, analysis automation, desktop apps, mobile-first
            dashboards &mdash; if it ships revenue, it's the kind of work I take on.
          </p>
          <Link to="/#contact" className="case-cta">
            Get in touch &rarr;
          </Link>
        </article>
      </section>

      <Contact />
    </div>
  );
};

export default WorkCasePage;
