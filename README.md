# `LiveData`

✨ Simple, zero dependency, observable value container.

`LiveData` is a very small observable value container targeted at small apps. The goal ist to make observing app state as easy as possible.

## Install

Install via npm/yarn:

```shell
npm install @jonasrottmann/livedata

yarn add @jonasrottmann/livedata
```

Use directly with [unpkg](https://unpkg.com/) as a minified [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE):

```html
<script src="https://unpkg.com/@jonasrottmann/livedata@<VERSION>/dist/livedata.min.js" charset="utf-8"></script>

<script>
    const counter = new LiveData(0)
    ...
</script>
```

Use directly with [unpkg](https://unpkg.com/) as a module:

```html
<script type=module>
    import LiveData from 'https://unpkg.com/@jonasrottmann/livedata@<VERSION>/dist/livedata-module.js'

    const counter = new LiveData(0)
    ...
</script>
```

## Usage

For a simple counter example check out [counter.html](examples/counter.html).

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

## License

[MIT](LICENSE.md)
