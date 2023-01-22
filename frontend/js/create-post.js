const submitBtn = document.getElementById("submit-btn");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const postImg = document.getElementById("post-img");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (postTitle.value.trim() && postContent.value.trim()) {
    alert("hey");
  }
});
