import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.css';
import Selector from './selector/selector';

function TopPicksHeader({ showTier }) {
  return (
    <div>
      <h1>Top Picks</h1>
      <Selector showTier={showTier} />
    </div>
  );
}

TopPicksHeader.propTypes = {
  showTier: PropTypes.func.isRequired,
}
export default TopPicksHeader;
