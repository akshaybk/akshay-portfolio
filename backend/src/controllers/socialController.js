const supabase = require("../config/supabase");

const getSocialLinks = async (req, res) => {
  try { const { data, error } = await supabase.from("social_links").select("*").order("display_order", { ascending: true }); if (error) throw error; res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch social links", error: error.message }); }
};
const getSocialLinkById = async (req, res) => {
  try { const { data, error } = await supabase.from("social_links").select("*").eq("id", req.params.id).maybeSingle(); if (error || !data) return res.status(404).json({ success: false, message: "Social link not found", error: error?.message }); res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch social link", error: error.message }); }
};
const createSocialLink = async (req, res) => {
  try { const { platform, url, icon, display_order } = req.body; if (!platform || !url) return res.status(400).json({ success: false, message: "Platform and URL are required" }); const { data, error } = await supabase.from("social_links").insert([{ platform, url, icon, display_order: display_order || 0 }]).select().single(); if (error) throw error; res.status(201).json({ success: true, message: "Social link created successfully", data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to create social link", error: error.message }); }
};
const updateSocialLink = async (req, res) => {
  try { const { id } = req.params; const { platform, url, icon, display_order } = req.body; const { data: existing, error: lookupError } = await supabase.from("social_links").select("id").eq("id", id).maybeSingle(); if (lookupError) throw lookupError; if (!existing) return res.status(404).json({ success: false, message: "Social link not found" }); const { error: updateError } = await supabase.from("social_links").update({ platform, url, icon, display_order }).eq("id", id); if (updateError) throw updateError; const { data, error: fetchError } = await supabase.from("social_links").select("*").eq("id", id).maybeSingle(); if (fetchError) throw fetchError; res.json({ success: true, message: "Social link updated successfully", data }); }
  catch (error) { console.error("Update social link error:", error); res.status(500).json({ success: false, message: "Failed to update social link", error: error.message }); }
};
const deleteSocialLink = async (req, res) => {
  try { const { error } = await supabase.from("social_links").delete().eq("id", req.params.id); if (error) throw error; res.json({ success: true, message: "Social link deleted successfully" }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to delete social link", error: error.message }); }
};
module.exports = { getSocialLinks, getSocialLinkById, createSocialLink, updateSocialLink, deleteSocialLink };
