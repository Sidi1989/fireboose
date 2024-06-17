import { 
  collection, doc,
  getDoc,
} from 'firebase/firestore';




/**
 * @description
 * Retrieve a Firestore document from a collection, found by its ID.
 * @param {String} docId E.g: 'country01'
 * @returns Firestore doc || null
 */
const findOneById = async function (docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId) {
    throw new Error('Not enough params for [findOneById]')
  }

  const docRef = doc(collectionRef, docId);
  var docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const doc = docSnap.data();
    return doc;
  } else {
    return null;
  }
};




export default findOneById;