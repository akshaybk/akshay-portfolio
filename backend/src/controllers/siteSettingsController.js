const supabase = require("../config/supabase");

const getSiteSettings = async (req, res) => {
  try { const { data, error } = await supabase.from("site_settings").select("*").order("id", { ascending: true }).limit(1).maybeSingle(); if (error) throw error; res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch site settings", error: error.message }); }
};
const createSiteSettings = async (req, res) => {
  try { const { site_title, site_description, accent_color, github_username, linkedin_url, contact_email } = req.body; const { data, error } = await supabase.from("site_settings").insert([{ site_title, site_description, accent_color, github_username, linkedin_url, contact_email }]).select().single(); if (error) throw error; res.status(201).json({ success: true, message: "Site settings created successfully", data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to create site settings", error: error.message }); }
};
const updateSiteSettings = async (req, res) => {
  try { const { id } = req.params; const updates = { site_title: req.body.site_title, site_description: req.body.site_description, accent_color: req.body.accent_color, github_username: req.body.github_username, linkedin_url: req.body.linkedin_url, contact_email: req.body.contact_email, updated_at: new Date().toISOString() }; const { data: existing, error: lookupError } = await supabase.from("site_settings").select("id").eq("id", id).maybeSingle(); if (lookupError) throw lookupError; if (!existing) return res.status(404).json({ success: false, message: "Site settings not found" }); const { error: updateError } = await supabase.from("site_settings").update(updates).eq("id", id); if (updateError) throw updateError; const { data, error: fetchError } = await supabase.from("site_settings").select("*").eq("id", id).maybeSingle(); if (fetchError) throw fetchError; res.json({ success: true, message: "Site settings updated successfully", data }); }
  catch (error) { console.error("Update site settings error:", error); res.status(500).json({ success: false, message: "Failed to update site settings", error: error.message }); }
};
const deleteSiteSettings = async (req, res) => {
  try { const { error } = await supabase.from("site_settings").delete().eq("id", req.params.id); if (error) throw error; res.json({ success: true, message: "Site settings deleted successfully" }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to delete site settings", error: error.message }); }
};
module.exports = { getSiteSettings, createSiteSettings, updateSiteSettings, deleteSiteSettings };
