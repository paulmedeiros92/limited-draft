import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let imgUri = '';
fetch('https://api.scryfall.com/cards/named?exact=blightbeetle')
  .then(res => res.json())
  .then(
    (result) => {
      imgUri = result.image_uris.png;
      ReactDOM.render(<App state={imgUri} />, document.getElementById('root'));
    },
    (error) => {
      console.error(`Fetch Failed: ${error}`);
      ReactDOM.render(<App state={error} />, document.getElementById('root'));
    },
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
