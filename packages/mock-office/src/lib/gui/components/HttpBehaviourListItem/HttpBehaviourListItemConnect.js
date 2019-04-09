import { connect } from 'react-redux';
import { behaviourSelector } from '../../app/entities';
import { removeButtonClickedAction } from './actions';
import HttpBehaviourListItem from './HttpBehaviourListItem';

export default connect(
  (state, ownProps) => {
    const behaviour = behaviourSelector(state, ownProps.id);

    return {
      behaviour
    };
  },
  {
    onRemoveButtonClick: removeButtonClickedAction
  }
)(HttpBehaviourListItem);
