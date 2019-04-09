import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import expandIcon from '../../../../../assets/icons_green_expand@3x.svg';
import trashIcon from '../../../../../assets/icons_gray_trash@3x.svg';
import { ReactionListConnect } from '../ReactionList';
import { HttpReactionListItemConnect } from '../HttpReactionListItem';

const displayAsString = prop => {
  if (!prop) {
    return null;
  }

  if (prop.enum) {
    return prop.enum.join(', ');
  } else if (prop.pattern) {
    return prop.pattern;
  }

  return 'Any';
};

export default class HttpBehaviourListItem extends React.Component {
  constructor() {
    super();
    this.showReactions = this.showReactions.bind(this);
    this.state = {
      expanded: false
    };
  }

  showReactions() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { behaviour, onRemoveButtonClick, serverId } = this.props;
    const { expanded } = this.state;
    const behaviourReactionsClassnames = classnames({
      'behaviour-list-item__reactions': true,
      'behaviour-list-item__reactions--visible': expanded
    });

    const expired = behaviour.expired;
    const pending = behaviour.pending;
    const behaviourClassNames = classnames({
      'behaviour-list-item': true,
      'behaviour-list-item--expired': expired
    });

    const expandButtonClassNames = classnames({
      'behaviour-list-item__expand-button': true,
      'behaviour-list-item__expand-button--active': expanded
    });

    const id = behaviour.id;
    const runCounter = behaviour.runCounter;
    const loadedCounter = behaviour.loadedCounter;
    const spinnerClassNames = classnames({
      spinner: true,
      'spinner--active': pending
    });
    const path =
      behaviour.event.params && behaviour.event.params.path
        ? displayAsString(behaviour.event.params.path)
        : null;
    const method =
      behaviour.event.params && behaviour.event.params.method
        ? displayAsString(behaviour.event.params.method)
        : null;

    return (
      <div className={behaviourClassNames}>
        <span className="behaviour-list-item__line" />
        <div className="behaviour-list-item-behaviour">
          <button
            className={expandButtonClassNames}
            onClick={this.showReactions}
          >
            <img src={expandIcon} role="presentation" />
          </button>
          <div className="behaviour-list-item__params">
            <div className="behaviour-list-item__spinner">
              <div className={spinnerClassNames}>
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
              </div>
            </div>
            <div className="behaviour-list-item__tag">{`${runCounter}/${loadedCounter}`}</div>
          </div>
          <div className="behaviour-list-item__event">
            <div className="behaviour-list-item__event-property">
              <div className="behaviour-list-item__event-property-label">
                Event type
              </div>
              <div className="behaviour-list-item__event-property-value">
                {behaviour.event.type || 'Any'}
              </div>
            </div>
            <div className="behaviour-list-item__event-property">
              <div className="behaviour-list-item__event-property-label">
                Path
              </div>
              <div className="behaviour-list-item__event-property-value">
                {path}
              </div>
            </div>
            <div className="behaviour-list-item__event-property">
              <div className="behaviour-list-item__event-property-label">
                Method
              </div>
              <div className="behaviour-list-item__event-property-value">
                {method}
              </div>
            </div>
          </div>
          <button
            className="behaviour-list-item__remove-button"
            onClick={() => onRemoveButtonClick(serverId, id)}
          >
            <img
              src={trashIcon}
              className="behaviour-list-item__remove-button-icon"
              alt="remove behaviour button"
            />
          </button>
        </div>
        <div className={behaviourReactionsClassnames}>
          <ReactionListConnect
            behaviour={id}
            render={reactionId => (
              <HttpReactionListItemConnect id={reactionId} />
            )}
          />
        </div>
      </div>
    );
  }
}

HttpBehaviourListItem.propTypes = {
  behaviour: PropTypes.shape({}).isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired
};
