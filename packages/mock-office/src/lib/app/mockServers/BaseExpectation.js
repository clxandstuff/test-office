import { Observable } from 'rxjs';
import { interval } from 'rxjs/observable/interval';

export default class BaseExpectation {
  constructor(match, actions) {
    this.actions = actions;
    this.match = match;
  }

  action$() {
    return Observable.of(this.actions)
      .flatMap(actions => actions)
      .flatMap(action => {
        let action$ = Observable.of(action);

        if (action.delay) {
          action$ = action$.delay(action.delay);
        }

        if (action.interval) {
          return interval(action.interval).flatMap(() => action$);
        }

        return action$;
      });
  }
}