const submitBtn = document.getElementById("submit-btn");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const postImg = document.getElementById("post-img");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (postTitle.value.trim() && postContent.value.trim()) {
    let URL = "http://localhost:3000/api/v1/posts";

    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle.value.trim(),
        content: postContent.value.trim(),
        img: postImg.value.trim(),
      }),
    }).then(() => {
      window.location.href = "./index.html";
    });
  }
});
