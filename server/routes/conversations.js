const express       = require("express");
const conversations = require("../controller/conversations");
const isAuthorized   = require("../middlewares/isAuthorized");

const router = express.Router();

router.post('/prompt',isAuthorized,conversations.analyzePrompt_3);

router.post('/chat',isAuthorized,conversations.continueChat);

module.exports = router;