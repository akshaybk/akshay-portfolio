const supabase = require("../config/supabase");

// GET /api/skills
const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch skills",
        error: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message
    });
  }
};


// GET /api/skills/:id
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
        error: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
      error: error.message
    });
  }
};


// POST /api/skills
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
      .insert([
        {
          name,
          category,
          icon,
          proficiency,
          display_order: display_order || 0
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create skill",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create skill",
      error: error.message
    });
  }
};


// PUT /api/skills/:id
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      icon,
      proficiency,
      display_order
    } = req.body;

    const { data, error } = await supabase
      .from("skills")
      .update({
        name,
        category,
        icon,
        proficiency,
        display_order,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update skill",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message
    });
  }
};


// DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete skill",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message
    });
  }
};


module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};