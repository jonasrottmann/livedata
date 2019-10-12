import {LiveData} from './livedata'

/**
 * Builds a new LiveData whose value gets updated (during it's active) whenever the source changes.
 *
 * @param liveData The source LiveData.
 * @param transformer A mapping to apply to values of the source.
 * @returns A new LiveData.
 */
export declare function map<T, S>(liveData: LiveData<T>, transformer: (value: T) => S): LiveData<S>;

/**
 * Builds a new LiveData whose value gets updated (during it's active) whenever the tigger changes or the LiveData result of the transformation updates.
 *
 * @param liveData The trigger LiveData.
 * @param transformer A mapping for switching to another LiveData depending on the value of the trigger.
 * @returns A new LiveData.
 */
export declare function switchMap<T, S>(liveData: LiveData<T>, transformer: (value: T) => LiveData<S>): LiveData <S>;
