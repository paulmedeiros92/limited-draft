import React from 'react';
import './donate.css';


function Donate() {
  return (
    <a title="Drafting Money!" href="https://paypal.me/mtgBuddy" target="_blank" rel="noopener noreferrer">
      <img className="donate" src="donate.png" alt="No Money :'(" />
    </a>
  );
}
export default Donate;
