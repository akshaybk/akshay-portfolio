const express = require("express");

const {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} = require("../controllers/educationController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getEducation);
router.get("/:id", getEducationById);

router.post("/",requireAuth, createEducation);
router.put("/:id",requireAuth, updateEducation);
router.delete("/:id",requireAuth, deleteEducation);

module.exports = router;