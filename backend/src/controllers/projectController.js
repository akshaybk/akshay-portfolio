const supabase = require("../config/supabase");

// GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
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
      message: "Failed to fetch projects",
      error: error.message
    });
  }
};


// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
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
      message: "Failed to fetch project",
      error: error.message
    });
  }
};


// POST /api/projects
const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      short_description,
      description,
      image_url,
      github_url,
      live_url,
      technologies,
      featured,
      display_order
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required"
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          slug,
          short_description,
          description,
          image_url,
          github_url,
          live_url,
          technologies: technologies || [],
          featured: featured || false,
          display_order: display_order || 0
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create project",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message
    });
  }
};


// PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      short_description,
      description,
      image_url,
      github_url,
      live_url,
      technologies,
      featured,
      display_order
    } = req.body;

    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        slug,
        short_description,
        description,
        image_url,
        github_url,
        live_url,
        technologies,
        featured,
        display_order,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update project",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message
    });
  }
};


// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete project",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message
    });
  }
};


module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};