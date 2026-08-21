const supabase = require("../config/supabase");

const getSocialLinks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Get social links error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch social links"
    });
  }
};

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
      .insert({
        platform,
        url,
        icon,
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
    console.error("Create social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create social link"
    });
  }
};

const updateSocialLink = async (req, res) => {
  try {
    const allowedFields = [
      "platform",
      "url",
      "icon",
      "display_order"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const { data, error } = await supabase
      .from("social_links")
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
    console.error("Update social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update social link"
    });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Social link deleted successfully"
    });
  } catch (error) {
    console.error("Delete social link error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete social link"
    });
  }
};

module.exports = {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink
};