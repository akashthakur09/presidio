const express = require('express');
const {createRequest, updateRequest, deleteRequestsByTenant, getLandlord, getTenant} = require("../controllers/requestControllers")

const validateTokenTenant = require('../middleware/validateTokenHandlerTenant')
const validateTokenLandlord = require("../middleware/validateTokenHandlerLandlord");
const router = express.Router();
// router.use(validateToken);

router.post("/createRequest/:id",validateTokenTenant, createRequest);
router.delete("/deleteRequest/:id",validateTokenTenant, deleteRequestsByTenant);
router.get("/getTenantRequest",validateTokenTenant, getTenant);


router.put("/updateRequest/:id",validateTokenLandlord, updateRequest);
router.get("/getLandlordRequest",validateTokenLandlord, getLandlord);

module.exports = router;
