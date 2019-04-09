import React from 'react';
import PropTypes from 'prop-types';

const ReactionList = ({ reactions, render }) => (
  <ul className="reaction-list">
    {reactions.map(reaction => (
      <li className="reaction-list__item" key={reaction}>
        {render(reaction)}
      </li>
    ))}
  </ul>
);

ReactionList.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.string).isRequired,
  render: PropTypes.func.isRequired
};

export default ReactionList;
