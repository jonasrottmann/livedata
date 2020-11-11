**[@jonasrottmann/livedata](../README.md)**

# Class: MediatorLiveData\<T>

`MediatorLiveData` is a subclass of [LiveData](livedata.md) which allows to listen to multiple source [LiveData](livedata.md)s and react to value changes.

**`example`** <caption>For example we can combine two `LiveData`s (`liveDataA` and `liveDataB`) in a `MediatorLiveData` by adding them as sources. Whenever `liveDataA` or `liveDataB` emits a new value, `mediator` will be updated.</caption>
```javascript
const liveDataA = new LiveData('🅰️')
const liveDataB = new LiveData('🅱️')
const mediator = new MediatorLiveData();
mediator.addSource(liveDataA, value => mediator.set(value));
mediator.addSource(liveDataB, value => mediator.set(value));
```

**`example`** <caption>In this example we only want 10 values emitted by the source `LiveData` to be picked up by `mediatorLiveData`. After 10 values we stop listening to the source `LiveData` and remove it as a source of `mediatorLiveData`.</caption>
```javascript
let counter = 0
const remove = mediatorLiveData.addSource(liveData, value => {
  counter++
  mediatorLiveData.set(value)
  if (counter >= 10) {
      remove()
  }
})
```

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* [LiveData](livedata.md)\<T>

  ↳ **MediatorLiveData**

## Index

### Constructors

* [constructor](mediatorlivedata.md#constructor)

### Methods

* [addSource](mediatorlivedata.md#addsource)
* [get](mediatorlivedata.md#get)
* [isActive](mediatorlivedata.md#isactive)
* [set](mediatorlivedata.md#set)
* [subscribe](mediatorlivedata.md#subscribe)
* [transition](mediatorlivedata.md#transition)

## Constructors

### constructor

\+ **new MediatorLiveData**(`initialValue?`: T, `onActive?`: () => void, `onInactive?`: () => void): [MediatorLiveData](mediatorlivedata.md)

*Inherited from [LiveData](livedata.md).[constructor](livedata.md#constructor)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`initialValue?` | T |  |
`onActive?` | () => void | A handler which is called whenever the number of observers changes from 0 to 1. |
`onInactive?` | () => void | A handler which is called whenever the number of observers changes from 1 to 0.  |

**Returns:** [MediatorLiveData](mediatorlivedata.md)

## Methods

### addSource

▸ **addSource**\<S>(`liveData`: [LiveData](livedata.md)\<S>, `onChange`: (value: S) => void): function

Starts to listen the given source LiveData, onChange observer will be called when source value was changed.

#### Type parameters:

Name |
------ |
`S` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`liveData` | [LiveData](livedata.md)\<S> | The source LiveData to listen to. |
`onChange` | (value: S) => void | Called when the source values changes, but only if the MediatorLiveData is active (has at least one observer). Usually used to set the value of the MediatorLiveData. |

**Returns:** function

A handle to remove the added source.

___

### get

▸ **get**(): T

*Inherited from [LiveData](livedata.md).[get](livedata.md#get)*

Access the current value of this LiveData.

**Returns:** T

The current value.

___

### isActive

▸ **isActive**(): boolean

*Inherited from [LiveData](livedata.md).[isActive](livedata.md#isactive)*

**Returns:** boolean

`true` if there are observers.

___

### set

▸ **set**(`value`: T): T

*Inherited from [LiveData](livedata.md).[set](livedata.md#set)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | T | The value to set. |

**Returns:** T

The just set value.

___

### subscribe

▸ **subscribe**(`observer`: (newValue: T, oldValue?: T) => void): function

*Inherited from [LiveData](livedata.md).[subscribe](livedata.md#subscribe)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`observer` | (newValue: T, oldValue?: T) => void | The callback to be invoked whenever the value changes. |

**Returns:** function

A handle to unsubscribe this observer.

___

### transition

▸ **transition**(`action`: (value: T) => T): void

*Inherited from [LiveData](livedata.md).[transition](livedata.md#transition)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`action` | (value: T) => T | A function which receives the current state and produces the new one.  |

**Returns:** void
