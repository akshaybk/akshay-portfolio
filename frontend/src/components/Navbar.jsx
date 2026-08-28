import { useEffect, useState } from "react";

function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const name = profile?.name || "Portfolio";
  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 180;
      let currentSection = "home";
      for (const section of sections) {
        if (section.offsetTop <= scrollPosition) currentSection = section.id;
        else break;
      }
      setActiveSection(currentSection);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo" onClick={handleNavigation}>{name}</a>
      <button type="button" className={`navbar-menu-button ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} className={activeSection === link.id ? "active" : ""} onClick={handleNavigation}>{link.label}</a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
