import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './mtg-card.scss';
import CardService from '../../services/cards-service';
import { displayCard } from '../../redux/actions';

function MtgCard({ card }) {
  const dispatch = useDispatch();
  return (
    <div className="pick-card">
      <img src={CardService.getCardImageUris(card).small} onClick={() => dispatch(displayCard(card))} alt="beetle" />
    </div>
  );
}

MtgCard.propTypes = {
  card: PropTypes.object.isRequired,
};
export default MtgCard;
