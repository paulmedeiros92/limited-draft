import React from 'react';
import PropTypes from 'prop-types';
import './top-picks-header.css';
import Selector from './selector/selector';
import Search from './search/search';

function TopPicksHeader({ showTier, search }) {
  return (
    <div>
      <h1>Top Picks</h1>
      <Selector showTier={showTier} />
      <Search search={search}/>
    </div>
  );
}

TopPicksHeader.propTypes = {
  showTier: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}
export default TopPicksHeader;
