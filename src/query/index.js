import {
  where,
  orderBy,
  limit,
  skip,
  getQueryOperations,
} from './methods/index.js';




const Query = class {
  constructor () {
    this.conditions = {
      where: [],
      orderBy: [],
      limit: 30,
      skip: 0
    };

    this.where = where;
    this.orderBy = orderBy;
    this.limit = limit;
    this.skip = skip;
  }
};

Query.prototype.getQueryOperations = getQueryOperations;




export default Query;