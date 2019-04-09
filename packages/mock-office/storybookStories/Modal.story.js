import React from 'react';
import { storiesOf } from '@kadira/storybook';
import R from 'ramda';
import { createModal } from '../src/lib/gui/components/Modal';

storiesOf('Modal', module)
  .add('test modal', () => {
    const TestModal = () => <div>
      <div className="modal-header">Modal header</div>
      <div className="modal-content">
        Test modal
      </div>
    </div>;
    const Modal = createModal({
      TestModal
    });

    return (
      <Modal component="TestModal" onOverlayClick={R.identity} />
    );
  })
  .add('test modal', () => {
    const TestModal = () => <div>
      <div className="modal-header">Modal header</div>
      <div className="modal-content">
        Test modal
      </div>
    </div>;
    const Modal = createModal({
      TestModal
    });

    return (
      <Modal component="TestModal" onOverlayClick={R.identity} />
    );
  })
  .add('test modal', () => {
    const TestModal = () => <div>
      <div className="modal-header">Modal header</div>
      <div className="modal-content">
        Test modal
      </div>
    </div>;
    const Modal = createModal({
      TestModal
    });

    return (
      <Modal component="TestModal" onOverlayClick={R.identity} />
    );
  });
