import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { SideBarServers } from '../../src/lib/gui/components/SidebarServers/SideBarServers';

const props = {
  servers: [
    {
      name: 'HTTP running server',
      id: 'server1',
      type: 'http',
      secure: false,
      running: true,
    },
    {
      name: 'Secure HTTP server',
      id: 'server2',
      type: 'http',
      secure: true,
      running: false,
    },
    {
      name: 'Web socket server',
      id: 'server3',
      type: 'ws',
      secure: false,
      running: false,
    },
    {
      name: 'Secure & running web socket server',
      id: 'server4',
      type: 'ws',
      secure: true,
      running: true,
    }
  ],
  select: () => {},
  selected: 'server2',
};

storiesOf('SideBarServers', module)
  .add('some servers config', () => (
    <div className="sidebar">
      <SideBarServers {...props} />
    </div>
  ));
