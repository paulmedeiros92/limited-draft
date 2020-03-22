import React from 'react';
import PropTypes from 'prop-types';
import './display-card.scss';
import { Alert, Modal } from 'react-bootstrap';

function DisplayCard({ toggle, displayCard }) {
  const cardToggle = () => toggle(
    displayCard.cardUri, displayCard.cardTier, displayCard.cardRank, displayCard.visibility,
  );

  return (
    <Modal show={displayCard.visibility} onHide={cardToggle}>
      <div className="card-wrapper" onClick={cardToggle}>
        <img className="display-card" src={displayCard.cardUri} alt="OOPSIE!!!" />
        <div className="info">
          <Alert variant="dark" className="info-text">
            <h3>
              {`Tier: ${displayCard.cardTier}`}
            </h3>
          </Alert>
          <Alert variant="dark" className="info-text">
            <h3>
              {`Rank: #${displayCard.cardRank}`}
            </h3>
          </Alert>
        </div>
      </div>
    </Modal>
  );
}

DisplayCard.propTypes = {
  displayCard: PropTypes.shape({
    cardUri: PropTypes.string.isRequired,
    cardTier: PropTypes.string.isRequired,
    cardRank: PropTypes.number.isRequired,
    visibility: PropTypes.bool.isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
};

export default DisplayCard;
