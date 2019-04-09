import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';
import ReactionListConnect from '../src/lib/gui/components/ReactionList';
import configureStore from '../src/lib/gui/app/configureStore';
import { succeededAction } from '../src/lib/gui/epics/importBehaviour/index';
import { succeededAction as addServerSucceded } from '../src/lib/gui/epics/addServer/actions';

storiesOf('ReactionList', module)
  .add('default', () => {
    const store = configureStore();
    store.dispatch(
      addServerSucceded({
        data: {
          name: 'Awesome server',
          port: 3000,
          type: 'http',
          secure: false,
          scenario: 'scenario-id',
          running: false,
          id: 'server-id'
        }
      })
    );
    store.dispatch(
      succeededAction(
        'scenario-id',
        [
          {
            id: 'behaviour-id-1',
            quantity: 0,
            reactions: [
              {
                id: 'reaction-id-1',
                title: 'reaction 1',
                type: 'future',
                payload: {}
              },
              {
                id: 'reaction-id-2',
                title: 'reaction 2',
                type: 'future',
                payload: {},
                delay: 500
              }
            ],
            title: 'Behaviour',
            event: {
              event: 'RECEIVED_REQUEST',
              url: '/bet/slips/S00001067bec2425c4/?sortOrder=off'
            }
          }
        ]
      )
    );

    return (
      <Provider store={store}>
        <ReactionListConnect behaviour="behaviour-id-1" />
      </Provider>
    );
  });
