import React from 'react';
import PropTypes from 'prop-types';
import './mtg-card.scss';
import { useDispatch } from 'react-redux';
import { openCardModal } from '../../redux/actions';

function MtgCard({ cardData }) {
  const dispatch = useDispatch();
  const toggleFunc = (e) => {
    e.preventDefault();
    dispatch(openCardModal(cardData));
  };
  const imageUri = cardData.image_uris
    ? cardData.image_uris.normal : cardData.card_faces[0].image_uris.normal;
  return (
    <div className="pick-card">
      <img src={imageUri} onClick={toggleFunc} alt="beetle" />
    </div>
  );
}

MtgCard.propTypes = {
  cardData: PropTypes.object.isRequired,
};
export default MtgCard;
