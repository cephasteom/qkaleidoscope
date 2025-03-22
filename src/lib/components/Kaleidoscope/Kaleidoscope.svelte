<script lang="ts">
    import Perlin from 'perlin.js';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    // import { walkers } from '$lib/stores/kaleidoscope';
  
    let canvasSize = 363;
    let nElements = 10; // max 100
    let speed = 0.5; // 0 - 1
    let elementSize = 50;
  
    let worker: Worker;
    let canvases;
  
    Perlin.seed(Math.random());
  
    const shapes = ['poly', 'arc', 'bezier'];
    
    function noiseWalk(seedX = Math.random(), seedY = Math.random()) {
      let x = seedX, y = seedY;
      return () => {
        x += (0.003 * speed);
        y += (0.002 * speed);
        return (Perlin.simplex2(x, y) + 1) / 2;
      };
    }
  
    const walkers = Array.from({ length: nElements }, (_, i) => ({
      x: noiseWalk(), y: noiseWalk(),
      r: noiseWalk(), g: noiseWalk(), b: noiseWalk(),
      s: noiseWalk(),
      curve: noiseWalk(),
      rot: noiseWalk(),
      shape: shapes[i % shapes.length],
      sides: Math.floor(Math.random() * 7) + 3
    }));
  
    function generateData() {
      // console.log('hello')
      return walkers.map(walker => ({
        x: walker.x() * canvasSize,
        y: walker.y() * canvasSize,
        color: `rgba(${walker.r() * 255}, ${walker.g() * 255}, ${walker.b() * 255}, 0.25)`,
        size: walker.s() * elementSize,
        rot: walker.rot() * Math.PI,
        curve: walker.curve(),
        shape: walker.shape,
        sides: walker.sides
      }));
    }
  
    function start() {
      const renderLoop = () => {
        worker.postMessage({ data: generateData() });
        requestAnimationFrame(renderLoop);
      };
      requestAnimationFrame(renderLoop);
    }
  
    onMount(() => {
      worker = new Worker("offscreen-canvas.js");
      canvases = document.querySelectorAll("canvas");
      
      canvases.forEach((canvas) => {
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ canvas: offscreen }, [offscreen]);
      });
      
      start();
    });
  </script>
  
  <div class="kaleidoscopes">
    <div class="kaleidoscope">
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
    </div>
    <div class="kaleidoscope">
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
    </div>
    <div class="kaleidoscope">
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
    </div>
    <div class="kaleidoscope">
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
      <canvas class="canvas" width="300" height="363"></canvas>
    </div>
  </div>
  
  <style>
    .kaleidoscopes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      overflow: hidden;
      @media (min-width: 768px) {
        /* animation: rotate 60s linear infinite;  */
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .kaleidoscope {
      position: relative;
      width: 363px;
      height: 363px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    canvas {
      -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
      position: absolute;
      transform-origin: top center;
    }

    .canvas:nth-child(1) {
      transform: translateY(50%);
    }
    .canvas:nth-child(2) {
      transform: translateY(50%) rotate(45deg) scaleX(-1);
    }
    .canvas:nth-child(3) {
      transform: translateY(50%) rotate(90deg);
    }
    .canvas:nth-child(4) {
      transform: translateY(50%) rotate(135deg) scaleX(-1);
    }
    .canvas:nth-child(5) {
      transform: translateY(50%) rotate(180deg);
    }
    .canvas:nth-child(6) {
      transform: translateY(50%) rotate(225deg) scaleX(-1);
    }
    .canvas:nth-child(7) {
      transform: translateY(50%) rotate(270deg);
    }
    .canvas:nth-child(8) {
      transform: translateY(50%) rotate(315deg) scaleX(-1);
    }

    .kaleidoscope:nth-child(2) {
      transform: scaleX(-1);
      opacity: 1;
    }

    .kaleidoscope:nth-child(3) {
      transform: scaleY(-1);
      opacity: 1;
    }
  </style>