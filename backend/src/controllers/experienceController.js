const supabase = require("../config/supabase");

const getExperience = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Get experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience"
    });
  }
};

const createExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      start_date,
      end_date,
      current,
      description,
      technologies,
      display_order
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required"
      });
    }

    const { data, error } = await supabase
      .from("experience")
      .insert({
        company,
        role,
        location,
        start_date,
        end_date,
        current: current || false,
        description,
        technologies: technologies || [],
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
    console.error("Create experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create experience"
    });
  }
};

const updateExperience = async (req, res) => {
  try {
    const allowedFields = [
      "company",
      "role",
      "location",
      "start_date",
      "end_date",
      "current",
      "description",
      "technologies",
      "display_order"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const { data, error } = await supabase
      .from("experience")
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
    console.error("Update experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update experience"
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { error } = await supabase
      .from("experience")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Experience deleted successfully"
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience"
    });
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
};