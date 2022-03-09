import React from "react";
import { Select } from "../../components/Select";
import { metronomeSoundTypes } from "../../constants/metronomeSoundTypes";
import './SettingsPage.css';

export const SettingsPage = () => {
  const metronomeSoundType = localStorage.getItem('metronomeSoundType');

  const changeSoundType = (newSoundType) => {
    localStorage.setItem('metronomeSoundType', newSoundType);
  };

  return (
    <div className="settings__page">
      <div className="settings__item">
        Select click sound
        <Select 
          options={metronomeSoundTypes}
          defaultValue={metronomeSoundType}
          onChange={changeSoundType}
        />
      </div>
    </div>
  )
};
