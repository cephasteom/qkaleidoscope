import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived, get } from 'svelte/store';
import { probabilities, phases } from './circuit';
import { level } from './midi';

const walkers = Array.from({ length: 550 }, (_, i) => noiseWalk());

export const t = writable<number>(0);
export const segments = writable<number>(6);
export const elementMaxSize = writable<number>(250);
export const elementShapes = writable<string[]>(['arc', 'poly', 'bezier']);
export const strokeOpacity = writable<number>(0.3);
export const fillOpacity = writable<number>(0);
export const speed = writable<number>(0.1);
export const size = writable<number>(2000);
export const audioInput = writable<number>(0);
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
    [elementMaxSize, elementShapes, size, speed, strokeOpacity, fillOpacity, probabilities, phases, audioInput, t], 
    ([$elementMaxSize, $elementShapes, $size, $speed, $strokeOpacity, $fillOpacity, $probabilities, $phases, $audioInput]) => {
        return Array.from({ length: $probabilities.length }, (_, i) => ({
            x: 0.25 
                * $size
                + walkers[(i * 7) + 0]($speed)
                + ((get(level) + 1) * $audioInput), 
            y: ($probabilities[i] 
                * $size
                + walkers[(i * 7) + 1]($speed) / 2 + 0.5)
                + ((get(level) + 1) * $audioInput), 
            fill: numberToRGBA($phases[i], $fillOpacity + (walkers[(i * 7) + 2]($speed) * 0.001)),
            stroke: numberToRGBA($phases[i], ($strokeOpacity + walkers[(i * 7) + 3]($speed) * 0.1)),
            size: (walkers[(i * 7) + 4]($speed)/2 + 0.5) * $elementMaxSize,
            curve: 1,
            rot: (walkers[(i * 7) + 5]($speed) * Math.PI * 2) * (get(level) * $audioInput* 0.75 + 0.25),
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor(walkers[(i * 7) + 5]($speed) * 4) + 1,
        }))
    }
);