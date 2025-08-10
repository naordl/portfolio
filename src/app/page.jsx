"use client";

import "./i18n";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Dropdown,
  Modal,
  Carousel,
} from "react-bootstrap";
import CardSection from "../components/CardSection";
import ContactForm from "../components/ContactForm";

const sections = [
  "about",
  "skills",
  "projects",
  "timeline",
  "achievements",
  "education",
  "publications",
  "contact",
];

const sectionIcons = {
  about: "bi-person-circle",
  skills: "bi-tools",
  projects: "bi-kanban",
  timeline: "bi-clock-history",
  cat_tool: "bi-translate",
  achievements: "bi-trophy",
  education: "bi-mortarboard",
  certifications: "bi-patch-check",
  courses: "bi-journal-code",
  publications: "bi-book",
  contact: "bi-envelope-paper",
};

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "hu", label: "HU", flag: "🇭🇺" },
  { code: "ro", label: "RO", flag: "🇷🇴" },
];

export default function Home() {
  const { t, i18n, ready } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setShowVideo(true); // Lazy-load video on client only
  }, []);

  // Handler for when video starts playing
  const handleVideoPlay = () => setVideoPlaying(true);

  // Handler for when video errors (e.g., autoplay blocked)
  const handleVideoError = () => setVideoPlaying(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (darkMode) {
        html.setAttribute("data-theme", "dark");
      } else {
        html.removeAttribute("data-theme");
      }
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get projects from i18n
  const projects = t("projects.list", { returnObjects: true });
  const showMoreLabel = t("ui.showMore");

  const sharedStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: -2,
    opacity: 0.5,
    transition: "opacity 3s",
    filter: darkMode ? undefined : "invert(1)",
  };

  return (
    <>
      {/* Background video and overlay */}
      {!videoPlaying && (
        <img
          src="/background-fallback.png"
          alt="Background fallback"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: -2,
            transition: "opacity 3s",
            filter: darkMode ? undefined : "invert(1)",
          }}
        />
      )}

      {/* Background video */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onPlay={handleVideoPlay}
          onError={handleVideoError}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: -2,
            opacity: 0.5,
            transition: "opacity 3s",
            display: videoPlaying ? "block" : "none", // Only show video if playing
            filter: darkMode ? undefined : "invert(1)",
          }}
          src="/background.mp4"
        />
      )}

      <Navbar fixed="top" className="shadow-sm px-3">
        <div className="centered-navbar-content">
          <span
            className="text-navbar-brand d-flex align-items-center"
            style={{ fontWeight: 700 }}
          >
            <i className="bi bi-person-badge me-2"></i> {t("hero.name")}
          </span>
          <Nav className="centered-navbar-nav">
            {sections.map((section) => (
              <Nav.Link
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center"
              >
                <i className={`bi ${sectionIcons[section]} me-2`}></i>
                {t(`navbar.${section}`)}
              </Nav.Link>
            ))}
          </Nav>
          <Button
            variant={darkMode ? "dark" : "outline-dark"}
            onClick={handleThemeToggle}
            aria-label="Toggle dark/light mode"
          >
            <i className={darkMode ? "bi bi-moon-stars" : "bi bi-sun"}></i>
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="lang-dropdown">
              <span style={{ fontSize: "1.2em", marginRight: "0.5em" }}>
                {languages.find((l) => l.code === i18n.language)?.flag || "🏳️"}
              </span>
              <span className="lang-switch-label">
                {languages.find((l) => l.code === i18n.language)?.label ||
                  "English"}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {languages.map((lang) => (
                <Dropdown.Item
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                >
                  <span style={{ fontSize: "1.2em", marginRight: "0.5em" }}>
                    {lang.flag}
                  </span>
                  <span className="lang-switch-label">{lang.label}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>
      <div style={{ paddingTop: 80 }}>
        {/* About Section */}
        <section id="about" className="mb-5">
          <Container>
            <div className="card shadow-sm p-4 mb-3">
              <h1 className="section-title d-flex align-items-center">
                <i className="bi bi-person-circle me-2"></i>
                {t("hero.name")}
              </h1>
              <p>{t("hero.summary")}</p>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <span>
                  <i className="bi bi-geo-alt"></i> {t("hero.location")}
                </span>
                {Array.isArray(t("hero.contacts", { returnObjects: true })) &&
                  t("hero.contacts", { returnObjects: true }).map(
                    (contact, idx) => (
                      <a
                        key={idx}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-contact-link"
                      >
                        <i className={`bi ${contact.icon} me-1`}></i>
                        {""}
                        {contact.label}
                      </a>
                    )
                  )}
              </div>

              <div className="mt-3">
                <strong>
                  <i className="bi bi-translate me-2"></i>
                  {t("hero.languages.title")}:
                </strong>
                <ul className="mb-0">
                  {Array.isArray(
                    t("hero.languages.list", { returnObjects: true })
                  ) &&
                    t("hero.languages.list", { returnObjects: true }).map(
                      (lang, idx) => {
                        // Split the label into language and proficiency (in parentheses)
                        const match = lang.label.match(/^(.*?)(\s*\(.*\))$/);
                        return (
                          <li key={idx}>
                            {match ? (
                              <>
                                {match[1]}
                                <strong>{match[2]}</strong>
                              </>
                            ) : (
                              lang.label
                            )}
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            </div>
          </Container>
        </section>
        {/* Skills Section */}
        <CardSection
          id="skills"
          title={
            <>
              <i className="bi bi-tools me-2"></i>
              {t("skills.title")}
            </>
          }
        >
          <div className="row">
            {Array.isArray(t("skills.list", { returnObjects: true })) &&
              t("skills.list", { returnObjects: true }).map((skill, idx) => (
                <div className="col-md-3 mb-3" key={idx}>
                  <div className="card h-100 p-3 subcard">
                    <h5 className="section-subtitle d-flex align-items-center">
                      <i className={`bi ${skill.icon} me-2`}></i>
                      {skill.title}
                    </h5>
                    <ul>
                      {Array.isArray(skill.items) &&
                        skill.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </CardSection>
        {/* Projects Section */}
        <CardSection
          id="projects"
          title={
            <>
              <i className="bi bi-kanban me-2"></i>
              {t("projects.title")}
            </>
          }
        >
          <div className="row">
            {Array.isArray(projects) &&
              projects.map((project, idx) => (
                <div className="col-md-4 mb-3" key={project.id}>
                  <div
                    className="card h-100 p-3 subcard project-card-hover"
                    style={{
                      cursor: "pointer",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onClick={() => {
                      setSelectedProject(project);
                      setShowModal(true);
                    }}
                  >
                    <h5 className="section-subtitle d-flex align-items-center">
                      <i className={`bi ${project.icon} me-2`}></i>
                      {project.title}
                    </h5>
                    <p className="project-card-description">
                      {typeof project.description === "object" ? (
                        <>
                          <strong>
                            {t("projects.descriptionLabels.problem")}:
                          </strong>{" "}
                          {project.description.problem}
                          <br />
                          <strong>
                            {t("projects.descriptionLabels.solution")}:
                          </strong>{" "}
                          {project.description.solution}
                          <br />
                          <strong>
                            {t("projects.descriptionLabels.result")}:
                          </strong>{" "}
                          {project.description.result}
                          <br />
                          <strong>
                            {t("projects.descriptionLabels.learned")}:
                          </strong>{" "}
                          {project.description.learned}
                        </>
                      ) : (
                        project.description
                      )}
                    </p>
                    <div className="project-card-bottom">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="project-card-github"
                          aria-label="GitHub"
                          title="GitHub"
                        >
                          <i className="bi bi-github me-1"></i>GitHub
                        </a>
                      )}
                      <span className="project-card-showmore">
                        {showMoreLabel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardSection>

        {/* Modal for Project Details */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          dialogClassName="project-modal"
          contentClassName="project-modal-content"
          backdropClassName="fade"
        >
          {selectedProject && (
            <>
              <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                  <i className={`bi ${selectedProject.icon} me-2`}></i>
                  {selectedProject.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedProject.images &&
                  selectedProject.images.length > 0 && (
                    <Carousel fade interval={4000} className="mb-3">
                      {selectedProject.images.map((img, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            src={img}
                            alt={
                              selectedProject.title + " screenshot " + (idx + 1)
                            }
                            className="d-block w-100 rounded project-modal-image"
                            style={{
                              maxHeight: 320,
                              objectFit: "cover",
                              cursor: "zoom-in",
                            }}
                            onClick={() => setEnlargedImage(img)}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}

                {selectedProject.stack &&
                  Array.isArray(selectedProject.stack) && (
                    <div className="mb-3">
                      <strong>
                        <i className="bi bi-layers me-2"></i>
                        {t("projects.stackLabel")}
                      </strong>
                      <div className="mt-1">
                        {selectedProject.stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="badge tech-stack me-1"
                            style={{ fontSize: "0.95em" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedProject.description &&
                typeof selectedProject.description === "object" ? (
                  <div className="project-description-structured mb-3">
                    {selectedProject.description.problem && (
                      <div>
                        <strong>
                          {t("projects.descriptionLabels.problem")}:
                        </strong>{" "}
                        {selectedProject.description.problem}
                      </div>
                    )}
                    {selectedProject.description.solution && (
                      <div>
                        <strong>
                          {t("projects.descriptionLabels.solution")}:
                        </strong>{" "}
                        {selectedProject.description.solution}
                      </div>
                    )}
                    {selectedProject.description.result && (
                      <div>
                        <strong>
                          {t("projects.descriptionLabels.result")}:
                        </strong>{" "}
                        {selectedProject.description.result}
                      </div>
                    )}
                    {selectedProject.description.learned && (
                      <div>
                        <strong>
                          {t("projects.descriptionLabels.learned")}:
                        </strong>{" "}
                        {selectedProject.description.learned}
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{selectedProject.description}</p>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-github me-1"></i>GitHub
                  </a>
                )}
              </Modal.Body>
            </>
          )}
        </Modal>

        {/* Timeline Section */}
        <CardSection
          id="timeline"
          title={
            <>
              <i className="bi bi-clock-history me-2"></i>
              {t("timeline.title")}
            </>
          }
        >
          <div className="row">
            {/* Journey subcard */}
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3 subcard">
                <h5 className="section-subtitle d-flex align-items-center">
                  <i className="bi bi-flag me-2"></i>
                  {t("timeline.journey.title")}
                </h5>
                <ul>
                  {Array.isArray(
                    t("timeline.journey.events", { returnObjects: true })
                  ) &&
                    t("timeline.journey.events", { returnObjects: true }).map(
                      (entry, idx) => (
                        <li key={idx}>
                          <strong>{entry.year}:</strong> {entry.text}
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
            {/* Currently Learning subcard */}
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3 subcard">
                <h5 className="section-subtitle d-flex align-items-center">
                  <i className="bi bi-lightbulb me-2"></i>
                  {t("timeline.currentlyLearning.title")}
                </h5>
                <ul>
                  {Array.isArray(
                    t("timeline.currentlyLearning.items", {
                      returnObjects: true,
                    })
                  ) &&
                    t("timeline.currentlyLearning.items", {
                      returnObjects: true,
                    }).map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>
            {/* Next Steps subcard */}
            <div className="col-md-4 mb-3">
              <div className="card h-100 p-3 subcard">
                <h5 className="section-subtitle d-flex align-items-center">
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  {t("timeline.nextSteps.title")}
                </h5>
                <ul>
                  {Array.isArray(
                    t("timeline.nextSteps.items", { returnObjects: true })
                  ) &&
                    t("timeline.nextSteps.items", { returnObjects: true }).map(
                      (item, idx) => <li key={idx}>{item}</li>
                    )}
                </ul>
              </div>
            </div>
          </div>
        </CardSection>

        {/* Achievements Section */}
        <CardSection
          id="achievements"
          title={
            <>
              <i className="bi bi-trophy me-2"></i>
              {t("achievements.title")}
            </>
          }
        >
          <ul>
            {Array.isArray(t("achievements.list", { returnObjects: true })) &&
              t("achievements.list", { returnObjects: true }).map(
                (item, idx) => (
                  <li key={idx}>
                    <i className="bi me-2"></i>
                    {item}
                  </li>
                )
              )}
          </ul>
        </CardSection>
        {/* Education Section */}
        <CardSection
          id="education"
          title={
            <>
              <i className="bi bi-mortarboard me-2"></i>
              {t("education.title")}
            </>
          }
        >
          <ul>
            {Array.isArray(t("education.list", { returnObjects: true })) &&
              t("education.list", { returnObjects: true }).map((item, idx) => (
                <li key={idx}>
                  <i className="bi me-2"></i>
                  {item}
                </li>
              ))}
          </ul>
        </CardSection>
        {/* Publications Section */}
        <CardSection
          id="publications"
          title={
            <>
              <i className="bi bi-book me-2"></i>
              {t("publications.title")}
            </>
          }
        >
          <p>{t("publications.name")}</p>
          <ul>
            {Array.isArray(t("publications.links", { returnObjects: true })) &&
              t("publications.links", { returnObjects: true }).map(
                (link, idx) => (
                  <li key={idx}>
                    <i className="bi me-2"></i>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-link-45deg me-1"></i>
                      {link.label}
                    </a>
                  </li>
                )
              )}
          </ul>
        </CardSection>

        {/* Contact Section */}
        <CardSection
          id="contact"
          title={
            <>
              <i className="bi bi-envelope-paper me-2"></i>
              {t("contact.title")}
            </>
          }
        >
          <p>{t("contact.description")}</p>
          <ContactForm t={t} />
        </CardSection>
      </div>
      {/* Lightbox overlay for enlarged image */}
      {enlargedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged project screenshot"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-close"
            onClick={() => setEnlargedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
