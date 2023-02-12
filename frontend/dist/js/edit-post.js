const postContainer = document.getElementById("post-container");
const params = new URL(document.location).searchParams;
const postId = params.get("id");

if (!postId) {
  window.location.href = "./index.html";
}

async function getPost() {
  let URL = `http://localhost:3000/api/v1/posts/${postId}`;

  const response = await fetch(URL);
  const resDate = await response.json();
  return resDate;
}

async function displayPost() {
  const postResponse = await getPost();

  if (postResponse.data?.post) {
    const post = postResponse.data.post;

    let content = `<section class="block p-6 rounded-lg bg-[#f6f7f3] min-w-md mx-auto">
              <form action="./post-details.html?id=${postId}" method="post" >
                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full bg-[#f6f7f3] px-3 py-1.5 border border-gray-300 rounded transition ease-in-out m-0 focus:border-[#0f0d35] focus:outline-none"
                    placeholder="Title"
                    name="title"
                    value="${post.title}"
                    id="post-title"
                  />
                </div>
                <div class="form-group mb-6">
                  <textarea
                    class="form-control block w-full bg-[#f6f7f3] px-3 py-1.5 border border-gray-300 rounded transition ease-in-out m-0 focus:border-[#0f0d35] focus:outline-none"
                    rows="3"
                    name="content"
                    placeholder="Content..."
                    id="post-content"
                  >${post.content}</textarea
                  >
                </div>
                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block w-full bg-[#f6f7f3] px-3 py-1.5 border border-gray-300 rounded transition ease-in-out m-0 focus:border-[#0f0d35] focus:outline-none"
                    name="img"
                    placeholder="Image URL"
                    id="post-img"
                    value="${post.img}"
                  />
                </div>
                <button
                  type="submit"
                  class="edit-btn w-full px-6 py-2.5 bg-[#0f0d35] text-white font-medium text-xs leading-tight uppercase rounded hover:bg-yellow-600 focus:outline-none transition duration-150 ease-in-out"
                >
                  Edit Post
                </button>
              </form>
            </section>`;

    postContainer.innerHTML = content;
  } else {
    window.location.href = "./index.html";
  }
}

displayPost();

// Handle edit post
postContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    e.preventDefault();

    handleEdit();
  }
});

function handleEdit() {
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();
  const img = document.getElementById("post-img").value.trim();

  if (title && content) {
    const editedPost = JSON.stringify({
      title,
      content,
      img,
    });

    let URL = `http://localhost:3000/api/v1/posts/${postId}`;
    fetch(URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: editedPost,
    })
      .then(() => {
        window.location.href = `./post-details.html?id=${postId}`;
      })
      .catch((err) => {
        console.log(err.message);
      });

    return false;
  }
}
