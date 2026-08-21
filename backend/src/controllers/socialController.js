const supabase = require("../config/supabase");

// GET /api/social-links
const getSocialLinks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch social links",
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
      message: "Failed to fetch social links",
      error: error.message
    });
  }
};


// GET /api/social-links/:id
const getSocialLinkById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
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
      message: "Failed to fetch social link",
      error: error.message
    });
  }
};


// POST /api/social-links
const createSocialLink = async (req, res) => {
  try {
    const {
      platform,
      url,
      icon,
      display_order
    } = req.body;

    if (!platform || !url) {
      return res.status(400).json({
        success: false,
        message: "Platform and URL are required"
      });
    }

    const { data, error } = await supabase
      .from("social_links")
      .insert([
        {
          platform,
          url,
          icon,
          display_order: display_order || 0
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create social link",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Social link created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create social link",
      error: error.message
    });
  }
};


// PUT /api/social-links/:id
const updateSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      platform,
      url,
      icon,
      display_order
    } = req.body;

    const { data, error } = await supabase
      .from("social_links")
      .update({
        platform,
        url,
        icon,
        display_order
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update social link",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Social link updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update social link",
      error: error.message
    });
  }
};


// DELETE /api/social-links/:id
const deleteSocialLink = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete social link",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Social link deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete social link",
      error: error.message
    });
  }
};


module.exports = {
  getSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink
};