const express = require("express");

const {
  getSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink
} = require("../controllers/socialController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSocialLinks);
router.get("/:id", getSocialLinkById);

router.post("/",requireAuth, createSocialLink);
router.put("/:id",requireAuth, updateSocialLink);
router.delete("/:id",requireAuth, deleteSocialLink);

module.exports = router;