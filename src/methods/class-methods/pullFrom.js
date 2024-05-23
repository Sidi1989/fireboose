import { 
  collection, doc,
  updateDoc, arrayRemove,
} from 'firebase/firestore';




/**
 * @description
 * Update a document by removing, from one of its {Array} properties,
 * those elements whose value is coincident with the element passed
 * as the argument.
 * @param {String} docId E.g: 'country1a'
 * @param {String} arrayProp E.g: 'countries'
 * @param {Mixed} element 27 || 'Spain' || {name: 'Spain', city: 'Madrid'}
 * @returns String
 */
const pullFrom = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName); 

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pullFrom]')
  }
  
  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be removing elements with more of a set-like functionality.
  // So rather than asking to delete an item at index [i], you would ask to remove, 
  // for example, all elements whose value is the string "Spain".
  
  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayRemove(element)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};




export default pullFrom;