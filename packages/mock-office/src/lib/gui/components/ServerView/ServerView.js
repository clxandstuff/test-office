import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { ServerViewHeaderConnect } from '../ServerViewHeader';
import { HttpBehaviourListItemConnect } from '../HttpBehaviourListItem';
import { WsBehaviourListItemConnect } from '../WsBehaviourListItem';
import { BehaviourListConnect } from '../BehaviourList';

const ServerView = ({
  id,
  running,
  type,
  name,
  port,
  fallbackUrl,
  recordMode
}) => (
  <div className="server-view">
    <header className="server-view__header">
      <ServerViewHeaderConnect
        running={running}
        serverId={id}
        type={type}
        name={name}
        port={port}
        fallbackUrl={fallbackUrl}
        recordMode={recordMode}
      />
    </header>
    <main className="server-view-main server-view__main">
      <div className="server-view__behaviours">
        <div className="server-view__behaviours-scroll-container">
          <Scrollbars>
            <BehaviourListConnect
              serverId={id}
              render={
                type === 'http'
                  ? behaviour => (
                      <HttpBehaviourListItemConnect
                        serverId={id}
                        id={behaviour}
                      />
                    )
                  : behaviour => (
                      <WsBehaviourListItemConnect
                        serverId={id}
                        id={behaviour}
                      />
                    )
              }
            />
          </Scrollbars>
        </div>
      </div>
    </main>
  </div>
);

ServerView.propTypes = {
  id: PropTypes.string.isRequired,
  running: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
  fallbackUrl: PropTypes.string.isRequired,
  recordMode: PropTypes.bool.isRequired
};

export default ServerView;
