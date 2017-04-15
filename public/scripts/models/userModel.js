var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  password: String
});

//the plugin needs to be connected to the schema before it is used to create the mongoose model.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
