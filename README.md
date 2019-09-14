# `LiveData`

<div align="center">
    <a href="https://www.npmjs.com/package/@jonasrottmann/livedata"><img alt="npm (scoped)" src="https://img.shields.io/npm/v/@jonasrottmann/livedata"></a>
    <a href="https://bundlephobia.com/result?p=@jonasrottmann/livedata"><img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@jonasrottmann/livedata"></a>
    <p>✨ Simple, zero dependency, observable value container. ✨</p>
</div>

`LiveData` is a very small observable value container targeted at small apps. The goal ist to make observing app state as easy as possible.

## 🧰 Install

Install via npm/yarn:

```shell
npm install @jonasrottmann/livedata

yarn add @jonasrottmann/livedata
```

Use directly with [unpkg](https://unpkg.com/) as a **minified [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)**:

```html
<script src="https://unpkg.com/@jonasrottmann/livedata@<VERSION>/dist/livedata.min.js" charset="utf-8"></script>

<script>
    const counter = new LiveData(0)
    ...
</script>
```

Use directly with [unpkg](https://unpkg.com/) as a **[module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)**:

```html
<script type=module>
    import LiveData from 'https://unpkg.com/@jonasrottmann/livedata@<VERSION>/dist/livedata-module.js'

    const counter = new LiveData(0)
    ...
</script>
```

## 👩‍💻 Usage

**For a simple counter example check out [counter.html](examples/counter.html) or explore on [CodePen](https://codepen.io/jonasrottmann/pen/WNeMPEv)**.

> 🚧 This documentation is work in prograss...

```javascript
import LiveData from '@jonasrottmann/livedata'

// Create a new observable container with the initial value `true`
const livedata = new LiveData(true);

// Register an observer
const unsubscribe = livedata.subscribe((newValue, oldValue) => {
    console.log(`Value changed from ${oldValue} to ${newValue}!`)
})

// Change the value depending on the old value
livedata.transition(value => !value)

// Set the value
livedata.set(true)

// End the subscription
unsubscribe()
```

### Transformations

`map` and `switchMap` allow to derive a new `LiveData` from an existing `LiveData`.

> ⚠️ In both cases the derived `LiveData` must be active (have at least one observer) to pick up changes from the source.

#### `map`

`map` is used to apply the given transformer function to each value emitted by the source `LiveData` and returns a new `LiveData` which emits those resulting values.

```javascript
const source = new LiveData(true)
const mapped = source.map(v => v ? '✅' : '🛑')

mapped.subsribe(v => console.log(v))

source.set(false)
```

Will print `✅` followed by `🛑`.

#### `switchMap`

`switchMap` is used to react to changes to the trigger `LiveData` and returns a new `LiveData` which emits values from whatever `LiveData` the transfomer function returns.

```javascript
const trigger = new LiveData(true)
const switchA = new LiveData('🅰️')
const switchB = new LiveData('🅱️')

const switched = trigger.switchMap(v => v ? switchA : switchB)

switched.subscribe(v => console.log(v))
```

`switched` will now emit the values emitted by `switchA` if `trigger` contains `true` and the values emitted by `switchB` if `trigger` contains `false`.

### `MediatorLiveData`

`MediatorLiveData` is a subclass of `LiveData` which allows to listen to multiple source `LiveData`s and react to value changes.

For example we can combine two `LiveData`s (`liveDataA` and `liveDataB`) in a `MediatorLiveData` by adding them as sources. Whenever `liveDataA` or `liveDataB` emits a new value, `mediator` will be updated.

```javascript
const liveDataA = new LiveData('🅰️')
const liveDataB = new LiveData('🅱️')

const mediator = new MediatorLiveData();

mediator.addSource(liveDataA, value => {
    mediator.set(value)
});
mediator.addSource(liveDataB, value => {
    mediator.set(value)
});
```

In this example we only want 10 values emitted by the source `LiveData` to be picked up by `mediatorLiveData`. After 10 values we stop listening to the source `LiveData` and remove it as a source of `mediatorLiveData`.

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

## 👨‍⚖️ License

[MIT](LICENSE.md)
