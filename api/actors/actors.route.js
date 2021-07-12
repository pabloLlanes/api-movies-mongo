const { Router } = require("express");
const { check } = require("express-validator");
const { inputsValidate, verifyJwt, checkRoles } = require("../../middlewares");

const {
  getAllActors,
  getSingleActor,
  createActor,
  updateActor,
  deleteActor,
  hardDeleteActor
} = require("./actors.controller");

const router = Router();

//get all actors
router.get("/", getAllActors);

//get a single actor
router.get("/:id", getSingleActor);

//create actor
router.post("/", createActor);

//update actor
router.put("/:id", verifyJwt, updateActor);

//disable actor
router.delete("/:id", deleteActor);

// delete actor
router.delete("/delete/:id", hardDeleteActor);

module.exports = router;
