const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Temporary storage

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/:id/upload-profile",
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);
router.put("/update/:id", userController.updateById);
router.delete("/delete/:id", userController.deleteById);

module.exports = router;
