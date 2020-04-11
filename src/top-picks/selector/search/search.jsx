import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup, DropdownButton, Dropdown, FormControl,
} from 'react-bootstrap';
import './search.css';

function Search({
  search, displaySearchFilter, toggleSearchFilter, cardTiers,
}) {
  function buildDropdownItems(tiers) {
    return tiers.map(tier => (
      <Dropdown.Item onClick={() => toggleSearchFilter(tier, 'dropdown')} key={tier}>{tier}</Dropdown.Item>
    ));
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      search(e.target.value.toLowerCase());
    }
  }

  return (
    <InputGroup className="search">
      <FormControl placeholder="Search" onKeyDown={keyPress} />
      <DropdownButton
        as={InputGroup.Append}
        title={displaySearchFilter.filter}
        variant="outline-secondary"
      >
        <Dropdown.Item header>Tiers</Dropdown.Item>
        <Dropdown.Item onClick={() => toggleSearchFilter('ALL', 'dropdown')}>ALL</Dropdown.Item>
        <Dropdown.Divider />
        {buildDropdownItems(cardTiers)}
      </DropdownButton>
    </InputGroup>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  displaySearchFilter: PropTypes.shape({
    visibility: PropTypes.bool.isRequired,
    filter: PropTypes.string.isRequired,
  }).isRequired,
  toggleSearchFilter: PropTypes.func.isRequired,
  cardTiers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default Search;
