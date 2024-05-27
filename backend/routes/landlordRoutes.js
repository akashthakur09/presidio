const express = require("express");
const {
  registerLandlord,
  loginLandlord,
  updateLandlord,
  currentLandlord,
} = require("../controllers/landlordControllers");

const validateToken = require("../middleware/validateTokenHandlerLandlord");

const router = express.Router();

router.post("/register", registerLandlord);
router.post("/login", loginLandlord);
router.put("/:id", validateToken, updateLandlord);
router.get("/profile", validateToken, currentLandlord);

module.exports = router;
