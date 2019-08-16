import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import './search.css';

function Search({  }) {
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Search</InputGroupText>
      </InputGroupAddon>
      <Input />
    </InputGroup>
  );
}

Search.propTypes = {
};

export default Search;
