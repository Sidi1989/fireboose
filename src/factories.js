import { 
  findMany,
  findOneById,
  findOneByProperty,
  insertOne,
  updateOne,
  deleteOne,
  updateArrayByAddingOne,
  updateArrayByRemovingOne,
} from './methods.js';




/**
 * @description
 * Función que parametriza findMany, permitiendo evitar explicitar 
 * algunos de sus parámetros, allí donde se utilice
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
 * Función que parametriza findOne, permitiendo evitar explicitar 
 * algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorFindOneById = function (collectionName) {
  const factoredFunction = async function (docId) {
    return await findOneById(docId, collectionName);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza findOneByProperty, permitiendo evitar 
 * explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorFindOneByProperty = function (collectionName, propertyName) {
  const factoredFunction = async function (propertyValue) {
    return await findOneByProperty(collectionName, propertyName, propertyValue);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza insertOne, permitiendo evitar explicitar 
 * algunos de sus parámetros, allí donde se utilice
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
 * Función que parametriza updateOne, permitiendo evitar explicitar 
 * algunos de sus parámetros, allí donde se utilice
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
 * Función que parametriza deleteOne, permitiendo evitar explicitar 
 * algunos de sus parámetros, allí donde se utilice
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
 * Función que parametriza updateArrayByAddingOne, permitiendo evitar 
 * explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorUpdateArrayByAddingOne = function (collectionName) {
  const factoredFunction = async function (docId, arrayToUpdate, fieldInfo) {
    return await updateArrayByAddingOne(docId, collectionName, arrayToUpdate, fieldInfo);
  };
  return factoredFunction;
};


/**
 * @description
 * Función que parametriza updateArrayByRemovingOne, permitiendo evitar 
 * explicitar algunos de sus parámetros, allí donde se utilice
 * @returns Function
 */
const factorUpdateArrayByRemovingOne = function (collectionName) {
  const factoredFunction = async function (docId, arrayToUpdate, fieldInfo) {
    return await updateArrayByRemovingOne(docId, collectionName, arrayToUpdate, fieldInfo);
  };
  return factoredFunction;
};




export { 
  factorFindMany,
  factorFindOneById,
  factorFindOneByProperty,
  factorInsertOne,
  factorUpdateOne,
  factorDeleteOne,
  factorUpdateArrayByAddingOne,
  factorUpdateArrayByRemovingOne
};