import { 
  collection, doc,
  updateDoc, arrayUnion, 
} from 'firebase/firestore';




/**
 * @description
 * Update a document by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, appending it 
 * at the end of the array.
 * @param {String} docId E.g: 'country1a'
 * @param {String} arrayProp E.g: 'countries'
 * @param {Mixed} element 27 || 'Spain' || true || {name: 'Spain', city: 'Madrid'}
 * @returns String
 * @example
 * const country1a = {
 *   id: 'country1a',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.pushInto(country1a, cities, 'Valencia');
 * 
 * console.log(country1a)
 * // {
 * //   id: 'country1a',
 * //   cities: ['Madrid', 'Barcelona', 'Valencia']
 * // };
 */
const pushInto = async function (docId, arrayProp, element) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!docId || !arrayProp || !element) {
    throw new Error('Not enough params for [pushInto]')
  }

  // According to Firebase Blog: 
  // https://firebase.blog/posts/2018/08/better-arrays-in-cloud-firestore/
  // In order to avoid some of the issues that can arise in a multi-user environment,
  // you’ll be adding elements with more of a set-like functionality.
  // So the arrayUnion operator will append an element to an array at the end of it,
  // and only if it doesn’t exist in the array already.

  const docRef = doc(collectionRef, docId);
  let updateInfo = {
    [arrayProp]: arrayUnion(element)
  }
  await updateDoc(docRef, updateInfo);
  return docId;
};




export default pushInto;