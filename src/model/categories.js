let mongoose = require('mongoose');

const category = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  wpid: { type:String, required:true },
  context: { type:String }
});

const Categories = mongoose.model("categories",category);

module.exports = {Categories};
