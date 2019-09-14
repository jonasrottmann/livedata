function LiveData(initialValue, onActive, onInactive) {
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
    onActive && observers.length === 1 && onActive();// eslint-disable-line no-unused-expressions

    // Immediatly notify of current value
    (value !== undefined) && observer(value)// eslint-disable-line no-unused-expressions

    // Unsubscribe
    return function () {
      observers = observers.filter(o => o !== observer)
      onInactive && observers.length === 0 && onInactive() // eslint-disable-line no-unused-expressions
    }
  }

  function map(transformer) {
    let unsubscribe
    const mapped = new LiveData(
      transformer(value), // Initial value is mapped from original current value
      () => {
        // When becoming active add to subscribers of original LiveData
        unsubscribe = subscribe(v => {
          mapped.set(transformer(v))
        })
      },
      () => {
        // When becoming inactive remove from subscribers of original LiveData
        unsubscribe()
      })

    return mapped
  }

  function switchMap(transformer) {
    let unsubscribe
    let currentResult
    let resultUnsubscribe = () => {}
    const switched = new LiveData(
      transformer(value).get(),
      () => {
        unsubscribe = subscribe(v => {
          const newResult = transformer(v)
          if (currentResult !== newResult) {
            resultUnsubscribe()
            currentResult = newResult
            resultUnsubscribe = newResult.subscribe(v => switched.set(v))
          }
        })
      },
      () => {
        resultUnsubscribe()
        unsubscribe()
      }
    )

    return switched
  }

  return {
    get: () => value,
    set: value => transition(() => value),
    subscribe,
    transition,
    map,
    switchMap
  }
}

function MediatorLiveData(initialValue) {
  const sources = new Map()

  const ld = new LiveData(initialValue, () => {
    // OnActive
    sources.forEach((value, key, map) => {
      const unsub = key.subscribe(value.onChange)
      value.unsub = unsub
      map.set(key, value)
    })
  }, () => {
    // OnInactive
    sources.forEach(value => {
      value.ubsub()
    })
  })

  function addSource(source, onChange) {
    sources.set(source, {onChange})

    return function () {
      sources.get(source).unsub()
      sources.delete(source)
    }
  }

  return {
    addSource,
    get: ld.get,
    map: ld.map,
    set: ld.set,
    subscribe: ld.subscribe,
    switchMap: ld.switchMap,
    transition: ld.transition
  }
}

export {
  LiveData, MediatorLiveData
}
