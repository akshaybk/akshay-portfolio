import { useEffect, useState } from "react";

function Navbar({ profile, visibility = {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const name = profile?.name || "Portfolio";
  const allLinks = [
    { label: "Home", id: "home", key: "hero" },
    { label: "About", id: "about", key: "about" },
    { label: "Skills", id: "skills", key: "skills" },
    { label: "Experience", id: "experience", key: "experience" },
    { label: "Education", id: "education", key: "education" },
    { label: "Projects", id: "projects", key: "projects" },
    { label: "Contact", id: "contact", key: "contact" }
  ];
  const links = allLinks.filter((link) => visibility[link.key] !== false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean);
      if (sections.length === 0) {
        setActiveSection("");
        return;
      }

      const scrollPosition = window.scrollY + 180;
      let currentSection = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) currentSection = section.id;
        else break;
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [visibility]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleNavigation = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <a href={visibility.hero !== false ? "#home" : "#"} className="navbar-logo" onClick={handleNavigation}>{name}</a>
      <button
        type="button"
        className={`navbar-menu-button ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        <span /><span /><span />
      </button>
      <div id="primary-navigation" className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={activeSection === link.id ? "active" : ""} onClick={handleNavigation}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
