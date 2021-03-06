# `LiveData`

<div align="center">
    <a href="https://www.npmjs.com/package/@jonasrottmann/livedata"><img alt="npm (scoped)" src="https://img.shields.io/npm/v/@jonasrottmann/livedata"></a>
    <a href="https://bundlephobia.com/result?p=@jonasrottmann/livedata"><img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@jonasrottmann/livedata"></a>
    <p>✨ Simple, zero dependency, observable value container. ✨</p>
</div>

`LiveData` is a very small observable value container targeted at small apps. The goal is to make observing app state as easy as possible.

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
    const hello = new livedata.LiveData('👋')
    ...
</script>
```

Use directly with [unpkg](https://unpkg.com/) as a **[module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)**:

```html
<script type=module>
    import {LiveData} from 'https://unpkg.com/@jonasrottmann/livedata@<VERSION>/dist/livedata-module.js'

    const hello = new LiveData('👋')
    ...
</script>
```

## 👩‍💻 Usage

**For a simple counter example check out [`counter.html`](examples/counter.html) or explore on [CodePen](https://codepen.io/jonasrottmann/pen/WNeMPEv)**.

> 🚧 This documentation is work in progress...

```javascript
import {LiveData} from '@jonasrottmann/livedata'

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

`LiveData` additionally can receive two callbacks `onActive` and `onInactive`, which will be called when the first observer is added or the last one removed. This can be useful for adding/removing event listeners to modify the `LiveData`s value.

```javascript
const listener = e => keyboardLiveData.set(e)
const keyboardLiveData = new LiveData(
    undefined,
    // onActive
    () => window.addEventListener('keyup', listener),
    // onInactive
    () => window.removeEventListener('keyup', listener)
)
```

`keyboardLiveData` will start listening to keyboard presses as soon as the first observer calls `subscribe` and will stop when the last observer has been removed.

## ℹ️ API

The full API documentation can be found in [./docs/](/docs/README.md).

## 👨‍⚖️ License

[MIT](LICENSE.md)
