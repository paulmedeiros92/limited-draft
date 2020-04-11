import React from 'react';
import './archetypes.scss';
import {
  Tab, Row, Col, Nav,
} from 'react-bootstrap';
import SymbolService from '../services/symbol-service';

class Archetypes extends React.Component {
  static buildMana(uris) {
    return uris.map((uri) => {
      return <img src={uri.uri} className="mana" alt="no-mana" />;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      symbols: {
        data: [],
      },
    };

    this.buildMana = Archetypes.buildMana.bind(this);

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

  render() {
    const tab1 = this.archetypeName('{R}', 'Red DEck Winsz');

    return (
      <Tab.Container defaultActiveKey="first">
        <Row className="archetypes">
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">{tab1}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                Forst?
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                Secont?
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
export default Archetypes;
