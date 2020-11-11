**[@jonasrottmann/livedata](README.md)**

# @jonasrottmann/livedata

## Index

### Classes

* [LiveData](classes/livedata.md)
* [MediatorLiveData](classes/mediatorlivedata.md)

### Functions

* [distinct](README.md#distinct)
* [filter](README.md#filter)
* [map](README.md#map)
* [merge](README.md#merge)
* [switchMap](README.md#switchmap)

## Functions

### distinct

▸ **distinct**\<T>(`liveData`: [LiveData](classes/livedata.md)\<T>, `comparator?`: (a: T, b: T) => Boolean): [LiveData](classes/livedata.md)\<T>

Produce a new `LiveData`, which only emits if the value changed compared to the last emitted value.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`liveData` | [LiveData](classes/livedata.md)\<T> | The LiveData to be filtered. |
`comparator?` | (a: T, b: T) => Boolean | Defaults to strict equality comparison (===). |

**Returns:** [LiveData](classes/livedata.md)\<T>

A new LiveData.

___

### filter

▸ **filter**\<T>(`liveData`: [LiveData](classes/livedata.md)\<T>, `predicate`: (value: T) => Boolean): [LiveData](classes/livedata.md)\<T>

Produce a new `LiveData`, which only emits values which fulfil the given predicate.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`liveData` | [LiveData](classes/livedata.md)\<T> | The LiveData to be filtered. |
`predicate` | (value: T) => Boolean | Decides wether the value is allowed (returns true if value is allowed). |

**Returns:** [LiveData](classes/livedata.md)\<T>

A new LiveData.

___

### map

▸ **map**\<T, S>(`liveData`: [LiveData](classes/livedata.md)\<T>, `transformer`: (value: T) => S): [LiveData](classes/livedata.md)\<S>

Builds a new LiveData whose value gets updated (during it's active) whenever the source changes.

`map` is used to apply the given transformer function to each value emitted by the source `LiveData` and returns a new `LiveData` which emits those resulting values.

**`example`** <caption>Will print `✅` followed by `🛑`.</caption>
```javascript
const source = new LiveData(true)
const mapped = map(source, v => v ? '✅' : '🛑')
mapped.subsribe(v => console.log(v))
source.set(false)
```

#### Type parameters:

Name |
------ |
`T` |
`S` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`liveData` | [LiveData](classes/livedata.md)\<T> | The source LiveData. |
`transformer` | (value: T) => S | A mapping to apply to values of the source. |

**Returns:** [LiveData](classes/livedata.md)\<S>

A new LiveData.

___

### merge

▸ **merge**\<T>(`livedatas`: Array\<[LiveData](classes/livedata.md)\<T>>): [LiveData](classes/livedata.md)\<T>

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`livedatas` | Array\<[LiveData](classes/livedata.md)\<T>> |

**Returns:** [LiveData](classes/livedata.md)\<T>

___

### switchMap

▸ **switchMap**\<T, S>(`liveData`: [LiveData](classes/livedata.md)\<T>, `transformer`: (value: T) => [LiveData](classes/livedata.md)\<S>): [LiveData](classes/livedata.md)\<S>

Builds a new LiveData whose value gets updated (during it's active) whenever the tigger changes or the LiveData result of the transformation updates.

`switchMap` is used to react to changes to the trigger `LiveData` and returns a new `LiveData` which emits values from whatever `LiveData` the transformer function returns.

**`example`** <caption>`switched` will emit the values emitted by `switchA` if `trigger` contains `true` and the values emitted by `switchB` if `trigger` contains `false`.</caption>
```javascript
const trigger = new LiveData(true)
const switchA = new LiveData('🅰️')
const switchB = new LiveData('🅱️')
const switched = switchMap(trigger, v => v ? switchA : switchB)
switched.subscribe(v => console.log(v))
```

#### Type parameters:

Name |
------ |
`T` |
`S` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`liveData` | [LiveData](classes/livedata.md)\<T> | The trigger LiveData. |
`transformer` | (value: T) => [LiveData](classes/livedata.md)\<S> | A mapping for switching to another LiveData depending on the value of the trigger. |

**Returns:** [LiveData](classes/livedata.md)\<S>

A new LiveData.
