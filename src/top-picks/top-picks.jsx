import React from 'react';
import {
  Row, Col, Spinner, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MtgCard from '../cards/mtg-card/mtg-card';
import './top-picks.scss';
import DisplayCard from '../cards/display-card/display-card';
import Selector from './selector/selector';
import CardService from '../services/cards-service';
import SearchService from '../services/search-service';


function scrollTop() {
  window.scrollTo(0, 0);
}

function rowOfCards(cards) {
  const { displayCard } = this.state;
  return cards.map(card => (
    <Col key={card.image}>
      <MtgCard
        cardUri={card.image}
        cardTier={card.tier}
        cardRank={card.rank}
        toggleCard={this.toggleCard}
        displayVisibility={displayCard.visibility}
        loadTick={this.loadTick}
      />
    </Col>
  ));
}

function numberOfRows(cardsOfTier, colMax) {
  const rows = [];
  const cards = [...cardsOfTier];
  while (cards.length > 0) { rows.push(cards.splice(0, colMax)); }
  return rows.map((row, index) => (
    <Row key={row[0].image}>
      {this.rowOfCards(rows[index])}
    </Row>
  ));
}

function TopPicks() {
  const { setPicks, displayCard } = useSelector(state => ({
    setPicks: state.setPicks,
    displayCard: state.displayCard,
  }));
  const cards = setPicks.length > 0 ? numberOfRows(setPicks, 5) : '';
  return (
    <div className="top-picks-content">
      {/* <Selector
        showTier={this.showTier}
        selectedTier={selectedTier}
        loadToggle={this.loadToggle}
        search={this.search}
        displaySearchFilter={displaySearchFilter}
        toggleSearchFilter={this.toggleSearchFilter}
        cardTiers={cardTiers}
        setPicks={setPicks}
      /> */}
      {cards}
      {/* {hasScrolled && <Button className="scroll-button" variant="primary" onClick={this.scrollTop}>Top</Button>} */}
      { displayCard && <DisplayCard displayCard={displayCard} />}
    </div>
  );
}
export default TopPicks;
