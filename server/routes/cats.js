const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.status(200).render("photos");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = { router };
