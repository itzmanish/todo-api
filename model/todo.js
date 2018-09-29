const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    subtitle: {
      type: String
    },
    finished: {
      type: Boolean,
      default: false
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, lowercase: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not an email"
      }
    },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.methods.JSON = function() {
  return {
    username: this.username,
    email: this.email,
    name: this.name
  };
};

todoSchema.methods.JSON = function() {
  return {
    title: this.title,
    slug: this.slug,
    subtitle: this.subtitle,
    finished: this.finished,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// userSchema.methods.hash = function(password) {
//   return bcrypt
//     .hash(password, 10, function(err, hash) {
//       return (this.password = hash);
//     })
//     .catch(e => console.log(e));
// };

userSchema.methods.verify = function(password) {
  return bcrypt.compare(password, this.password, function(err, res) {
    return res;
  });
};

let User = mongoose.model("User", userSchema);
let Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo, User };
