
/**
 * @description
 * Skip multiple documents of the query's results.
 * @param {Number} resultsToSkip E.g: 5
 * @returns {Query}
 * @example 
 * After the query returns 8 documents:
 *  [doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8]
 * A new skippedQuery would be:
 *  [doc6, doc7, doc8]
 */
const skip = async function (resultsToSkip) {
  this.skipTo = resultsToSkip;
  
  return this;
};




export default skip;