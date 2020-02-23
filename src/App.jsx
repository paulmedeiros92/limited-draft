import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import TopPicks from './top-picks/top-picks';
import CardService from './cards/cards-service';
import SearchService from './top-picks/top-picks-header/search/search-service';
import TierData from './resources/thb-tier-list.json';
import Removal from './removal/removal';
import Archetypes from './archetypes/archetypes';
import Mechanics from './mechanics/mechanics';
import TopPicksHeader from './top-picks/top-picks-header/top-picks-header';
import Donate from './donate/donate';

class App extends React.Component {
  static showTier(tier) {
    const { cardData } = this.state;
    this.setState({ cardsOfTier: cardData[tier], selectedTier: tier });
  }

  static search(string) {
    const { cardData, displaySearchFilter } = this.state;
    this.setState(
      {
        cardsOfTier: SearchService.findMatchingCards(
          string, cardData, displaySearchFilter.filter,
        ),
        selectedTier: '',
      },
    );
  }

  static toggleSearchFilter(filter, className) {
    const { displaySearchFilter } = this.state;
    if (className.includes('dropdown')) {
      this.setState(
        { displaySearchFilter: { visibility: !displaySearchFilter.visibility, filter } },
      );
    } else {
      this.setState(
        {
          displaySearchFilter: {
            visibility: !displaySearchFilter.visibility,
            filter: displaySearchFilter.filter,
          },
        },
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      cardData: {},
      cardsOfTier: [],
      selectedTier: '',
      cardTiers: [],
      displaySearchFilter: { visibility: false, filter: 'Search By' },
    };

    this.showTier = App.showTier.bind(this);
    this.search = App.search.bind(this);
    this.toggleSearchFilter = App.toggleSearchFilter.bind(this);

    Promise.all(TierData.map(tier => CardService.fetchCards(tier)))
      .then((results) => {
        const data = {};
        results.forEach((result) => {
          data[result.tier] = result.cards;
        });
        this.setState({ cardData: data, cardTiers: Object.keys(data) });
        this.showTier('Incredible Bombs');
      });
  }

  render() {
    const {
      cardsOfTier,
      displaySearchFilter,
      cardTiers,
      selectedTier,
    } = this.state;
    return (
      <main>
        <TopPicksHeader
          showTier={this.showTier}
          search={this.search}
          displaySearchFilter={displaySearchFilter}
          toggleSearchFilter={this.toggleSearchFilter}
          cardTiers={cardTiers}
          selectedTier={selectedTier}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <TopPicks
                cardsOfTier={cardsOfTier}
                showTier={this.showTier}
                selectedTier={selectedTier}
              />
            )}
          />
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
