import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MetronomeController } from "../../controllers/MetronomeController";
import { setTemp } from "../../store/metronomeReducer";
import { Button } from "../Button";
import { Input } from "../Input";
import './Metronome.css';

export const Metronome = () => {
  const [play, setPlay] = useState(false);

  const temp = useSelector((state) => state.metronome.temp);
  const metronomeSoundType = useSelector((state) => state.metronome.soundType);
  const metronomeClickGain = useSelector((state) => state.metronome.clickGain);

  const dispatch = useDispatch();

  const metronomeController = useMemo(() => {
    return new MetronomeController(temp, metronomeSoundType, +metronomeClickGain);
  }, [metronomeSoundType, metronomeClickGain]); 

  const stopMetronomeHandler = () => {
    setPlay(false);
    metronomeController.stop();
  };

  const decrementTempHandler = () => {
    if (temp === 1) return;

    stopMetronomeHandler();

    const newTemp = temp - 1;
    metronomeController.setTemp(newTemp);
    dispatch(setTemp(newTemp));
  };

  const incrementTempHandler = () => {
    if (temp === 340) return;

    stopMetronomeHandler();
  
    const newTemp = temp + 1; 
    metronomeController.setTemp(newTemp);
    dispatch(setTemp(newTemp));
  };

  const setTempFromInputHandler = (value) => {
    stopMetronomeHandler();
    metronomeController.setTemp(value);
    dispatch(setTemp(value));
  };

  const startStopMetronomePlay = () => {
    if (play) {
      stopMetronomeHandler();
    } else {
      setPlay(true);
      metronomeController.start();
    }
  };

  useEffect(() => {
    return () => stopMetronomeHandler();
  }, []);

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
