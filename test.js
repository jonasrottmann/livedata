import test from 'ava'
import sinon from 'sinon'
import LiveData from './dist/livedata'

test('get', t => {
  // Given
  const ld = new LiveData(true)

  // Then
  t.true(ld.get())
})

test('set', t => {
  // Given
  const ld = new LiveData(true)

  // When
  ld.set(false)

  // Then
  t.false(ld.get())
})

test('transition', t => {
  // Given
  const ld = new LiveData(true)

  // When
  ld.transition(state => !state)

  // Then
  t.false(ld.get())
})

test('given an onActive callback when multiple subscriber onActive will only be invoked once', t => {
  const onActive = sinon.spy()
  const sub = sinon.spy()

  // Given
  const ld = new LiveData(true, onActive)

  // When
  ld.subscribe(sub)
  ld.subscribe(sub)
  ld.subscribe(sub)

  // Then
  t.is(onActive.callCount, 1)
  t.true(sub.calledThrice)
  t.true(onActive.calledBefore(sub))
})
