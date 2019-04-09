import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';
import { createModal } from '../src/lib/gui/components/Modal';
import configureStore from '../src/lib/gui/store/index';
import AddBehaviourModal from '../src/lib/gui/components/AddBehaviourModal';

storiesOf('AddBehaviourModal', module)
  .add('default', () => {
    const Modal = createModal({
      AddBehaviourModal
    });
    const store = configureStore();

    return (
      <Provider store={store}>
        <Modal component="AddBehaviourModal" />
      </Provider>
    );
  });
