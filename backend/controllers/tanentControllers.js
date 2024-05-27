const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Tenant = require("../models/tenantModel")


const registerTenant = asyncHandler(async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if(!name || !email || !phone || !password || !cpassword) {
        res.status(404);
        throw new Error("All fields are required!");
    }

    const tenantAvailable = await Tenant.findOne({email});
    console.log(tenantAvailable);
    if(tenantAvailable) {
        res.status(400);
        throw new Error("Tenant Already Registered!");
    }

    if(password !== cpassword) {
        res.status(400);
        throw new Error("Please enter confirm password as Password")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed Password: ${hashedPassword}`);
        const tenant = await Tenant.create({
            name,
            email,
            phone,
            password: hashedPassword
        })
        console.log(`${tenant}`)
        res.status(201).json({msg: "Tenant created"});
    }
    catch(err) {
        console.error(err);
        res.status(404).send({message: err.message});
    }
})

const loginTenant = asyncHandler(async (req, res) => {
    console.log(req);
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(404);
        throw new Error("All fields are required")
    }
    const tenant = await Tenant.findOne({email})
    
    if(tenant && (await bcrypt.compare(password, tenant.password))) {
        const accessToken = jwt.sign(
            {
                tenant: {
                    id: tenant._id,
                    name: tenant.name,
                    email: tenant.email,
                    phone: tenant.phone,
                },
            },
            "ACCESS_TOKEN_SECRET",
            { expiresIn: "15d" }
        )
        return res.status(200).send({
            success: true,
            id:tenant._id,
            status: "Success",
            message: "Successfully Logged in!",
            token: accessToken,
        });
    } else {
        res.status(401);
        throw new Error("Email or password is incorrect!")
    }
})

const updateTenant = asyncHandler(async(req, res) => {
    const tenant = await Tenant.findById(req.params.id);
    if(!tenant) {
        res.status(404);
        throw new Error("Tenant not found");
    }
    if(tenant._id.toString() !== req.tenant.id) {
        res.status(403);
        throw new Error("You don't have permission to access this tenant");
    }
    const updatedTenant = await Tenant.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedTenant);
})
const currentTenant = asyncHandler(async (req, res) => {
    const tenant = await Tenant.findById(req.tenant.id);
    console.log(req.tenant.id);
    console.log(tenant);
    if (!tenant) {
        res.status(404);
        throw new Error("Landlord not found");
    }
    res.status(200).json(tenant);
  });

module.exports = { registerTenant, loginTenant, updateTenant,currentTenant }