import { connect } from 'react-redux';
import { serverSelector } from '../../app/entities';
import BehaviourList from './BehaviourList';

const mapStateToProps = (state, ownProps) => {
  const server = serverSelector(state, ownProps.serverId);

  return {
    behaviours: server.behaviours
  };
};

export default connect(mapStateToProps)(BehaviourList);
