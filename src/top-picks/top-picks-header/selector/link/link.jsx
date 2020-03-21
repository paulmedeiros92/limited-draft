import React from 'react';
import PropTypes from 'prop-types';
import './link.css';
import { Button } from 'react-bootstrap';

function Link({
  showTier, tier, selectedTier, loadToggle,
}) {
  const variant = tier === selectedTier ? 'success' : 'primary';

  function click(e) {
    showTier(tier, e);
    loadToggle(true);
  }

  return (
    <Button variant={variant} onClick={click}>{tier}</Button>
  );
}

Link.propTypes = {
  showTier: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
  selectedTier: PropTypes.string.isRequired,
  loadToggle: PropTypes.func.isRequired,
};

export default Link;
