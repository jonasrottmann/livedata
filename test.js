import test from 'ava'
import sinon from 'sinon'
import L from '.'

test('get', t => {
  // Given
  const ld = new L(true)

  // Then
  t.true(ld.get())
})

test('set', t => {
  // Given
  const ld = new L(true)

  // When
  ld.set(false)

  // Then
  t.false(ld.get())
})

test('transition', t => {
  // Given
  const ld = new L(true)

  // When
  ld.transition(state => !state)

  // Then
  t.false(ld.get())
})

test('given an onActive callback when multiple subscriber onActive will only be invoked once', t => {
  const onActive = sinon.spy()
  const sub = sinon.spy()

  // Given
  const ld = new L(true, onActive)

  // When
  ld.subscribe(sub)
  ld.subscribe(sub)
  ld.subscribe(sub)

  // Then
  t.is(onActive.callCount, 1)
  t.true(sub.calledThrice)
  t.true(onActive.calledBefore(sub))
})

test('given a livedata when it is used with map then a new livedata will be returned with the mapped value', t => {
  // Given
  const original = new L(true)

  // When
  const mapped = original.map(v => v === true ? 'yes' : 'no')

  // Then
  t.is(mapped.get(), 'yes')
})

test('given a mapped livedata when it is not active changes to the source will not be picked up', t => {
  // Given
  const original = new L(true)

  // When
  const mapped = original.map(v => v === true ? 'yes' : 'no')
  original.set('false') // ⚠️ This will not be picked up by the mapped one since it's not active

  // Then
  t.is(mapped.get(), 'yes')
})

test('given a mapped livedata when it is subscribed to then original one should stay active', t => {
  const originalOnActive = sinon.spy()
  const originalOnInactive = sinon.spy()
  const mappedObserver = sinon.spy()

  // Given
  const original = new L(true, originalOnActive, originalOnInactive)
  const mapped = original.map(v => v)

  // When
  const unsubMapped = mapped.subscribe(mappedObserver)
  unsubMapped()

  // Then
  t.true(originalOnActive.calledOnce)
  t.true(mappedObserver.calledOnce)
  t.true(originalOnInactive.calledOnce)
})

test('given a trigger livedata when switched then the result livedata should be used', t => {
  // Given
  const trigger = new L(true)
  const switchA = new L('yes')
  const switchB = new L('no')

  // When
  const switched = trigger.switchMap(v => {
    return v === true ? switchA : switchB
  })

  // Then
  console.log('1. assertion')
  t.is(switched.get(), 'yes')
})

test('given a switched livedata when subscribed to it and ubsubscribed from it then onActive/onInactive on the result should be called', t => {
  const switchedObserver = sinon.spy()
  const spiesA = {
    onActive: sinon.spy(),
    onInactive: sinon.spy()
  }
  const spiesB = {
    onActive: sinon.spy(),
    onInactive: sinon.spy()
  }

  // Given
  const trigger = new L(true)
  const switchA = new L('yes', spiesA.onActive, spiesA.onInactive)
  const switchB = new L('no', spiesB.onActive, spiesB.onInactive)
  const switched = trigger.switchMap(v => {
    return v === true ? switchA : switchB
  })

  // When
  const unsub = switched.subscribe(switchedObserver)
  unsub()

  // Then
  t.true(spiesA.onActive.calledOnce)
  t.true(spiesA.onInactive.calledOnce)
  t.true(spiesB.onActive.notCalled)
  t.true(spiesB.onInactive.notCalled)
})
