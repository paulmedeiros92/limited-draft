import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import './search.css';

function Search({ search }) {

  function keyPress(e) {
    if(e.keyCode === 13) {
      search(e.target.value.toLowerCase());
    }
  }

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Search</InputGroupText>
      </InputGroupAddon>
      <Input onKeyDown={keyPress}/>
    </InputGroup>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Search;
