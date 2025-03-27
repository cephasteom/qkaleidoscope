<script lang="ts">
  import { onMount } from 'svelte';
  import { t, objects, isPlaying, toggleIsPlaying, segments } from '$lib/stores/kaleidoscope';
  import { segmentDimensions } from '$lib/utils';
  
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  let canvasSize = segmentDimensions($segments, 600);

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });

    // listen for changes in the store and update the worker
    objects.subscribe((data) => worker.postMessage({ data }));

    // listen for spacebar to toggle play
    window.addEventListener("keydown", (e) => e.key === "Enter" && toggleIsPlaying());

    // Trigger a change to the store every frame
    const renderLoop = () => {
      $isPlaying && t.update(t => t + 1); // trigger
      requestAnimationFrame(renderLoop);
    };
      
    requestAnimationFrame(renderLoop);

    return () => {
      worker.terminate();
      window.removeEventListener("keydown", (e) => e.key === "Enter" && toggleIsPlaying());
    };
  });
</script>

<div style={`transform: rotate(${180/$segments}deg);`}>
  <div 
    class="kaleidoscope"
    style={`
      width: ${canvasSize.height*2.5}px; 
      height: ${canvasSize.height*2.5}px;
    `}
  >
    {#each Array($segments) as _, segmentI}
      <canvas 
        bind:this={canvasRefs[segmentI]}
        style={`
          transform: translateY(50%) rotate(${segmentI * (360 / $segments)}deg) scaleX(${(segmentI % 2 === 0 ? 1 : -1) * 1.0075});
        `}
        class="canvas" 
        width={canvasSize.width} 
        height={canvasSize.height}>
      </canvas>
    {/each}
  </div>
</div>
  
<style>
  .kaleidoscope {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  canvas {
    position: absolute;
    transform-origin: top center;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
    -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
  }
</style>