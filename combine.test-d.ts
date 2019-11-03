import {expectType} from 'tsd'
import {LiveData, merge} from '.'

expectType<LiveData<Number>>(merge([new LiveData(0)]))
