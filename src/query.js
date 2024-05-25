import {
  where,
  orderBy,
  limit,
  skip,
  populate,
} from './methods/index.js';




const Query = class {
  constructor () {
    this.conditions = [];
    this.valueToPopulate = [];
  }
};

// Class methods
Query.where = where.bind(Query);
Query.orderBy = orderBy.bind(Query);
Query.limit = limit.bind(Query);
Query.skip = skip.bind(Query);
Query.populate = populate.bind(Query);



// const countriesQuery = new Query().where('continent', '==', 'Europe').orderBy('name', 'descending').limit(2);
// const countries = Country.find(countriesQuery);
// console.log(countries)




export default Query;