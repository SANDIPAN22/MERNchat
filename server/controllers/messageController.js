const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ status: true });
    } else {
      return res.json({ status: false, msg: "Failed to sent he message" });
    }
  } catch (err) {
    console.error("ERROR:: ", err);
    next(err);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    console.log("From", from);
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ time: 1 });
    console.log("msg==>", messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json({ state: true, projectedMessages });
  } catch (err) {
    console.error("ERROR:: ", err);
  }
};
