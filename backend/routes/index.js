const express = require("express");
const app = express();

const router = express.Router();
const userRoute = require("./user");
const accountRoute = require("./account");

router.use("/account", accountRoute);
router.use("/user", userRoute);

module.exports = router;
