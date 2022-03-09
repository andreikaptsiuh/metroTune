import React, { useState } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { metronomeSoundTypes } from "../../constants/metronomeSoundTypes";
import './SettingsPage.css';

export const SettingsPage = () => {
  const metronomeSoundType = localStorage.getItem('metronomeSoundType');
  const metronomeClickGain = localStorage.getItem('metronomeClickGain');

  const [clickVolume, setClickVolume] = useState(+metronomeClickGain);

  const changeSoundType = (newSoundType) => {
    localStorage.setItem('metronomeSoundType', newSoundType);
  };

  const changeClickVolume = (newVolume) => {
    setClickVolume(newVolume);
    localStorage.setItem('metronomeClickGain', String(newVolume));
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

      <div className="settings__item">
        Set click gain
        <Input
          type="range"
          value={clickVolume}
          onChangeHandler={changeClickVolume}
          min={1}
          max={100}
        />
      </div>
    </div>
  )
};
