let audio: AudioContext | null = null;

export function unlockWorkshopAudio(): void {
  if (typeof window === "undefined") return;
  const Ctor = window.AudioContext;
  if (!Ctor) return;
  audio ??= new Ctor();
  void audio.resume();
}

export function playEndTone(): void {
  if (!audio || audio.state !== "running") return;

  const now = audio.currentTime;
  const master = audio.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
  master.connect(audio.destination);

  [0, 0.16].forEach((offset, i) => {
    const osc = audio!.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(i === 0 ? 784 : 988, now + offset);
    osc.connect(master);
    osc.start(now + offset);
    osc.stop(now + offset + 0.18);
  });
}
