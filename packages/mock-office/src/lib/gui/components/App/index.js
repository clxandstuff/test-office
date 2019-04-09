import React from 'react';
import PropTypes from 'prop-types';
import { NotificationsConnect } from 'xync';
import Sidebar from '../Sidebar';
import Modal from '../Modal';
import { AppHeaderConnect } from '../AppHeader';

const App = ({ children }) => (
  <div className="app">
    <header className="app__header">
      <AppHeaderConnect />
    </header>
    <div className="app__main">
      <div className="app__sidebar">
        <Sidebar />
      </div>
      <div className="app__content">{children}</div>
    </div>
    <Modal />
    <NotificationsConnect />
  </div>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
