const { response, request } = require("express");

const Movie = require("./movie.model");
const Actor = require("../actors/actor.model");

/**
 * get a single movie
 */
const getSingleMovie = async (req = response, res = request) => {
  const { id } = req.params;
  
  try {
    const movie = await Movie.findById(id);
    console.log(movie);
    if (!movie) {
      return res.status(404).json({ msg: "movie not found" });
    }

    //verify if movie is enable
    if (!movie.enable) {
      return res.status(404).json({ msg: "movie is disable" });
    }

    res.json({
      msg: `movie encountered`,
      movie
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get a single movie"
    });
  }
};
/**
 * get all movies
 */
const getAllMovies = async (req = request, res = response) => {
  const { limit = 20, from = 0 } = req.query;
  const query = { enable: true };

  try {
    const [total, movies] = await Promise.all([
      Movie.countDocuments(query),
      Movie.find(query)
        .populate("actors")
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
      msg: `total movies: ${total}`,
      movies
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get all movies"
    });
  }
};

/**
 * create movie
 */
const createMovie = async (req = response, res = request) => {
  try {
    const { name, actors = [] } = req.body;

    const newMovie = new Movie({
      name
    });

    const foundActors = await Actor.find({ name: { $in: actors } });
    console.log(foundActors.length);

    newMovie.actors = foundActors.map((actor) => actor._id);

    const saveMovie = await newMovie.save();

    res.status(201).json({
      msg: "create movie ok",
      saveMovie
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create movie"
    });
  }
};
/**
 * update movie
 */
const updateMovie = async (req = response, res = request) => {
  const { id } = req.params;
  const { password, email, ...body } = req.body;

  try {
    await Movie.findByIdAndUpdate(id, body);

    res.status(201).json({
      msg: "update movie ok",
      body
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update movie"
    });
  }
};

/**
 * delete movie
 */
const deleteMovie = async (req = response, res = request) => {
  try {
    const { id } = req.params;

    const movie = await this.getAllMovies.findByIdAndUpdate(id, {
      enable: false
    });
    res.json({ movie });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete movie"
    });
  }
};

const hardDeleteMovie = async (req, res = response) => {
  try {
    const { id } = req.params;

    const movie = await this.getAllMovies.findByIdAndDelete(id);
    res.json({
      msg: "deleted movie ok",
      movie
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete movie"
    });
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  hardDeleteMovie
};
