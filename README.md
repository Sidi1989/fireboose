# README

Elegant Firebase's Firestore object modeling for node.js

Fireboose provides a straight-forward, schema-based solution to model your 
application data. It includes built-in type casting, validation, query 
building, business logic hooks and more, out of the box.

## Expected example

```js
const fireboose = require('fireboose');

const config = {};
fireboose.connect(config);

const Pet = fireboose.model('Pet', 'pets');

const dog = new Pet({ name: 'Kira' });
dog.save().then(() => console.log('guau'));
```

## Acknowledgement

[Firefose](https://www.npmjs.com/package/firefose)