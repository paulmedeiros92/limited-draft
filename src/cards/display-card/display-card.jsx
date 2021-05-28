import React from 'react';
import './display-card.scss';
import { Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CardService from '../../services/cards-service';
import { displayCard } from '../../redux/actions';

function DisplayCard() {
  const dispatch = useDispatch();
  const { card } = useSelector(state => ({ card: state.displayCard }));
  const cardToggle = () => dispatch(displayCard(null));

  return (
    <Modal show={!!card} onHide={cardToggle}>
      <div className="card-wrapper" onClick={cardToggle}>
        <img className="display-card" src={CardService.getCardImageUris(card).normal} alt="OOPSIE!!!" />
        <div className="info">
          <Alert variant="dark" className="info-text">
            <h3>
              {`Tier: ${card.cardTier}`}
            </h3>
          </Alert>
          <Alert variant="dark" className="info-text">
            <h3>
              {`Rank: #${card.cardRank}`}
            </h3>
          </Alert>
        </div>
      </div>
    </Modal>
  );
}

export default DisplayCard;
