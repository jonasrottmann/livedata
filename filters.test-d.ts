import {expectType} from 'tsd'
import {LiveData, filter, distinct} from '.'

expectType<LiveData<string>>(filter(new LiveData('string'), value => value.length > 0))
expectType<LiveData<string>>(distinct(new LiveData('string')))
expectType<LiveData<string>>(distinct(new LiveData('string'), (a, b) => a === b))
expectType<LiveData<string>>(distinct(new LiveData('string'), (a, b) => a === b))
