import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopPicks from './top-picks/top-picks';
import Mechanics from './mechanics/mechanics';
import TopPicksHeader from './top-picks-header/top-picks-header';
import Donate from './donate/donate';
import { useDispatch, useSelector } from "react-redux"
import { loadCardSets } from "./redux/actions"
import ELD from './set-data/eld/eld.json';
import IKO from './set-data/iko/iko.json';
import ZNR from './set-data/znr/znr.json';
import M21 from './set-data/m21/m21.json';
import KHM from './set-data/khm/khm.json';
import STX from './set-data/stx/stx.json';

const ALL_SETS = {
  znr: ZNR, m21: M21, iko: IKO, eld: ELD, khm: KHM, stx: STX
};

function App() {
  const dispatch = useDispatch();
  dispatch(loadCardSets(Object.keys(ALL_SETS)))
  const setPicks = useSelector((state) => state.setPicks);

  return (
    <main>
      <TopPicksHeader />
      <Switch>
        <Route exact path="/" component={() => <TopPicks setPicks={setPicks} />} />
        <Route path="/mechanics" component={() => <Mechanics />} />
      </Switch>
      <Donate />
    </main>
  );
}

export default App;
