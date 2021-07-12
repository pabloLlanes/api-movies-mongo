const { response, request } = require("express");

//const Movie = require("./movie.model");
const Actor = require("./actor.model");

/**
 * get a single actor
 */
const getSingleActor = async (req = response, res = request) => {
  const { id } = req.params;

  try {
    const actor = await Actor.findById(id);

    if (!actor) {
      return res.status(404).json({ msg: "actor not found" });
    }

    //verify if actor is enable
    if (!actor.enable) {
      return res.status(404).json({ msg: "actor is disable" });
    }

    res.json({
      msg: `actor encountered`,
      actor
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get a single actor"
    });
  }
};
/**
 * get all actors
 */
const getAllActors = async (req = request, res = response) => {
  const { limit = 20, from = 0 } = req.query;
  const query = { enable: true };

  try {
    const [total, actors] = await Promise.all([
      Actor.countDocuments(query),
      Actor.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
      msg: `total actors: ${total}`,
      actors
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: get all actors"
    });
  }
};

/**
 * create actor
 */
const createActor = async (req = response, res = request) => {
  try {
    const { name, actors = [] } = req.body;

    const newActor = new Actor({
      name
    });

    const foundActors = await Actor.find({ name: { $in: actors } });

    newActor.actors = foundActors.map((actor) => actor._id);

    const saveActor = await newActor.save();

    res.status(201).json({
      msg: "create actor ok",
      saveActor
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: create actor"
    });
  }
};
/**
 * update actor
 */
const updateActor = async (req = response, res = request) => {
  const { id } = req.params;
  const { password, email, ...body } = req.body;

  try {
    await Actor.findByIdAndUpdate(id, body);

    res.status(201).json({
      msg: "update actor ok",
      body
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: update actor"
    });
  }
};

/**
 * delete actor
 */
const deleteActor = async (req = response, res = request) => {
  try {
    const { id } = req.params;

    const actor = await this.getAllActors.findByIdAndUpdate(id, {
      enable: false
    });
    res.json({ actor });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete actor"
    });
  }
};

const hardDeleteActor = async (req, res = response) => {
  try {
    const { id } = req.params;

    const actor = await this.getAllActors.findByIdAndDelete(id);
    res.json({
      msg: "deleted actor ok",
      actor
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: delete actor"
    });
  }
};

module.exports = {
  getAllActors,
  getSingleActor,
  createActor,
  updateActor,
  deleteActor,
  hardDeleteActor
};
