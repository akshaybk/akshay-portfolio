const express = require("express");

const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillsController");

const router = express.Router();

router.get("/", getSkills);
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;