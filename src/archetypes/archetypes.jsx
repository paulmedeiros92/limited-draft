import React from 'react';
import PropTypes from 'prop-types';
import './archetypes.scss';
import {
  Tab, Row, Col, Nav,
} from 'react-bootstrap';
import SymbolService from '../services/symbol-service';
import THB_ARCHETYPES from '../set-data/thb-archetypes.json';
import ELD_ARCHETYPES from '../set-data/eld-archetypes.json';

const ARCHETYPES = { thb: THB_ARCHETYPES, eld: ELD_ARCHETYPES };

class Archetypes extends React.Component {
  static buildMana(uris) {
    return uris.map(uri => (<img src={uri.uri} className="mana" alt="no-mana" />));
  }

  static tieredDescriptions(tier) {
    return tier.map((item) => {
      const paragraphs = item.description.map(paragraph => (
        <p>{paragraph}</p>
      ));
      return (
        <Tab.Pane eventKey={item.title}>
          {paragraphs}
        </Tab.Pane>
      );
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      symbols: {
        data: [],
      },
      archetypes: ARCHETYPES[props.selectedSet.code],
    };

    this.buildMana = Archetypes.buildMana.bind(this);
    this.tieredDescriptions = Archetypes.tieredDescriptions.bind(this);

    SymbolService.fetchSymbols().then((symbols) => {
      this.setState({ symbols });
    });
  }

  archetypeName(colors, title) {
    const { symbols } = this.state;
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
    const { archetypes } = this.state;
    const tiers = this.tiers(archetypes);
    const panes = this.tieredDescriptions(archetypes.map(tier => tier.archetypes).flat());

    return (
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
    );
  }
}
Archetypes.propTypes = {
  selectedSet: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
};
export default Archetypes;
