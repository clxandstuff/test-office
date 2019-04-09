import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { delay } from 'rxjs/operators/delay';
import { tap } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators/mergeMap';

export default function schedule(delayTime, intervalTime) {
  return of(null).pipe(
    delay(delayTime),
    intervalTime ? mergeMap(() => interval(intervalTime)) : tap(() => {})
  );
}
