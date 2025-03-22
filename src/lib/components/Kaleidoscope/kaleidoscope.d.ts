declare module 'perlin.js' {
  const Perlin: {
    seed: (seed: number) => void;
    simplex2: (x: number, y: number) => number;
  };
  export default Perlin;
}