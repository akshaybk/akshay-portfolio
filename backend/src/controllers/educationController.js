const supabase = require("../config/supabase");

const getEducation = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Get education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch education"
    });
  }
};

const createEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      field,
      location,
      start_date,
      end_date,
      description,
      display_order
    } = req.body;

    if (!institution || !degree) {
      return res.status(400).json({
        success: false,
        message: "Institution and degree are required"
      });
    }

    const { data, error } = await supabase
      .from("education")
      .insert({
        institution,
        degree,
        field,
        location,
        start_date,
        end_date,
        description,
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
    console.error("Create education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create education"
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const allowedFields = [
      "institution",
      "degree",
      "field",
      "location",
      "start_date",
      "end_date",
      "description",
      "display_order"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const { data, error } = await supabase
      .from("education")
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
    console.error("Update education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update education"
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Education deleted successfully"
    });
  } catch (error) {
    console.error("Delete education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete education"
    });
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
};