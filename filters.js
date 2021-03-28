import {MediatorLiveData} from './livedata.js'

export function filter(livedata, predicate) {
  const value = livedata.get()
  const mediator = new MediatorLiveData(predicate(value) ? value : undefined)
  mediator.addSource(livedata, value => {
    if (predicate(value)) {
      mediator.set(value)
    }
  })
  return mediator
}

export function distinct(livedata, comparator) {
  const c = comparator || ((a, b) => a === b)
  let lastValue = livedata.get()
  const mediator = new MediatorLiveData(lastValue)
  mediator.addSource(livedata, value => {
    if (!c(lastValue, value)) {
      mediator.set(value)
      lastValue = value
    }
  })
  return mediator
}
