import {
  CHANGE_SET, REQUEST_LOADING, FETCH_CARDS_SUCCESS,
  REQUEST_FAIL, FETCH_CARD_SETS_SUCCESS, OPEN_CARD_MODAL,
  FETCH_EXAMPLE_CARDS_SUCCESS, CLOSE_CARD_MODAL,
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
  cardModalData: {},
  cardSets: {},
  setPicks: [],
  exampleCards: [],
  isLoading: false,
  error: null,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD_SETS_SUCCESS:
      const cardSets = action.payload.reduce((map, set) => {
        map[set.code] = set;
        return map;
      }, {});
      return {
        ...state,
        cardSets,
        currentSet: cardSets.stx,
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
    case OPEN_CARD_MODAL:
      return { ...state, cardModalData: action.payload };
    case CLOSE_CARD_MODAL:
      return { ...state, cardModalData: {} };
    default:
      return state;
  }
};

export default counterReducer;
