let params = new URL(document.location).searchParams;
let queryVal = params.get("q");
const searchInput = document.getElementById("search-input");
searchInput.value = queryVal;

async function getPosts() {
  let URL = "http://localhost:3000/api/v1/posts";
  if (queryVal) URL += `?q=${queryVal}`;

  const response = await fetch(URL);
  const resDate = await response.json();

  return resDate.data.posts;
}

async function showPosts() {
  const postsContainer = document.getElementById("posts-container");
  let content = "";

  const posts = await getPosts();

  if (!posts.length) {
    content = `<div class="text-center"><h3 class="text-[#f6f7f3]">There's No Posts!</h3></div>`;
  } else {
    posts.forEach((post) => {
      content += `
            <article class="overflow-hidden bg-gray-100 rounded-lg">
                <a href="/posts/${post.id}">
                <img alt="Post image" class="block h-80 w-full" src="${post.img}" />
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h3 class="text-md">
                    <a
                    class="no-underline hover:underline text-gray-800"
                    href="/posts/${post.id}"
                    >
                    ${post.title}
                    </a>
                </h3>
                <p class="text-sm">${post.date}</p>
                </header>
            </article>
            `;
    });
  }

  postsContainer.innerHTML = content;
}

showPosts();
