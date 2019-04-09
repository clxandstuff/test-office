import { connect } from 'react-redux';
import WsReactionListItem from './WsReactionListItem';
import { reactionSelector } from '../../app/entities/selectors';

const WsReactionListItemMapStateToProps = (state, ownProps) => {
  const reaction = reactionSelector(state, ownProps.id);
  return {
    reaction
  };
};

export default connect(WsReactionListItemMapStateToProps)(WsReactionListItem);
