const express = require("express");

const {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getExperience);
router.get("/:id", getExperienceById);

router.post("/",requireAuth, createExperience);
router.put("/:id",requireAuth, updateExperience);
router.delete("/:id",requireAuth, deleteExperience);

module.exports = router;