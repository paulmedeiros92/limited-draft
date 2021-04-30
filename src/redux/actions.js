import SetService from '../services/set-service';
import CardService from '../services/cards-service';
import {
  CHANGE_SET, REQUEST_LOADING, OPEN_CARD_MODAL,
  FETCH_CARDS_SUCCESS, REQUEST_FAIL, FETCH_CARD_SETS_SUCCESS,
  FETCH_EXAMPLE_CARDS_SUCCESS, CLOSE_CARD_MODAL,
} from './types';

export const changeSet = set => ({
  type: CHANGE_SET,
  payload: set,
});

export const loadCardSets = setArray => (dispatch) => {
  dispatch({ type: REQUEST_LOADING, payload: true });
  SetService.fetchAvailableSets(setArray)
    .then((data) => {
      dispatch({ type: FETCH_CARD_SETS_SUCCESS, payload: data });
      dispatch({ type: REQUEST_LOADING, payload: false });
    })
    .catch((error) => {
      dispatch({ type: REQUEST_FAIL, payload: error });
      dispatch({ type: REQUEST_LOADING, payload: false });
    });
};

export const openCardModal = card => ({
  type: OPEN_CARD_MODAL,
  payload: card,
});

export const closeCardModal = () => ({ type: CLOSE_CARD_MODAL });

export const loadExampleCards = cardsArray => (dispatch) => {
  dispatch({ type: REQUEST_LOADING, payload: true });
  CardService.fetchCards(cardsArray)
    .then((result) => {
      dispatch({ type: FETCH_EXAMPLE_CARDS_SUCCESS, payload: result.data });
      dispatch({ type: REQUEST_LOADING, payload: false });
    })
    .catch((error) => {
      dispatch({ type: REQUEST_FAIL, payload: error });
      dispatch({ type: REQUEST_LOADING, payload: false });
    });
};

export const fetchCards = () => (dispatch) => {
  const quoteUrl = 'https://api.scryfall.com/cards/random';
  fetch(quoteUrl, { mode: 'cors' })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      return dispatch({ type: FETCH_CARDS_SUCCESS, payload: data.name });
    })
    .catch(err => dispatch({ type: REQUEST_FAIL, payload: err }));
};
