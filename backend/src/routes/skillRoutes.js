const express = require("express");

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillsController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkillById);

router.post("/",requireAuth, createSkill);
router.put("/:id",requireAuth, updateSkill);
router.delete("/:id",requireAuth, deleteSkill);

module.exports = router;