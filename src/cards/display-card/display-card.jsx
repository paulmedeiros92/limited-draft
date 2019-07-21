import React from 'react';
import PropTypes from 'prop-types';
import './display-card.css';

function DisplayCard({ cardUri, target }) {
  const style = {
    left: `${target.x}px`,
    top: `${target.y}px`,
  };

  return (
    <img className="display-card" src={cardUri} style={style} alt="OOPSIE!!!" />
  );
}

DisplayCard.propTypes = {
  cardUri: PropTypes.string.isRequired,
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

DisplayCard.defaultProps = {
  target: undefined,
};

export default DisplayCard;
