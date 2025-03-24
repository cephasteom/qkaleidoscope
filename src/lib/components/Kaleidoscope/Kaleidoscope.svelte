<script lang="ts">
  import { onMount } from 'svelte';
  import { objects } from '$lib/stores/kaleidoscope';
  import { generateClipPath, segmentDimensions } from '$lib/utils';
  
  let worker: Worker;
  let canvasRefs: HTMLCanvasElement[] = [];
  const sections = 4;
  const segments = 8; // still doesn't work for values other than 8
  const canvasSize = segmentDimensions(segments, 800);

  onMount(() => {
    worker = new Worker("offscreen-canvas.js");
    
    canvasRefs.forEach((canvas) => {
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage({ canvas: offscreen }, [offscreen]);
    });

    objects.subscribe((data) => {
      worker.postMessage({ data });
    });

    // const renderLoop = () => {
    //   worker.postMessage({ data: get(objects) });
    //   requestAnimationFrame(renderLoop);
    // };
    
    // requestAnimationFrame(renderLoop);
  });
</script>

<div class="kaleidoscopes">
  {#each Array(sections) as _, sectionI}
    <div class="kaleidoscope">
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: hidden;
    border-radius: 50%;
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
    position: absolute;
    transform-origin: top center;
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