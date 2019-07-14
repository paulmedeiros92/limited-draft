import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import TopPicks from './top-picks/top-picks';

function App({ state }) {
  return (
    <TopPicks state={state} />
  );
}

App.propTypes = {
  state: PropTypes.string.isRequired,
};
export default App;
