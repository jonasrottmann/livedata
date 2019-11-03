import {LiveData} from './livedata'

/**
 * Builds a new LiveData whose value gets updated (during it's active) whenever the source changes.
 *
 * `map` is used to apply the given transformer function to each value emitted by the source `LiveData` and returns a new `LiveData` which emits those resulting values.
 *
 * @example <caption>Will print `✅` followed by `🛑`.</caption>
 * ```javascript
 * const source = new LiveData(true)
 * const mapped = map(source, v => v ? '✅' : '🛑')
 * mapped.subsribe(v => console.log(v))
 * source.set(false)
 * ```
 *
 * @param liveData The source LiveData.
 * @param transformer A mapping to apply to values of the source.
 * @returns A new LiveData.
 */
export declare function map<T, S>(liveData: LiveData<T>, transformer: (value: T) => S): LiveData<S>;

/**
 * Builds a new LiveData whose value gets updated (during it's active) whenever the tigger changes or the LiveData result of the transformation updates.
 *
 * `switchMap` is used to react to changes to the trigger `LiveData` and returns a new `LiveData` which emits values from whatever `LiveData` the transformer function returns.
 *
 * @example <caption>`switched` will emit the values emitted by `switchA` if `trigger` contains `true` and the values emitted by `switchB` if `trigger` contains `false`.</caption>
 * ```javascript
 * const trigger = new LiveData(true)
 * const switchA = new LiveData('🅰️')
 * const switchB = new LiveData('🅱️')
 * const switched = switchMap(trigger, v => v ? switchA : switchB)
 * switched.subscribe(v => console.log(v))
 * ```
 *
 * @param liveData The trigger LiveData.
 * @param transformer A mapping for switching to another LiveData depending on the value of the trigger.
 * @returns A new LiveData.
 */
export declare function switchMap<T, S>(liveData: LiveData<T>, transformer: (value: T) => LiveData<S>): LiveData <S>;
