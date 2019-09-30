import {LiveData} from '@jonasrottmann/livedata'

function map(livedata, transformer) {
  let unsubscribe
  const mapped = new LiveData(
    transformer(livedata.get()), // Initial value is mapped from original current value
    () => {
      // When becoming active add to subscribers of original LiveData
      unsubscribe = livedata.subscribe(v => mapped.set(transformer(v)))
    },
    () => {
      // When becoming inactive remove from subscribers of original LiveData
      unsubscribe()
    })

  return mapped
}

function switchMap(livedata, transformer) {
  let unsubscribe
  let currentResult
  let resultUnsubscribe
  const switched = new LiveData(
    transformer(livedata.get()).get(),
    () => {
      unsubscribe = livedata.subscribe(v => {
        const newResult = transformer(v)
        if (currentResult !== newResult) {
          resultUnsubscribe && resultUnsubscribe() // eslint-disable-line no-unused-expressions
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

export {
  switchMap,
  map
}
