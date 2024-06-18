/**
 * @description
 * Set the .where() conditions that the queried documents 
 * must fulfill to be retrieved.
 * @param {String} property E.g: 'name'
 * @param {String} operator 
 *  '==', '!=", '<', "<=", ">", ">=", 
 *  "in", "not-in", "array-contains", "array-contains-any"
 * @param {Mixed} value 27 || 'Spain' || true
 * @returns {Query}
 * @example 
 * ==
 * However, if the value is that of a property in a nested object, it should be 
 * passed as a flatten string. E.g.:
 *  Country.create(
 *    {
 *      name: 'Spain', 
 *      capital: {
 *        river: 'Manzanares',
 *        coasted: false,
 *      },
 *    },
 *    'newCountryId'
 *  );
 * 
 * const q1 = new Query().where('capital.river', '==', 'Manzanares')
 * 
 * array-contains
 * It looks for the presence of a certain element in one of its {Array} properties.
 * However, when asking about an array of objects; in order to return the documents
 * with that particular object in the array, it is necessary to pass the entire object
 * as an argument, not only a single field of it.
 * Otherwise, when the query refers to one of the object properties, there are 
 * two solutions:
 *    -create an additional array that only contains that property; or
 *    -store the objects as a sub-collection instead of as an array
 * 
 * const q2 = new Query().where('seas', 'array-contains', 'Mediterranean')
 * 
 * array-contains-any
 * It operates as the combination of up to 30 'array-contains' clauses on the same 
 * array property, with a logical OR; so the query will return documents where 
 * the queried array contains one or more of the comparison elements.
 * 
 * const q3 = new Query().where(seas, 'array-contains-any', ['Atlantic', 'Mediterranean'])
 */
const WhereCondition = class {
  constructor(property, operator, value) {
    this.property = property;
    this.operator = operator;
    this.value = value;
  }
}

const where = function (property, operator, value) {
  const condition = new WhereCondition(property, operator, value);
  this.conditions.where.push(condition);
  return this;
};




export default where;