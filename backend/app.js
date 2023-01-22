const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

const endpoint = "/api/v1/posts";

// Add Access Control Allow Origin headers
// https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let posts = JSON.parse(fs.readFileSync(`${__dirname}/db/posts.json`));

// Get All Posts
app.get(endpoint, (req, res) => {
  const query = req.query.q;

  let allPosts = posts;

  if (query) {
    allPosts = posts.filter(
      (post) =>
        post.title.indexOf(query) > -1 || post.content.indexOf(query) > -1
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
});

// Create New Post
app.post(endpoint, (req, res) => {
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const img = req.body.img;

  if (title && content) {
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

    fs.writeFile(`${__dirname}/db/posts.json`, JSON.stringify(posts), (err) => {
      res.status(201).json({
        status: "success",
        data: { post: newPost },
      });
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Missing post title or content.",
    });
  }
});

// Get Post
app.get(`${endpoint}/:id`, (req, res) => {
  const id = req.params.id * 1;
  const selectedPost = posts.find((post) => post.id === id);

  if (selectedPost) {
    res.status(200).json({
      status: "success",
      data: { post: selectedPost },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Invalid post ID.",
    });
  }
});

// Update Post
app.patch(`${endpoint}/:id`, (req, res) => {
  const id = req.params.id * 1;
  const postIndex = posts.findIndex((post) => post.id === id * 1);

  const newTitle = req.body.title.trim();
  const newContent = req.body.content.trim();
  const newImg = req.body.img;

  if (posts[postIndex] && newTitle && newContent) {
    const editedPost = {
      ...posts[postIndex],
      title: newTitle,
      content: newContent,
      img: newImg,
    };

    posts[postIndex] = editedPost;

    fs.writeFile(`${__dirname}/db/posts.json`, JSON.stringify(posts), (err) => {
      res.status(200).redirect("/");
    });
  } else if (!newTitle || !newContent) {
    res.status(400).json({
      status: "fail",
      message: "Missing post title or content.",
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Post not found.",
    });
  }
});

// Delete Post
app.delete(`${endpoint}/:id`, (req, res) => {
  const selectedPost = posts.find((post) => post.id === req.params.id * 1);
  if (selectedPost) {
    posts = posts.filter((post) => post.id !== req.params.id * 1);

    fs.writeFile(`${__dirname}/db/posts.json`, JSON.stringify(posts), (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Post not found.",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
