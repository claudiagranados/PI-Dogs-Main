const { Router } = require("express")
const router = Router();
const { getTemperaments } = require("../handlers/getAllTemperaments")

router.get("/", getTemperaments);

module.exports=router;