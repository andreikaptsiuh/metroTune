import React from "react";
import './Button.css';

export const Button = ({ content, onClickHandler, className }) => {
  return (
    <button
      className={className || 'button'}
      onClick={onClickHandler}
    >
      {content}
    </button>
  )
};
