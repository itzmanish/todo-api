const mongoose = require("mongoose");
const { DBURL } = require("./config");
mongoose.Promise = global.Promise;

mongoose
  .connect(
    DBURL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database Connected"))
  .catch(e => console.log(e));

module.exports = mongoose;
