import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import expandIcon from '../../../../../assets/icons_green_expand@3x.svg';
import { WsReactionListItemConnect } from '../WsReactionListItem';
import { ReactionListConnect } from '../ReactionList';

export default class WsBehaviourListItem extends React.Component {
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
    const eventType = behaviour.event.event;
    return (
      <div className={behaviourClassNames}>
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
          <div className="behaviour-list-item__behaviour">
            <div className="behaviour-list-item__tag">{eventType}</div>
          </div>
          <button
            className="behaviour-list-item__remove-button"
            onClick={() => onRemoveButtonClick(serverId, id)}
          >
            remove
          </button>
        </div>
        <div className={behaviourReactionsClassnames}>
          <ReactionListConnect
            behaviour={id}
            render={reactionId => <WsReactionListItemConnect id={reactionId} />}
          />
        </div>
      </div>
    );
  }
}

WsBehaviourListItem.propTypes = {
  behaviour: PropTypes.shape({}).isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired
};
