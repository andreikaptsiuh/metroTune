import React from "react";
import './Select.css';

export const Select = ({ options, defaultValue, onChange }) => {
  const onChangeHandler = (e) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  return (
    <select
      className="select"
      defaultValue={defaultValue}
      onChange={onChangeHandler}
    >
      {options.map((item) => (
        <option value={item.value} key={item.value}>{item.label}</option>
      ))}
    </select>
  )
};
