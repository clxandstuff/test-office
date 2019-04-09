import { connect } from 'react-redux';
import { behaviourSelector } from '../../app/entities';
import ReactionList from './ReactionList';

const mapStateToProps = (state, ownProps) => ({
  reactions: behaviourSelector(state, ownProps.behaviour).reactions
});

export default connect(mapStateToProps)(ReactionList);
