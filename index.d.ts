export default class livedata<T> {
    /**
     * @param initialValue 
     * @param onActive A handler which is called whenever the number of observers changes from 0 to 1.
     * @param onInactive A handler which is called whenever the number of observers changes from 1 to 0.
     */
    constructor(initialValue?: T, onActive?: () => void, onInactive?: () => void);

    /**
     * Access the current value of this livedata.
     * 
     * ⚠️ Derived livedatas (created by `map` or `switchMap`) will not pick up values from the source livedata if not active.
     * 
     * @returns The current value.
     */
    get(): T;

    /**
     * @param value The value to set.
     * @returns The just set value.
     */
    set(value: T): T;

    /**
     * @param action A function which receives the current state and produces the new one.
     */
    transition(action: (value: T) => T): void;

    /**
     * @param observer The callback to be invoked whenever the value changes.
     * @returns A handle to unsubscribe this observer.
     */
    subscribe(observer: (newValue: T, oldValue?: T) => void) : () => void;

    /**
     * Builds a new livedata whose value gets updated (during it's active) whenever the source changes.
     * 
     * @param transformer A mapping to apply to values of the source.
     * @returns A new livedata.
     */
    map<S>(transformer: (value: T) => S): livedata<S>;

    /**
     * Builds a new livedata whose value gets updated (during it's active) whenever the tigger changes or the livedata result of the transformation updates.
     * 
     * @param transformer A mapping for switching to another livedata depending on the value of the trigger.
     * @returns A new livedata.
     */
    switchMap<S>(transformer: (value: T) => livedata<S>) : livedata<S>;
}
