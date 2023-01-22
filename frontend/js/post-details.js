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
  let content = "";

  if (postResponse.data?.post) {
    const post = postResponse.data.post;

    content = `<article
        class="flex flex-col overflow-hidden bg-[#f6f7f3] rounded-lg mx-auto lg:w-8/12">`;

    if (post.img) {
      content += `<div class="h-96 lg:h-[32rem] w-full">
          <img
            class="inset-0 h-full w-full object-cover object-center"
            src="${post.img}"
            alt="Post image"
          />
        </div>`;
    }

    content += `<div class="w-full py-4 px-6 flex flex-col justify-between">
          <h3 class="font-semibold uppercase text-lg leading-tight truncate">
            ${post.title}
          </h3>
          <p class="whitespace-pre-wrap mt-2">${post.content}</p>

          <hr class="bg-gray-200 my-4" />

          <div class="flex justify-between">
            <p class="text-sm text-gray-700 tracking-wide font-semibold">
             ${post.date}
            </p>

            <div
              class="text-xs text-gray-700 uppercase tracking-wide font-semibold"
            >
              <a class="hover:text-yellow-600" href="./edit-post.html?id=${post.id}"
                >edit</a
              >
              &bull;
              <a
                class="delete-btn hover:text-yellow-600"
                href="#"
                >delete</a
              >
            </div>
          </div>
        </div></article>`;
  } else {
    content = `<div class="text-center"><h3 class="text-[#f6f7f3]">${postResponse.message}</h3></div>`;
  }

  postContainer.innerHTML = content;
}

displayPost();

// Handle delete post
postContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();

    // let URL = `http://localhost:3000/api/v1/posts/${postId}`;
    let URL = `http://localhost:3000/api/v1/posts/${postId}/delete`;
    fetch(URL, {
      //   method: "DELETE",
      method: "POST",
    }).then(() => {
      window.location.href = "./index.html";
    });
  }
});
