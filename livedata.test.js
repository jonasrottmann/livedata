import test from 'ava'
import sinon from 'sinon'
import {LiveData as L, MediatorLiveData as M} from './livedata.js'

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
