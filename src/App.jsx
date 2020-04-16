import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopPicks from './top-picks/top-picks';
import Removal from './removal/removal';
import Archetypes from './archetypes/archetypes';
import Mechanics from './mechanics/mechanics';
import TopPicksHeader from './top-picks-header/top-picks-header';
import Donate from './donate/donate';
import SetService from './services/set-service';
import SymbolService from './services/symbol-service';
import THB from './set-data/thb.json';
import ELD from './set-data/eld.json';
import IKO from './set-data/iko.json';

const ALL_SETS = { thb: THB, eld: ELD, iko: IKO };

class App extends React.Component {
  static changeSet(selectedSet) {
    this.setState({ selectedSet, setPicks: ALL_SETS[selectedSet.code] });
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedSet: {
        name: 'Ikoria',
        uri: '',
        code: 'iko',
      },
      sets: [],
      setPicks: [],
      symbols: {
        data: [],
      },
    };

    this.changeSet = App.changeSet.bind(this);

    SetService.fetchAvailableSets().then((sets) => {
      const currentSet = this.state.selectedSet.code;
      const selectedSet = sets.find(set => set.code === currentSet);
      this.setState({ sets, selectedSet, setPicks: ALL_SETS[selectedSet.code] });
    });
    SymbolService.fetchSymbols().then((symbols) => {
      this.setState({ symbols });
    });
  }

  render() {
    const {
      selectedSet, sets, setPicks, symbols,
    } = this.state;
    return (
      <main>
        <TopPicksHeader selectedSet={selectedSet} sets={sets} changeSet={this.changeSet} />
        <Switch>
          <Route exact path="/" component={() => <TopPicks setPicks={setPicks} />} />
          <Route path="/mechanics" component={() => <Mechanics selectedSet={selectedSet} />} />
          <Route path="/archetypes" component={() => <Archetypes selectedSet={selectedSet} symbols={symbols} />} />
          <Route path="/removal" component={Removal} />
        </Switch>
        <Donate />
      </main>
    );
  }
}

export default App;
