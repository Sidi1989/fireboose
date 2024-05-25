
/**
 * @description
 * Set the conditions that the queried documents must fulfill to be retrieved.
 * @param {String} property E.g: 'name'
 * @param {String} operator 
 *  '==', '!=", '<', "<=", ">", ">=", 
 *  "in", "not-in", "array-contains", "array-contains-any"
 * @param {Mixed} value 27 || 'Spain' || true
 * @returns {Query}
 * @example 
 * ...
 */
const Condition = class {
  constructor(field, operator, value) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}

const where = async function (property, operator, value) {
  this.conditions.push(new Condition.default(property, operator, value));
  return this;
};




export default where;