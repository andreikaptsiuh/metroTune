import React, { useEffect, useMemo, useRef } from "react";
import { TunerController } from "../../controllers/TunerController";
import './Tuner.css';

export const Tuner = () => {
  const noteRef = useRef(null);
  const tunerController = useMemo(() => new TunerController(), []);

  useEffect(() => {
    if (!noteRef.current) return;

    tunerController.start(noteRef.current);
  }, [tunerController, noteRef]);

  return (
    <div className="tuner">
      <div
        className="tuner_note" 
        ref={noteRef}>
        -
      </div>
      <div className="tuner_indicator">
        indicator
      </div>
    </div>
  )
};
