import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowUp,
  FaBars,
  FaBookOpen,
  FaBrain,
  FaCode,
  FaDatabase,
  FaDownload,
  FaEnvelope,
  FaFilter,
  FaGithub,
  FaInstagram,
  FaLightbulb,
  FaLinkedinIn,
  FaLocationDot,
  FaMagnifyingGlass,
  FaMedal,
  FaMicrochip,
  FaMoon,
  FaPhone,
  FaRocket,
  FaSchool,
  FaSun,
  FaXmark,
  FaUsers,
  FaXTwitter,
} from "react-icons/fa6";
import { projects, projectCategories } from "./data/projects";
import { skillGroups, majorSkillCategories } from "./data/skills";
import { certificates } from "./data/certificates";
import { achievements } from "./data/achievements";
import { education } from "./data/education";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const typingWords = [
  "AI Enthusiast",
  "Data Science Student",
  "Software Developer",
  "IoT Enthusiast",
  "Future AI Engineer",
  "Technology Explorer",
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yourprofile",
    icon: FaLinkedinIn,
  },
  { label: "GitHub", href: "https://github.com/yourusername", icon: FaGithub },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yourprofile",
    icon: FaInstagram,
  },
  { label: "Twitter/X", href: "https://x.com/yourprofile", icon: FaXTwitter },
];

const interests = [
  { title: "Artificial Intelligence", icon: FaBrain },
  { title: "Data Science", icon: FaDatabase },
  { title: "Software Development", icon: FaCode },
  { title: "IoT Systems", icon: FaMicrochip },
  { title: "Technology Innovation", icon: FaLightbulb },
  { title: "Problem Solving", icon: FaRocket },
  { title: "Sports", icon: FaUsers },
  { title: "Learning New Technologies", icon: FaBookOpen },
];

const testimonials = [
  {
    name: "Future testimonial from professor.",
    text: "Placeholder for a future professor reflection.",
  },
  {
    name: "Future testimonial from mentor.",
    text: "Placeholder for a future mentor reflection.",
  },
  {
    name: "Future testimonial from project collaborator.",
    text: "Placeholder for a future collaborator reflection.",
  },
];

function AnimatedCounter({ value, suffix = "", duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let frameId;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.ceil(progress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [duration, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__glow hero-visual__glow--one" />
      <div className="hero-visual__glow hero-visual__glow--two" />
      <div className="hero-visual__panel hero-visual__panel--main">
        <div className="hero-visual__header">
          <span className="hero-visual__dot" />
          <span className="hero-visual__dot" />
          <span className="hero-visual__dot" />
        </div>
        <div className="hero-visual__chart">
          <span style={{ height: "22%" }} />
          <span style={{ height: "38%" }} />
          <span style={{ height: "56%" }} />
          <span style={{ height: "76%" }} />
          <span style={{ height: "93%" }} />
        </div>
      </div>
      <div className="hero-visual__panel hero-visual__panel--small hero-visual__panel--top">
        <FaBrain />
        <span>AI</span>
      </div>
      <div className="hero-visual__panel hero-visual__panel--small hero-visual__panel--bottom">
        <FaDatabase />
        <span>Data</span>
      </div>
      <div className="hero-visual__ring hero-visual__ring--one" />
      <div className="hero-visual__ring hero-visual__ring--two" />
      <div className="hero-visual__node hero-visual__node--one" />
      <div className="hero-visual__node hero-visual__node--two" />
      <div className="hero-visual__node hero-visual__node--three" />
      <div className="hero-visual__node hero-visual__node--four" />
      <div className="hero-visual__node hero-visual__node--five" />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [certificateFilter, setCertificateFilter] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.slice(0, typedText.length + 1);
          setTypedText(nextText);

          if (nextText === currentWord) {
            setTimeout(() => setIsDeleting(true), 1400);
          }
        } else {
          const nextText = currentWord.slice(0, typedText.length - 1);
          setTypedText(nextText);

          if (nextText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        }
      },
      isDeleting ? 70 : 110,
    );

    return () => clearTimeout(timeout);
  }, [typedText, wordIndex, isDeleting]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled =
        document.documentElement.scrollTop || document.body.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrolled > 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const projectList = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const certificateList = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return certificates.filter((certificate) => {
      const matchesSearch =
        !keyword ||
        certificate.title.toLowerCase().includes(keyword) ||
        certificate.organization.toLowerCase().includes(keyword) ||
        certificate.description.toLowerCase().includes(keyword);

      const matchesFilter =
        certificateFilter === "All" ||
        certificate.organization === certificateFilter;

      return matchesSearch && matchesFilter;
    });
  }, [certificateFilter, searchQuery]);

  const selectedCertificateIndex = selectedCertificate
    ? certificateList.findIndex(
        (certificate) => certificate.id === selectedCertificate.id,
      )
    : -1;

  const goToCertificate = (direction) => {
    if (certificateList.length === 0) return;

    const nextIndex =
      selectedCertificateIndex === -1
        ? 0
        : (selectedCertificateIndex + direction + certificateList.length) %
          certificateList.length;

    setSelectedCertificate(certificateList[nextIndex]);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill in all fields before sending your message.",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setFormStatus({
      type: "success",
      message:
        "Your message has been prepared successfully. This is a portfolio demo form.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <div className="loading-screen__content">
              <p className="loading-screen__name">MANYA SHREE NG</p>
              <div className="loading-screen__line" />
              <p className="loading-screen__tag">AI • DATA • TECHNOLOGY</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="topbar">
        <nav className="navbar glass-card" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Manya Shree NG home">
            Manya Shree NG
          </a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FaXmark /> : <FaBars />}
          </button>

          <div className={`nav-panel ${isMenuOpen ? "is-open" : ""}`}>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="theme-toggle"
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </nav>
      </header>

      <main id="home" className="page-shell">
        <section className="hero-section">
          <div className="section-content hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow">AI & DATA SCIENCE STUDENT</span>
              <h1>
                <span className="highlight">Manya Shree</span>
                <span className="plain"> NG</span>
              </h1>
              <p className="tagline">
                Computer Science Student | AI & Data Science Enthusiast | Future
                Innovator
              </p>
              <div className="typing-block" aria-live="polite">
                <span className="typing-prefix">I am a</span>
                <span className="typing-word">{typedText}</span>
                <span className="typing-cursor">|</span>
              </div>
              <p className="lead">
                Hello! I'm Manya Shree NG from Bangalore, currently pursuing
                B.Tech in Artificial Intelligence and Data Science at Reva
                University. I am passionate about technology, innovation,
                problem-solving, software development, IoT systems, and
                Artificial Intelligence. I enjoy learning new technologies,
                participating in technical projects, and continuously improving
                my skills.
              </p>

              <div className="hero-actions">
                <a
                  className="primary-button"
                  href="#contact"
                  aria-label="Download resume"
                >
                  <FaDownload />
                  Download Resume
                </a>
                <a className="secondary-button" href="#contact">
                  Contact Me
                </a>
              </div>

              <div className="social-row">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="social-link"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hero-visual-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroVisual />
            </motion.div>
          </div>

          <div className="hero-stats">
            {[
              { label: "Projects Completed", value: 3, suffix: "+" },
              { label: "Certifications Earned", value: 3, suffix: "+" },
              { label: "Skills Acquired", value: 10, suffix: "+" },
              { label: "Academic Achievements", value: 5, suffix: "+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="stat-card glass-card"
                whileHover={{ y: -6 }}
              >
                <strong>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">About Me</span>
            <h2>Turning curiosity into technology.</h2>
          </div>

          <div className="about-grid">
            <motion.article
              className="glass-card info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3>Biography</h3>
              <p>
                I am a passionate AI and Data Science student dedicated to
                creating innovative technology solutions. I enjoy working on
                software development, IoT projects, and problem-solving
                applications. My goal is to become an AI Engineer and contribute
                to impactful technological advancements.
              </p>
            </motion.article>

            <div className="interests-grid">
              {interests.map(({ title, icon: Icon }) => (
                <motion.div
                  key={title}
                  className="interest-card glass-card"
                  whileHover={{ y: -6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="interest-icon">
                    <Icon />
                  </div>
                  <span>{title}</span>
                </motion.div>
              ))}
            </div>

            <motion.article
              className="goal-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="goal-header">
                <div className="goal-icon">
                  <FaBrain />
                </div>
                <h3>My Career Goal</h3>
              </div>
              <p>
                To become a skilled AI Engineer and develop intelligent systems
                that solve real-world problems while contributing to the
                advancement of technology.
              </p>
            </motion.article>
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">Skills & Expertise</span>
            <h2>Building a strong foundation for future innovation.</h2>
          </div>

          <div className="skills-layout">
            <div className="skills-categories">
              {majorSkillCategories.map((category) => (
                <motion.div
                  key={category.title}
                  className="glass-card category-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3>{category.title}</h3>
                  <div className="tag-list">
                    {category.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="skill-bars">
              {Object.entries(skillGroups).map(([groupKey, items]) => (
                <div key={groupKey} className="skill-group glass-card">
                  <h3>
                    {groupKey === "programming" && "Programming"}
                    {groupKey === "technical" && "Technical"}
                    {groupKey === "professional" && "Professional"}
                    {groupKey === "personal" && "Personal"}
                  </h3>
                  {items.map((skill) => (
                    <div key={skill.name} className="skill-row">
                      <div className="skill-meta">
                        <span>{skill.name}</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div
                        className="progress-bar"
                        aria-label={`${skill.name} proficiency`}
                      >
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.7 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">Featured Projects</span>
            <h2>Building ideas into practical technology.</h2>
          </div>

          <div className="project-toolbar glass-card">
            <div className="filter-label">
              <FaFilter /> Filters
            </div>
            <div className="filter-row">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    category === activeFilter
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="project-grid">
            {projectList.map((project) => (
              <motion.article
                layout
                key={project.title}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.42 }}
              >
                <div className={`project-visual ${project.accent}`}>
                  <div className="project-badge">{project.category}</div>
                  <div className="project-visual__shape" />
                </div>

                <div className="project-content">
                  <div className="project-header-row">
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>

                  <div className="tech-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mini-button primary-mini"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mini-button secondary-mini"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="project-dashboard glass-card">
            {[
              { value: 3, suffix: "+", label: "Projects" },
              { value: 3, suffix: "", label: "Main Project Areas" },
              { value: 4, suffix: "+", label: "Technology Areas" },
              { value: 100, suffix: "%", label: "Learning Mindset" },
            ].map((item) => (
              <div key={item.label} className="dashboard-item">
                <strong>
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">Achievements</span>
            <h2>Milestones in progress.</h2>
          </div>

          <div className="timeline">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="timeline-node" />
                <div className="timeline-card glass-card">
                  <div className="timeline-date">{achievement.date}</div>
                  <div className="timeline-title-row">
                    <div className="timeline-icon">
                      <FaMedal />
                    </div>
                    <h3>{achievement.title}</h3>
                  </div>
                  <p>{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="certificates" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">Certifications</span>
            <h2>Skills strengthened through learning.</h2>
          </div>

          <div className="certificate-controls glass-card">
            <label className="search-box" aria-label="Search certificates">
              <FaMagnifyingGlass />
              <input
                type="search"
                placeholder="Search certificates"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <div className="cert-filter-row">
              {["All", "IBM", "Instagram", "Wadhwani Foundation"].map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={
                      certificateFilter === filter
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() => setCertificateFilter(filter)}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="certificate-grid">
            {certificateList.map((certificate) => (
              <motion.article
                key={certificate.id}
                className="certificate-card glass-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6 }}
              >
                <img src={certificate.image} alt={certificate.title} />
                <div className="certificate-content">
                  <div className="certificate-meta">
                    <span className="org-tag">{certificate.organization}</span>
                  </div>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.description}</p>
                  <button
                    type="button"
                    className="primary-button certificate-button"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    View Full Certificate
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">Education</span>
            <h2>Academic foundation in AI and data-driven technologies.</h2>
          </div>

          <div className="timeline education-timeline">
            {education.map((item, index) => (
              <motion.div
                key={item.institution}
                className="timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="timeline-node" />
                <div className="timeline-card glass-card education-card">
                  <div className="timeline-title-row education-row">
                    <div className="timeline-icon">
                      <FaSchool />
                    </div>
                    <div>
                      <h3>{item.institution}</h3>
                      <span className="education-semester">
                        {item.semester}
                      </span>
                    </div>
                  </div>
                  <p className="education-degree">{item.degree}</p>
                  <p className="education-location">
                    <FaLocationDot /> {item.location}
                  </p>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-header center-header">
            <span className="section-kicker">What People Say</span>
            <h2>Future professional reflections.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                className="glass-card testimonial-card"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="quote-mark">“</div>
                <p>{testimonial.text}</p>
                <strong>{testimonial.name}</strong>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-header center-header">
            <span className="section-kicker">Let's Connect</span>
            <h2>
              Have an idea, opportunity, or collaboration in mind? Let's
              connect.
            </h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info glass-card">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <label>Email</label>
                  <a href="mailto:makenotes.132@gmail.com">
                    makenotes.132@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div>
                  <label>Phone</label>
                  <a href="tel:+919353193235">+91 9353193235</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FaLocationDot />
                </div>
                <div>
                  <label>Location</label>
                  <span>Yelahanka, Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            <form
              className="contact-form glass-card"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-grid">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                  />
                </label>
              </div>

              <label>
                <span>Subject</span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  placeholder="Project or collaboration"
                />
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your idea or opportunity."
                />
              </label>

              {formStatus.message && (
                <p
                  className={
                    formStatus.type === "success"
                      ? "form-feedback success"
                      : "form-feedback error"
                  }
                >
                  {formStatus.message}
                </p>
              )}

              <button type="submit" className="primary-button submit-button">
                Send Message
              </button>
            </form>
          </div>

          <div className="map-card glass-card">
            <iframe
              title="Location map for Yelahanka Bengaluru"
              src="https://www.google.com/maps?q=Yelahanka%2C%20Bengaluru%2C%20Karnataka%2C%20India&z=12&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a href="#home" className="footer-brand">
              Manya Shree NG
            </a>
            <p>Designed &amp; Built with passion.</p>
          </div>

          <div>
            <h3>Quick Navigation</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Social Media</h3>
            <ul>
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:makenotes.132@gmail.com">
                  makenotes.132@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919353193235">+91 9353193235</a>
              </li>
              <li>Yelahanka, Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright © 2026 Manya Shree NG. All Rights Reserved.</span>
        </div>
      </footer>

      <button
        type="button"
        className={showBackToTop ? "back-to-top visible" : "back-to-top"}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp />
      </button>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="certificate-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="certificate-modal glass-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-title"
            >
              <div className="modal-header">
                <div>
                  <span className="org-tag">
                    {selectedCertificate.organization}
                  </span>
                  <h3 id="certificate-title">{selectedCertificate.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setSelectedCertificate(null)}
                  aria-label="Close certificate viewer"
                >
                  <FaXmark />
                </button>
              </div>

              <div className="modal-body">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="filter-button"
                  onClick={() => goToCertificate(-1)}
                >
                  Previous
                </button>
                <a
                  href={selectedCertificate.fullCertificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button modal-download"
                >
                  <FaDownload />
                  Download
                </a>
                <button
                  type="button"
                  className="filter-button"
                  onClick={() => goToCertificate(1)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
