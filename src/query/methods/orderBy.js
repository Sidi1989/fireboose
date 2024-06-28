/**
 * @description
 * Set the .orderBy() conditions to show the queried documents,
 * according to a certain order parameter.
 * @param {String} property E.g: 'population'
 * @param {String} direction (Optional) 
 * It could only be 'asc' or 'desc'; and by default, when it is not set,
 * the order will be ascending ('asc')
 * @returns {Query}
 * @example 
 * If the values of the ordered property are:
 *  strings: the order will be alphanumerical (a - z)
 *  numbers: the order will be alphanumerical (0 - 1000)
 *  booleans: false < true
 *  arrays: the order will be based on their element values.
 *    -But an array cannot contain another array value as one of its elements
 *    if it is set to be compared
 *    -When comparing two arrays, the first elements of each array are compared. 
 *    So if the first elements are equal, then the second elements are compared and so on,
 *    until a difference is found. 
 *    -If an array runs out of elements to compare but is equal up to that point, then 
 *    the shorter array is ordered before the longer array.
 *  objects: they will be sorted by their keys and compared by key-value pairs.
 *    -Firstly comparing the keys and then the values; and if the first key-value pairs 
 *    are equal, the next key-value pairs are compared, and so on. 
 *    -If two objects have all of the same key-value pairs, then object length is considered
 */
const OrderByCondition = class {
  constructor(property, direction) {
    this.property = property;
    this.direction = direction;
  }
}

const orderBy = function (property, direction) {
  const condition = new OrderByCondition(property, direction);
  this.conditions.orderBy.push(condition);
  return this;
};




export default orderBy;