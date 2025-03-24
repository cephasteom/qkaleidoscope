<script lang="ts">
    import { numElements, elementMaxSize, elementMaxSides, showControls, toggleControls } from "$lib/stores/kaleidoscope";
    import { onMount } from "svelte";

    onMount(() => {
        window.addEventListener("keydown", (e) => e.key === "Escape" && toggleControls());
        return () => window.removeEventListener("keydown", (e) => e.key === "Escape" && toggleControls());
    });
</script>

<div 
    class="parameters"
    style={`width: ${$showControls ? "auto" : "0"};`}
>
    <div class="parameter">
        <label for="numElements">Elements</label>
        <input class="track" type="range" id="numElements" bind:value={$numElements} min="1" max="100" step="1" />
        <output for="numElements">{$numElements}</output>
    </div>
    <div class="parameter">
        <label for="elementMaxSize">Size</label>
        <input class="track" type="range" id="elementMaxSize" bind:value={$elementMaxSize} min="1" max="100" step="1" />
        <output for="elementMaxSize">{$elementMaxSize}</output>
    </div>
    <div class="parameter">
        <label for="elementMaxSides">Sides</label>
        <input class="track" type="range" id="elementMaxSides" bind:value={$elementMaxSides} min="3" max="12" step="1" />
        <output for="elementMaxSides">{$elementMaxSides}</output>
    </div>
</div>

<style>
    .parameters {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: hidden;
        margin-right: 4rem;
    }

    .parameter {
        display: grid;
        grid-template-columns: 2fr 3fr 0.5fr;
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