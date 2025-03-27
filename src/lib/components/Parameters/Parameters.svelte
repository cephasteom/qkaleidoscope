<script lang="ts">
    import { 
        numElements, 
        elementMaxSize, 
        elementMaxSides, 
        speed, 
        showControls, 
        toggleControls,
        segments
    } from "$lib/stores/kaleidoscope";
    import SidePanel from "$lib/components/SidePanel/SidePanel.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        window.addEventListener("keydown", (e) => e.key === "Escape" && toggleControls());
        return () => window.removeEventListener("keydown", (e) => e.key === "Escape" && toggleControls());
    });
</script>

{#if $showControls}
    <SidePanel>

        <div class="parameter">
            <label for="segments">Segments</label>
            <input class="track" type="range" id="segments" bind:value={$segments} min="4" max="36" step="2" />
            <output for="segments">{$segments}</output>
        </div>
        <div class="parameter">
            <label for="numElements">Elements</label>
            <input class="track" type="range" id="numElements" bind:value={$numElements} min="1" max="25" step="1" />
            <output for="numElements">{$numElements}</output>
        </div>
        <div class="parameter">
            <label for="elementMaxSize">Size</label>
            <input class="track" type="range" id="elementMaxSize" bind:value={$elementMaxSize} min="1" max="100" step="1" />
            <output for="elementMaxSize">{$elementMaxSize}</output>
        </div>
        <div class="parameter">
            <label for="elementMaxSides">Shapes</label>
            <input class="track" type="range" id="elementMaxSides" bind:value={$elementMaxSides} min="3" max="12" step="1" />
            <output for="elementMaxSides">{$elementMaxSides}</output>
        </div>
        <div class="parameter">
            <label for="elementMaxSides">Speed</label>
            <input class="track" type="range" id="speed" bind:value={$speed} min="0.01" max="1" step="0.01"/>
            <output for="speed">{$speed}</output>
        </div>
    </SidePanel>

{/if}

<style>
    .parameter {
        display: grid;
        grid-template-columns: 2fr 3fr 1fr;
        gap: 1rem;
    }

    label, output {
        color: white;
    }

    input[type=range] {
        width: 100%;
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        background: transparent;  /* Otherwise white in Chrome */
        outline: none; 
        margin: 0;
        height: 2px;
    }

    input[type=range].track {
        background: white;
        transform: translateY(0.7rem);
    }

    input[type=range]::-moz-range-progress {
        background-color: transparent;
    }
    
    /* Annoyingly, lots of repeated css, but doesn't work otherwise */
    .min::-webkit-slider-thumb, .max::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 8px;
        height: 16px;
        background: linear-gradient(to left, #000, #000 35%, grey 35%, grey 65%, #000 65%);
        border-radius: 0;
        cursor: pointer;
        position: relative;
        z-index: 10;
    }

    .min::-webkit-slider-thumb {
        top: 2px;
    }

    .max::-webkit-slider-thumb {
        top: -2px;
    }

    .min::-moz-range-thumb, .max::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 8px;
        height: 16px;
        background: linear-gradient(to left, grey, grey 33%, grey 34%, grey 66%, var(--color-grey-dark) 66%);
        border-radius: 0;
        position: absolute;
    }

    .min::-moz-range-thumb {
        transform: translateY(2px);
    }

    .max::-moz-range-thumb {
        transform: translateY(-2px);
    }

    .track::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 2px;
        height: 16px;
        border-radius: 0;
        background: white;
        cursor: pointer;
        z-index: -10;
    }

    .track::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 2px;
        height: 16px;
        background: white;
        cursor: pointer;
        z-index: -10;
    }
</style>