declare class LiveData<T> {
    /**
     * @param initialValue 
     * @param onActive A handler which is called whenever the number of observers changes from 0 to 1.
     * @param onInactive A handler which is called whenever the number of observers changes from 1 to 0.
     */
    constructor(initialValue?: T, onActive?: () => void, onInactive?: () => void);

    /**
     * Access the current value of this LiveData.
     * 
     * ⚠️ Derived LiveDatas (created by `map` or `switchMap`) will not pick up values from the source LiveData if not active.
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
     * @returns `true` if there are observers.
     */
    isActive(): boolean

    /**
     * @param action A function which receives the current state and produces the new one.
     */
    transition(action: (value: T) => T): void;

    /**
     * @param observer The callback to be invoked whenever the value changes.
     * @returns A handle to unsubscribe this observer.
     */
    subscribe(observer: (newValue: T, oldValue?: T) => void) : () => void;
}

/**
 * A LiveData subclass which can observe multiple LiveData objects and react to value changes of each one.
 */
declare class MediatorLiveData<T> extends LiveData<T> {
    /**
     * Starts to listen the given source LiveData, onChange observer will be called when source value was changed. 
     * 
     * @param liveData The source LiveData to listen to.
     * @param onChange Called when the source values changes, but only if the MediatorLiveData is active (has at least one observer). Usually used to set the value of the MediatorLiveData.
     * @returns A handle to remove the added source.
     */
    addSource<S>(liveData: LiveData<S>, onChange: (value: S) => void): () => void
}

export {
    LiveData, MediatorLiveData
}
