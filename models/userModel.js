const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: String,
  password: String
});

//plugin needs to be connected to the schema before it is used to create the mongoose model.
UserSchema.plugin(plm);

const User = mongoose.model("User", UserSchema);

module.exports = User;
