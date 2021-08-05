const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose
    .connect(process.env.MONGO_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((db) => {
      console.log("---------->Connected<--------------");
      isConnected = db.connections[0].readyState;
    });
};
