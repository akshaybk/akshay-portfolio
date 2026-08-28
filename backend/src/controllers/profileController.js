const supabase = require("../config/supabase");

// GET all profiles
const getProfiles = async (req, res) => {
  try {
    const { data, error } = await supabase.from("profile").select("*").order("id", { ascending: true });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error("Get profiles error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile", error: error.message });
  }
};

// GET single profile
const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase.from("profile").select("*").eq("id", req.params.id).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(404).json({ success: false, message: "Profile not found", error: error.message });
  }
};

// CREATE profile
const createProfile = async (req, res) => {
  try {
    const { name, headline, bio, email, phone, location, profile_image_url, resume_url, availability, github_url, linkedin_url, website_url } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const { data, error } = await supabase.from("profile").insert({ name, headline, bio, email, phone, location, profile_image_url, resume_url, availability, github_url, linkedin_url, website_url }).select();
    if (error) throw error;
    res.status(201).json({ success: true, data: data?.[0] || null });
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({ success: false, message: "Failed to create profile", error: error.message });
  }
};

// UPDATE profile
const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "headline", "bio", "email", "phone", "location", "profile_image_url", "resume_url", "availability", "github_url", "linkedin_url", "website_url"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase.from("profile").update(updates).eq("id", req.params.id).select();
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: "Profile not found or update was blocked by database permissions" });
    }

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};

// DELETE profile
const deleteProfile = async (req, res) => {
  try {
    const { error } = await supabase.from("profile").delete().eq("id", req.params.id);
    if (error) throw error;
    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ success: false, message: "Failed to delete profile", error: error.message });
  }
};

module.exports = { getProfiles, getProfile, createProfile, updateProfile, deleteProfile };
