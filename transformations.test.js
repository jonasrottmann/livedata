import test from 'ava'
import sinon from 'sinon'
import {LiveData as L} from './livedata.js'
import {map, switchMap} from './transformations.js'

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
