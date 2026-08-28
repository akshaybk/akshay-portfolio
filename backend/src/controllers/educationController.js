const supabase = require("../config/supabase");

const getEducation = async (req, res) => {
  try { const { data, error } = await supabase.from("education").select("*").order("display_order", { ascending: true }).order("start_date", { ascending: false }); if (error) throw error; res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch education", error: error.message }); }
};
const getEducationById = async (req, res) => {
  try { const { data, error } = await supabase.from("education").select("*").eq("id", req.params.id).maybeSingle(); if (error || !data) return res.status(404).json({ success: false, message: "Education record not found", error: error?.message }); res.json({ success: true, data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to fetch education record", error: error.message }); }
};
const createEducation = async (req, res) => {
  try { const { institution, degree, field, location, start_date, end_date, description, display_order } = req.body; if (!institution || !degree) return res.status(400).json({ success: false, message: "Institution and degree are required" }); const { data, error } = await supabase.from("education").insert([{ institution, degree, field, location, start_date, end_date, description, display_order: display_order || 0 }]).select().single(); if (error) throw error; res.status(201).json({ success: true, message: "Education record created successfully", data }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to create education record", error: error.message }); }
};
const updateEducation = async (req, res) => {
  try { const { id } = req.params; const { institution, degree, field, location, start_date, end_date, description, display_order } = req.body; const { data: existing, error: lookupError } = await supabase.from("education").select("id").eq("id", id).maybeSingle(); if (lookupError) throw lookupError; if (!existing) return res.status(404).json({ success: false, message: "Education record not found" }); const { error: updateError } = await supabase.from("education").update({ institution, degree, field, location, start_date, end_date, description, display_order }).eq("id", id); if (updateError) throw updateError; const { data, error: fetchError } = await supabase.from("education").select("*").eq("id", id).maybeSingle(); if (fetchError) throw fetchError; res.json({ success: true, message: "Education record updated successfully", data }); }
  catch (error) { console.error("Update education error:", error); res.status(500).json({ success: false, message: "Failed to update education record", error: error.message }); }
};
const deleteEducation = async (req, res) => {
  try { const { error } = await supabase.from("education").delete().eq("id", req.params.id); if (error) throw error; res.json({ success: true, message: "Education record deleted successfully" }); }
  catch (error) { res.status(500).json({ success: false, message: "Failed to delete education record", error: error.message }); }
};
module.exports = { getEducation, getEducationById, createEducation, updateEducation, deleteEducation };
