class ImageLoader {
  constructor(type) {
    this.baseUrl = `https://api.the${type}api.com/v1/images/search?limit=20`;
  }

  async getImgs() {
    try {
      const response = await fetch(this.baseUrl);
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // type supplied by router suffix: "/dogs" -> "dog" or "/cats" -> "cat"
  const type = window.location.pathname.slice(1, -1);
  const imgLoader = new ImageLoader(type);

  function handleIntersect(entries) {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const imgs = await imgLoader.getImgs();
        imgs.forEach(({ id, url, width }, idx) => {
          // avoid distorting images that are too small to flex
          if (document.getElementById("container").clientWidth < width) {
            const newImg = document.createElement("img");
            newImg.src = url;
            newImg.alt = `img-${id}`;
            document.querySelector("#container").appendChild(newImg);
          }
          // lazy load the next batch of images before we hit the end of the current list
          if (imgs.length - 1 - idx === 2) {
            const container = document.querySelector("#container");
            const loader = document.querySelector("#loader");
            container.removeChild(loader);
            container.appendChild(loader);
          }
        });
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  });

  observer.observe(document.getElementById("loader"));
});
