<script lang="ts">
  import { onMount } from 'svelte';
  import { t, objects, isPlaying, toggleIsPlaying } from '$lib/stores/kaleidoscope';
  import { generateClipPath, segmentDimensions } from '$lib/utils';
  
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  const sections = 1;
  const segments = 8; // still doesn't work for values other than 8
  const canvasSize = segmentDimensions(segments, 800);

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });

    // listen for changes in the store and update the worker
    objects.subscribe((data) => worker.postMessage({ data }));

    // listen for spacebar to toggle play
    window.addEventListener("keydown", (e) => e.key === " " && toggleIsPlaying());

    // Trigger a change to the store every frame
    const renderLoop = () => {
      $isPlaying && t.update(t => t + 1); // trigger
      requestAnimationFrame(renderLoop);
    };
      
    requestAnimationFrame(renderLoop);

    return () => {
      worker.terminate();
      window.removeEventListener("keydown", (e) => e.key === " " && toggleIsPlaying());
    };
  });
</script>

<div class="kaleidoscopes">
  {#each Array(sections) as _, sectionI}
    <div 
      class="kaleidoscope"
      style={`width: ${canvasSize.width*2}px; height: ${canvasSize.height*2}px;`}
    >
      {#each Array(segments) as _, segmentI}
        <canvas 
          bind:this={canvasRefs[sectionI * segments + segmentI]}
          style={`
            transform: translateY(50%) rotate(${segmentI * (45)}deg) scaleX(${segmentI % 2 === 0 ? 1 : -1});
            clip-path: ${generateClipPath(segments)};
          `}
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
    /* display: grid; */
    /* grid-template-columns: repeat(2, 1fr); */
    /* overflow: hidden; */
    /* border-radius: 50%; */
  }

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
  }
</style>