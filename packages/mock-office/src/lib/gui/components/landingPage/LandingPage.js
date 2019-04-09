import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allServersSelector } from '../../app/entities/index';

export const LandingPage = ({ serverExists }) => (
  <div className="landing-page">
    {serverExists ? 'Select server' : 'Add server'}
  </div>
);

LandingPage.propTypes = {
  serverExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  serverExists: allServersSelector(state).length !== 0
});

export default connect(mapStateToProps)(LandingPage);
