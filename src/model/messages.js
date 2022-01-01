let mongoose = require('mongoose');

const message = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  name: { type:String },
  email: { type:String },
  message: { type:String },
  created: { type:Date, default:Date.now }
});

const Messages = mongoose.model("messages",message);

module.exports = {
  Messages,
}
