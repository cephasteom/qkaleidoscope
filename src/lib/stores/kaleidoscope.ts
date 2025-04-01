import { numberToRGBA, noiseWalk } from '$lib/utils';
import { writable, derived } from 'svelte/store';
import { probabilities, phases } from './circuit';

const walkers = Array.from({ length: 700 }, (_, i) => noiseWalk());

export const t = writable<number>(0);
export const segments = writable<number>(12);
export const elementMaxSize = writable<number>(175);
export const elementShapes = writable<string[]>(['arc', 'poly', 'arc', 'bezier']);
export const strokeOpacity = writable<number>(0);
export const fillOpacity = writable<number>(0.1);
export const speed = writable<number>(0.3);
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
        return Array.from({ length: $probabilities.length }, (_, i) => ({
            x: 0.25 * ($size) + walkers[(i * 5) + 0]($speed), 
            y: $probabilities[i] * ($size) + walkers[(i * 5) + 1]($speed) / 2 + 0.5,
            fill: numberToRGBA($phases[i], $fillOpacity),
            stroke: numberToRGBA($phases[i], $strokeOpacity),
            size: (walkers[(i * 5) + 2]($speed)/2 + 0.5) * $elementMaxSize,
            curve: 1,
            rot: walkers[(i * 5) + 4]($speed) * Math.PI * 2,
            shape: $elementShapes[i % $elementShapes.length],
            sides: Math.floor(walkers[(i * 5) + 5]($speed) * 4) + 1,
        }))
    }
);