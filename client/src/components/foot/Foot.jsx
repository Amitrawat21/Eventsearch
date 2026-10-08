import "./Foot.css";

const columns = [
  {
    title: "Use Cases",
    links: ["Explainer & How to", "Marketing", "Training & Onboarding"],
  },
  {
    title: "Features",
    links: [
      "Instant Avatar",
      "Studio Avatar",
      "Video Translate",
      "Voice Cloning",
      "Photo Avatar",
      "AI Voices",
      "Personalized Video",
      "Realtime Avatar",
      "AI Avatars",
      "HeyGen API",
      "Zapier",
    ],
  },
  {
    title: "Resources",
    links: [
      "FAQ",
      "Blog",
      "Tutorial",
      "Weekly Webinar",
      "Case Studies",
      "Help Center",
      "Alternative",
      "Ambassador Program",
      "Creator Fund",
      "Affiliate Program",
      "Status",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Privacy Policy",
      "Terms of Service",
      "Security Portal",
      "Ethics",
      "Moderation Policy",
      "Contact",
    ],
  },
];

const avatarImage =
  "https://www.figma.com/api/mcp/asset/6b3aa8d0-4e5d-4fe2-9acb-0cb704deb2f8.png";
const heroImage =
  "https://www.figma.com/api/mcp/asset/a9c6df2e-4e77-4101-b14a-26a9fce81cf8.png";
const logoSvg =
  "https://www.figma.com/api/mcp/asset/dd5271af-bbce-4dc0-8dbb-131b6470afbd.svg";
const arrowSvg =
  "https://www.figma.com/api/mcp/asset/2a29e4a0-374a-4896-8a75-d0d32f3db944.svg";
const socialIcons = [
  {
    src: "https://www.figma.com/api/mcp/asset/73368c8a-ec73-4866-92ee-29aaf681148d.svg",
    label: "Social icon 1",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/894a5fef-3917-42fa-be14-c02dadc2a468.svg",
    label: "Social icon 2",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/f0a2320b-f995-4e7d-91a2-f98fda095893.svg",
    label: "Social icon 3",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/34d09a1b-7b68-4634-b308-f21ff11e124d.svg",
    label: "Social icon 4",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/1d434f8b-105f-4fa5-96f2-070e32390a8e.svg",
    label: "Social icon 5",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/8f608155-99f0-4f43-aace-be97502ee42b.svg",
    label: "Social icon 6",
  },
];

export default function Foot() {
  return (
    <section className="footer-section">
      <div className="footer-shell">
        <div className="footer-layout">
          <div className="hero-card">
            <div className="hero-card__surface" />

            <img
              className="hero-card__avatar"
              src={avatarImage}
              alt="Floating avatar background"
            />
            <img
              className="hero-card__hero"
              src={heroImage}
              alt="Footer hero illustration"
            />

            <div className="hero-card__logo">
              <img src={logoSvg} alt="Brand logo" />
            </div>

            <a className="hero-card__cta" href="#">
              <span>Get started for free</span>
              <img
                className="hero-card__cta-icon"
                src={arrowSvg}
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="links-card">
            <div className="links-columns">
              {columns.map((column) => (
                <div className="footer-column" key={column.title}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-address">
            <p>©Copyright 2023 HeyGen</p>
            <p>12130 Millennium Drive Suite 300, Los Angeles, CA 90094</p>
          </div>

          <div className="social-icons" aria-label="Social links">
            {socialIcons.map((icon) => (
              <a key={icon.label} href="#" aria-label={icon.label}>
                <img src={icon.src} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
