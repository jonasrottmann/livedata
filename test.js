import test from 'ava'
import sinon from 'sinon'
import {LiveData as L, MediatorLiveData as M, map, switchMap} from '.'

test('given a LiveData with initial value then get will return it', t => {
  // Given
  const ld = new L(true)

  // Then
  t.true(ld.get())
})

test('given a LiveData when not subscribed to then it is not active', t => {
  // Given
  const ld = new L()

  // Then
  t.false(ld.isActive())
})

test('given a LiveData when setting another value get will return it', t => {
  // Given
  const ld = new L(true)

  // When
  ld.set(false)

  // Then
  t.false(ld.get())
})

test('given a LiveData when transitioning to another value get will return it', t => {
  // Given
  const ld = new L(true)

  // When
  ld.transition(state => !state)

  // Then
  t.false(ld.get())
})

test('given a LiveData when no initialValue supplied then the first subscribe will not trigger the observer', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L()

  // When
  ld.subscribe(value => spy(value))

  // Then
  t.true(spy.notCalled)
})

test('given a LiveData when subscribed to the observer is immediatly called with the initial value', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L(true)

  // When
  ld.subscribe((newValue, oldValue) => {
    spy(newValue, oldValue)
  })

  // Then
  t.true(spy.calledOnceWith(true))
})

test('given a LiveData subscription when changing the value the observer ist called with the new and old value', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L(true)
  ld.subscribe((newValue, oldValue) => {
    spy(newValue, oldValue)
  })
  spy.resetHistory() // Ignore the invokation when subscription happend

  // When
  ld.set(false)

  // Then
  t.true(spy.calledOnceWith(false, true))
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

test('given a LiveData when it is used with map then a new LiveData will be returned with the mapped value', t => {
  // Given
  const original = new L(true)

  // When
  const mapped = map(original, v => v === true ? 'yes' : 'no')

  // Then
  t.is(mapped.get(), 'yes')
})

test('given a mapped LiveData when it is not active changes to the source will not be picked up', t => {
  // Given
  const original = new L(true)

  // When
  const mapped = map(original, v => v === true ? 'yes' : 'no')
  original.set('false') // ⚠️ This will not be picked up by the mapped one since it's not active

  // Then
  t.is(mapped.get(), 'yes')
})

test('given a mapped LiveData when it is subscribed to then original one should stay active', t => {
  const originalOnActive = sinon.spy()
  const originalOnInactive = sinon.spy()
  const mappedObserver = sinon.spy()

  // Given
  const original = new L(true, originalOnActive, originalOnInactive)
  const mapped = map(original, v => v)

  // When
  const unsubMapped = mapped.subscribe(mappedObserver)
  unsubMapped()

  // Then
  t.true(originalOnActive.calledOnce)
  t.true(mappedObserver.calledOnce)
  t.true(originalOnInactive.calledOnce)
})

test('given a trigger LiveData when switched then the result LiveData should be used', t => {
  // Given
  const trigger = new L(true)
  const switchA = new L('yes')
  const switchB = new L('no')

  // When
  const switched = switchMap(trigger, v => {
    return v === true ? switchA : switchB
  })

  // Then
  t.is(switched.get(), 'yes')
})

test('given a switched LiveData when subscribed to it and ubsubscribed from it then onActive/onInactive on the result should be called', t => {
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
  const switched = switchMap(trigger, v => {
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

test('given a switched LiveData when the transformation returns the same result ignore the switch', t => {
  const switchedObserver = sinon.spy()
  const resultOnActive = sinon.spy()
  const resultOnInactive = sinon.spy()

  // Given
  const trigger = new L(true)
  const result = new L('yes', resultOnActive, resultOnInactive)
  const switched = switchMap(trigger, () => result) // ⚠️ Always return same result LiveData

  // When
  const unsubscribe = switched.subscribe(switchedObserver)
  trigger.set(false)
  unsubscribe()

  // Then
  t.true(switchedObserver.calledOnce)
  t.true(resultOnActive.calledOnce)
  t.true(resultOnInactive.calledOnce)
})

test('given a MediatorLiveData when adding a source then the subscription will be called', t => {
  const spy = sinon.spy()

  // Given
  const liveData = new L(true)
  const mediatorLiveData = new M()

  // When
  mediatorLiveData.addSource(liveData, value => mediatorLiveData.set(value))
  mediatorLiveData.subscribe(value => spy(value))
  liveData.set(false)

  // Then
  t.true(spy.calledWith(true))
})

test('given a MediatorLiveData when removing a source then unsubscribe on the source should happen', t => {
  const spy = sinon.spy()
  const onActive = sinon.spy()
  const onInactive = sinon.spy()

  // Given
  const liveData = new L(true, onActive, onInactive)
  const mediatorLiveData = new M()
  const removeSource = mediatorLiveData.addSource(liveData, value => mediatorLiveData.set(value))
  mediatorLiveData.subscribe(value => spy(value))

  // When
  removeSource()

  // Then
  t.true(onActive.calledOnce)
  t.true(onInactive.calledOnce)
})

test('given a MediatorLiveData when unsubscribing from it all sources should be unsubscribed', t => {
  const spy = sinon.spy()
  const onActive = sinon.spy()
  const onInactive = sinon.spy()

  // Given
  const liveData = new L(true, onActive, onInactive)
  const mediatorLiveData = new M()
  mediatorLiveData.addSource(liveData, value => mediatorLiveData.set(value))
  const unsub = mediatorLiveData.subscribe(value => spy(value))

  // When
  unsub()

  // Then
  t.true(onActive.calledOnce)
  t.true(onInactive.calledOnce)
})

test('given a MediatorLiveData which is active when a source is added it should be immediatly be subscribed to', t => {
  const spy = sinon.spy()

  // Given
  const liveData = new L(true)
  const mediatorLiveData = new M()
  mediatorLiveData.subscribe(value => spy(value))

  // Then
  mediatorLiveData.addSource(liveData, value => mediatorLiveData.set(value))

  // Then
  t.is(spy.callCount, 1)
})
