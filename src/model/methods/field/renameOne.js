import { 
  collection, doc,
  getDocs, query,
  getDoc, 
  deleteField, updateDoc,
} from 'firebase/firestore';




/**
 * @description
 * Rename a specific field from a document 
 * (identified as the result of a query).
 * @param {Query} q
 * @param {String} oldKey E.g: 'countries'
 * @param {String} newKey E.g: 'nations'
 * @returns {String || Null} Id of the updated document || Null
 * @example
 * const newCountry = await Country.create(
 *    {name: 'USA', colonies: ['Virginia', 'Maryland', 'Delaware']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.renameOne(
 *    query,
 *    'colonies',
 *    'states'
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'USA', states: ['Virginia', 'Maryland', 'Delaware']}
 */
const renameOne = async function (q, oldKey, newKey) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!q || !oldKey || !newKey) {
    throw new Error('Not enough params for [renameOne]')
  }
  
  // Once every queryOperation is included in the array, 
  // this array itself must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docsIds = [];
  var querySnap = await getDocs(queryDocs);
  
  querySnap.forEach(function(docSnap) {
    docsIds.push(docSnap.id);
  });

  // It only keeps the first coincidence:
  if (docsIds.length > 0) {
    const queriedDocumentId = docsIds[0];
    const docRef = doc(collectionRef, queriedDocumentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const doc = docSnap.data();
      
      // When 'New key' already exist, but 'Old key' does not:
      if (doc[newKey] && !doc[oldKey]) {
        return null;
      }

      // When neither 'Old key' nor 'New key' exist:
      if (!doc[newKey] && !doc[oldKey]) {
        return null;
      }

      // When both 'Old key' and 'New key' exist:
      //   -the 'Old key' field is deleted
      if (doc[oldKey] && doc[newKey]) {
        const deletion = {[oldKey]: deleteField()};
        await updateDoc(docRef, deletion);

        return docRef.id;
      }

      // When 'Old key' exists and 'New key' does not, the Doc is updated:
      //   -the 'New key' preserves the 'Old key' field value 
      //   -the 'Old key' field is deleted
      if (doc[oldKey] && !doc[newKey]) {
        const preservation = {[newKey]: doc[oldKey]};
        await updateDoc(docRef, preservation);
        const deletion = {[oldKey]: deleteField()};
        await updateDoc(docRef, deletion);

        return docRef.id
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};




export default renameOne;