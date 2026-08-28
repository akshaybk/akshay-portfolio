const supabase = require("../config/supabase");

const getExperience = async (req, res) => {
  try { const { data, error } = await supabase.from("experience").select("*").order("display_order", { ascending: true }).order("start_date", { ascending: false }); if (error) throw error; res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch experience", error: error.message }); }
};
const getExperienceById = async (req, res) => {
  try { const { data, error } = await supabase.from("experience").select("*").eq("id", req.params.id).maybeSingle(); if (error || !data) return res.status(404).json({ success: false, message: "Experience not found", error: error?.message }); res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch experience", error: error.message }); }
};
const createExperience = async (req, res) => {
  try { const { company, role, location, start_date, end_date, current, description, technologies, display_order } = req.body; if (!company || !role) return res.status(400).json({ success: false, message: "Company and role are required" }); const { data, error } = await supabase.from("experience").insert([{ company, role, location, start_date, end_date, current: current || false, description, technologies: technologies || [], display_order: display_order || 0 }]).select().single(); if (error) throw error; res.status(201).json({ success: true, message: "Experience created successfully", data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to create experience", error: error.message }); }
};
const updateExperience = async (req, res) => {
  try { const { id } = req.params; const { company, role, location, start_date, end_date, current, description, technologies, display_order } = req.body; const { data: existing, error: lookupError } = await supabase.from("experience").select("id").eq("id", id).maybeSingle(); if (lookupError) throw lookupError; if (!existing) return res.status(404).json({ success: false, message: "Experience not found" }); const { error: updateError } = await supabase.from("experience").update({ company, role, location, start_date, end_date, current, description, technologies, display_order }).eq("id", id); if (updateError) throw updateError; const { data, error: fetchError } = await supabase.from("experience").select("*").eq("id", id).maybeSingle(); if (fetchError) throw fetchError; res.json({ success: true, message: "Experience updated successfully", data }); }
  catch (error) { console.error("Update experience error:", error); res.status(500).json({ success: false, message: "Failed to update experience", error: error.message }); }
};
const deleteExperience = async (req, res) => {
  try { const { error } = await supabase.from("experience").delete().eq("id", req.params.id); if (error) throw error; res.json({ success: true, message: "Experience deleted successfully" }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to delete experience", error: error.message }); }
};
module.exports = { getExperience, getExperienceById, createExperience, updateExperience, deleteExperience };
