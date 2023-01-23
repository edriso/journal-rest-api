const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route("/:id").get(postController.getPost);
// .patch(postController.updatePost)
// .delete(postController.deletePost);

router.route("/:id/edit").post(postController.updatePost);
router.route("/:id/delete").post(postController.deletePost);

module.exports = router;
