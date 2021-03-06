function LiveData(initialValue, onActive, onInactive) {
  let value = initialValue
  let observers = []

  function transition(action) {
    const last = value
    // Transition to new value
    value = action(value)
    // Notify all observers
    observers.forEach(observer => observer(value, last))
    return value
  }

  function subscribe(observer) {
    // Subscribed
    observers.push(observer)

    // Trigger onActive if first one subscribed
    onActive && observers.length === 1 && onActive();// eslint-disable-line no-unused-expressions

    // Immediatly notify of current value
    (value !== undefined) && observer(value)// eslint-disable-line no-unused-expressions

    // Unsubscribe
    return function () {
      observers = observers.filter(o => o !== observer)
      onInactive && observers.length === 0 && onInactive() // eslint-disable-line no-unused-expressions
    }
  }

  return {
    isActive: () => observers.length > 0,
    get: () => value,
    set: value => transition(() => value),
    subscribe,
    transition
  }
}

function MediatorLiveData(initialValue) {
  const sources = new Map()

  function subscribeToSource(ld, onChange) {
    const unsub = ld.subscribe(onChange)
    sources.set(ld, {onChange, unsub})
  }

  const ld = new LiveData(initialValue, () => {
    // OnActive
    sources.forEach((value, ld) => subscribeToSource(ld, value.onChange))
  }, () => {
    // OnInactive
    sources.forEach(value => value.unsub())
  })

  function addSource(source, onChange) {
    sources.set(source, {onChange})
    ld.isActive() && subscribeToSource(source, onChange) // eslint-disable-line no-unused-expressions

    return function () {
      sources.get(source).unsub()
      sources.delete(source)
    }
  }

  return {
    addSource,
    get: ld.get,
    isActive: ld.isActive,
    set: ld.set,
    subscribe: ld.subscribe,
    transition: ld.transition
  }
}

export {
  LiveData, MediatorLiveData
}
