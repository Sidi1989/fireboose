import { 
  findMany,
  findOneByProperty,
  findOneById,
  create,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayByAddingOne,
  updateArrayByRemovingOne
} from './class-methods.js';

import {
  save,
  inspect
} from './instance-methods.js';




/**
 * @description
 * @param {String} name Name of the Class. E.g.: Dog
 * @param {String} collection Name of the collection in Firestore.
 * It is usually a lowerCase & pluralized version of {name}. E.g.: dogs
 */
const model = function (name, collection) {
  const fireboose = this;

  const FirebooseClass = class {
    // Class properties
    static app = fireboose.app;
    static db = fireboose.db;
    static collection = collection;
    static name = name;

    // Instance properties
    constructor (info, id) {
      const instanceInfo = {};
      for (var key in info) {
        instanceInfo[key] = info[key];
      }
      this.info = instanceInfo;
      this.__id = id;
    }
  };

  // Class methods
  FirebooseClass.findMany = findMany.bind(FirebooseClass);
  FirebooseClass.findOneByProperty = findOneByProperty.bind(FirebooseClass);
  FirebooseClass.findOneById = findOneById.bind(FirebooseClass);
  FirebooseClass.create = create.bind(FirebooseClass);
  FirebooseClass.insertOne = insertOne.bind(FirebooseClass);
  FirebooseClass.updateOne = updateOne.bind(FirebooseClass);
  FirebooseClass.deleteOne = deleteOne.bind(FirebooseClass);
  FirebooseClass.updateArrayByAddingOne = updateArrayByAddingOne.bind(FirebooseClass);
  FirebooseClass.updateArrayByRemovingOne = updateArrayByRemovingOne.bind(FirebooseClass);
  
  // Instance methods
  FirebooseClass.prototype.save = save;
  FirebooseClass.prototype.inspect = inspect;

  return FirebooseClass;
}




export {model};