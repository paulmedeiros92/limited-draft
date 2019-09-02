import React from 'react';
import './donate.css';
import donateImg from '../resources/images/donate.png';

function Donate() {
  return (
    <a title="Drafting Money!" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=heavenscloud60%40gmail.com&item_name=MTG+Buddy&currency_code=USD&source=url">
      <img className="donate" src={donateImg} alt="No Money :'(" />
    </a>
  );
}
export default Donate;
