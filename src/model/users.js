let mongoose = require('mongoose')
/*let ObjectId = mongoose.Types.ObjectId;

let newID = () => new ObjectId();*/


const usersSchema = new mongoose.Schema({
  //_id: { type:mongoose.Schema.Types.ObjectId, default:new ObjectId() },
  username: { type:String, required:true },
  password: { type:String, required:true, default:'encryptedpassword' },
  lastlogin: { type:Date, default:Date.now },
  disclose: { type:Boolean, default:false },
  created: { type:Date, default:Date.now }
});
const Users = mongoose.model("users",usersSchema);

module.exports = {
  Users,
/*  createAndSaveUser,
  findUser,
  findUsers,
  deleteUser,
  deleteUsers,
  deleteAllUsers,*/
}
