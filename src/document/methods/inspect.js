/**
 * @description
 * Help logging information about an instance.
 * 
 * It exposes both ownProperties and the inherited ones, but only 
 * if they are enumerable.
 * @return {Log}
 */
const inspect = function () {
  for (let prop in this) {
    console.log(prop, this[prop]);
  }
};




export default inspect;