const mongoose = require("mongoose");
const UserModel = require("./models/User");

async function updateProfilePictures() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://ayushanilan:7khKKlpCKcHY4J9u@cluster0.kppedmf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Find users without profilePicture field
    const usersWithoutProfilePicture = await UserModel.find({
      profilePicture: { $exists: false },
    });

    // Loop through each user and update the profilePicture field
    for (const user of usersWithoutProfilePicture) {
      user.profilePicture = null; // Set a default value or leave it as null if you don't want to set any default value
      await user.save();
    }

    console.log("Profile pictures updated successfully.");

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating profile pictures:", error);
  }
}

updateProfilePictures();
