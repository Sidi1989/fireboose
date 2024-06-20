# API

## Model Methods

- findOneById
- findMany
- findOne
- create
- updateOne
- updateMany
- deleteOne
- deleteMany

### Array-related updates
- pushInto
- unshiftInto
- shiftFrom
- popFrom
- pullFrom


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