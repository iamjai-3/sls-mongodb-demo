const RepositoryBaseService = require("./RepositoryBaseService");

class BaseService {
  static Init = async (params) => {
    let resp;
    switch (params.action) {
      case "create":
        resp = await RepositoryBaseService.create(params);
        return resp;

      case "update":
        resp = await RepositoryBaseService.update(params);
        return resp;

      case "delete":
        resp = await RepositoryBaseService.remove(params);
        return resp;

      case "fetch":
        resp = await RepositoryBaseService.findAll(params);
        return resp;

      case "findById":
        resp = await RepositoryBaseService.findById(params);
        return resp;

      default:
        return;
    }
  };
}

module.exports = BaseService;
