**[@jonasrottmann/livedata](../README.md)**

# Class: LiveData\<T>

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **LiveData**

  ↳ [MediatorLiveData](mediatorlivedata.md)

## Index

### Constructors

* [constructor](livedata.md#constructor)

### Methods

* [get](livedata.md#get)
* [isActive](livedata.md#isactive)
* [set](livedata.md#set)
* [subscribe](livedata.md#subscribe)
* [transition](livedata.md#transition)

## Constructors

### constructor

\+ **new LiveData**(`initialValue?`: T, `onActive?`: () => void, `onInactive?`: () => void): [LiveData](livedata.md)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`initialValue?` | T |  |
`onActive?` | () => void | A handler which is called whenever the number of observers changes from 0 to 1. |
`onInactive?` | () => void | A handler which is called whenever the number of observers changes from 1 to 0.  |

**Returns:** [LiveData](livedata.md)

## Methods

### get

▸ **get**(): T

Access the current value of this LiveData.

**Returns:** T

The current value.

___

### isActive

▸ **isActive**(): boolean

**Returns:** boolean

`true` if there are observers.

___

### set

▸ **set**(`value`: T): T

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | T | The value to set. |

**Returns:** T

The just set value.

___

### subscribe

▸ **subscribe**(`observer`: (newValue: T, oldValue?: T) => void): function

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`observer` | (newValue: T, oldValue?: T) => void | The callback to be invoked whenever the value changes. |

**Returns:** function

A handle to unsubscribe this observer.

___

### transition

▸ **transition**(`action`: (value: T) => T): void

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`action` | (value: T) => T | A function which receives the current state and produces the new one.  |

**Returns:** void
