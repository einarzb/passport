const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm = require('passport-local-mongoose');

const UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.plugin(plm);

const User = mongoose.model("User", UserSchema);

module.exports = User;
