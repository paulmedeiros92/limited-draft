import React from 'react';
import './donate.css';
import { useSelector, useDispatch } from "react-redux";
import { setIncrement, setDecrement } from "../redux/actions";

function Donate() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <a title="Drafting Money!" href="https://paypal.me/mtgBuddy" target="_blank" rel="noopener noreferrer">
        <img className="donate" src="donate.png" alt="No Money :'(" />
      </a>
      <h1>TEST{counter}</h1>
      <button onClick={() => {dispatch(setIncrement())}}>Increment</button>
      <button onClick={() => {dispatch(setDecrement())}}>Decrement</button>
    </div>
  );
}
export default Donate;
