<script lang="ts">
    import { onMount } from 'svelte';
    import { objects } from '$lib/stores/kaleidoscope';
    import { get } from 'svelte/store';
  
    let canvasSize = 363;
  
    let worker: Worker;
    let canvases;
  
  
    function generateData() {
      return get(objects).map(obj => ({
        x: obj.x * canvasSize,
        y: obj.y * canvasSize,
        color: `rgb(${obj.r * 255}, ${obj.g * 255}, ${obj.b * 255})`,
        size: obj.s,
        rot: obj.rot * Math.PI,
        curve: obj.curve,
        shape: obj.shape,
        sides: obj.sides
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

      worker.postMessage({ data: generateData() });
      
      // start();
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