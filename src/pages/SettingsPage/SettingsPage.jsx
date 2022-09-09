import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { metronomeSoundTypes } from "../../constants/metronomeSoundTypes";
import { setClickGain, setSoundType } from "../../store/metronomeReducer";
import './SettingsPage.css';

export const SettingsPage = () => {
  const metronomeSoundType = useSelector((state) => state.metronome.soundType);
  const metronomeClickGain = useSelector((state) => state.metronome.clickGain);

  const dispatch = useDispatch();

  const [clickVolume, setClickVolume] = useState(+metronomeClickGain);

  const changeSoundType = (newSoundType) => {
    dispatch(setSoundType(newSoundType));
  };

  const changeClickVolume = (newVolume) => {
    setClickVolume(newVolume);
    dispatch(setClickGain(newVolume));
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
