import { createEpicMiddleware } from 'redux-observable';
import configureStore from 'redux-mock-store';
import { formSubmittedAction } from '../../../../../../src/lib/gui/components/EditServerForm/actions';

afterEach(() => {
  jest.resetModules();
});

describe('editServerFormSave', () => {
  test('success actions', (done) => {
    jest.doMock('../../../../../../src/lib/gui/resources/mockOfficeService', () => ({
      editServer() {
        return Promise.resolve({});
      }
    }));
    const editServerFormSave = require('../../../../../../src/lib/gui/epics/editServerFormSave').default;
    const store = configureStore([createEpicMiddleware(editServerFormSave)])();
    store.dispatch(formSubmittedAction('id', { key: 'value' }));
    Promise.resolve().then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  test('on InvalidRequestError actions', (done) => {
    const { InvalidRequestError } = require('../../../../../../src/lib/gui/packages/mock-office-service/lib/errors');
    jest.doMock('../../../../../../src/lib/gui/resources/mockOfficeService', () => ({
      editServer() {
        return Promise.reject(new InvalidRequestError());
      }
    }));
    const editServerFormSave = require('../../../../../../src/lib/gui/epics/editServerFormSave').default;
    const store = configureStore([createEpicMiddleware(editServerFormSave)])();
    store.dispatch(formSubmittedAction('id', { key: 'value' }));
    Promise.resolve().then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  test('on UnsupportedStatusError actions', (done) => {
    const { UnsupportedStatusError } = require('../../../../../../src/lib/gui/packages/mock-office-service/lib/errors');
    jest.doMock('../../../../../../src/lib/gui/resources/mockOfficeService', () => ({
      editServer() {
        return Promise.reject(new UnsupportedStatusError());
      }
    }));
    const editServerFormSave = require('../../../../../../src/lib/gui/epics/editServerFormSave').default;
    const store = configureStore([createEpicMiddleware(editServerFormSave)])();
    store.dispatch(formSubmittedAction('id', { key: 'value' }));
    Promise.resolve().then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  test('on ResourceNotFoundError actions', (done) => {
    const { ResourceNotFoundError } = require('../../../../../../src/lib/gui/packages/mock-office-service/lib/errors');
    jest.doMock('../../../../../../src/lib/gui/resources/mockOfficeService', () => ({
      editServer() {
        return Promise.reject(new ResourceNotFoundError());
      }
    }));
    const editServerFormSave = require('../../../../../../src/lib/gui/epics/editServerFormSave').default;
    const store = configureStore([createEpicMiddleware(editServerFormSave)])();
    store.dispatch(formSubmittedAction('id', { key: 'value' }));
    Promise.resolve().then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });

  test('on ConnectionError actions', (done) => {
    const { ConnectionError } = require('../../../../../../src/lib/gui/packages/mock-office-service/lib/errors');
    jest.doMock('../../../../../../src/lib/gui/resources/mockOfficeService', () => ({
      editServer() {
        return Promise.reject(new ConnectionError());
      }
    }));
    const editServerFormSave = require('../../../../../../src/lib/gui/epics/editServerFormSave').default;
    const store = configureStore([createEpicMiddleware(editServerFormSave)])();
    store.dispatch(formSubmittedAction('id', { key: 'value' }));
    Promise.resolve().then(() => {
      expect(store.getActions()).toMatchSnapshot();
      done();
    });
  });
});
