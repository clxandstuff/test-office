import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import { allServersSelector } from '../../app/entities/index';
import plusIcon from '../../../../../assets/icons_white_add.svg';
import lockIcon from '../../../../../assets/icons_general_locked@3x.svg';
import { currentDisplayedServerSelector } from '../../app/sidebar';
import { addButtonClickedAction } from './actions';

export const SideBarServers = ({ servers, selected, onAddButtonClick }) => (
  <div className="sidebar-servers">
    <div className="sidebar-servers__header">
      <div>
        <div>Servers</div>
      </div>
      <button
        className="sidebar-servers__add-server-button"
        onClick={onAddButtonClick}
      >
        <img src={plusIcon} role="presentation" />
      </button>
    </div>
    <ul className="sidebar-servers-list">
      {servers.map(server => {
        const serverIndicatorClassNames = classnames(
          'sidebar-server__status-indicator',
          { 'sidebar-server__status-indicator--up': server.running }
        );
        const serverListItemClassNames = classnames({
          'sidebar-servers-list-item': true,
          'sidebar-servers-list-item--selected': server.id === selected
        });

        const serverType = server.type.toUpperCase();

        return (
          <li className={serverListItemClassNames} key={server.id}>
            <div className="sidebar-server__secure-indicator">
              {server.secure ? (
                <img src={lockIcon} role="presentation" />
              ) : null}
            </div>
            <span className={serverIndicatorClassNames}>{serverType}</span>
            <Link
              to={`/server/${server.id}`}
              className="sidebar-server-list__label"
            >
              {server.name}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

SideBarServers.propTypes = {
  servers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selected: PropTypes.string,
  onAddButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  servers: allServersSelector(state),
  selected: currentDisplayedServerSelector(state)
});

const mapDispatchToProps = {
  onAddButtonClick: addButtonClickedAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarServers);
