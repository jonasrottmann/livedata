export default function LiveData(initialValue, onActive, onInactive) {
  let value = initialValue
  let observers = []

  function transition(action) {
    const last = value
    // Transition to new value
    value = action(value)
    // Notify all observers if value changed
    value !== last && observers.forEach(observer => observer(value, last)) // eslint-disable-line no-unused-expressions
    return value
  }

  function subscribe(observer) {
    // Subscribed
    observers.push(observer)

    // Trigger onActive if first one subscribed
    onActive && observers.length === 1 && onActive() // eslint-disable-line no-unused-expressions

    // Immediatly notify of current value
    observer(value)

    // Unsubscribe
    return function () {
      observers = observers.filter(o => o !== observer)
      onInactive && observers.length === 0 && onInactive() // eslint-disable-line no-unused-expressions
    }
  }

  return {
    get: () => value,
    set: value => transition(() => value),
    subscribe,
    transition
  }
}
