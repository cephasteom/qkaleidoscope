import { writable } from 'svelte/store';
import { start, Meter, UserMedia, Filter } from 'tone';
import { mapToRange, clamp } from '$lib/utils';

export const level = writable(0);

export async function startMicLevelTracking() {
    const meter = new Meter({smoothing: 0.95});
    const mic = new UserMedia();
    const lowpass = new Filter({
        type : 'lowpass',
        frequency : 80,
        rolloff : -12,
        Q : 1,
    });
    mic.open();
    // hicut so we just meter the kick
    mic.connect(lowpass);
    lowpass.connect(meter);

    setInterval(() => {
        level.set(
          clamp(mapToRange(+meter.getValue(), -120, -60, 0, 1), 0, 2)/2
        )
    }, 10);
}

export async function startAudio() {
    await start()
    window.removeEventListener('keydown', startAudio)
    window.removeEventListener('click', startAudio)
    window.removeEventListener('touchstart', startAudio)
}
