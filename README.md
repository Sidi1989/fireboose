# README

Elegant Firebase's Firestore object modeling for node.js

Fireboose provides a straight-forward, schema-based solution to model your 
application data. It includes built-in type casting, validation, query 
building, business logic hooks and more, out of the box.

## Example

```js
const fireboose = require('fireboose');
fireboose.connect('mongodb://127.0.0.1:27017/test');

const Pet = fireboose.model({ name: String }, { collection: String });

const dog = new Pet({ name: 'Kira' });
dog.save().then(() => console.log('guau'));
```