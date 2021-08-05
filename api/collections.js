"use strict";
const connectToDatabase = require("../utils/db");
const BaseService = require("../services/BaseService");

module.exports.manage = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let params = JSON.parse(event.body);
  const isConnected = await connectToDatabase();

  try {
    if (isConnected) {
      const resp = await BaseService.Init(params);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(resp),
      });
    }
  } catch (error) {
    callback(null, {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Error occurred while connecting to DB",
    });
  }
};
