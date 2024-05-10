import { 
  findMany,
  findOneByProperty,
  findOneById,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayByAddingOne,
  updateArrayByRemovingOne
} from './methods.js';




/**
 * @description
 * @param {String} name Name of the Class. E.g.: Dog
 * @param {String} collection Name of the collection in Firestore.
 * It is usually a lowerCase & pluralized version of {name}. E.g.: dogs
 * @returns 
 */
const model = function (name, collection) {
  const fireboose = this;

  const FirebooseClass = class {
    static app = fireboose.app;
    static db = fireboose.db;
    static collection = collection;

    constructor () {}
  };

  Object.defineProperty (FirebooseClass, 'name', {value: name});

  FirebooseClass.findMany = findMany.bind(FirebooseClass);
  FirebooseClass.findOneByProperty = findOneByProperty.bind(FirebooseClass);
  FirebooseClass.findOneById = findOneById.bind(FirebooseClass);
  FirebooseClass.insertOne = insertOne.bind(FirebooseClass);
  FirebooseClass.updateOne = updateOne.bind(FirebooseClass);
  FirebooseClass.deleteOne = deleteOne.bind(FirebooseClass);
  FirebooseClass.updateArrayByAddingOne = updateArrayByAddingOne.bind(FirebooseClass);
  FirebooseClass.updateArrayByRemovingOne = updateArrayByRemovingOne.bind(FirebooseClass);

  return FirebooseClass;
}




export {model};