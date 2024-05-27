const express = require("express");
const {
    getLandlordProperties, getAllProperties, createProperty, getProperty, updateProperty, deleteProperty,getTenantProperties
} = require("../controllers/propertyControllers");

const validateTokenLandlord = require("../middleware/validateTokenHandlerLandlord");

const router = express.Router();

router.get("/getAllproperties", getAllProperties);
router.get("/getLandlordProperties/:id", validateTokenLandlord, getLandlordProperties);
// router.get("/getTenantProperties/:id", validateTokenLandlord, getTenantProperties);
router.post("/createProperty", validateTokenLandlord, createProperty);
router.get("/:id", getProperty);
router.put("/:id", validateTokenLandlord, updateProperty);
router.delete("/:id", validateTokenLandlord, deleteProperty);

module.exports = router;

