import { 
  where, orderBy, limit, startAfter,
} from 'firebase/firestore';




/**
 * @description
 * Retreive all the operations defining the query, to create an array
 * that will be passed as an argument for the Firestore query( methods)
 * @returns {Query}
 * @example 
 * 
 */
const getQueryOperations = function () {
  const queryOperations = []
  
  // For the .where() method
  if (this.conditions && this.conditions.where && this.conditions.where.length > 0) {
    var whereConditions = this.conditions.where;
    whereConditions.forEach(function (condition) {
      var whereOperation = where(condition.property, condition.operator, condition.value);
      queryOperations.push(whereOperation);
    });
  }
  // For the .orderBy() method
  if (this.conditions && this.conditions.orderBy && this.conditions.orderBy.length > 0) {
    var orderByConditions = this.conditions.orderBy;
    orderByConditions.forEach(function (condition) {
      var orderByOperation = orderBy(condition.property, condition.direction? condition.direction : 'asc');
      queryOperations.push(orderByOperation);
    });
  }
  // For the .limit() method
  if (this.conditions && this.conditions.limit) {
    var limitOperation = limit(this.conditions.limit);
    queryOperations.push(limitOperation);
  }
  // For the .skip() method
  if (this.conditions && this.conditions.skip) {
    var skipOperation = startAfter(this.conditions.skip);
    queryOperations.push(skipOperation);
  }
  
  return queryOperations;
};




export default getQueryOperations;