const URL = 'https://api.scryfall.com/symbology';

const SymbolService = {
  fetchSymbols() {
    return new Promise((resolve, reject) => {
      fetch(URL, {
        mode: 'cors',
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      }).then(res => res.json())
        .then(
          result => resolve(result),
          (error) => {
            reject(error);
          },
        );
    });
  },
  getSvgFromCodes(codes, symbols) {
    const hits = symbols.filter(symbol => codes.includes(symbol.symbol));
    return hits.map(hit => ({ code: hit.symbol, uri: hit.svg_uri }));
  },
};
export default SymbolService;
