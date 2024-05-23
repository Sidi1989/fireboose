import { 
  collection,
  getDocs,
  query, where,
} from 'firebase/firestore';




/**
 * @description
 * Retrieve Firestore documents from a collection, found by the presence of
 * some values for one of their properties.
 * @param {String} property E.g: 'seas'
 * @param {Array} elements E.g.: ['Atlantic', 'Mediterranean']
 * Although the values could be of different types (according to the property 
 * queried), all of the possible matches must be passed inside an array
 * @param {Object} matchProps Always includes two properties:
 *  -documentsLimit ({Number}): how many docs it will return; 
 *      1 by default
 *  -equality ({Boolean}): whether it will search for the equality or
 *   non-equality of the elements to the values of the property; 
 *      true by default
 * E.g.: {documentsLimit: 10, equality: true}
 * @returns Array (of Firestore docs)
 * @example 
 * When looking for the existence, it operates as the combination of
 * up to 30 equality (==) clauses on the same property with a logical OR;
 * so the query will return documents where the given property matches 
 * any of the comparison values.
 * 
 * When looking for the inexistence, it operates as the combination of
 * up to 10 non-equality (!=) clauses on the same property with a logical AND;
 * so the query will return documents where the given property exists, it is 
 * not null, and does not match any of the comparison values.
 */
const findManyByProperty = async function (property, elements, matchProps={documentsLimit: 1, equality: true}) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!property || !elements) {
    throw new Error('Not enough params for [findManyByProperty]')
  }
  
  // Here are set the values to be searched for (with their respective limits of
  // up to 30 or up to 10 clauses), as well as the decision of searching for their
  // equality or non-equality to values of the property:
  var queryConditions;
  if (matchProps && matchProps.equality == false) {
    queryConditions = where(property, 'not-in', elements);
  } else if (!matchProps || matchProps && matchProps.equality == true) {
    queryConditions = where(property, 'in', elements);
  }
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It will return all the documents where the elements are or not matched,
  // according to the equality option, up to the optional limit:
  var sliceLimit;
  if (matchProps && matchProps.documentsLimit != 1) {
    sliceLimit = matchProps.documentsLimit;
  } else if (!matchProps || matchProps && matchProps.documentsLimit == 1) {
    sliceLimit = 1;
  }

  if (docs.length > 0) {
    const slice = docs.slice(0, sliceLimit)
    return slice;
  } else {
    return docs;
  }
};




export default findManyByProperty;