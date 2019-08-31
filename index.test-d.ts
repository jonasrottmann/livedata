import {expectType} from 'tsd'
import LiveData from '.'

expectType<boolean>(new LiveData(true).get())
expectType<boolean>(new LiveData(true).set(true))
expectType<() => void>(new LiveData(true).subscribe(() => {}))
expectType<void>((new LiveData(true).subscribe(() => true))())

// TODO: Move tests...
