// Simple synth-based audio service to avoid external asset dependencies
class AudioService {
  private context: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.context;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();

    // Create a cheerful major chord arpeggio (C Major ish)
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      // Envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + (index * 0.05) + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (index * 0.05) + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + (index * 0.05));
      osc.stop(now + (index * 0.05) + 0.3);
    });
  }

  public playSkip() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playUndo() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    // Quick rewind/blip sound
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.15); // Rising pitch
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playLevelUp() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    // Fanfare
    const now = ctx.currentTime;
    const notes = [440, 554, 659, 880]; // A Major

    notes.forEach((freq, i) => {
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       osc.type = 'square';
       osc.frequency.setValueAtTime(freq, now + i * 0.1);
       gain.gain.setValueAtTime(0.05, now + i * 0.1);
       gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
       
       osc.connect(gain);
       gain.connect(ctx.destination);
       osc.start(now + i * 0.1);
       osc.stop(now + i * 0.1 + 0.4);
    });
  }
}

export const audioService = new AudioService();
