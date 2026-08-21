const express = require("express");

const {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

const router = express.Router();

router.get("/", getExperience);
router.get("/:id", getExperienceById);

router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;