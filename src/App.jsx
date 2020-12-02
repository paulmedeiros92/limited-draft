import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopPicks from './top-picks/top-picks';
import Mechanics from './mechanics/mechanics';
import TopPicksHeader from './top-picks-header/top-picks-header';
import Donate from './donate/donate';
import SetService from './services/set-service';
import ELD from './set-data/eld/eld.json';
import IKO from './set-data/iko/iko.json';
import ZNR from './set-data/znr/znr.json';
import M21 from './set-data/m21/m21.json';

const ALL_SETS = {
  znr: ZNR, m21: M21, iko: IKO, eld: ELD,
};

class App extends React.Component {
  static changeSet(selectedSet) {
    this.setState({ selectedSet, setPicks: ALL_SETS[selectedSet.code] });
  }

  constructor() {
    super();
    this.state = {
      selectedSet: {
        name: 'Zendikar Rising',
        uri: '',
        code: 'znr',
      },
      sets: [],
      setPicks: [],
    };

    this.changeSet = App.changeSet.bind(this);

    SetService.fetchAvailableSets(Object.keys(ALL_SETS)).then((sets) => {
      const { selectedSet } = this.state;
      const foundSet = sets.find(set => set.code === selectedSet.code);
      this.setState({ sets, selectedSet: foundSet, setPicks: ALL_SETS[foundSet.code] });
    });
  }

  render() {
    const {
      selectedSet, sets, setPicks,
    } = this.state;
    return (
      <main>
        <TopPicksHeader selectedSet={selectedSet} sets={sets} changeSet={this.changeSet} />
        <Switch>
          <Route exact path="/" component={() => <TopPicks setPicks={setPicks} />} />
          <Route path="/mechanics" component={() => <Mechanics selectedSet={selectedSet} />} />
        </Switch>
        <Donate />
      </main>
    );
  }
}

export default App;
