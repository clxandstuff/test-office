import { connect } from 'react-redux';
import { serverSelector } from '../../app/entities/index';
import ServerView from './ServerView';

const serverMapStateToProps = (state, ownProps) => {
  const server = serverSelector(state, ownProps.params.id);

  return {
    id: server.id,
    type: server.type,
    name: server.name,
    port: server.port,
    running: server.running,
    fallbackUrl: server.fallbackUrl,
    recordMode: server.recordMode
  };
};

export default connect(serverMapStateToProps)(ServerView);
