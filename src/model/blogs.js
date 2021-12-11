let mongoose = require('mongoose');

const blog = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  title: { type:String, required:true },
  desc: { type:String },
  summary: { type:String },
  content: { type:String },
  author: { type:String },
  thumb: { type:String },
  like: { type:Number, default:0 },
  dislike: { type:Number, default:0 },
  lastupdate: { type:Date, default:Date.now },
  created: { type:Date, default:Date.now }
});

const Blogs = mongoose.model("blogs",blog);

module.exports = {Blogs};
