const mongoose = require("mongoose");
const Post = require("./models/Post");

async function updatePostThumbnails() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://ayushanilan:7khKKlpCKcHY4J9u@cluster0.kppedmf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Find posts without thumbnail field
    const postsWithoutThumbnail = await Post.find({
      thumbnail: { $exists: false },
    });

    // Loop through each post and update the thumbnail field
    for (const post of postsWithoutThumbnail) {
      post.thumbnail = null; // Set a default value or leave it as null if you don't want to set any default value
      await post.save();
    }

    console.log("Post thumbnails updated successfully.");

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating post thumbnails:", error);
  }
}

updatePostThumbnails();
