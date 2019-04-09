import { connect } from 'react-redux';
import HttpReactionListItem from './HttpReactionListItem';
import { reactionSelector } from '../../app/entities/selectors';

const ReactionListItemMapStateToProps = (state, ownProps) => {
  const reaction = reactionSelector(state, ownProps.id);
  return {
    reaction
  };
};

export default connect(ReactionListItemMapStateToProps)(HttpReactionListItem);
