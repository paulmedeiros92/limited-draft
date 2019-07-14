import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';

function TopPicks({ state }) {
  return (
    <div>
      <TopPicksHeader />
      <TopPicksContent state={state} />
    </div>
  );
}

TopPicks.propTypes = {
  state: PropTypes.string.isRequired,
};
export default TopPicks;
