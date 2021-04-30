import React from 'react';
import './display-card.scss';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeCardModal } from '../../redux/actions';

function DisplayCard() {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeCardModal());
  const cardModalData = useSelector(state => state.cardModalData);
  const hasData = !!cardModalData.image_uris || !!cardModalData.card_faces;
  let imageUri = 'https://c1.scryfall.com/file/scryfall-cards/large/front/b/d/bd43d44b-de27-4139-9cb8-b1f4c04fb87e.jpg?1592516586';
  if (hasData) {
    imageUri = cardModalData.image_uris
      ? cardModalData.image_uris.normal : cardModalData.card_faces[0].image_uris.normal;
  }

  return (
    <Modal show={hasData} onHide={closeModal}>
      <div className="card-wrapper" onClick={closeModal}>
        <img className="display-card" src={imageUri} alt="OOPSIE!!!" />
      </div>
    </Modal>
  );
}

export default DisplayCard;
