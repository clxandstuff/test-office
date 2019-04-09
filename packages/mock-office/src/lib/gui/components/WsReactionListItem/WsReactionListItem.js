import React from 'react';
import PropTypes from 'prop-types';

const WsReactionListItem = ({ reaction }) => {
  const delay = reaction.schedule.delay;
  const interval = reaction.schedule.interval;
  return (
    <div className="reaction-list-item">
      <div className="reaction-list-item__params">
        {delay ? (
          <div className="reaction-list-item__tag">
            <i className="fa fa-hourglass-o" /> {delay / 1000}
            {'s'}
          </div>
        ) : null}
        {interval ? (
          <div className="reaction-list-item__tag">
            <i className="fa fa-history" /> {interval / 1000}
            {'s'}
          </div>
        ) : null}
      </div>
    </div>
  );
};

WsReactionListItem.propTypes = {
  reaction: PropTypes.shape({})
};

export default WsReactionListItem;
