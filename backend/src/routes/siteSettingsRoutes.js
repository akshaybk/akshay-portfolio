const express = require("express");

const {
  getSiteSettings,
  createSiteSettings,
  updateSiteSettings,
  deleteSiteSettings
} = require("../controllers/siteSettingsController");

const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSiteSettings);

router.post("/",requireAuth, createSiteSettings);
router.put("/:id",requireAuth, updateSiteSettings);
router.delete("/:id",requireAuth, deleteSiteSettings);

module.exports = router;