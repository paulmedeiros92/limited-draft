import React from 'react';
import PropTypes from 'prop-types';
import './archetypes.scss';
import {
  Tab, Row, Col, Nav, Spinner,
} from 'react-bootstrap';
import SymbolService from '../services/symbol-service';
import CardService from '../services/cards-service';
import DisplayCard from '../cards/display-card/display-card';
import MtgCard from '../cards/mtg-card/mtg-card';
import ZNR_ARCHETYPES from '../set-data/znr-archetypes.json';
import ELD_ARCHETYPES from '../set-data/eld-archetypes.json';
import IKO_ARCHETYPES from '../set-data/iko-archetypes.json';

const ARCHETYPES = { znr: ZNR_ARCHETYPES, eld: ELD_ARCHETYPES, iko: IKO_ARCHETYPES };

class Archetypes extends React.Component {
  static buildMana(uris) {
    return uris.map(uri => (<img src={uri.uri} className="mana" alt="no-mana" />));
  }

  static toggleCard(cardUri, cardTier, cardRank, visibility) {
    this.setState({
      displayCard: {
        cardUri, cardTier, cardRank, visibility: !visibility, target: { x: 0, y: 0 },
      },
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      archetypes: ARCHETYPES[props.selectedSet.code],
      exampleCards: undefined,
      loading: true,
      displayCard: {
        cardUri: '',
        cardTier: '',
        cardRank: -1,
        visibility: false,
        target: { x: 0, y: 0 },
      },
    };

    this.buildMana = Archetypes.buildMana.bind(this);
    this.toggleCard = Archetypes.toggleCard.bind(this);

    let cards = ARCHETYPES[props.selectedSet.code]
      .map(tier => tier.archetypes.map(archetype => archetype.exampleCards))
      .flat(2);
    if (cards.length > 0) {
      cards = cards.reduce((unique, item) => {
        if (unique.find(card => item.name === card.name) === undefined) {
          return [...unique, item];
        }
        return unique;
      }, []);

      CardService.fetchCards(
        { tier: 'Archetype Examples', cards },
      ).then((result) => {
        const cardMap = {};
        ARCHETYPES[props.selectedSet.code].forEach((tier) => {
          tier.archetypes.forEach((archetype) => {
            cardMap[archetype.title] = result.cards.filter(card => archetype.exampleCards
              .find(example => example.name === card.name) !== undefined);
          });
        });
        this.setState({ exampleCards: cardMap, loading: false });
      });
    }
    if (cards.length === 0) {
      this.state.loading = false;
    }
  }

  rowOfCards(cards) {
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

  tieredDescriptions(tier) {
    const { exampleCards } = this.state;
    return tier.map((item) => {
      const paragraphs = item.description.map(paragraph => (
        <p>{paragraph}</p>
      ));
      const examples = exampleCards !== undefined ? this.rowOfCards(exampleCards[item.title]) : '';
      return (
        <Tab.Pane eventKey={item.title}>
          {paragraphs}
          <Row>
            {examples}
          </Row>
        </Tab.Pane>
      );
    });
  }

  archetypeName(colors, title) {
    const { symbols } = this.props;
    let mana = '';
    if (symbols.data.length > 0) {
      const uris = SymbolService.getSvgFromCodes(colors, symbols.data);
      mana = this.buildMana(uris);
    }
    return (
      <div>
        {mana}
        {title}
      </div>
    );
  }

  navs(tier) {
    return tier.map((item) => {
      const title = this.archetypeName(item.colors, item.title);
      return (
        <Nav.Item>
          <Nav.Link eventKey={item.title}>{title}</Nav.Link>
        </Nav.Item>
      );
    });
  }

  tiers(archetypes) {
    return archetypes.map((tier) => {
      const navs = this.navs(tier.archetypes);
      return (
        <div>
          <div className="tier-title">{`Tier ${tier.tier}`}</div>
          <Nav variant="pills" className="flex-column">
            {navs}
          </Nav>
        </div>
      );
    });
  }

  render() {
    const { archetypes, loading, displayCard } = this.state;
    const tiers = this.tiers(archetypes);
    const panes = this.tieredDescriptions(archetypes.map(tier => tier.archetypes).flat());

    return (
      <div>
        {loading && <Spinner animation="border" variant="success" />}
        <Tab.Container defaultActiveKey={archetypes[0].archetypes[0].title}>
          <Row className="archetypes">
            <Col sm={3}>
              {tiers}
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {panes}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <DisplayCard
          displayCard={displayCard}
          toggle={this.toggleCard}
        />
      </div>
    );
  }
}
Archetypes.propTypes = {
  selectedSet: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
};
export default Archetypes;
