import React, { useMemo, useState } from "react";
import { MetronomeController } from "../../controllers/MetronomeController";
import { Button } from "../Button";
import { Input } from "../Input";
import './Metronome.css';

export const Metronome = () => {
  const [temp, setTemp] = useState(100);
  const [play, setPlay] = useState(false);
  const metronomeController = useMemo(() => new MetronomeController(temp), [temp]); 

  const stopMetronomeHandler = () => {
    setPlay(false);
    metronomeController.stop();
  };

  const decrementTempHandler = () => {
    if (temp === 1) return;

    stopMetronomeHandler();

    const newTemp = temp - 1;
    setTemp(newTemp);
    metronomeController.setTemp(newTemp);
  };

  const incrementTempHandler = () => {
    if (temp === 340) return;

    stopMetronomeHandler();
  
    const newTemp = temp + 1;
    metronomeController.setTemp(newTemp);
    setTemp(newTemp);
  };

  const setTempFromInputHandler = (value) => {
    stopMetronomeHandler();
    setTemp(value);
  };

  const startStopMetronomePlay = () => {
    if (play) {
      stopMetronomeHandler();
    } else {
      setPlay(true);
      metronomeController.start();
    }
  };

  return (
      <div className="metronome__wrapper">
        <div className={play ? "metronome active" : "metronome"}
          onClick={startStopMetronomePlay}
        >
          {temp}
          <span>BPM</span>
        </div>

        <div className="metronome__handlers">
          <Button
            content='-'
            onClickHandler={decrementTempHandler}
          />

          <Input
            onChangeHandler={setTempFromInputHandler}
            type="number"
            value={temp}
            min='0'
            max='340'
          />

          <Button
            content='+'
            onClickHandler={incrementTempHandler}
          />
        </div>
      </div>
  )
};
