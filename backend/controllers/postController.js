const fs = require("fs");

let posts = JSON.parse(fs.readFileSync(`${__dirname}/../db/posts.json`));

// checkPostID middleware function
// it ends response with 404 if postId wasn't exist
exports.checkPostID = (req, res, next, val) => {
  const selectedPost = posts.find((post) => post.id === val * 1);

  if (!selectedPost) {
    // return is used to not running next() middlewares
    return res.status(404).json({
      status: "fail",
      message: "Post not found.",
    });
  }

  next();
};

// checkPostBody middleware
// sends 400 (bad req) if post wasn't contain a title nor content
// Add it to the post handler stack
exports.checkPostBody = (req, res, next) => {
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  if (!title || !content) {
    return res.status(400).json({
      status: "fail",
      message: "Missing post title or content.",
    });
  }

  next();
};

// Handler||Controller functions
exports.getAllPosts = (req, res) => {
  const query = req.query.q;

  let allPosts = posts;

  if (query) {
    allPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        post.content.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts: allPosts,
      query,
    },
  });
};

exports.getPost = (req, res) => {
  const id = req.params.id * 1;
  const selectedPost = posts.find((post) => post.id === id);

  res.status(200).json({
    status: "success",
    data: { post: selectedPost },
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const img = req.body.img || "";

  const date = new Date();

  const newPost = {
    id: date.valueOf(),
    title,
    content,
    img,
    date: date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };

  posts.push(newPost);

  fs.writeFile(`${__dirname}/../db/posts.json`, JSON.stringify(posts), () => {
    res.status(201).json({
      status: "success",
      data: { post: newPost },
    });
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.id * 1;
  const postIndex = posts.findIndex((post) => post.id === id * 1);

  const newTitle = req.body.title.trim();
  const newContent = req.body.content.trim();
  const newImg = req.body.img || "";

  const editedPost = {
    ...posts[postIndex],
    title: newTitle,
    content: newContent,
    img: newImg,
  };

  posts[postIndex] = editedPost;

  fs.writeFile(`${__dirname}/../db/posts.json`, JSON.stringify(posts), () => {
    res.status(200).json({
      status: "success",
      data: { post: editedPost },
    });
  });
};

exports.deletePost = (req, res) => {
  posts = posts.filter((post) => post.id !== req.params.id * 1);

  fs.writeFile(`${__dirname}/../db/posts.json`, JSON.stringify(posts), () => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
