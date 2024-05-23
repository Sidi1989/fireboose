import { 
  findOneById,
  findMany,
  findOneByProperty,
  findManyByProperty,
  findByArrayElement,
  findByArrayElements,
  create,
  updateOne,
  pushInto,
  pullFrom,
  deleteOne,
} from './class-methods.js';

import {
  toObject,
  inspect,
  validate,
  save,
} from './methods/index.js';




/**
 * @description
 * 
 * Create a Fireboose Class, directly connected to a collection in Firestore
 * @param {String} name Name of the Class. E.g.: Dog
 * @param {Schema} schema Schematic definition and conditions for the properties
 * of all the Class' instances
 * @param {String} collection Name of the collection in Firestore.
 * It is usually a lowerCase & pluralized version of {name}. E.g.: dogs
 */
const model = function (name, schema, collection) {
  const fireboose = this;

  const FirebooseClass = class {
    static app = fireboose.app;
    static db = fireboose.db;
    static collection = collection;
    static name = name;
    static schema = schema;

    constructor (info, id) {
      for (var key in info) {
        this[key] = info[key];
      }
      this.__id = id;
    }
  };

  // Class methods
  FirebooseClass.findOneById = findOneById.bind(FirebooseClass);
  FirebooseClass.findMany = findMany.bind(FirebooseClass);
  FirebooseClass.findOneByProperty = findOneByProperty.bind(FirebooseClass);
  FirebooseClass.findManyByProperty = findManyByProperty.bind(FirebooseClass);
  FirebooseClass.findByArrayElement = findByArrayElement.bind(FirebooseClass);
  FirebooseClass.findByArrayElements = findByArrayElements.bind(FirebooseClass);
  FirebooseClass.create = create.bind(FirebooseClass);
  FirebooseClass.updateOne = updateOne.bind(FirebooseClass);
  FirebooseClass.pushInto = pushInto.bind(FirebooseClass);
  FirebooseClass.pullFrom = pullFrom.bind(FirebooseClass);
  FirebooseClass.deleteOne = deleteOne.bind(FirebooseClass);
  
  // Instance methods
  FirebooseClass.prototype.toObject = toObject;
  FirebooseClass.prototype.inspect = inspect;
  FirebooseClass.prototype.validate = validate;
  FirebooseClass.prototype.save = save;

  return FirebooseClass;
}




export {model};