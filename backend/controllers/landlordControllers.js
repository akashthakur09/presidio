const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Landlord = require("../models/landlordModel");

const registerLandlord = asyncHandler(async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  console.log(name, email, phone, password, cpassword);
  if (!name || !email || !phone || !password || !cpassword) {
    res.status(404);
    throw new Error("All fields are required!!");
  }

  const landlordAvailable = await Landlord.findOne({ email });

  if (landlordAvailable) {
    res.status(400);
    throw new Error("Landlord Already Registered!");
  }

  if (password !== cpassword) {
    res.status(400);
    throw new Error("Please enter confirm password as Password");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);
    const landlord = await Landlord.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    console.log(`Landlord Created: ${landlord}`);
    res.status(201).json({msg: "Landlord created", success: true});
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: err.message });
  }
});

const loginLandlord = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      res.status(404);
      throw new Error("All fields are required");
  }
  const landlord = await Landlord.findOne({ email });
  if (landlord && (await bcrypt.compare(password, landlord.password))) {
      const accessToken = jwt.sign(
          {
            landlord: {
                  id: landlord._id,
                  name: landlord.name,
                  email: landlord.email,
                  phone: landlord.phone,
              },
          },
          "ACCESS_TOKEN_SECRET",
          { expiresIn: "15d" }
      );
      return res.status(200).send({
          success: true,
          id:landlord._id,
          status: "Success",
          message: "Successfully Logged in!",
          token: accessToken,
      });
  } else {
      res.status(401);
      throw new Error("Email or password is incorrect!");
  }
});


const updateLandlord = asyncHandler(async (req, res) => {
  console.log("Hello guys");
  const landlord = await Landlord.findById(req.params.id);
  // console.log(req.landlord.id);
  console.log("Before update -> ",landlord);
  // console.log(landlord._id.toString());
  // const landlord = await Landlord.findById(req.landlord.id);
  if (!landlord) {
    res.status(404);
    throw new Error("Landlord not found");
  }
  if (landlord._id.toString() !== req.landlord.id) {
    res.status(403);
    throw new Error("You dont have permission to access this landlord");
  }
  // console.log("ha pahucha");
  const updatedLandlord = await Landlord.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  console.log("updated -> ",updatedLandlord);
  res.status(200).json(updatedLandlord);
});

const currentLandlord = asyncHandler(async (req, res) => {
  const landlord = await Landlord.findById(req.landlord.id);
  console.log(req.landlord.id);
  console.log(landlord);
  if (!landlord) {
      res.status(404);
      throw new Error("Landlord not found");
  }
  res.status(200).json(landlord);
});

module.exports = { registerLandlord, loginLandlord, updateLandlord, currentLandlord };
