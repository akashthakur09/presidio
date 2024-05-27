const asyncHandler = require('express-async-handler')
const Property = require("../models/propertyModel");

const getLandlordProperties = asyncHandler(async(req, res) => {
    const properties = await Property.find({ landlord_id: req.landlord.id });
    res.status(200).json(properties);
})
const getTenantProperties = asyncHandler(async(req, res) => {
  const properties = await Property.find({ tenant_id: req.tenant.id });
  res.status(200).json(properties);
})

const getAllProperties = asyncHandler(async(req, res) => {
  console.log(req);
  const properties = await Property.find();
  res.status(200).json(properties);
})

const createProperty = asyncHandler(async(req, res) => {
    const {address, city, area, bedrooms, bathrooms, hospitals, colleges} = req.body;
    if(!address || !city || !area || !bedrooms || !bathrooms || !hospitals || !colleges) {
        res.status(400);
        throw new Error("All fields are mendatory");
    }
    const property = await Property.create({
        landlord_id: req.landlord.id,
        address,
        city, 
        area,
        bedrooms,
        bathrooms,
        hospitals,
        colleges,
        availability: "available",
    })
    res.status(201).json(property);
})

const getProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error("Property not found");
    }
    res.status(200).json(property);
  });

  const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error("Property not found");
    }
  
    if (property.landlord_id.toString() !== req.landlord.id) {
      res.status(403);
      throw new Error("You don't have permission to update other's property");
    }
  
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProperty);
  });
  
  const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404);
      throw new Error("Property not found");
    }
  
    if (property.landlord_id.toString() !== req.landlord.id) {
      res.status(403);
      throw new Error("You don't have permission to delete other's property");
    }
  
    await property.deleteOne({ _id: req.params.id });
    res.status(200).json(property);
  });

  module.exports = {getLandlordProperties, getAllProperties, createProperty, getProperty, updateProperty, deleteProperty,getTenantProperties}