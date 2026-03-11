const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

function playTone(freq: number, duration: number, volume = 0.04, type: OscillatorType = 'sine') {
  if (!audioCtx) return;
  // Resume context if suspended (autoplay policy)
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playHoverSound() {
  playTone(800, 0.08, 0.03, 'sine');
}

export function playClickSound() {
  playTone(600, 0.06, 0.04, 'sine');
  setTimeout(() => playTone(900, 0.08, 0.03, 'sine'), 40);
}

export function playWhooshSound() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const bufferSize = audioCtx.sampleRate * 0.15;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(2000, audioCtx.currentTime);
  bandpass.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.15);
  bandpass.Q.value = 1;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  source.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(audioCtx.destination);

  source.start();
}
