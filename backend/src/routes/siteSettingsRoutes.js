const express = require("express");

const {
  getSiteSettings,
  createSiteSettings,
  updateSiteSettings,
  deleteSiteSettings
} = require("../controllers/siteSettingsController");

const router = express.Router();

router.get("/", getSiteSettings);

router.post("/", createSiteSettings);
router.put("/:id", updateSiteSettings);
router.delete("/:id", deleteSiteSettings);

module.exports = router;