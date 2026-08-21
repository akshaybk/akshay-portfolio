const express = require("express");

const {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} = require("../controllers/educationController");

const router = express.Router();

router.get("/", getEducation);
router.post("/", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;