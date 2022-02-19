import React from "react";
import './Input.css';

export const Input = ({ value, onChangeHandler, className, type = 'text', min, max }) => {
  const numberInputHandler = (value) => {
    if (value > +max) {
      onChangeHandler(+max);
    } else if (value < +min) {
      onChangeHandler(+min);
    } else {
      onChangeHandler(value);
    }
  };

  const onChangeEventHandler = (event) => {
    const value = event.target.value;
    if (type === 'number') {
      numberInputHandler(+value);
    };
  };

  return(
    <input 
      className={className || 'input'}
      type={type}
      onChange={onChangeEventHandler}
      value={value || ''}
      min={min}
      max={max}
    />
  )
}
