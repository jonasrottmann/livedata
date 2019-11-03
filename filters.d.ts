import {LiveData} from './livedata'

/**
 * Produce a new `LiveData`, which only emits values which fulfil the given predicate.
 *
 * @param liveData The LiveData to be filtered.
 * @param predicate Decides wether the value is allowed (returns true if value is allowed).
 * @returns A new LiveData.
 */
export declare function filter<T>(liveData: LiveData<T>, predicate: (value: T) => Boolean): LiveData<T>;

/**
 * Produce a new `LiveData`, which only emits if the value changed compared to the last emitted value.
 *
 * @param liveData The LiveData to be filtered.
 * @param comparator Defaults to strict equality comparison (===).
 * @returns A new LiveData.
 */
export declare function distinct<T>(liveData: LiveData<T>, comparator?: (a: T, b: T) => Boolean): LiveData<T>;
