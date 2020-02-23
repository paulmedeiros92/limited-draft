import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopPicks from './top-picks/top-picks';
import Removal from './removal/removal';
import Archetypes from './archetypes/archetypes';
import Mechanics from './mechanics/mechanics';
import TopPicksHeader from './top-picks/top-picks-header/top-picks-header';
import Donate from './donate/donate';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main>
        <TopPicksHeader />
        <Switch>
          <Route exact path="/" component={TopPicks} />
          <Route path="/mechanics" component={Mechanics} />
          <Route path="/archetypes" component={Archetypes} />
          <Route path="/removal" component={Removal} />
        </Switch>
        <Donate />
      </main>
    );
  }
}

export default App;
