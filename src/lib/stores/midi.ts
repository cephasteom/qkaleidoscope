import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import { WebMidi } from 'webmidi';


// TODO: move to utils and type
// @ts-ignore
function createSmoothedStore(initial = 0) {
    let value = initial;
    let rafId: number | null = null;
    let target = initial;

    const { subscribe, set } = writable(initial);

    function rampTo(newValue: number, time = 100) {
        const start = performance.now();
        const from = value;
        target = newValue;

        if (rafId) cancelAnimationFrame(rafId);

        const step = (now: number) => {
            const t = Math.min((now - start) / time, 1);
            value = from + (target - from) * t;
            set(value);

            if (t < 1) {
                rafId = requestAnimationFrame(step);
            } else {
                rafId = null;
            }
        };

        rafId = requestAnimationFrame(step);
    }

    return {
        subscribe,
        rampTo,
        // optional direct access
        get value() { return value; }
    };
}

export const level = createSmoothedStore(0);


// Enable Midi and log available devices
async function enableMidi() {
    await WebMidi.enable()
    WebMidi.inputs.forEach(input => {
        // @ts-ignore
        input.addListener('noteon', 'all', (e) => {
            const vel = e.velocity;

            // Smooth attack (fast)
            level.rampTo(vel, 30);

            // Smooth release (slow)
            setTimeout(() => {
                level.rampTo(0, 120);
            }, 100);
        });
    });
}
enableMidi();

