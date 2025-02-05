const express       = require("express");
const conversations = require("../controller/conversations");

const router = express.Router();

router.post('/prompt',conversations.anaylyzePrompt)

module.exports = router;