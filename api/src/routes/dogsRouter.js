const { Router } = require("express");
const router = Router();
const { getAllDogs } = require("../handlers/getAllDogs");
const { getDogById } = require("../handlers/getDogById");
const { postDog } = require("../handlers/postDog");

router.get("/", getAllDogs)
router.get("/:id", getDogById) 
router.post("/", postDog);

module.exports = router;