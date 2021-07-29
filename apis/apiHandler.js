"use strict";
require("dotenv").config({ path: "./variables.env" });
const connectToDatabase = require("../db");
const TodoItem = require("../models/todo");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    TodoItem.create(JSON.parse(event.body))
      .then((todoItem) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todoItem),
        })
      )
      .catch((error) => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the item.",
        });
      });
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    TodoItem.findById(event.pathParameters.id)
      .then((todoItem) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todoItem),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the item.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    TodoItem.find()
      .then((todoItems) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todoItems),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the items.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    TodoItem.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true,
      }
    )
      .then((todoItem) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(todoItem),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not update the items.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    TodoItem.findByIdAndRemove(event.pathParameters.id)
      .then((todoItem) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Removed note with id: " + todoItem._id,
            todoItem: todoItem,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not delete the item.",
        })
      );
  });
};
