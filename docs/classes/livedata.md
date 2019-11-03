[@jonasrottmann/livedata](../README.md) › [LiveData](livedata.md)

# Class: LiveData <**T**>

## Type parameters

▪ **T**

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

###  constructor

\+ **new LiveData**(`initialValue?`: T, `onActive?`: function, `onInactive?`: function): *[LiveData](livedata.md)*

*Defined in [livedata.d.ts:1](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L1)*

**Parameters:**

▪`Optional`  **initialValue**: *T*

▪`Optional`  **onActive**: *function*

A handler which is called whenever the number of observers changes from 0 to 1.

▸ (): *void*

▪`Optional`  **onInactive**: *function*

A handler which is called whenever the number of observers changes from 1 to 0.

▸ (): *void*

**Returns:** *[LiveData](livedata.md)*

## Methods

###  get

▸ **get**(): *T*

*Defined in [livedata.d.ts:14](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L14)*

Access the current value of this LiveData.

**Returns:** *T*

The current value.

___

###  isActive

▸ **isActive**(): *boolean*

*Defined in [livedata.d.ts:25](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L25)*

**Returns:** *boolean*

`true` if there are observers.

___

###  set

▸ **set**(`value`: T): *T*

*Defined in [livedata.d.ts:20](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L20)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | The value to set. |

**Returns:** *T*

The just set value.

___

###  subscribe

▸ **subscribe**(`observer`: function): *function*

*Defined in [livedata.d.ts:36](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L36)*

**Parameters:**

▪ **observer**: *function*

The callback to be invoked whenever the value changes.

▸ (`newValue`: T, `oldValue?`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | T |
`oldValue?` | T |

**Returns:** *function*

A handle to unsubscribe this observer.

▸ (): *void*

___

###  transition

▸ **transition**(`action`: function): *void*

*Defined in [livedata.d.ts:30](https://github.com/jonasrottmann/livedata/blob/master/livedata.d.ts#L30)*

**Parameters:**

▪ **action**: *function*

A function which receives the current state and produces the new one.

▸ (`value`: T): *T*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*
