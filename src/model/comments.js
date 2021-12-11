let mongoose = require('mongoose');

const comment = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  blog: { type:String, required:true }, //this will be id of the blog
  name: { type:String },
  email: { type:String },
  message: { type:String },
  lastupdate: { type:Date, default:Date.now },
  created: { type:Date, default:Date.now }
});

const Comments = mongoose.model("comments",comment);
/*
//save comment object
const saveComment = (comment,done) => {
  Comments.create(comment,done);
};

//get one document
const findComment = async(id) => {
  return await Comments.findOne({ _id:id }).exec();

}
const findCommentByEmail = async(id) => {
  return await Comments.findOne({ email:email }).exec();
}

//get some or all
const findCommentsByName = async (name, done) => {
  return await Comments.find({name:new RegExp(toSearch,'gi')}).exec();
}

//get some or all
const findCommentsByMessage = async (message, done) => {
  return await Comments.find({message:new RegExp(toSearch,'gi')}).exec();
}

const findCommentsByDate = async (date, done) => {
  return await Comments.find({date:date}).exec();
}

const findAllComments = async (done) => {
    return await Comments.find({}).exec()
}

//remove one
const deleteComment = async (id, done) => {
  if (id!==null | id!=='' | id!==undefined) {
    return await Comments.findOneAndRemove({ _id:id }).execute();
  }
}

//remove some
const deleteCommentsByName = async (name, done) => {
  if (name!==null | name!=='' | name!==undefined) {
    return await Comments.deleteMany({ name:new RegExp(name,'gi')}).exec();
  }
}


const deleteCommentsByMessage = async (message, done) => {
  if (message!==null | message!=='' | message!==undefined) {
    return await Comments.deleteMany({ message:new RegExp(message,'gi')}).exec();
  }
}

//remove all
const deleteAllComments = async() => {
  await Comments.collection.drop(done);
}
*/
module.exports = {
  Comments,
  /*saveComment,
  findComment,
  findCommentsByName,
  findCommentsByMessage,
  deleteComment,
  deleteCommentsByName,
  deleteCommentsByMessage,
  deleteAllComments,*/
}
