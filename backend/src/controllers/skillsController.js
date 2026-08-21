const supabase = require("../config/supabase");

const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills"
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      proficiency,
      display_order
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required"
      });
    }

    const { data, error } = await supabase
      .from("skills")
      .insert({
        name,
        category,
        icon,
        proficiency,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create skill"
    });
  }
};

const updateSkill = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "category",
      "icon",
      "proficiency",
      "display_order"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const { data, error } = await supabase
      .from("skills")
      .update(updates)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update skill"
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Skill deleted successfully"
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete skill"
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};