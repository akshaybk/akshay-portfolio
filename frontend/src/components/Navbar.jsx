function Navbar({ profile }) {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo">
        {profile?.[0]?.name || "Portfolio"}
      </a>

      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;