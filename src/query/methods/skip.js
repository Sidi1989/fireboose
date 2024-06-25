/**
 * @description
 * Skip multiple documents of the query's results.
 * @param {Number} offset E.g: 5 
 * The index itself would be included among the skipped ones.
 * It would be 0 by default, if not set.
 * @returns {Query}
 * @example 
 * After the query returns 8 documents:
 *  [doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8]
 * A new skippedQuery would be:
 *  [doc6, doc7, doc8]
 * 
 * Attention:
 * Firestore has its own internal sort order (usually the document.id); 
 * so if a query is sorted with .orderBy(), the first document will be 
 * relative to that sorting.
 * That way, only an orderBy() query will have a real concept of a "0" position;
 * which means that a query.skip() will always require a previous orderBy() operator
 */
const skip = function (offset) {
  this.conditions.skip = offset;
  
  return this;
};




export default skip;