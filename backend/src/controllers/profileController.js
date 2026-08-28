const supabase = require("../config/supabase");

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

const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "headline", "bio", "email", "phone", "location", "profile_image_url", "resume_url", "availability", "github_url", "linkedin_url", "website_url"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    updates.updated_at = new Date().toISOString();

    let id = req.params.id;
    if (!id) {
      const { data: profiles, error: lookupError } = await supabase
        .from("profile")
        .select("id")
        .order("id", { ascending: true })
        .limit(1);
      if (lookupError) throw lookupError;
      id = profiles?.[0]?.id;
    }

    if (id === undefined || id === null) {
      return res.status(404).json({ success: false, message: "No profile exists to update" });
    }

    // Perform the mutation without requesting a RETURNING representation.
    // This avoids PostgREST response-shape/RLS issues on UPDATE.
    const { error: updateError } = await supabase
      .from("profile")
      .update(updates)
      .eq("id", id);
    if (updateError) throw updateError;

    // Fetch the canonical row after the mutation so the response always has
    // the same shape as the public profile endpoint.
    const { data, error: fetchError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Profile could not be found after update. Check the profile ID and Supabase permissions."
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile", error: error.message });
  }
};

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
