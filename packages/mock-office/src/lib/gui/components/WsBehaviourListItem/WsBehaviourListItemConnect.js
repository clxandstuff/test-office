import { connect } from 'react-redux';
import { behaviourSelector } from '../../app/entities';
import { removeButtonClickedAction } from './actions';
import WsBehaviourListItem from './WsBehaviourListItem';

const behaviourMapStateToProps = (state, ownProps) => {
  const behaviour = behaviourSelector(state, ownProps.id);

  return {
    behaviour
  };
};

const behaviourMapDispatchToProps = {
  onRemoveButtonClick: removeButtonClickedAction
};
export default connect(behaviourMapStateToProps, behaviourMapDispatchToProps)(
  WsBehaviourListItem
);
