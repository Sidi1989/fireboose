import { 
  factorFindMany, 
  factorFindOneById, 
  factorFindOneByProperty,
  factorInsertOne, 
  factorUpdateOne, 
  factorDeleteOne,
  factorUpdateArrayByAddingOne,
  factorUpdateArrayByRemovingOne,
} from './factories.js';




const model = function (name, collection) {
  const FirebooseClass = class {
    static collection = collection;

    constructor () {}
  };

  Object.defineProperty (FirebooseClass, 'name', {value: name});

  FirebooseClass.findMany = factorFindMany(FirebooseClass.collection);
  FirebooseClass.findOneById = factorFindOneById(FirebooseClass.collection);
  FirebooseClass.findOneByProperty = factorFindOneByProperty(FirebooseClass.collection, '');
  FirebooseClass.insertOne = factorInsertOne(FirebooseClass.collection);
  FirebooseClass.updateOne = factorUpdateOne(FirebooseClass.collection);
  FirebooseClass.deleteOne = factorDeleteOne(FirebooseClass.collection);
  FirebooseClass.updateArrayByAddingOne = factorUpdateArrayByAddingOne(FirebooseClass.collection);
  FirebooseClass.updateArrayByRemovingOne = factorUpdateArrayByRemovingOne(FirebooseClass.collection);

  return FirebooseClass;
}




export default model;