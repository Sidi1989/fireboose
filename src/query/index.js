import {
  where,
  orderBy,
  limit,
  skip,
  getQueryOperations,
} from './methods/index.js';




// https://firebase.google.com/docs/firestore/query-data/index-overview
// In order to run a composite query, a composite index must be created:

// When combining an equality clause (==) with:
//    -a range comparison (<, <=, >, >=):
//        E.g.: .where("capital", "==", "Rome").where("age", "<", 2000)
//    -a sorting by a different field:
//        E.g.: .where("continent", "==", "Europe").orderBy("population", "asc")

//  When combining an array-contains or array-contains-any clauses with additional clauses:
//        E.g.: .where("rivers", "array-contains", "Tajo").where("capital", "==", "Madrid")

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