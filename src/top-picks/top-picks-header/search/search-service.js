const SearchService = {
  findMatchingCards(searchString, cardData, filter) {
    let results = [];
    if (filter.toLowerCase() === 'all' || filter.toLowerCase() === 'search by') {
      Object.keys(cardData).forEach((tierName) => {
        results = results.concat(cardData[tierName].filter(card => card.name.toLowerCase()
          .includes(searchString)));
      });
    } else {
      results = cardData[filter].filter(card => card.name.toLowerCase().includes(searchString));
    }
    return results;
  },
};

export default SearchService;
