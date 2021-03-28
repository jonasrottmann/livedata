import {MediatorLiveData} from './livedata.js'

export function merge(livedatas) {
  const merged = new MediatorLiveData()
  livedatas.forEach(ld => {
    merged.addSource(ld, v => merged.set(v))
  })
  return merged
}
