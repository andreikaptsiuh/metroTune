import { notesList } from '../../constants/notesList';

const tuneNoteValue = 1;

export class TunerController {
  constructor() {
    this.analyser = null;
    this.dataArray = null;
    this.frequencyDataArray = null;
    this.noteElement = null;

    this.frequencyDifferenceCash = tuneNoteValue;
  }

  start = (noteElement) => {
    this.noteElement = noteElement;

    navigator.getUserMedia = this._getUserMedia();
    navigator.getUserMedia(
      { video: false, audio: true },
      this._streamCallback,
      console.log
    );
  };

  _getNote = () => {
    requestAnimationFrame(this._getNote);

    this.analyser.getByteTimeDomainData(this.dataArray);
    this.analyser.getByteFrequencyData(this.frequencyDataArray);

    // Пик на спектре
    const peak = Math.max(...this.frequencyDataArray);
    if (peak <= 0) return;

    // Индекс пика
    const indexFreq = this.frequencyDataArray.indexOf(peak);

    // Пересчёт пика в частоту
    const peakFrequency = (indexFreq / this.analyser.frequencyBinCount) * 24000;

    // Определение имени ноты (округлённое)
    let noteKey = null;

    notesList.forEach((item) => {
      item.frequency.forEach((frequency) => {
        const frequencyDifference = Math.abs(frequency - peakFrequency);
        if (frequencyDifference < 10) {
          noteKey = item.note;
          Math.abs(frequency - peakFrequency);

          this._updateTuneState(frequencyDifference);
        }
      });
    });

    if (noteKey) {
      this.noteElement.innerHTML = `${noteKey}`;
    } else {
      this.noteElement.innerHTML = '-';
    }
  };

  _updateTuneState = (frequencyDifference) => {
    if (
      frequencyDifference > tuneNoteValue &&
      this.frequencyDifferenceCash <= tuneNoteValue
    ) {
      this.noteElement.classList.remove('tune');
      this.frequencyDifferenceCash = frequencyDifference;
    }

    if (
      frequencyDifference <= tuneNoteValue &&
      this.frequencyDifferenceCash > tuneNoteValue
    ) {
      this.noteElement.classList.add('tune');
      this.frequencyDifferenceCash = frequencyDifference;
    }
  };

  _streamCallback = (stream) => {
    const ctx = new AudioContext();
    const mic = ctx.createMediaStreamSource(stream);
    this.analyser = ctx.createAnalyser();

    // Размер преобразования Фурье
    this.analyser.fftSize = 32768;
    const bufferLength = this.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(bufferLength);
    this.frequencyDataArray = new Uint8Array(bufferLength); //new Float32Array(analyser.frequencyBinCount);

    this.analyser.getByteTimeDomainData(this.dataArray);
    mic.connect(this.analyser);

    this._getNote();
  };

  _getUserMedia = () => {
    return (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    );
  };
}
