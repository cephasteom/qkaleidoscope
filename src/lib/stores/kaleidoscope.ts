import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived, get } from 'svelte/store';
import { probabilities, phases } from './circuit';
import { level } from './midi';

// TODO: generate as they're needed rather than all at once
const walkers = Array.from({ length: 1000 }, (_, i) => noiseWalk());

const paginateWalkers = () => {
    let i = 0;
    return () => {
        i = (i + 1) % walkers.length;
        return walkers[i];
    }
}

const nextWalker = paginateWalkers();

export const t = writable<number>(0);
export const segments = writable<number>(6);
export const elementMaxSize = writable<number>(300);
export const elementShapes = writable<string[]>(['arc', 'poly', 'bezier']);
export const strokeOpacity = writable<number>(0.01);
export const fillOpacity = writable<number>(0.01);
export const speed = writable<number>(0.1);
export const size = writable<number>(2000);
export const midiInput = writable<number>(0);
export const isPlaying = writable<boolean>(true);
export const showControls = writable<boolean>(false);
export const showInfo = writable<boolean>(false);
export const showCircuit = writable<boolean>(false);

export const controlsAreActive = derived(
    [showControls, showInfo, showCircuit],
    ([$showControls, $showInfo, $showCircuit]) => $showControls || $showInfo || $showCircuit
);

export const closeAllControls = () => {
    showControls.set(false);
    showInfo.set(false);
    showCircuit.set(false);
};

export const toggleIsPlaying = () => isPlaying.update((v) => !v);

export const toggleControls = () => {
    showInfo.set(false);
    showCircuit.set(false);
    showControls.update(v => !v)
};

export const toggleInfo = () => {
    showControls.set(false);
    showCircuit.set(false);
    showInfo.update(v => !v)
};

export const toggleCircuit = () => {
    showControls.set(false);
    showInfo.set(false);
    showCircuit.update(v => !v)
};

export const objects = derived(
    [elementMaxSize, elementShapes, size, speed, strokeOpacity, fillOpacity, probabilities, phases, midiInput, t], 
    ([$elementMaxSize, $elementShapes, $size, $speed, $strokeOpacity, $fillOpacity, $probabilities, $phases, $midiInput]) => {
        return Array.from({ length: $probabilities.length }, (_, i) => ({
            x: 0.25 
                * $size
                + walkers[(i * 10) + 0]($speed)
                + ((get(level) + 1) * $midiInput), 
            y: ($probabilities[i] 
                * $size
                + walkers[(i * 10) + 1]($speed) / 2 + 0.5)
                + ((get(level) + 1) * $midiInput), 
            fill: numberToRGBA($phases[i], $fillOpacity + (walkers[(i * 10) + 2]($speed) * ($phases[i] * 0.001))),
            stroke: numberToRGBA($phases[i], ($strokeOpacity + walkers[(i * 10) + 3]($speed) * $probabilities[i])),
            size: (walkers[(i * 10) + 4]($speed)/2 + 0.5) * $elementMaxSize,
            curve: 1,
            rot: (walkers[(i * 10) + 5]($speed) * Math.PI * 2) * (get(level) * $midiInput * $probabilities[i] + 0.25),
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor((walkers[(i * 10) + 6]($speed) * 4) * $probabilities[i]) + 1,
            sf: {
                m: Math.floor($phases[i] * 8) + 2,
                n1: walkers[(i * 10) + 7]($speed / 2) * 2,
                n2: walkers[(i * 10) + 8]($speed / 2) * 2,
                n3: walkers[(i * 10) + 9]($speed / 2) * 2
            },
        }))
    }
);