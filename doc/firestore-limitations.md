# Firestore limitations

https://stackoverflow.com/questions/53790175/why-does-this-firestore-query-require-an-index
https://firebase.google.com/docs/firestore/query-data/index-overview
https://firebase.google.com/docs/firestore/query-data/queries
https://firebase.google.com/docs/firestore/query-data/order-limit-data


## Indexes creation

Contrary to https://mongoosejs.com/docs/api/model.html#Model.ensureIndexes()
where Moongose can ask MongoDB to create the necessary indexes, 
Fireboose CANNOT ask Firestore to do it, so it must be done manually in the GUI.
However, thanks to the Fireboose Query`s "ensureIndexes()" and the default 
configuration of "autoIndex", a list of all the needed links (for the visual creation
of the indexes, through the Firestore GUI) will be triggered as soon as their fault
is detected (showing them up in the Console).


## Composite queries I

So, in order to run a composite query, a composite index must be created.
And those composite queries will take place:

- When combining an equality clause (==) with:
    - a range comparison (<, <=, >, >=):
      E.g.: .where("capital", "==", "Rome").where("age", "<", 2000)

    - a sorting by a different field:
      E.g.: .where("continent", "==", "Europe").orderBy("population", "asc")

- When combining an array-contains or array-contains-any clauses with additional clauses:
    E.g.: .where("rivers", "array-contains", "Tajo").where("capital", "==", "Madrid")


## Composite queries II

  - There cannot be a combination of (!=) and (not-in), in a composite query.
  - In a composite query, range (<, <=, >, >=) and not equals (!=, not-in) comparisons 
  must all filter on the same field.
  - Firestore has its own internal sort order (usually the document.id); so if a query is 
  sorted through an .orderBy(), the first document will be relative to that sorting.
  That way, only an orderBy() query will have a real concept of a "0" position;
  and a query.skip() will always require a previous orderBy() operator.