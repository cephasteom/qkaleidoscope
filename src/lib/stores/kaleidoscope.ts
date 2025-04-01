import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived } from 'svelte/store';
import { probabilities, phases } from './circuit';

const walkers = Array.from({ length: 384 }, (_, i) => noiseWalk());

export const t = writable<number>(0);
export const segments = writable<number>(12);
export const elementMaxSize = writable<number>(150);
export const elementShapes = writable<string[]>(['poly', 'arc', 'bezier']);
export const strokeOpacity = writable<number>(1);
export const fillOpacity = writable<number>(0.01);
export const speed = writable<number>(0.5);
export const size = writable<number>(700);
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
    [elementMaxSize, elementShapes, size, speed, strokeOpacity, fillOpacity, probabilities, phases, t], 
    ([$elementMaxSize, $elementShapes, $size, $speed, $strokeOpacity, $fillOpacity, $probabilities, $phases]) => {
        return Array.from({ length: $probabilities.length / 2 }, (_, i) => ({
            x: $probabilities[(i * 2)] * ($size) + walkers[(i * 7) + 0]($speed) * 2, 
            y: $probabilities[((i * 2) + 1)] * ($size) + walkers[(i * 7) + 1]($speed) / 2 + 0.5,
            fill: numberToRGBA($phases[(i * 2)], $fillOpacity),
            stroke: numberToRGBA($phases[(i * 2) + 1], $strokeOpacity),
            size: (walkers[(i * 7) + 2]($speed)/2 + 0.5) * $elementMaxSize,
            curve: 1,
            rot: walkers[(i * 7) + 4]($speed) * Math.PI,
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor(walkers[(i * 7) + 5]($speed) * 10) + 3,
        }))
    }
);