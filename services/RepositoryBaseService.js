const { Device, Things } = require("../models/index");

class RepositoryBaseService {
  static create = async (params) => {
    try {
      const { dataValues } = await eval(`${params.collection}`).create(
        params.body
      );
      return dataValues ? this.successResp(dataValues) : this.errorResp(params);
    } catch (error) {
      return this.errorResp(params);
    }
  };

  static update = async (params) => {
    try {
      const dataValues = await eval(`${params.collection}`).update(
        params.body,
        {
          where: { id: params.id },
        }
      );
      return dataValues
        ? this.successResp(`Updated ${params.collection} successfully`)
        : this.errorResp(params);
    } catch (error) {
      return this.errorResp(params);
    }
  };

  static remove = async (params) => {
    try {
      const dataValues = await eval(`${params.collection}`).destroy({
        where: { id: params.id },
      });
      return dataValues
        ? this.successResp(`Deleted ${params.collection} successfully`)
        : this.errorResp(params);
    } catch (error) {
      return this.errorResp(params);
    }
  };

  static findAll = async (params) => {
    try {
      const response = await eval(`${params.collection}`).findAll({});
      return response ? this.successResp(response) : this.errorResp(params);
    } catch (error) {
      return this.errorResp(params);
    }
  };

  static findById = async (params) => {
    try {
      const { dataValues } = await eval(`${params.collection}`).findByPk(
        params.body.id
      );
      return dataValues ? this.successResp(dataValues) : this.errorResp(params);
    } catch (error) {
      return this.errorResp(params);
    }
  };

  static successResp = (response) => {
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  };

  static errorResp = (params) => ({
    statusCode: 500,
    headers: { "Content-Type": "text/plain" },
    body: `failed to ${params.action} ${params.collection}`,
  });
}

module.exports = RepositoryBaseService;
