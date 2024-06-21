# API

## Model Methods

- create
- findOneById
- findOne
- findMany
- updateOne
- updateMany
- deleteOne
- deleteMany

### Array-related updates
- shiftFrom
- popFrom
- pullFrom
- unshiftInto
- pushInto


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