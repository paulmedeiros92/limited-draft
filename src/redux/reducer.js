import {
  CHANGE_SET, REQUEST_LOADING, FETCH_CARDS_SUCCESS,
  REQUEST_FAIL, FETCH_CARD_SETS_SUCCESS, DISPLAY_CARD,
  FETCH_EXAMPLE_CARDS_SUCCESS,
} from './types';
import ELD from '../set-data/eld/eld.json';
import IKO from '../set-data/iko/iko.json';
import ZNR from '../set-data/znr/znr.json';
import M21 from '../set-data/m21/m21.json';
import KHM from '../set-data/khm/khm.json';
import STX from '../set-data/stx/stx.json';

const ALL_SETS = {
  znr: ZNR, m21: M21, iko: IKO, eld: ELD, khm: KHM, stx: STX,
};

const initialState = {
  currentSet: {
    name: 'StrixHaven',
    uri: null,
    code: 'stx',
  },
  displayCard: null,
  cardSets: {},
  setPicks: [],
  exampleCards: [],
  isLoading: false,
  error: null,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD_SETS_SUCCESS:
      return {
        ...state,
        cardSets: action.payload,
        currentSet: action.payload.stx,
        setPicks: ALL_SETS.stx,
      };
    case FETCH_EXAMPLE_CARDS_SUCCESS:
      return { ...state, exampleCards: action.payload };
    case CHANGE_SET:
      return { ...state, currentSet: action.payload };
    case REQUEST_LOADING:
      return { ...state, isLoading: action.payload };
    case FETCH_CARDS_SUCCESS:
      return { ...state, quote: action.payload };
    case REQUEST_FAIL:
      return { ...state, error: action.payload };
    case DISPLAY_CARD:
      return { ...state, displayCard: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
