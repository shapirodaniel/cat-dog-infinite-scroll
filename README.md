# An Infinite Scroll Photo Wall Of Cats And Dogs

This infinite scroll photo wall of cats and dogs leverages thecatapi / thedogapi to serve an EJS template view that monitors user position within the feed and fetches the next batch of cats/dogs whenever a trigger element crosses the IntersectionObserver instance's observer threshold

## Take it for a spin!

`npm i` will install the express server, nodemon, ejs, and cors middleware  
`npm run start` will launch the server at `localhost:8080`
