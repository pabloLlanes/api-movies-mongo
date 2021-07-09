const { Router } = require("express");
const { check } = require("express-validator");
const { inputsValidate, verifyJwt, checkRoles } = require("../../middlewares");

const {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  hardDeleteMovie
} = require("./movies.controller");

const router = Router();

//get all movies
router.get("/", getAllMovies);

//get a single movie
router.get("/:id", getSingleMovie);

//create movie
router.post("/", createMovie);

//update movie
router.put("/:id", verifyJwt, updateMovie);

//disable movie
router.delete("/:id", deleteMovie);

// delete movie
router.delete("/delete/:id", hardDeleteMovie);

module.exports = router;
