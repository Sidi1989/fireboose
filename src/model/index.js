import {
  create,
  ensureIndexes,

  findOne,
  findOneById,
  findMany,
  updateOne,
  updateOneById,
  updateMany,
  deleteOne,
  deleteOneById,
  deleteMany,

  popOne,
  popOneById,
  pullOne,
  pullOneById,
  pushOne,
  pushOneById,
  shiftOneById,
  shiftOne,
  unshiftOneById,
  unshiftOne,
} from './methods/index.js';

import {
  toObject,
  inspect,
  validate,
  save,
} from '../document/methods/index.js';




/**
 * @description Create a Fireboose Class, 
 * directly connected to a collection in Firestore
 * @param {String} name Name of the Class. E.g.: Country
 * @param {Schema} schema Schematic definition and conditions for the properties
 * of all the Class' instances
 * @param {String} collection Name of the collection in Firestore.
 * It is usually a lowerCase & pluralized version of {name}. E.g.: countries
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
  FirebooseClass.create = create.bind(FirebooseClass);
  FirebooseClass.ensureIndexes = ensureIndexes.bind(FirebooseClass);
  
  FirebooseClass.findOne = findOne.bind(FirebooseClass);
  FirebooseClass.findOneById = findOneById.bind(FirebooseClass);
  FirebooseClass.findMany = findMany.bind(FirebooseClass);
  FirebooseClass.updateOne = updateOne.bind(FirebooseClass);
  FirebooseClass.updateOneById = updateOneById.bind(FirebooseClass);
  FirebooseClass.updateMany = updateMany.bind(FirebooseClass);
  FirebooseClass.deleteOne = deleteOne.bind(FirebooseClass);
  FirebooseClass.deleteOneById = deleteOneById.bind(FirebooseClass);
  FirebooseClass.deleteMany = deleteMany.bind(FirebooseClass);
  
  FirebooseClass.popOne = popOne.bind(FirebooseClass);
  FirebooseClass.popOneById = popOneById.bind(FirebooseClass);
  FirebooseClass.pullOne = pullOne.bind(FirebooseClass);
  FirebooseClass.pullOneById = pullOneById.bind(FirebooseClass);
  FirebooseClass.pushOne = pushOne.bind(FirebooseClass);
  FirebooseClass.pushOneById = pushOneById.bind(FirebooseClass);
  FirebooseClass.shiftOne = shiftOne.bind(FirebooseClass);
  FirebooseClass.shiftOneById = shiftOneById.bind(FirebooseClass);
  FirebooseClass.unshiftOne = unshiftOne.bind(FirebooseClass);
  FirebooseClass.unshiftOneById = unshiftOneById.bind(FirebooseClass);

  // Instance methods
  FirebooseClass.prototype.toObject = toObject;
  FirebooseClass.prototype.inspect = inspect;
  FirebooseClass.prototype.validate = validate;
  FirebooseClass.prototype.save = save;

  // Before return the Class itself, a series of checks are carried out:
  if (schema.config.autoIndex) {
    FirebooseClass.ensureIndexes();
  }

  return FirebooseClass;
}




export {model};