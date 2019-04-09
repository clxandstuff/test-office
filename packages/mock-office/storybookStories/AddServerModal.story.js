import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';
import { createModal } from '../src/lib/gui/components/Modal';
import configureStore from '../src/lib/gui/store/index';
import AddServerModal from '../src/lib/gui/components/AddServerModal';

storiesOf('AddServerModal', module)
  .add('default', () => {
    const Modal = createModal({
      AddServerModal
    });
    const store = configureStore();

    return (
      <Provider store={store}>
        <Modal component="AddServerModal" />
      </Provider>
    );
  });
