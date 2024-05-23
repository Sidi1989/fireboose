import { 
  collection,
  getDocs,
  query, where,
} from 'firebase/firestore';




/**
 * @description
 * Retrieve a Firestore document from a collection, found by any of
 * its properties.
 * @param {String} property E.g: 'age'
 * @param {Mixed} value E.g: 753 (Coincident with typeof(property))
 * @returns Firestore doc || null
 */
const findOneByProperty = async function (property, value) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  // About 'nested objects':

  // If the value is that of a property in a nested object, it should be passed
  // as a flatten string. E.g.:
  // Country.create(
  //    {
  //      name: 'Spain', 
  //      capital: {
  //        river: 'Manzanares',
  //        coasted: false,
  //      }, 
  //    },
  //    'newCountryId'
  // );
  // const foundCountry = await Country.findOneByProperty('capital.river', 'Manzanares');

  if (!property || !value) {
    throw new Error('Not enough params for [findOneByProperty]')
  }
  
  // Here is set the property to be searched for:
  const queryConditions = where(property, '==', value);
  const queryDocs = query(collectionRef, queryConditions);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It only returns the first coincidence:
  if (docs.length > 0) {
    return docs[0];
  } else {
    return null
  }
};




export default findOneByProperty;