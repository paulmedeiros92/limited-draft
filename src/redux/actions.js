import SetService from '../services/set-service';
import CardService from '../services/cards-service';
import {
  CHANGE_SET, REQUEST_LOADING, DISPLAY_CARD,
  FETCH_CARDS_SUCCESS, REQUEST_FAIL, FETCH_CARD_SETS_SUCCESS,
  FETCH_EXAMPLE_CARDS_SUCCESS,
} from './types';

export const changeSet = set => ({
  type: CHANGE_SET,
  payload: set,
});

export const loadSets = setArray => (dispatch) => {
  dispatch({ type: REQUEST_LOADING, payload: true });
  SetService.fetchAvailableSets(setArray)
    .then((data) => {
      const mappedData = SetService.mapSetToResponse(data);
      dispatch({ type: FETCH_CARD_SETS_SUCCESS, payload: mappedData });
      dispatch({ type: REQUEST_LOADING, payload: false });
    })
    .catch((error) => {
      dispatch({ type: REQUEST_FAIL, payload: error });
      dispatch({ type: REQUEST_LOADING, payload: false });
    });
};

export const displayCard = card => ({
  type: DISPLAY_CARD,
  payload: card,
});

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

export const loadSetPickCards = cardsArray => (dispatch) => {
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
    .then(data => dispatch({ type: FETCH_CARDS_SUCCESS, payload: data.name }))
    .catch(err => dispatch({ type: REQUEST_FAIL, payload: err }));
};
