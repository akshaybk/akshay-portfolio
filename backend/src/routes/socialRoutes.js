const express = require("express");

const {
  getSocialLinks,
  getSocialLinkById,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink
} = require("../controllers/socialController");

const router = express.Router();

router.get("/", getSocialLinks);
router.get("/:id", getSocialLinkById);

router.post("/", createSocialLink);
router.put("/:id", updateSocialLink);
router.delete("/:id", deleteSocialLink);

module.exports = router;