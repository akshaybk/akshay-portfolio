const express = require("express");

const {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} = require("../controllers/educationController");

const router = express.Router();

router.get("/", getEducation);
router.get("/:id", getEducationById);

router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;