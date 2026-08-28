const express = require("express");

const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require("../controllers/profileController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProfiles);
router.get("/:id", getProfile);

router.post("/", requireAuth, createProfile);
router.put("/", requireAuth, updateProfile);
router.put("/:id", requireAuth, updateProfile);
router.delete("/:id", requireAuth, deleteProfile);

module.exports = router;
