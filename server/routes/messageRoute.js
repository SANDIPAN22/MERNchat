const router = require("express").Router();
const { getMessages, addMessage } = require("../controllers/messageController");

// paths
router.post("/getMessages", getMessages);
router.post("/addMessage", addMessage);

module.exports = router;
