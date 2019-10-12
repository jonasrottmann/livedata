import {LiveData} from './livedata'

/**
 *
 * @param liveData The LiveData to be filtered.
 * @param predicate Decides wether the value is allowed (returns true if value is allowed).
 * @returns A new LiveData.
 */
export declare function filter<T>(liveData: LiveData<T>, predicate: (value: T) => Boolean): LiveData<T>;

/**
 * @param liveData The LiveData to be filtered.
 * @param comparator Defaults to strict equality comparison (===).
 * @returns A new LiveData.
 */
export declare function distinct<T>(liveData: LiveData<T>, comparator: (a: T, b: T) => Boolean): LiveData<T>;
