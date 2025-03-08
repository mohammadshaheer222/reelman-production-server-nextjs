const express = require("express")
const router = express.Router()
const { getHeroController  } = require("../../controllers/user/userHeroController")

router.route("/get-hero").get(getHeroController)

module.exports = router