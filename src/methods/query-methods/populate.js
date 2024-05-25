

/**
 * @description
 * Populate a property present in the documents of the query's results.
 * @param {String} property E.g: 'owner'
 * @returns {Query}
 */
const populate = async function (property) {
  this.valueToPopulate.push(property);
  
  return this;
};




export default populate;