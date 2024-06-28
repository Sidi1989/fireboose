/**
 * @description
 * Convert an instance into a Plain Object.
 * 
 * It includes only ownProperties (both enumerable and non-enumerable),
 * and not the inherited ones, so it excludes methods like:
 * inspect(), save(),... which are inherited from its parent Class.
 * @return {Object}
 */
const toObject = function () {
  const pojo = {}
  for (let prop of Object.getOwnPropertyNames(this)) {
    pojo[prop] = this[prop];
  }

  return pojo;
}




export default toObject;