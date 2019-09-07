import React from 'react';
import './App.css';
import TopPicks from './top-picks/top-picks';
import CardService from './cards/cards-service';
import SearchService from './top-picks/top-picks-header/search/search-service';
import TierData from './resources/tier-list';

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
        this.showTier('THE BEST OF THE BEST');
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
      <TopPicks
        cardsOfTier={cardsOfTier}
        showTier={this.showTier}
        search={this.search}
        displaySearchFilter={displaySearchFilter}
        toggleSearchFilter={this.toggleSearchFilter}
        cardTiers={cardTiers}
        selectedTier={selectedTier}
      />
    );
  }
}

export default App;
