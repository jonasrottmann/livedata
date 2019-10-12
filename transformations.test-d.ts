import {expectType} from 'tsd'
import {LiveData, map} from '.'

expectType<LiveData<string>>(map(new LiveData(true), v => 'string'))
