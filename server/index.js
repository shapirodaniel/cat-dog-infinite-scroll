const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const { dogRouter, catRouter } = require("./routes");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));

app.use("/dogs", dogRouter);
app.use("/cats", catRouter);

app.get("/", (req, res) => {
  res.status(200).render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`it's raining cats and dogs on port ${PORT}`);
});
