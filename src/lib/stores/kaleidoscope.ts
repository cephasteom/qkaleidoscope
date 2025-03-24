import { writable, derived } from 'svelte/store';

export const numElements = writable<number>(10);
export const elementMaxSize = writable<number>(100);
export const elementMaxSides = writable<number>(10);
export const elementShapes = writable<string[]>(['poly', 'arc', 'bezier']);
export const speed = writable<number>(0.0001);

export const objects = derived(
    [numElements, elementMaxSize, elementMaxSides, elementShapes], 
    ([$numElements, $elementMaxSize, $elementMaxSides, $elementShapes]) => (Array.from({ length: $numElements }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        r: Math.random(), g: Math.random(), b: Math.random(),
        s: (Math.random()/2 + 0.5) * $elementMaxSize,
        curve: Math.random(),
        rot: Math.random(),
        shape: $elementShapes[i % $elementShapes.length],
        sides: Math.floor(Math.random() * $elementMaxSides) + 3
    }))
));
