const supabase = require("../config/supabase");

// GET /api/education
const getEducation = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch education",
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
      message: "Failed to fetch education",
      error: error.message
    });
  }
};


// GET /api/education/:id
const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
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
      message: "Failed to fetch education record",
      error: error.message
    });
  }
};


// POST /api/education
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
      .insert([
        {
          institution,
          degree,
          field,
          location,
          start_date,
          end_date,
          description,
          display_order: display_order || 0
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create education record",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Education record created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create education record",
      error: error.message
    });
  }
};


// PUT /api/education/:id
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

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

    const { data, error } = await supabase
      .from("education")
      .update({
        institution,
        degree,
        field,
        location,
        start_date,
        end_date,
        description,
        display_order
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update education record",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Education record updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update education record",
      error: error.message
    });
  }
};


// DELETE /api/education/:id
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete education record",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Education record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete education record",
      error: error.message
    });
  }
};


module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};