import { createReduxModal } from 'modalo';
import AddServerModal from '../AddServerModal';
import { AddBehaviourModalConnect } from '../AddBehaviourModal';

export default createReduxModal({
  AddServerModal,
  AddBehaviourModal: AddBehaviourModalConnect
});
