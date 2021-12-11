let mongoose = require('mongoose');

const project = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  title: { type:String, required:true },
  desc: { type:String },
  summary: { type:String },
  thumb: { type:String },
  url: { type:String },
  lastupdate: { type:Date, default:Date.now },
  created: { type:Date, default:Date.now }
});

const Projects = mongoose.model("projects",project);

module.exports = {Projects};
