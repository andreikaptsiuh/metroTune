import React, { useEffect, useMemo, useRef } from "react";
import { TunerController } from "../../controllers/TunerController";
import './Tuner.css';

export const Tuner = () => {
  const noteRef = useRef(null);
  const indicatorRef = useRef(null);
  const tunerController = useMemo(() => new TunerController(), []);

  useEffect(() => {
    if (!noteRef.current) return;

    tunerController.start(noteRef.current, indicatorRef.current);
  }, [tunerController, noteRef, indicatorRef]);

  return (
    <div className="tuner">
      <div
        className="tuner_note" 
        ref={noteRef}>
        -
      </div>
      <div className="tuner_indicator__wrapper">
        <div ref={indicatorRef} className="tuner_indicator">
          |
        </div>
      </div>
    </div>
  )
};
