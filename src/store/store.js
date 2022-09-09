import { configureStore } from '@reduxjs/toolkit';
import metronomeReducer from './metronomeReducer';

export default configureStore({
    reducer: {
        metronome: metronomeReducer
    }
});
