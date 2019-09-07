import React from 'react';
import PropTypes from 'prop-types';
import TopPicksHeader from './top-picks-header/top-picks-header';
import TopPicksContent from './top-picks-content/top-picks-content';
import Donate from '../donate/donate';

class TopPicks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loaded: 0,
    };

    this.loadToggle = this.loadToggle.bind(this);
    this.loadTick = this.loadTick.bind(this);
  }

  loadToggle(loading) {
    this.setState({ loading, loaded: 0 });
  }

  loadTick() {
    const { loaded } = this.state;
    this.setState(prevState => ({ loaded: prevState.loaded + 1 }));
    if (loaded === 5) {
      this.loadToggle(false);
    }
  }

  render() {
    const {
      showTier,
      search,
      displaySearchFilter,
      toggleSearchFilter,
      cardTiers,
      selectedTier,
      cardsOfTier,
      displayCard,
    } = this.props;
    const { loading, loaded } = this.state;

    return (
      <div>
        <TopPicksHeader
          showTier={showTier}
          search={search}
          displaySearchFilter={displaySearchFilter}
          toggleSearchFilter={toggleSearchFilter}
          cardTiers={cardTiers}
          selectedTier={selectedTier}
          loadToggle={this.loadToggle}
        />
        <TopPicksContent
          cardsOfTier={cardsOfTier}
          displayCard={displayCard}
          loading={loading}
          loaded={loaded}
          loadTick={this.loadTick}
        />
        <Donate />
      </div>
    );
  }
}

TopPicks.propTypes = {
  cardsOfTier: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  displayCard: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  showTier: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    filter: PropTypes.string.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  selectedTier: PropTypes.string.isRequired,
};
export default TopPicks;
