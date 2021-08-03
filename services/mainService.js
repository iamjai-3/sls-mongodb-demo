const { TodoPgSchema, testSchema } = require("../models/pgTodo");

class ApiService {
  static ApiHandler = async (params) => {
    switch (params.method) {
      case "fetch":
        try {
          const todoLists = await eval(`${params.collection}`).findAll({});
          if (todoLists)
            return {
              statusCode: 200,
              body: JSON.stringify(todoLists),
            };
        } catch (error) {
          return {
            statusCode: 500,
            headers: { "Content-Type": "text/plain" },
            body: "failed to fetch todos",
          };
        }
      case "create":
        try {
          const { dataValues } = await eval(`${params.collection}`).create(
            params.body
          );
          if (dataValues)
            return {
              statusCode: 200,
              body: JSON.stringify(dataValues),
            };
        } catch (error) {
          return {
            statusCode: 500,
            headers: { "Content-Type": "text/plain" },
            body: "failed to create todos",
          };
        }

      case "findOne":
        try {
          const todoItem = await eval(`${params.collection}`).findByPk(
            params.body.id
          );
          console.log("todoItem", todoItem);
          if (todoItem)
            return {
              statusCode: 200,
              body: JSON.stringify(todoItem),
            };
        } catch (error) {
          return {
            statusCode: 500,
            headers: { "Content-Type": "text/plain" },
            body: "failed to fetch todo",
          };
        }

      default:
        return {
          statusCode: 500,
          headers: { "Content-Type": "text/plain" },
          body: null,
        };
    }
  };
}

module.exports = ApiService;
