import React from 'react';
import PropTypes from 'prop-types';

const BehaviourList = ({ behaviours, render }) => (
  <ul className="behaviour-list">
    {behaviours.map(behaviour => (
      <li className="behaviour-list__item" key={behaviour}>
        {render(behaviour)}
      </li>
    ))}
  </ul>
);

BehaviourList.propTypes = {
  behaviours: PropTypes.arrayOf(PropTypes.string).isRequired,
  render: PropTypes.func.isRequired
};

export default BehaviourList;
