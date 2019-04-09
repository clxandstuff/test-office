import Expectation from '../../../../../../src/lib/app/mockServers/http/Expectation';
import { Observable } from 'rxjs';

describe('Expectation', () => {
  describe('response$', () => {
    it('should return observable of response', () => {
      expect(new Expectation({}, () => {}, []).action$()).toBeInstanceOf(
        Observable
      );
    });
  });

  it('should has test function property', () => {
    expect(new Expectation({}, () => {}, []).match).toBeInstanceOf(Function);
  });
});
