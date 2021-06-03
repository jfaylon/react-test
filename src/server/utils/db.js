const mongoose = require("mongoose");
module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    "mongodb://localhost:27017/react-test",
    { useCreateIndex: true, useNewUrlParser: true }
  );
  mongoose.connection.on("error", err => {
    console.log(err);
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running."
    );
    process.exit();
  });
  mongoose.connection.once("open", function() {
    console.log("DB connected");
  });

  mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, converted) => {
      converted.id = converted._id;
      if (converted.price) {
        converted.price = converted.price.toFixed(2);
      }
      delete converted._id;
      delete converted.__v;
    }
  });
};
