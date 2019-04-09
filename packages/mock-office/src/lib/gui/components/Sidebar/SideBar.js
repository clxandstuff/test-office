import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import SideBarServersConnect from '../SidebarServers/SideBarServers';

const SideBar = () => (
  <div className="sidebar">
    <Scrollbars>
      <div className="sidebar__servers">
        <SideBarServersConnect />
      </div>
    </Scrollbars>
  </div>
);

export default SideBar;
