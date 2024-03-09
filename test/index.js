import fireboose, {findMany} from '../src/index.js';
import app from '../runtime/config/firebase-client.js';


const db = fireboose(app);


findMany(db, 'members').then(function (resolve) {
  console.debug(resolve);
});
