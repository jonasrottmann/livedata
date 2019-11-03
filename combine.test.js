import test from 'ava'
import sinon from 'sinon'
import {LiveData as L} from './livedata'
import {merge} from './combine'

test('given multiple livedatas when each one emits then the merged will also emit each value', t => {
  const spy = sinon.spy()

  // Given
  const a = new L(0)
  const b = new L(0)
  const c = new L(0)
  const merged = merge([a, b, c])

  // When
  merged.subscribe(value => spy(value))
  a.set(1)
  b.set(1)
  c.set(1)
  a.set(2)

  // Then
  t.is(spy.callCount, 8)
  // The initial one, setting `0` 3 times when `merged` gets active, setting `1` 3 times and setting `2` one time = 8
})
