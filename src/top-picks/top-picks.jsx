import React from 'react';
import PropTypes from 'prop-types';
import TopPicksContent from './top-picks-content/top-picks-content';

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
      cardsOfTier,
      displayCard,
      showTier,
    } = this.props;
    const { loading, loaded } = this.state;

    return (
      <div>
        <TopPicksContent
          cardsOfTier={cardsOfTier}
          displayCard={displayCard}
          loading={loading}
          loaded={loaded}
          loadTick={this.loadTick}
          showTier={showTier}
          loadToggle={this.loadToggle}
        />
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
};
export default TopPicks;
