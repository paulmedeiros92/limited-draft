const SearchService = {
  findMatchingCards(searchString, cardData, filter) {
    let results = [];
    if (searchString === '') {
      return results;
    }
    if (filter.toLowerCase() === 'all' || filter.toLowerCase() === 'search by') {
      cardData.forEach((tier) => {
        results = results.concat(tier.cards.filter(card => card.name.toLowerCase()
          .includes(searchString)));
      });
    } else {
      results = cardData.find(tier => tier.tier === filter).cards
        .filter(card => card.name.toLowerCase().includes(searchString));
    }
    return results;
  },
};

export default SearchService;
