import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Switch from 'rc-switch';
import FilePickerConnect from '../FilePicker';
import trashIcon from '../../../../../assets/icons_gray_trash@3x.svg';
import plusIcon from '../../../../../assets/icons_gray_add@3x.svg';
import { ServerViewHeaderToggleConnect } from '../ServerViewHeaderToggle';

const ServerViewHeader = ({
  running,
  type,
  name,
  port,
  onRemoveButtonClick,
  onAddBehaviourButtonClickedAction,
  serverId,
  fallbackUrl,
  recordMode,
  onRecordModeTriggerClick
}) => (
  <div className="server-view-header">
    <div className="server-view-header__toggle">
      <ServerViewHeaderToggleConnect toggled={running} serverId={serverId} />
    </div>
    <div className="server-view-header__details">
      <div className="server-view-header__name">{name}</div>
      <div className="server-view-header-spec">
        <div className="server-view-header-spec__item">
          <span className="server-view-header-spec__label">Port:</span>
          <span className="server-view-header-spec__value">{port}</span>
        </div>
        <div className="server-view-header-spec__item">
          <span className="server-view-header-spec__label">Type:</span>
          <span className="server-view-header-spec__value">{type}</span>
        </div>
        {fallbackUrl ? (
          <div className="server-view-header-spec__item">
            <span className="server-view-header-spec__label">
              Fallback server:
            </span>
            <span className="server-view-header-spec__value">
              {fallbackUrl}
            </span>
          </div>
        ) : null}
        {fallbackUrl ? (
          <div className="server-view-header-spec__item">
            <span className="server-view-header-spec__label">Record mode:</span>
            <span className="server-view-header-spec__value">
              <Switch
                onChange={checked =>
                  onRecordModeTriggerClick(serverId, checked)
                }
                checked={recordMode}
                checkedChildren={'yes'}
                unCheckedChildren={'no'}
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
    <div className="server-view-header__buttons">
      <button
        className="server-view-header__remove-button button"
        onClick={() =>
          // eslint-disable-next-line no-alert
          confirm(
            `Do you want to stop & remove '${name}' from the list of available servers?`
          )
            ? onRemoveButtonClick(serverId)
            : false
        }
      >
        <img src={trashIcon} role="presentation" />
      </button>
      <Link
        className="server-view-header__edit-button"
        to={`/server/${serverId}/edit`}
      >
        Edit
      </Link>
      <button
        className="server-view-header__add-behaviour-button"
        onClick={() => onAddBehaviourButtonClickedAction(serverId, type)}
      >
        <img
          src={plusIcon}
          role="presentation"
          style={{ marginRight: '11px' }}
        />
        Add behaviour
      </button>
    </div>
    <FilePickerConnect serverId={serverId} />
  </div>
);

ServerViewHeader.propTypes = {
  running: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  port: PropTypes.number.isRequired,
  serverId: PropTypes.string.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
  onAddBehaviourButtonClickedAction: PropTypes.func.isRequired,
  fallbackUrl: PropTypes.string.isRequired,
  recordMode: PropTypes.bool.isRequired,
  onRecordModeTriggerClick: PropTypes.func.isRequired
};

export default ServerViewHeader;
