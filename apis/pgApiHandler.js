"use strict";
const connectToDatabase = require("../utils/db");
const ApiService = require("../services/mainService");

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let params = JSON.parse(event.body);
  const isConnected = await connectToDatabase();

  try {
    if (isConnected) {
      const resp = await ApiService.ApiHandler(params);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(resp),
      });
    }
  } catch (error) {
    callback(null, {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not create the item.",
    });
  }
};
