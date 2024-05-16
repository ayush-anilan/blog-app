const User = require("../models/User");
const path = require("path");

// Get users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// GET user by singleid
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Constructing the response object with profile picture URL
    const userProfile = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
        ? `/api/profile-picture/${user._id}`
        : null,
    };
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile picture
exports.getProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }
    // Send the profile picture
    res.sendFile(path.join(__dirname, "..", user.profilePicture));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update by id
exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete by id
exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
