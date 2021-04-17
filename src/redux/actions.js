import SetService from '../services/set-service';
import {CHANGE_SET, REQUEST_LOADING,
  FETCH_CARDS_SUCCESS, REQUEST_FAIL, FETCH_CARD_SETS_SUCCESS } from "./types"

export const changeSet = (set) => ({
  type: CHANGE_SET,
  payload: set,
});

export const loadCardSets = (setArray) => (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  SetService.fetchAvailableSets(setArray)
    .then((data) => {
      dispatch({ type: FETCH_CARD_SETS_SUCCESS, payload: data})
    })
    .catch((error) => {
      dispatch({ type: REQUEST_FAIL, payload: error })
    })
};

export const fetchCards = () => (dispatch) => {
  const quoteUrl = "https://api.scryfall.com/cards/random";
  fetch(quoteUrl, { mode: 'cors' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return dispatch({ type: FETCH_CARDS_SUCCESS, payload: data.name});
    })
    .catch((err) => dispatch({ type: REQUEST_FAIL, payload: err }));
};