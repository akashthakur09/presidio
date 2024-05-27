const express = require("express");
const {
    registerTenant, loginTenant, updateTenant,
    currentTenant
} = require("../controllers/tanentControllers");

const validateToken = require("../middleware/validateTokenHandlerTenant");

const router = express.Router();

router.post("/register", registerTenant);
router.post("/login", loginTenant);
router.put("/:id", validateToken, updateTenant);
router.get("/profile", validateToken, currentTenant);

module.exports = router;