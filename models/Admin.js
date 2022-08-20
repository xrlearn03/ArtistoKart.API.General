var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      trim: true,
      lowercase: true,
      default: null,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },

    profileImage: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    fcm_token: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);


var Admin = (module.exports = mongoose.model("Admin", adminSchema));


module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

module.exports.adminLogin = function (user, callback) {
  bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}


module.exports.getUserByEmail = function (email, callback) {
  var query = { email: email };
  Admin.findOne(query, callback);
}

module.exports.comparePassword = function (givenPassword, hash, callback) {
  bcrypt.compare(givenPassword, hash, function (err, isMatch) {
      if (err) throw err;
      callback(null, isMatch);
  });
}