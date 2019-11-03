[@jonasrottmann/livedata](../README.md) › [MediatorLiveData](mediatorlivedata.md)

# Class: MediatorLiveData <**T**>

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

▪ **T**

## Hierarchy

* [LiveData](livedata.md)‹T›

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

###  constructor

\+ **new MediatorLiveData**(`initialValue?`: T, `onActive?`: function, `onInactive?`: function): *[MediatorLiveData](mediatorlivedata.md)*

*Inherited from [LiveData](livedata.md).[constructor](livedata.md#constructor)*

*Defined in [livedata.d.ts:1](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L1)*

**Parameters:**

▪`Optional`  **initialValue**: *T*

▪`Optional`  **onActive**: *function*

A handler which is called whenever the number of observers changes from 0 to 1.

▸ (): *void*

▪`Optional`  **onInactive**: *function*

A handler which is called whenever the number of observers changes from 1 to 0.

▸ (): *void*

**Returns:** *[MediatorLiveData](mediatorlivedata.md)*

## Methods

###  addSource

▸ **addSource**<**S**>(`liveData`: [LiveData](livedata.md)‹S›, `onChange`: function): *function*

*Defined in [livedata.d.ts:71](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L71)*

Starts to listen the given source LiveData, onChange observer will be called when source value was changed.

**Type parameters:**

▪ **S**

**Parameters:**

▪ **liveData**: *[LiveData](livedata.md)‹S›*

The source LiveData to listen to.

▪ **onChange**: *function*

Called when the source values changes, but only if the MediatorLiveData is active (has at least one observer). Usually used to set the value of the MediatorLiveData.

▸ (`value`: S): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | S |

**Returns:** *function*

A handle to remove the added source.

▸ (): *void*

___

###  get

▸ **get**(): *T*

*Inherited from [LiveData](livedata.md).[get](livedata.md#get)*

*Defined in [livedata.d.ts:14](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L14)*

Access the current value of this LiveData.

**Returns:** *T*

The current value.

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [LiveData](livedata.md).[isActive](livedata.md#isactive)*

*Defined in [livedata.d.ts:25](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L25)*

**Returns:** *boolean*

`true` if there are observers.

___

###  set

▸ **set**(`value`: T): *T*

*Inherited from [LiveData](livedata.md).[set](livedata.md#set)*

*Defined in [livedata.d.ts:20](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L20)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | The value to set. |

**Returns:** *T*

The just set value.

___

###  subscribe

▸ **subscribe**(`observer`: function): *function*

*Inherited from [LiveData](livedata.md).[subscribe](livedata.md#subscribe)*

*Defined in [livedata.d.ts:36](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L36)*

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

*Inherited from [LiveData](livedata.md).[transition](livedata.md#transition)*

*Defined in [livedata.d.ts:30](https://github.com/jonasrottmann/livedata/blob/ec75819/livedata.d.ts#L30)*

**Parameters:**

▪ **action**: *function*

A function which receives the current state and produces the new one.

▸ (`value`: T): *T*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

**Returns:** *void*
