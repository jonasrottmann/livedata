import {expectType} from 'tsd'
import {LiveData, MediatorLiveData, filter, distinct, map} from '.'

expectType<unknown>(new LiveData().get())
expectType<boolean>(new LiveData(true).get())
expectType<boolean>(new LiveData().isActive())
expectType<boolean>(new LiveData(true).set(true))
expectType<() => void>(new LiveData(true).subscribe(() => {}))
expectType<void>(new LiveData(true).subscribe(() => true)())

expectType<boolean>(new MediatorLiveData(true).get())
expectType<unknown>(new MediatorLiveData().get())
expectType<() => void>(new MediatorLiveData().addSource(new LiveData(), v => {}))

expectType<LiveData<string>>(map(new LiveData(true), v => 'string'))

expectType<LiveData<string>>(filter(new LiveData('string'), value => value.length > 0))
expectType<LiveData<string>>(distinct(new LiveData('string')))
expectType<LiveData<string>>(distinct(new LiveData('string'), (a, b) => a === b))
