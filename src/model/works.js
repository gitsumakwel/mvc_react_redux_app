let mongoose = require('mongoose')
/*let ObjectId = mongoose.Types.ObjectId;

let newID = () => new ObjectId();*/

const work = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  title: { type:String, required:true },
  desc: {type:String, required:true },
  summary: {type: String},
  url: { type:String },
  thumb: { type:String },
  lastupdate: { type:Date, default:Date.now },
  created: { type:Date, default:Date.now }
});

const Works = mongoose.model("works",work);
/*
//save comment object
const saveWork = (work,done) => {
  Works.create(work,done);
};


//get one document
const findWork = async(id) => {
  return await Works.findOne({ _id:id }).exec();
}

//get some or all
const findWorksByTitle = async (title, done) => {
  return await Works.find({title:new RegExp(toSearch,'gi')}).exec();
}
//get some or all
const findWorksByDesc = async (desc, done) => {
  return await Works.find({desc:new RegExp(toSearch,'gi')}).exec();
}

const findAllWorks = async () => {
    return await Works.find({}).exec()
}

//remove one
const deleteWork = async (id, done) => {
  if (id!==null | id!=='' | id!==undefined) {
    return await Works.findOneAndRemove({ _id:id }).execute();
  }
}

//remove some
const deleteWorksByTitle = async (title, done) => {
  if (title!==null | title!=='' | title!==undefined) {
    return await Works.deleteMany({ title:new RegExp(title,'gi')}).exec();
  }
}

//
const deleteWorksDesc = async (desc, done) => {
  if (desc!==null | desc!=='' | desc!==undefined) {
    return await Works.deleteMany({ desc:new RegExp(desc)}).exec();
  }
}

//remove all
const deleteAllWorks = async() => {
  await Works.collection.drop();
}*/

module.exports = {
  Works,
/*  saveWork,
  findWork,
  findWorksByTitle,
  findWorksByDesc,
  findAllWorks,
  deleteWork,
  deleteWorksByTitle,
  deleteWorksDesc,
  deleteAllWorks,*/
}
