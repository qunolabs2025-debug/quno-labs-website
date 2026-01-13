import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);

  /* ================= SCROLL REFS ================= */
  const homeRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const whyRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  /* ================= ANIMATION REFS ================= */
  const animatedSections = useRef<HTMLDivElement[]>([]);
  const animatedCards = useRef<HTMLDivElement[]>([]);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= SCROLL-IN ANIMATIONS ================= */
  useEffect(() => {
    /* ================= SCROLL-IN ANIMATIONS ================= */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedSections.current.forEach((el) => el && observer.observe(el));
    animatedCards.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ================= SEO META SETUP ================= */
  useEffect(() => {
    document.title = "QUNO LABS – AI, Data Science & Web Solutions for Startups";

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "QUNO LABS is a next-generation technology studio delivering AI solutions, data science & analytics, and scalable web development for startups and growing businesses.";
    document.head.appendChild(metaDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "QUNO LABS – Building the Future with Intelligent Technology";
    document.head.appendChild(ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
    ogDesc.setAttribute("property", "og:description");
    ogDesc.content = "We build intelligent AI systems, data-driven platforms, and scalable web solutions for startups and ambitious teams.";
    document.head.appendChild(ogDesc);

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    ogType.content = "website";
    document.head.appendChild(ogType);
  }, []);

  const sectionFade = {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "opacity 0.9s ease, transform 0.9s ease",
  };

  const cardFade = (delay = 0) => ({
    opacity: 0,
    transform: "translateY(35px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  /* ================= MICRO MOTION HELPERS ================= */
  const cardHoverEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-10px) scale(1.025)";
    e.currentTarget.style.backgroundPosition = "100% 100%";
  };

  const cardHoverLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.backgroundPosition = "0% 0%";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "Inter, sans-serif",
        color: "#ffffff",
        background:
          "radial-gradient(circle at top right, rgba(109,59,191,0.35), transparent 40%), radial-gradient(circle at bottom left, rgba(75,44,122,0.35), transparent 45%), linear-gradient(180deg, #0B0F1A, #12172A)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* ================= HEADER ================= */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(11,15,26,0.7)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
        }}
      >
        <strong style={{ fontSize: 18 }}>QUNO LABS</strong>
        <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", width: 26 }}>
          <div style={{ height: 3, background: "#fff", marginBottom: 5 }} />
          <div style={{ height: 3, background: "#fff", marginBottom: 5 }} />
          <div style={{ height: 3, background: "#fff" }} />
        </div>
      </header>

      {/* ================= MENU ================= */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 70,
            right: 30,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            backdropFilter: "blur(12px)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
            zIndex: 999,
          }}
        >
          {[
            { label: "Projects", ref: projectsRef },
            { label: "Services", ref: servicesRef },
            { label: "Why QUNO LABS", ref: whyRef },
            { label: "Let’s Build", ref: ctaRef },
          ].map((item, i) => (
            <div
              key={i}
              style={{ padding: "10px 0", cursor: "pointer" }}
              onClick={() => {
                setMenuOpen(false);
                scrollTo(item.ref);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div style={{ marginTop: 120, width: "100%", maxWidth: 1200 }}>
        {/* ================= HERO ================= */}
        <section
          ref={(el) => {
            homeRef.current = el;
            animatedSections.current[0] = el;
          }}
          style={sectionFade}
        >
          <h1 style={{ fontSize: 52, fontWeight: 800 }}>
            Building the Future with <span
              style={{
                background: "linear-gradient(135deg, #4FE8FF, #8A6BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "#9FB3FF", /* fallback for clarity */
                display: "inline-block",
                textShadow: "0 1px 6px rgba(0,0,0,0.35)",
              }}
            >QUNO LABS</span>
          </h1>
          <p style={{ maxWidth: 760, margin: "24px auto", fontSize: 18, opacity: 0.95 }}>
            We are a next-generation technology studio crafting intelligent AI systems, powerful data solutions, and scalable web platforms for startups and ambitious businesses.
          </p>
        </section>

        {/* ================= PROJECT PREVIEWS ================= */}
        <section
          ref={(el) => {
            projectsRef.current = el;
            animatedSections.current[1] = el;
          }}
          style={{ ...sectionFade, marginTop: 160 }}
        >
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Project Previews</h2>
          <p style={{ maxWidth: 780, margin: "20px auto 60px", opacity: 0.9 }}>
            These are representative systems we are actively building and refining — each designed to solve real-world problems with production-ready architecture.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 36,
            }}
          >
            {[{
              title: "AI Automation Platform",
              desc: "An intelligent automation engine that streamlines repetitive business workflows using machine learning, rules engines, and real-time decision logic.",
              tech: "AI · Python · APIs · Cloud",
            }, {
              title: "Advanced Analytics Dashboard",
              desc: "A real-time analytics and visualization platform that transforms raw data into actionable insights for faster, smarter business decisions.",
              tech: "Data Science · Dashboards · BI",
            }, {
              title: "Startup Web Platform",
              desc: "A scalable, high-performance web application built to support rapid growth, secure user flows, and modern UX expectations.",
              tech: "React · Backend APIs · Cloud",
            }].map((p, i) => (
              <div
                key={i}
                ref={(el) => (animatedCards.current[i] = el)}
                style={{
                  ...cardFade(i * 120),
                  padding: 36,
                  borderRadius: 28,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={cardHoverEnter}
                onMouseLeave={cardHoverLeave}
              >
                <h3 style={{ marginBottom: 14 }}>{p.title}</h3>
                <p style={{ fontSize: 15, opacity: 0.92, marginBottom: 14 }}>{p.desc}</p>
                <span style={{ fontSize: 13, color: "#B99CFF", display: "block", marginBottom: 14 }}>{p.tech}</span>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, background: "rgba(109,59,191,0.18)" }}>In Development</span>
                  <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, background: "rgba(0,200,150,0.18)" }}>Scalable Architecture</span>
                  <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.12)" }}>Production-Ready Design</span>
                </div>

                <p style={{ fontSize: 14, opacity: 0.85 }}>
                  Case study and metrics will be published as this system moves into active deployments.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section
          ref={(el) => {
            servicesRef.current = el;
            animatedSections.current[2] = el;
          }}
          style={{ ...sectionFade, marginTop: 120 }}
        >
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Our Services</h2>
          <p style={{ maxWidth: 820, margin: "20px auto 70px", opacity: 0.9 }}>
            We don’t just build features — we design systems. Each service below is structured to support long-term scalability, clarity, and measurable business impact.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
            }}
          >
            {/* AI SOLUTIONS */}
            <div
              ref={(el) => (animatedCards.current[10] = el)}
              style={{
                ...cardFade(0),
                padding: 42,
                borderRadius: 32,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                backdropFilter: "blur(16px)",
                boxShadow: "0 32px 90px rgba(0,0,0,0.6)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                textAlign: "left",
              }}
            >
              <h3 style={{ marginBottom: 14 }}>AI Solutions</h3>
              <p style={{ fontSize: 16, opacity: 0.92, marginBottom: 18 }}>
                We design and deploy intelligent systems that automate decision-making, reduce manual effort, and unlock new efficiencies.
              </p>
              <ul style={{ paddingLeft: 18, lineHeight: 1.8, opacity: 0.9 }}>
                <li>Business process automation</li>
                <li>Predictive & recommendation models</li>
                <li>Custom ML pipelines</li>
                <li>AI-powered internal tools</li>
              </ul>
            </div>

            {/* DATA SCIENCE */}
            <div
              ref={(el) => (animatedCards.current[11] = el)}
              style={{
                ...cardFade(140),
                padding: 42,
                borderRadius: 32,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                backdropFilter: "blur(16px)",
                boxShadow: "0 32px 90px rgba(0,0,0,0.6)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                textAlign: "left",
              }}
            >
              <h3 style={{ marginBottom: 14 }}>Data Science & Analytics</h3>
              <p style={{ fontSize: 16, opacity: 0.92, marginBottom: 18 }}>
                We turn raw, fragmented data into structured intelligence that teams can trust and act on.
              </p>
              <ul style={{ paddingLeft: 18, lineHeight: 1.8, opacity: 0.9 }}>
                <li>Data pipelines & ETL systems</li>
                <li>Dashboards & KPI monitoring</li>
                <li>Advanced analytics & forecasting</li>
                <li>Decision-support systems</li>
              </ul>
            </div>

            {/* WEB DEVELOPMENT */}
            <div
              ref={(el) => (animatedCards.current[12] = el)}
              style={{
                ...cardFade(280),
                padding: 42,
                borderRadius: 32,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                backdropFilter: "blur(16px)",
                boxShadow: "0 32px 90px rgba(0,0,0,0.6)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                textAlign: "left",
              }}
            >
              <h3 style={{ marginBottom: 14 }}>Web Development</h3>
              <p style={{ fontSize: 16, opacity: 0.92, marginBottom: 18 }}>
                We build high-performance web platforms that scale with your product, users, and ambitions.
              </p>
              <ul style={{ paddingLeft: 18, lineHeight: 1.8, opacity: 0.9 }}>
                <li>Modern frontend & backend systems</li>
                <li>Scalable architecture & APIs</li>
                <li>Secure authentication flows</li>
                <li>Production-ready deployments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= HOW WE WORK ================= */}
        <section
          style={{ ...sectionFade, marginTop: 120 }}
        >
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>How We Work</h2>
          <p style={{ maxWidth: 780, margin: "20px auto 60px", opacity: 0.9 }}>
            Our process is simple, transparent, and execution-focused — designed to move fast without compromising quality.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 36,
            }}
          >
            {[{
              step: "01",
              title: "Understand the Problem",
              desc: "We start by deeply understanding your business goals, constraints, and real-world challenges — not just feature requests.",
            }, {
              step: "02",
              title: "Design the Solution",
              desc: "We architect scalable, secure, and future-ready systems with the right technologies chosen for your use case.",
            }, {
              step: "03",
              title: "Build & Iterate",
              desc: "We execute with speed, share progress early, and iterate based on feedback to reach production-ready quality.",
            }, {
              step: "04",
              title: "Deliver & Support",
              desc: "We deploy, document, and support your system so it performs reliably as you grow.",
            }].map((p, i) => (
              <div
                key={i}
                style={{
                  ...cardFade(i * 120),
                  padding: 36,
                  borderRadius: 28,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 28px 75px rgba(0,0,0,0.55)",
                }}
                onMouseEnter={cardHoverEnter}
                onMouseLeave={cardHoverLeave}
              >
                <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 6 }}>STEP {p.step}</div>
                <h3 style={{ marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 15, opacity: 0.92 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY QUNO LABS ================= */}
        <section
          ref={(el) => {
            whyRef.current = el;
            animatedSections.current[3] = el;
          }}
          style={{ ...sectionFade, marginTop: 80 }}
        >
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Why QUNO LABS</h2>
          <p style={{ maxWidth: 780, margin: "20px auto 60px", opacity: 0.9 }}>
            We partner with founders, startups, and teams who believe in innovation, execution excellence, and the power of young technical talent.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 40,
            }}
          >
            {[{
              title: "Problem-First Mindset",
              desc: "We deeply analyze challenges before choosing tools, ensuring every solution is built for real impact — not hype.",
            }, {
              title: "Youth-Driven Execution",
              desc: "Our team brings fresh perspectives, strong fundamentals, and high ownership into every project we build.",
            }, {
              title: "Engineered to Scale",
              desc: "Every system is designed with scalability, security, and long-term growth in mind from day one.",
            }].map((w, i) => (
              <div
                key={i}
                ref={(el) => (animatedCards.current[20 + i] = el)}
                style={{
                  ...cardFade(i * 150),
                  padding: 38,
                  borderRadius: 28,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 28px 75px rgba(0,0,0,0.55)",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={cardHoverEnter}
                onMouseLeave={cardHoverLeave}
              >
                <h3 style={{ marginBottom: 16 }}>{w.title}</h3>
                <p style={{ fontSize: 16, opacity: 0.92 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA + CONTACT ================= */}
        <section
          ref={(el) => {
            ctaRef.current = el;
            animatedSections.current[4] = el;
          }}
          style={{ ...sectionFade, marginTop: 200 }}
        >
          <div
            style={{
              padding: "80px 60px",
              borderRadius: 36,
              background:
                "linear-gradient(135deg, rgba(75,44,122,0.95), rgba(109,59,191,0.95))",
              boxShadow: "0 50px 120px rgba(109,59,191,0.6)",
            }}
          >
            <h2 style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Let’s Build Something Powerful</h2>
            <p style={{ maxWidth: 820, margin: "0 auto 50px", fontSize: 18, opacity: 0.95 }}>
              Have an idea, challenge, or vision? Let’s discuss how QUNO LABS can turn it into a production-ready solution.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 28,
                maxWidth: 980,
                margin: "0 auto",
              }}
            >
              <input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(109,59,191,0.8), 0 20px 60px rgba(109,59,191,0.45)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  border: "none",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  outline: "none",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}
              />
              <input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                style={{
                  padding: 18,
                  borderRadius: 16,
                  border: "none",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  outline: "none",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  boxShadow: formData.email
                    ? isEmailValid
                      ? "0 0 0 2px rgba(0,200,150,0.6), 0 18px 55px rgba(0,200,150,0.35)"
                      : "0 0 0 2px rgba(255,80,80,0.7), 0 18px 55px rgba(255,80,80,0.35)"
                    : "none",
                }}
              />
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(109,59,191,0.8), 0 22px 70px rgba(109,59,191,0.45)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                style={{
                  gridColumn: "1 / -1",
                  padding: 20,
                  borderRadius: 20,
                  border: "none",
                  background: "rgba(0,0,0,0.3)",
                  color: "#fff",
                  outline: "none",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}
              />
            </div>

            <div style={{ marginTop: 48 }}>
              <button
                disabled={formStatus === "sending" || !formData.name || !isEmailValid}
                onClick={async () => {
                  if (!formData.name || !isEmailValid) return;

                  setFormStatus("sending");

                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(formData),
                    });

                    if (!res.ok) throw new Error("Failed");

                    setFormStatus("success");
                    setFormData({ name: "", email: "", message: "" });
                  } catch {
                    setFormStatus("idle");
                    alert("Something went wrong. Please try again.");
                  }
                }}

                style={{
                  padding: "18px 56px",
                  borderRadius: 999,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #0B0F1A, #1A1F36)",
                  color: "#fff",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                  opacity: formStatus === "sending" ? 0.6 : 1,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {formStatus === "sending"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent ✓"
                  : "Start the Conversation"}
              </button>

              {formStatus === "success" && (
                <div
                  style={{
                    marginTop: 28,
                    padding: "22px 28px",
                    borderRadius: 20,
                    maxWidth: 520,
                    marginLeft: "auto",
                    marginRight: "auto",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
                    animation: "fadeInUp 0.5s ease",
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>Thanks for reaching out 🚀</h4>
                  <p style={{ fontSize: 15, opacity: 0.9 }}>
                    We’ve received your message. Our team will get back to you shortly to discuss your idea.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            marginTop: 160,
            padding: "80px 40px",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ marginBottom: 12 }}>QUNO LABS</h3>
            <p style={{ maxWidth: 640, margin: "0 auto 32px", opacity: 0.85 }}>
              Futuristic, youth-driven technology studio delivering AI-powered,
              data-centric, and scalable digital solutions.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 28,
                flexWrap: "wrap",
                fontSize: 14,
                opacity: 0.85,
              }}
            >
              <span style={{ cursor: "pointer" }} onClick={() => scrollTo(homeRef)}>Home</span>
              <span style={{ cursor: "pointer" }} onClick={() => scrollTo(projectsRef)}>Projects</span>
              <span style={{ cursor: "pointer" }} onClick={() => scrollTo(servicesRef)}>Services</span>
              <span style={{ cursor: "pointer" }} onClick={() => scrollTo(ctaRef)}>Contact</span>
            </div>

            <div style={{ marginTop: 40, fontSize: 13, opacity: 0.6 }}>
              © {new Date().getFullYear()} QUNO LABS. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
