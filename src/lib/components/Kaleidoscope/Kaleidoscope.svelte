<script lang="ts">
  import { onMount } from 'svelte';
  import { t, objects, isPlaying, size } from '$lib/stores/kaleidoscope';
  import { segmentDimensions } from '$lib/utils';
  import { circuit } from '$lib/stores/circuit';
  
  export let segments: number;
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  let animationFrame: number;
  $: canvasSize = segmentDimensions(segments, $size);

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      if(!canvas || canvas._transferred) return;
      const offscreen = canvas.transferControlToOffscreen();
      canvas._transferred = true;
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });  

    // listen for changes in the store and update the worker
    const cancelObjectSubscribe = objects.subscribe((data) => worker.postMessage({ data, segments }));

    let i = 0;
    // Trigger a change to the store every frame
    const renderLoop = () => {
      if($isPlaying) {
        t.update(t => t + 1); // trigger
        !(i%6) && circuit.run(); // trigger circuit every 6 frames
        i = (i + 1) % 6;
      }
      animationFrame = requestAnimationFrame(renderLoop);
    };
      
    animationFrame = requestAnimationFrame(renderLoop);

    return () => {
      cancelObjectSubscribe()
      cancelAnimationFrame(animationFrame);
      worker.terminate();
    };
  });
</script>

<div 
  style={`transform: rotate(${180/segments}deg);`}
  class="container"
>
  <div 
    class="kaleidoscope"
    style={`
      width: ${canvasSize.height*2}px; 
      height: ${canvasSize.height*2}px;
    `}
  >
    {#each Array(12) as _, segmentI}
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
  
<style lang="scss">
  .kaleidoscope {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
  }

  canvas {
    position: absolute;
    transform-origin: top center;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
    -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%);
  }
</style>