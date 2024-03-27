const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("user already exists");
      return res.status(409).send({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save user
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    console.log("Created user:", user);
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).send({
      success: true,
      message: "Registration successful. Please login.",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in register API:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User with provided email not found",
      });
    }

    // Match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password. Please try again",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Remove password from user object before sending the response
    delete user.password;
    // Send success response with token and user details
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error. Please try again later",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //user find
    const user = await userModel.findOne({ email });
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated useer
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};

// Get schedules
const getSchedules = async (req, res) => {
  try {
    console.log("schedules", req.body);
    const { userId } = req.body;

    const user = await userModel.findById(userId).populate("schedules");

    if (!user) {
      console.error("User not found");
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const populatedSchedules = user.schedules.map((schedule) =>
      schedule.toObject()
    );

    const storedSchedulesArray = [...populatedSchedules];
    res.status(200).send({
      success: true,
      data: storedSchedulesArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching schedules",
      error: error.message,
    });
  }
};

// get incoming requests

const getIncomingRequests = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).populate("incomingRequests");

    if (!user) {
      console.error("User not found");
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const populatedIncomingRequests = user.incomingRequests.map((request) =>
      request.toObject()
    );

    const storedIncomingRequestsArray = await Promise.all(
      populatedIncomingRequests.map(async (request) => {
        const riderUser = await userModel.findById(request.requestedByRider);
        const riderName = riderUser ? riderUser.name : "Unknown Rider";
        return {
          ...request,
          riderName,
        };
      })
    );

    res.status(200).send({
      success: true,
      data: storedIncomingRequestsArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching incoming requests",
      error: error.message,
    });
  }
};

// get outgoing requests
const getOutgoingRequests = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).populate("outgoingRequests");

    if (!user) {
      console.error("User not found");
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const populatedOutgoingRequests = user.outgoingRequests.map((request) =>
      request.toObject()
    );

    const storedOutgoingRequestsArray = [...populatedOutgoingRequests];
    res.status(200).send({
      success: true,
      data: storedOutgoingRequestsArray,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching outgoing requests",
      error: error.message,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
  getSchedules,
  getIncomingRequests,
  getOutgoingRequests,
};
