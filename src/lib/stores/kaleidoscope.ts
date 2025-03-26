import { numberToRGBA } from '$lib/utils';
import { writable, derived } from 'svelte/store';

export const numElements = writable<number>(10);
export const elementMaxSize = writable<number>(100);
export const elementMaxSides = writable<number>(10);
export const elementShapes = writable<string[]>(['poly', 'arc', 'bezier']);
export const speed = writable<number>(0.0001);
export const canvasSize = writable<number>(363);
export const showControls = writable<boolean>(true);

numElements.subscribe((v) => console.log('numElements', v));

export const toggleControls = () => showControls.update((v) => !v);

export const objects = derived(
    [numElements, elementMaxSize, elementMaxSides, elementShapes, canvasSize], 
    ([$numElements, $elementMaxSize, $elementMaxSides, $elementShapes, $canvasSize]) => (Array.from({ length: $numElements }, (_, i) => ({
        x: Math.random() * $canvasSize, y: Math.random() * $canvasSize,
        color: numberToRGBA(Math.random(), 0.01),
        size: (Math.random()/2 + 0.5) * $elementMaxSize,
        curve: Math.random(),
        rot: Math.random() * Math.PI * 2,
        shape: $elementShapes[i % $elementShapes.length],
        sides: Math.floor(Math.random() * $elementMaxSides) + 3
    }))
));
