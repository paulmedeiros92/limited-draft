
const baseUrl = 'https://api.scryfall.com';

const SetService = {
  fetchSet(setIdentifier) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/sets/${setIdentifier}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }).then(res => res.json())
        .then(result => resolve(result), error => reject(error));
    });
  },
  fetchAvailableSets() {
    return Promise.all(['eld', 'thb', 'iko'].map(fileName => this.fetchSet(fileName)));
  },
};

export default SetService;
