
/**
 * @description
 * Limit the number of documents to be retrieved in the query's results.
 * @param {Number} resultsToLimit E.g: 5
 * @returns {Query}
 * @example 
 * After the query returns 8 documents:
 *  [doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8]
 * A new limitedQuery would be:
 *  [doc1, doc2, doc3, doc4, doc5]
 */
const limit = async function (resultsToLimit) {
  this.limitTo = resultsToLimit;
  
  return this;
};




export default limit;