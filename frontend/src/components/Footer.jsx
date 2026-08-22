function Footer({ siteSettings }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()}{" "}
        {siteSettings?.site_title || "Portfolio"}
      </p>
    </footer>
  );
}

export default Footer;