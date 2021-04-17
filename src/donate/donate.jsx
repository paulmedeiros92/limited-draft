import React from 'react';
import './donate.css';
import { useSelector, useDispatch } from "react-redux";
import { changeSet, setDecrement, fetchCards } from "../redux/actions";

function Donate() {
  const counter = useSelector((state) => state.counter);
  const quote = useSelector((state) => state.quote);
  const dispatch = useDispatch();
  return (
    <div>
      <a title="Drafting Money!" href="https://paypal.me/mtgBuddy" target="_blank" rel="noopener noreferrer">
        <img className="donate" src="donate.png" alt="No Money :'(" />
      </a>
      <h1>TEST#: {counter}</h1>
      <h3>{quote}</h3>
      <button onClick={() => {dispatch(changeSet({name: 'test', uri: 'test', code: 'tst'}))}}>Change Set</button>
      <button onClick={() => {dispatch(setDecrement())}}>Decrement</button>
      <button onClick={() => {dispatch(fetchCards())}}>Quote</button>
    </div>
  );
}
export default Donate;
