# API

## Model Methods

- create
- ensureIndexes
- findOneById
- findOne
- findMany
- updateOne
- updateMany
- deleteOne
- deleteMany

### Array-related updates

- pullFrom (remove coincident elements)
- shiftFrom (remove first element)
- popFrom (remove last element)
- unshiftInto (add element at the beginning)
- pushInto (add element at the end)

### Basic arrangement

| Action      | One             | Many          |
| :---:       | :---:           | :---:         |
| Find        | findOneById     | ...           |
| Find        | findOne         | findMany      |
| Update      | updateOne       | updateMany    |
| Delete      | deleteOne       | deleteMany    |


## Document Methods

- toObject()
- inspect()
- validate()
- save()

## Query Methods

- Skip
- Limit
- OrderBy
- Where
- getQueryOperations