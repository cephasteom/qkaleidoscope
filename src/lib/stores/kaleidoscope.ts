import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived } from 'svelte/store';

const walkers = Array.from({ length: 200 }, (_, i) => noiseWalk());

export const t = writable<number>(0);
export const segments = writable<number>(6);
export const numElements = writable<number>(10);
export const elementMaxSize = writable<number>(50);
export const elementMaxSides = writable<number>(5);
export const elementShapes = writable<string[]>(['poly', 'arc', 'bezier']);
export const speed = writable<number>(0.1);
export const canvasSize = writable<number>(363);
export const showControls = writable<boolean>(true);
export const isPlaying = writable<boolean>(false);

export const toggleIsPlaying = () => isPlaying.update((v) => !v);
export const toggleControls = () => showControls.update((v) => !v);

export const objects = derived(
    [numElements, elementMaxSize, elementMaxSides, elementShapes, canvasSize, speed, t], 
    ([$numElements, $elementMaxSize, $elementMaxSides, $elementShapes, $canvasSize, $speed]) => {
        return Array.from({ length: $numElements }, (_, i) => ({
            x: walkers[(i * 7) + 0]($speed) * $canvasSize, y: walkers[(i * 7) + 1]($speed) * $canvasSize,
            color: numberToRGBA(walkers[(i * 7) + 2]($speed), walkers[(i * 7) + 3]($speed) * 0.5),
            size: (walkers[(i * 7) + 4]($speed)/2 + 0.5) * $elementMaxSize,
            curve: walkers[(i * 7) + 5]($speed),
            rot: walkers[(i * 7) + 6]($speed) * Math.PI * 2,
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor(walkers[(i * 7) + 7]($speed) * $elementMaxSides) + 1
        }))
    }
);