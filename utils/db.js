const db = require("./pgDB");

const connectToDatabase = async () => {
  try {
    await db.authenticate();
    db.sync({ force: false }).then(() => {
      console.log(`Database connected & tables created!`);
    });
    return true;
  } catch (error) {
    console.log("Failed to Connect Database ...");
    return false;
  }
};
module.exports = connectToDatabase;
