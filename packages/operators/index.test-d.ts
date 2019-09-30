import {expectType} from 'tsd'
import {LiveData} from '../livedata'
import {switchMap, map} from '.'

expectType<LiveData<string>>(map(new LiveData(true), v => 'string'))
expectType<LiveData<string>>(switchMap(new LiveData(true), v => new LiveData<string>('string')))