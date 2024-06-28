import { 
  collection, doc,
  addDoc, setDoc,
} from 'firebase/firestore';




/**
 * @description
 * Create or Add a document to a collection, depending on an optional
 * 'id' argument.
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * @param {String} docId (Optional) E.g: 'country01'
 * @return String
 * @example
 * const newCountryWithChosenId = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    newCountryId
 * );
 * // After saving it to Firestore, it returns the id: 'newCountryId'
 * 
 * const newCountryWithoutChosenId = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}
 * );
 * // After saving it to Firestore, it returns an auto-generated id
 */
const create = async function (docInfo, docId) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docInfo) { 
    throw new Error('Not enough params for [create]') 
  }

  if (docId) {
    const docRef = doc(collectionRef, docId);
    await setDoc(docRef, docInfo);
    return docRef.id;
  // If there isn't any meaningful ID for the document, Cloud Firestore 
  // will auto-generate one for the document:
  } else {
    const docRef = await addDoc(collectionRef, docInfo);
    return docRef.id;
  }
};




export default create;