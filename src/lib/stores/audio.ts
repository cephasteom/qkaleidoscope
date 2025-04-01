import { writable } from 'svelte/store';
import { Meter, UserMedia } from 'tone';
import { mapToRange, clamp } from '$lib/utils';

export const level = writable(0);
level.subscribe(console.log)

export async function startMicLevelTracking() {
    const meter = new Meter();
    const mic = new UserMedia();
    mic.open();
    // connect mic to the meter
    mic.connect(meter);
    // the current level of the mic

    
    setInterval(() => {
        level.set(clamp(mapToRange(+meter.getValue(), -100, -60, 0, 1), 0, 2))
    }, 10);
}

