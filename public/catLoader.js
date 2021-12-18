document.addEventListener("DOMContentLoaded", () => {
  async function getCats() {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=20`
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }

  function handleIntersect(entries) {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const cats = await getCats();
        cats.forEach(({ id, url, width }) => {
          // avoid distorting images that are too small to flex
          if (document.getElementById("container").clientWidth < width) {
            const newCat = document.createElement("img");
            newCat.src = url;
            newCat.alt = `cat-${id}`;
            newCat.classList.add("cat");
            document.querySelector("#container").appendChild(newCat);
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
