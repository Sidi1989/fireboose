import {
  where,
  orderBy,
  limit,
  skip,
  getQueryOperations,
} from './methods/index.js';




// https://firebase.google.com/docs/firestore/query-data/index-overview

// If you need to run a compound query that uses a range comparison (<, <=, >, or >=) 
// or if you need to sort by a different field, you must create a composite index for that query.
// You also need to create a composite index to combine an array-contains or array-contains-any query
// with additional clauses
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