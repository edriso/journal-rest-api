const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// id param middleware
router.param("id", postController.checkPostID);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.checkPostBody, postController.createPost);

router.route("/:id").get(postController.getPost);
// .patch(postController.checkPostBody, postController.updatePost);
// .delete(postController.deletePost);

router
  .route("/:id/edit")
  .post(postController.checkPostBody, postController.updatePost);
router.route("/:id/delete").post(postController.deletePost);

module.exports = router;
