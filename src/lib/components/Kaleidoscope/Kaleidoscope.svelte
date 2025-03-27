<script lang="ts">
  import { onMount } from 'svelte';
  import { t, objects, isPlaying, toggleIsPlaying } from '$lib/stores/kaleidoscope';
  import { segmentDimensions } from '$lib/utils';
  
  export let segments: number;
  export let size: number;
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  let canvasSize = segmentDimensions(segments, size);
  let animationFrame: number;

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      if(!canvas || canvas._transferred) return;
      const offscreen = canvas.transferControlToOffscreen();
      canvas._transferred = true;
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });  

    // listen for changes in the store and update the worker
    const cancelObjectSubscribe = objects.subscribe((data) => worker.postMessage({ data }));

    // listen for spacebar to toggle play
    window.addEventListener("keydown", (e) => e.key === "Enter" && toggleIsPlaying());

    // Trigger a change to the store every frame
    const renderLoop = () => {
      $isPlaying && t.update(t => t + 1); // trigger
      animationFrame = requestAnimationFrame(renderLoop);
    };
      
    animationFrame = requestAnimationFrame(renderLoop);

    return () => {
      cancelObjectSubscribe()
      cancelAnimationFrame(animationFrame);
      worker.terminate();
      window.removeEventListener("keydown", (e) => e.key === "Enter" && toggleIsPlaying());
    };
  });
</script>

<div style={`transform: rotate(${180/segments}deg);`}>
  <div 
    class="kaleidoscope"
    style={`
      width: ${canvasSize.height*2.5}px; 
      height: ${canvasSize.height*2.5}px;
    `}
  >
    {#each Array(24) as _, segmentI}
      <canvas 
        bind:this={canvasRefs[segmentI]}
        style={`
          transform: translateY(50%) rotate(${segmentI * (360 / segments)}deg) scaleX(${(segmentI % 2 === 0 ? 1 : -1) * 1.0075});
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