import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { Button } from 'react-bootstrap';

function Link({
  showTier, tier, selectedTier, loadToggle, setPicks,
}) {
  function click(e) {
    showTier(setPicks.find(x => x.tier === tier), e);
    loadToggle(true);
  }

  return (
    <Button
      variant={tier === selectedTier ? 'success' : 'primary'}
      onClick={click}
      disabled={tier === selectedTier}
    >
      {tier}
    </Button>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
  setPicks: PropTypes.arrayOf(
    PropTypes.shape({
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          rank: PropTypes.number,
          tier: PropTypes.string,
        }),
      ),
      tier: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Link;
