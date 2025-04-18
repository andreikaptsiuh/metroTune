export class MetronomeController {
  constructor(temp, soundType, clickGain) {
    this.temp = temp;
    this.soundType = soundType;
    this.clickGain = clickGain;
    this.play = false;
    this.source = null;
    this.audioCtx = null;
  };

  setTemp = (newTemp) => {
    this.temp = newTemp;
  };

  start = () => {
    this.play = true;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.audioCtx.createBufferSource();

    const gainNode = this.audioCtx.createGain();
    gainNode.gain.value = this.clickGain;
    gainNode.gain.setValueAtTime(this.clickGain / 10, this.audioCtx.currentTime);

    const request = new XMLHttpRequest();
    request.open('GET', `./${this.soundType}_metronome.wav`, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      const audioData = request.response;

      this.audioCtx.decodeAudioData(audioData, (buffer) => {
        this._bufferGenerator(buffer);

        this.source.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        this.source.connect(this.audioCtx.destination);
        this.source.loop = true;
      });
    };

    request.send();
    this.source.start();
  };

  stop = () => {
    this.play = false;

    if (this.source) {
      this.source.stop();
    }
  };

  _bufferGenerator = (buffer) => {
    const tempToSecond = 60 / this.temp;
    const bufferLength = (buffer.sampleRate / 2) * tempToSecond * 2;

    const myArrayBuffer = this.audioCtx.createBuffer(
      buffer.numberOfChannels,
      bufferLength,
      buffer.sampleRate
    );

    const channel = myArrayBuffer.getChannelData(0);
    const audioChannel = buffer.getChannelData(0);

    for (let i = 0; i < myArrayBuffer.length; i++) {
      if (i >= buffer.length - 1) {
        channel[i] = 0;
      } else {
        channel[i] = audioChannel[i];
      }
    }

    this.source.buffer = myArrayBuffer;
  };
};
