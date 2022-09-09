import { createSlice } from '@reduxjs/toolkit';
import { metronomeSoundTypes } from '../constants/metronomeSoundTypes';

export const metronomeSlice = createSlice({
    name: 'metronome',
    initialState: {
        temp: 100,
        soundType: metronomeSoundTypes[0].value,
        clickGain: 7
    },
    reducers: {
        setTemp: (state, action) => {
            state.temp = action.payload;
        },
        setSoundType: (state, action) => {
            state.soundType = action.payload;
        },
        setClickGain: (state, action) => {
            state.clickGain = action.payload;
        }
    }
});

export const { setTemp, setSoundType, setClickGain } = metronomeSlice.actions;

export default metronomeSlice.reducer;
