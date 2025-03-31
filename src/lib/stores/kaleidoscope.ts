import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived } from 'svelte/store';
import { probabilities } from './circuit';

const walkers = Array.from({ length: 200 }, (_, i) => noiseWalk());

export const t = writable<number>(0);
export const segments = writable<number>(6);
export const numElements = writable<number>(10);
export const elementMaxSize = writable<number>(60);
export const elementMaxSides = writable<number>(7);
export const elementShapes = writable<string[]>(['poly', 'arc', 'bezier']);
export const strokeOpacity = writable<number>(0);
export const fillOpacity = writable<number>(1);
export const speed = writable<number>(0.25);
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
    [numElements, elementMaxSize, elementMaxSides, elementShapes, size, speed, strokeOpacity, fillOpacity, probabilities, t], 
    ([$numElements, $elementMaxSize, $elementMaxSides, $elementShapes, $size, $speed, $strokeOpacity, $fillOpacity, $probabilities]) => {
        return Array.from({ length: $numElements }, (_, i) => ({
            // x: walkers[(i * 7) + 0]($speed) * ($size / 2), y: walkers[(i * 7) + 1]($speed) * ($size / 2),
            x: $probabilities[i * 2] * ($size / 2), y: $probabilities[(i * 2) + 1] * ($size / 2),
            // fill: numberToRGBA(walkers[(i * 7) + 2]($speed), walkers[(i * 7) + 3]($speed) * 0.5 * $fillOpacity),
            // stroke: numberToRGBA(walkers[(i * 7) + 4]($speed), walkers[(i * 7) + 5]($speed) * 0.5 * $strokeOpacity),
            fill: numberToRGBA(0),
            stroke: numberToRGBA(1),
            // size: (walkers[(i * 7) + 4]($speed)/2 + 0.5) * $elementMaxSize,
            size: $elementMaxSize,
            // curve: walkers[(i * 7) + 5]($speed),
            curve: 0.5,
            // rot: walkers[(i * 7) + 6]($speed) * Math.PI * 2,
            rot: 0,
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor(walkers[(i * 7) + 7]($speed) * $elementMaxSides) + 1
        }))
    }
);