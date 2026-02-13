export class SoundManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }

  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine"
  ): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  play(soundName: string): void {
    switch (soundName) {
      case "correct":
        // Happy ding sound
        this.playTone(800, 0.15, "sine");
        setTimeout(() => this.playTone(1000, 0.2, "sine"), 100);
        break;
      case "wrong":
        // Low buzz sound
        this.playTone(200, 0.2, "sawtooth");
        break;
      case "win":
        // Victory sound!
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          setTimeout(() => this.playTone(freq, 0.3, "square"), i * 150);
        });
        break;
      case "tick":
        // Quick tick sound
        this.playTone(1000, 0.05, "sine");
        break;
    }
  }

  async loadAllSounds(): Promise<void> {
    // No external files needed - all sounds are generated programmatically!
    return Promise.resolve();
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManager) {
    soundManager = new SoundManager();
  }
  return soundManager;
}
