<script lang="ts">
  import { onMount } from 'svelte';
  import { objects } from '$lib/stores/kaleidoscope';
  import { get } from 'svelte/store';
  
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  const sections = 4;
  const segments = 8; // to do, calculate canvas size based on sections and segments
  const canvasSize = { width: 300, height: 363 };

  function start() {
    const renderLoop = () => {
    worker.postMessage({ data: get(objects) });
      requestAnimationFrame(renderLoop);
    };  
    requestAnimationFrame(renderLoop);
  }

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });
    
    worker.postMessage({ data: get(objects) });
    
    // start();
  });
</script>

<div class="kaleidoscopes">
  {#each Array(sections) as _, sectionI}
    <div class="kaleidoscope">
      {#each Array(segments) as _, segmentI}
        <canvas bind:this={canvasRefs[sectionI * segments + segmentI]} 
          class="canvas" 
          width={canvasSize.width} 
          height={canvasSize.height}>
        </canvas>
      {/each}
    </div>
  {/each}
</div>
  
<style>
  .kaleidoscopes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: hidden;
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