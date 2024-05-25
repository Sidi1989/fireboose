
/**
 * @description
 * Order the documents to be retrieved in the query's results, according to
 * a certain parameter.
 * @param {String} property E.g: 'population'
 * @param {String} direction It could ony be 'ascending' or 'descending'
 * @returns {Query}
 * @example 
 * If the values of the ordered property are:
 *  strings:
 *  numbers:
 *  booleans:
 *  objects:
 */
const orderBy = async function (property, direction) {
  this. orderConditions = {property, direction};
  
  return this;
};




export default orderBy;