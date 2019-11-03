export declare class LiveData<T> {
  /**
   * @param initialValue
   * @param onActive A handler which is called whenever the number of observers changes from 0 to 1.
   * @param onInactive A handler which is called whenever the number of observers changes from 1 to 0.
   */
  constructor(initialValue?: T, onActive?: () => void, onInactive?: () => void);

  /**
   * Access the current value of this LiveData.
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
 * `MediatorLiveData` is a subclass of {@link LiveData} which allows to listen to multiple source {@link LiveData}s and react to value changes.
 *
 * @example <caption>For example we can combine two `LiveData`s (`liveDataA` and `liveDataB`) in a `MediatorLiveData` by adding them as sources. Whenever `liveDataA` or `liveDataB` emits a new value, `mediator` will be updated.</caption>
 * ```javascript
 * const liveDataA = new LiveData('🅰️')
 * const liveDataB = new LiveData('🅱️')
 * const mediator = new MediatorLiveData();
 * mediator.addSource(liveDataA, value => mediator.set(value));
 * mediator.addSource(liveDataB, value => mediator.set(value));
 * ```
 *
 * @example <caption>In this example we only want 10 values emitted by the source `LiveData` to be picked up by `mediatorLiveData`. After 10 values we stop listening to the source `LiveData` and remove it as a source of `mediatorLiveData`.</caption>
 * ```javascript
 * let counter = 0
 * const remove = mediatorLiveData.addSource(liveData, value => {
 *   counter++
 *   mediatorLiveData.set(value)
 *   if (counter >= 10) {
 *       remove()
 *   }
 * })
 * ```
 */
export declare class MediatorLiveData<T> extends LiveData<T> {
  /**
   * Starts to listen the given source LiveData, onChange observer will be called when source value was changed.
   *
   * @param liveData The source LiveData to listen to.
   * @param onChange Called when the source values changes, but only if the MediatorLiveData is active (has at least one observer). Usually used to set the value of the MediatorLiveData.
   * @returns A handle to remove the added source.
   */
  addSource<S>(liveData: LiveData<S>, onChange: (value: S) => void): () => void
}
