const supabase = require("../config/supabase");

const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("display_order", { ascending: true });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to fetch skills", error: error.message }); }
};

const getSkillById = async (req, res) => {
  try {
    const { data, error } = await supabase.from("skills").select("*").eq("id", req.params.id).maybeSingle();
    if (error || !data) return res.status(404).json({ success: false, message: "Skill not found", error: error?.message });
    res.json({ success: true, data });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to fetch skill", error: error.message }); }
};

const createSkill = async (req, res) => {
  try {
    const { name, category, icon, proficiency, display_order } = req.body;
    if (!name || !category) return res.status(400).json({ success: false, message: "Name and category are required" });
    const { data, error } = await supabase.from("skills").insert([{ name, category, icon, proficiency, display_order: display_order || 0 }]).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, message: "Skill created successfully", data });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to create skill", error: error.message }); }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, icon, proficiency, display_order } = req.body;
    const { data: existing, error: lookupError } = await supabase.from("skills").select("id").eq("id", id).maybeSingle();
    if (lookupError) throw lookupError;
    if (!existing) return res.status(404).json({ success: false, message: "Skill not found" });
    const { error: updateError } = await supabase.from("skills").update({ name, category, icon, proficiency, display_order }).eq("id", id);
    if (updateError) throw updateError;
    const { data, error: fetchError } = await supabase.from("skills").select("*").eq("id", id).maybeSingle();
    if (fetchError) throw fetchError;
    res.json({ success: true, message: "Skill updated successfully", data });
  } catch (error) { console.error("Update skill error:", error); res.status(500).json({ success: false, message: "Failed to update skill", error: error.message }); }
};

const deleteSkill = async (req, res) => {
  try {
    const { error } = await supabase.from("skills").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) { res.status(500).json({ success: false, message: "Failed to delete skill", error: error.message }); }
};

module.exports = { getSkills, getSkillById, createSkill, updateSkill, deleteSkill };
