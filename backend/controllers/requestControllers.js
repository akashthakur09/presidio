const asyncHandler = require("express-async-handler");
const Request = require("../models/requestModel");
const Property = require("../models/propertyModel")

const createRequest = asyncHandler(async (req, res) => {
    // const {tenantID, landlordID, propertyID} = req.body;

    const propertyID = req.params.id;
    console.log(req.params.id);
    const property = await Property.findById(propertyID)
    const landlordID = property.landlord_id;
    const tenantID = req.tenant.id;
    
    console.log(property)
  const requestTenant = await Request.create({
    tenant_id:tenantID,
    landlord_id:landlordID,
    property_id:propertyID,
    status: "pending"
  })
  res.status(201).json({requestTenant,status:true});
  // res.status(201);
});

const updateRequest = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const {status} = req.body;
    if (!status || !["pending", "approved", "rejected"].includes(status)) {
        res.status(400);
        res.json({ message: "Invalid status value" });
        return;
      }

      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedRequest) {
        res.status(404);
        res.json({ message: "Request not found" });
        return;
      }
    
      res.status(200).json({updatedRequest,status:true});
})

const deleteRequestsByTenant = asyncHandler(async (req, res) => {
    const requestId = req.params.id;
  
    const result = await Request.findByIdAndDelete(requestId);
  
    res.status(200).json({ message: `Deleted ${result.deletedCount} requests` });
  });
  
  // Get requests to a landlord by a tenant
  const getLandlord = asyncHandler(async (req, res) => {
    
    const landlordId = req.landlord.id;
  
    const requests = await Request.find({landlord_id: landlordId });
  
    res.status(200).json(requests);
  });
  
  // Get what a tenant requested
  const getTenant = asyncHandler(async (req, res) => {
    const tenantId = req.tenant.id;
  
    const requests = await Request.find({ tenant_id: tenantId });
  
    res.status(200).json(requests);
  });

  module.exports = {createRequest, updateRequest, deleteRequestsByTenant, getLandlord, getTenant}