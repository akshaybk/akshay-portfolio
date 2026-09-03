import { useEffect, useState } from "react";
import { adminRequest } from "../services/api";

const visibilitySections = [
  { key: "hero", label: "Hero", description: "Your landing section and introduction." },
  { key: "about", label: "About", description: "Your personal introduction and details." },
  { key: "skills", label: "Skills", description: "Technology and proficiency cards." },
  { key: "experience", label: "Experience", description: "Your professional experience timeline." },
  { key: "education", label: "Education", description: "Your academic background." },
  { key: "projects", label: "Projects", description: "Your selected projects and work." },
  { key: "contact", label: "Contact", description: "Your contact and social links section." },
  { key: "footer", label: "Footer", description: "The closing footer at the bottom of your portfolio." },
];

const defaults = visibilitySections.reduce((result, section) => {
  result[section.key] = true;
  return result;
}, {});

function SectionVisibilityEditor({ value, onSaved }) {
  const [visibility, setVisibility] = useState({ ...defaults, ...(value?.section_visibility || {}) });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setVisibility({ ...defaults, ...(value?.section_visibility || {}) });
  }, [value]);

  const toggle = (key) => {
    setVisibility((current) => ({ ...current, [key]: !current[key] }));
  };

  const save = async () => {
    if (!value?.id) {
      setStatus("Create site settings first before changing section visibility.");
      return;
    }

    setSaving(true);
    setStatus("");
    try {
      await adminRequest(`/site-settings/${value.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...value,
          section_visibility: visibility,
        }),
      });
      await onSaved();
      setStatus("Section visibility saved successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to save section visibility.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-editor visibility-editor">
      <div className="visibility-header">
        <div>
          <p className="admin-eyebrow">Public portfolio</p>
          <h2>Section visibility</h2>
          <p className="admin-muted">Choose which sections appear on your public portfolio. Changes apply after saving.</p>
        </div>
        <div className="visibility-summary">
          {Object.values(visibility).filter(Boolean).length}/{visibilitySections.length} visible
        </div>
      </div>

      <div className="visibility-list">
        {visibilitySections.map((section) => (
          <div className={`visibility-row ${visibility[section.key] ? "enabled" : "disabled"}`} key={section.key}>
            <div className="visibility-copy">
              <strong>{section.label}</strong>
              <span>{section.description}</span>
            </div>
            <button
              type="button"
              className="visibility-toggle"
              role="switch"
              aria-checked={Boolean(visibility[section.key])}
              aria-label={`${visibility[section.key] ? "Hide" : "Show"} ${section.label} section`}
              onClick={() => toggle(section.key)}
            >
              <span className="visibility-toggle-track"><span /></span>
              <span className="visibility-toggle-label">{visibility[section.key] ? "ON" : "OFF"}</span>
            </button>
          </div>
        ))}
      </div>

      {status && <div className={status.includes("successfully") ? "admin-success" : "admin-error"}>{status}</div>}
      <div className="admin-editor-actions">
        <button type="button" className="admin-primary-button admin-save-button" disabled={saving} onClick={save}>
          {saving ? "Saving..." : "Save visibility"}
        </button>
      </div>
    </section>
  );
}

export default SectionVisibilityEditor;
