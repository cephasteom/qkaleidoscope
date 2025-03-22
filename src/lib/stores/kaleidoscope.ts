import { writable, derived } from 'svelte/store';
import { noiseWalk } from '$lib/utils';

// TODO: issue with storing callbacks in stores

export const numElements = writable<number>(20);
export const speed = writable<number>(0.0001);

export const walkers = derived(
    [numElements, speed], 
    ([$numElements, $speed]) => (Array.from({ length: $numElements }, (_, i) => ({
        x: noiseWalk($speed), y: noiseWalk($speed),
        r: noiseWalk($speed), g: noiseWalk($speed), b: noiseWalk($speed),
        s: noiseWalk($speed),
        curve: noiseWalk($speed),
        rot: noiseWalk($speed),
        shape: ['poly', 'arc', 'bezier'][i % ['poly', 'arc', 'bezier'].length],
        sides: Math.floor(Math.random() * 7) + 3
    }))
));
