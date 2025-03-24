import Perlin from 'perlin.js';

Perlin.seed(Math.random());

export function noiseWalk(speed: number) {
    let x = Math.random(), y = Math.random();
    return () => {
        x += (0.003 * speed);
        y += (0.002 * speed);
        return (Perlin.simplex2(x, y) + 1) / 2;
    };
}