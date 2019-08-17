import TierData from '../../../resources/tier-list';


const SearchService = {
  findMatchingCards(searchString) {
    let results = [];
    TierData.forEach(tier => {
      results = results.concat(tier.cards.filter(card => card.name.toLowerCase().includes(searchString)));
    });
    return results;
  }
}

export default SearchService;