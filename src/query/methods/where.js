/**
 * @description
 * Set the .where() conditions that the queried documents 
 * must fulfill to be retrieved.
 * @param {String} property E.g: 'name'
 * About 'nested objects':
 * 
 * If the property whose value is checked is a nested property, 
 * like 'river' in this:
 *  {
 *    name: 'Spain', 
 *    capital: { 
 *      city: 'Madrid', 
 *      river: 'Manzanares'
 *    }
 *  }
 * 
 * It should should be passed as a flatten string, like this:
 *  const q1 = new Query().where('capital.river', '==', 'Manzanares')
 * @param {String} operator 
 *  '==', '!=", '<', "<=", ">", ">=", 
 *  "array-contains", "array-contains-any", "in", "not-in"
 * @param {Mixed} value 27 || 'Spain' || true
 * @returns {Query}
 * @example 
 * ==, !=
 * It looks for the documents whose passed property's value matches (or not) the
 * value passed as the third argument.
 *  
 * 
 * <, >, <=, >=
 * 
 * It looks for the documents whose passed property's value is respectively 
 * [less than], [greater than], [less than or equal to] or [greater than or equal to], 
 * the value passed as the third argument.
 * 
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
 * const q_ac = new Query().where('seas', 'array-contains', 'Mediterranean')
 * 
 * 
 * array-contains-any
 * It operates as the combination of up to 30 'array-contains' clauses on the same 
 * array property, with a logical OR; so the query will return documents where 
 * the queried array contains one or more of the comparison elements.
 * 
 * const q_aca = new Query().where(seas, 'array-contains-any', ['Atlantic', 'Mediterranean'])
 * 
 * 
 * in
 * 
 * It operates as the combination of up to 30 equality (==) clauses on the same 
 * property with a logical OR; so the query will return documents where the given 
 * property matches any of the comparison values.
 * 
 * not-in
 * 
 * It operates as the combination of up to 10 non-equality (!=) clauses on the same
 * property with a logical AND; so the query will return documents where the given 
 * property exists and it is not null, and does not match any of the comparison values.
 * 
 * in & not-in
 * Although the values could be of different types (according to the property 
 * queried), all of the possible matches to look for must be passed inside an array.
 * In addition, as a != query clause might match many documents in a collection, it is
 * recommended to control the number of results returned through adding a limit clause.
 * 
 * const q_in = new Query().where('continent', 'in', ['Europe', 'Africa', 'Oceania'])
 * It will return countries such as Spain, Morocco and New Zeland
 * 
 * const q_notIn = new Query().where('continent', 'not-in', ['Europe', 'Africa', 'Oceania'])
 * It will return countries such as Mexico and Japan
 * 
 * @limitations
 * There cannot be a combination of [!=] and [not-in], in a compound query.
 * In a compound query, range (<, <=, >, >=) and not equals (!=, not-in) comparisons 
 * must all filter on the same field.
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