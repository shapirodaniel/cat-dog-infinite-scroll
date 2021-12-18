// i want to have access to a request paramater
// that will tell me based on which route i'm hitting
// serve up dog photos or cat photos

document.addEventListener("DOMContentLoaded", () => {
  async function getDogs() {
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=20`
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  }

  function handleIntersect(entries) {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const dogs = await getDogs();
        dogs.forEach(({ id, url, width }) => {
          // avoid distorting images that are too small to flex
          if (document.getElementById("container").clientWidth < width) {
            const newDog = document.createElement("img");
            newDog.src = url;
            newDog.alt = `dog-${id}`;
            newDog.classList.add("dog");
            document.querySelector("#container").appendChild(newDog);
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
