import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">(
    "idle"
  );
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);

  /* ================= SCROLL REFS ================= */
  const homeRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  /* ================= ANIMATION REFS ================= */
  const animatedSections = useRef<(HTMLElement | null)[]>([]);
  const animatedCards = useRef<(HTMLElement | null)[]>([]);


  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= ANIMATION STYLES ================= */
  const sectionFade: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 0.9s ease, transform 0.9s ease",
  };

  const cardFade = (delay = 0): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(35px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  const cardHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = "translateY(-10px) scale(1.025)";
  };

  const cardHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = "translateY(0) scale(1)";
  };

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedSections.current.forEach((el) => el && observer.observe(el));
    animatedCards.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ================= SEO META ================= */
  useEffect(() => {
    document.title =
      "QUNO LABS – AI, Data Science & Web Solutions for Startups";

    const metaDesc =
      (document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement) || document.createElement("meta");

    metaDesc.name = "description";
    metaDesc.content =
      "QUNO LABS is a next-generation technology studio delivering AI solutions, data science & analytics, and scalable web development.";
    document.head.appendChild(metaDesc);
  }, []);

  /* ================= RENDER ================= */
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        color: "#fff",
        background:
          "radial-gradient(circle at top right, rgba(109,59,191,0.35), transparent 40%), radial-gradient(circle at bottom left, rgba(75,44,122,0.35), transparent 45%), linear-gradient(180deg, #0B0F1A, #12172A)",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          background: "rgba(11,15,26,0.7)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
        }}
      >
        <strong>QUNO LABS</strong>
        <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }}>
          ☰
        </div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 70,
            right: 30,
            padding: 20,
            borderRadius: 16,
            background: "rgba(0,0,0,0.6)",
          }}
        >
          <div onClick={() => scrollTo(projectsRef)}>Projects</div>
          <div onClick={() => scrollTo(servicesRef)}>Services</div>
          <div onClick={() => scrollTo(whyRef)}>Why Us</div>
          <div onClick={() => scrollTo(ctaRef)}>Contact</div>
        </div>
      )}

      {/* HERO */}
      <section
        ref={(el) => {
          animatedSections.current[0] = el;
        }}
        style={sectionFade}
      >
        <h1>Building the Future with QUNO LABS</h1>
        <p>AI • Data Science • Web Engineering</p>
      </section>
    </div>
  );
}

