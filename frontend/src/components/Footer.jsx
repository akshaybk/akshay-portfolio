function Footer({ siteSettings }) {
  const year = new Date().getFullYear();
  const siteTitle =
    siteSettings?.site_title || "Portfolio";

  return (
    <footer className="footer">
      <p>
        © {year} {siteTitle}
      </p>

      <span className="footer-note">
        Built with React
      </span>
    </footer>
  );
}

export default Footer;