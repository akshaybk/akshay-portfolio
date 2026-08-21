const supabase = require("../config/supabase");

// GET /api/site-settings
const getSiteSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch site settings",
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
      message: "Failed to fetch site settings",
      error: error.message
    });
  }
};


// POST /api/site-settings
const createSiteSettings = async (req, res) => {
  try {
    const {
      site_title,
      site_description,
      accent_color,
      github_username,
      linkedin_url,
      contact_email
    } = req.body;

    const { data, error } = await supabase
      .from("site_settings")
      .insert([
        {
          site_title,
          site_description,
          accent_color,
          github_username,
          linkedin_url,
          contact_email
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create site settings",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Site settings created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create site settings",
      error: error.message
    });
  }
};


// PUT /api/site-settings/:id
const updateSiteSettings = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      site_title,
      site_description,
      accent_color,
      github_username,
      linkedin_url,
      contact_email
    } = req.body;

    const { data, error } = await supabase
      .from("site_settings")
      .update({
        site_title,
        site_description,
        accent_color,
        github_username,
        linkedin_url,
        contact_email,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update site settings",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Site settings updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update site settings",
      error: error.message
    });
  }
};


// DELETE /api/site-settings/:id
const deleteSiteSettings = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("site_settings")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete site settings",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Site settings deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete site settings",
      error: error.message
    });
  }
};


module.exports = {
  getSiteSettings,
  createSiteSettings,
  updateSiteSettings,
  deleteSiteSettings
};