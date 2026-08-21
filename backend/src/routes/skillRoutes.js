const express = require("express");

const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillsController");

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkillById);

router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;