import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './search.css';

function Search({
  search, displaySearchFilter, toggleSearchFilter, cardTiers,
}) {
  function buildDropdownItems(tiers) {
    return tiers.map(tier => (
      <DropdownItem>{tier}</DropdownItem>
    ));
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      search(e.target.value.toLowerCase());
    }
  }

  function toggle(e) {
    e.preventDefault();
    toggleSearchFilter(e.target.innerText, e.target.className);
  }

  return (
    <InputGroup>
      <Input onKeyDown={keyPress} />
      <InputGroupButtonDropdown addonType="prepend" isOpen={displaySearchFilter.visibility} toggle={toggle}>
        <DropdownToggle caret className="search-dropdown">{displaySearchFilter.filter}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Tiers</DropdownItem>
          <DropdownItem>ALL</DropdownItem>
          <DropdownItem divider />
          {buildDropdownItems(cardTiers)}
        </DropdownMenu>
      </InputGroupButtonDropdown>
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
