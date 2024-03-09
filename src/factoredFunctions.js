import { 
  findMany,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayInOne,
} from './functions.js'




/**
 * @description
 * Función que parametriza findMany, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorFindMany = function (collectionName) {
  const factoredFunction = async function () {
    return await findMany(collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza findOne, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorFindOne = function (collectionName) {
  const factoredFunction = async function (docId) {
    return await findOne(docId, collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza insertOne, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorInsertOne = function (collectionName) {
  const factoredFunction = async function (docId, docInfo) {
    return await insertOne(docId, docInfo, collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza updateOne, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorUpdateOne = function (collectionName) {
  const factoredFunction = async function (docId, docInfo) {
    return await updateOne(docId, docInfo, collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza deleteOne, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorDeleteOne = function (collectionName) {
  const factoredFunction = async function (docId) {
    return await deleteOne(docId, collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza updateArrayInOne, permitiendo eliminar la necesidad 
 * de explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorUpdateArrayInOne = function (collectionName) {
  const factoredFunction = async function (docId, arrayToUpdate, operation, fieldInfo) {
    return await updateArrayInOne(docId, collectionName, arrayToUpdate, operation, fieldInfo);
  };
  return factoredFunction;
};




export { 
  factorFindMany,
  factorFindOne,
  factorInsertOne,
  factorUpdateOne,
  factorDeleteOne,
  factorUpdateArrayInOne,
};