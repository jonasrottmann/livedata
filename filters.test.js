import test from 'ava'
import sinon from 'sinon'
import {LiveData as L} from './livedata'
import {filter, distinct} from './filters'

test('given a LiveData when filtered LiveData is derived and source value does pass predicate then filtered LiveData should be initialized with it', t => {
  // Given
  const ld = new L(0)

  // When
  const filtered = filter(ld, value => value % 2 === 0)

  // Then
  t.is(filtered.get(), 0)
})

test('given a LiveData when filtered LiveData is derived and source value does not pass predicate then filtered LiveData should not be initialized with it', t => {
  // Given
  const ld = new L(1)

  // When
  const filtered = filter(ld, value => value % 2 === 0)

  // Then
  t.is(filtered.get(), undefined)
})

test('given a filtered LiveData when filtered value is set on source then filtered will not receive the value', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L(0)
  const filtered = filter(ld, value => value % 2 === 0)
  filtered.subscribe(value => spy(value))

  // When
  ld.set(1) // Should not be propagated to filtered LiveData

  // Then
  t.true(spy.neverCalledWith(1))
})

test('given a filtered LiveData when allowed value is set on source then filtered will receive the value', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L(0)
  const filtered = filter(ld, value => value % 2 === 0)
  filtered.subscribe(value => spy(value))

  // When
  ld.set(2) // Should be propagated to filtered LiveData

  // Then
  t.true(spy.calledWith(2))
})

test('given a distinct LiveData when value is set multiple times on source then sibscriber should only be called once', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L(0)
  const distincted = distinct(ld)
  distincted.subscribe(value => spy(value))

  // When
  ld.set(0)
  ld.set(0)
  ld.set(1)
  ld.set(1)

  // Then
  t.true(spy.calledWith(0))
  t.true(spy.calledWith(1))
  t.true(spy.calledTwice)
})

test('given a distinct LiveData with custom comparator when value is then custom comparator should be evaluated', t => {
  const spy = sinon.spy()

  // Given
  const ld = new L('Hello World')
  const distincted = distinct(ld, (a, b) => a.toLowerCase() === b.toLowerCase())
  distincted.subscribe(value => spy(value))

  // When
  ld.set('hello world')

  // Then
  t.true(spy.calledOnceWith('Hello World'))
})
