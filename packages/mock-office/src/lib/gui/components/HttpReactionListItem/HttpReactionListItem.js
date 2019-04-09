import React from 'react';
import PropTypes from 'prop-types';

const HttpReactionListItem = ({ reaction }) => {
  const delay = reaction.schedule.delay;

  return (
    <div className="reaction-list-item">
      <div className="reaction-list-item__event-property">
        <div className="reaction-list-item__event-property-label">Status</div>
        <div className="reaction-list-item__event-property-value">
          {reaction.params.status || 'Any'}
        </div>
      </div>
      <div className="reaction-list-item__event-property">
        <div className="reaction-list-item__event-property-label">Delay</div>
        <div className="reaction-list-item__event-property-value">
          {delay || 'No'}
        </div>
      </div>
    </div>
  );
};

HttpReactionListItem.propTypes = {
  reaction: PropTypes.shape({})
};

export default HttpReactionListItem;
