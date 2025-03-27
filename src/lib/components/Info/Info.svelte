<script lang="ts">
    import { 
        showInfo,
    } from "$lib/stores/kaleidoscope";
    import SidePanel from "$lib/components/SidePanel/SidePanel.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        window.addEventListener("keydown", (e) => e.key === "Escape" && showInfo.set(false));
        return () => window.removeEventListener("keydown", (e) => e.key === "Escape" && showInfo.set(false));
    });
</script>

{#if $showInfo}
    <SidePanel>
        <article>
            <h1>Kaleidoscope</h1>
            <p>A generative kaleidoscope that transforms the state vector of a simulated quantum circuit into dynamic shapes and colours on a canvas.</p>
            <p>Each basis state is represented by an element on the canvas, with its probability amplitude determining its position and its phase influencing its colour. As the number of qubits increases, the visual complexity of the canvas grows.</p>
            <p>
                Open the circuit menu to start building your quantum circuit, and use the parameters menu to adjust gate angles and global settings.
            </p>
            <p>
                Built by CephasTeom using Svelte and <a href="https://www.npmjs.com/package/quantum-circuit" target="_blank">quantum-circuit</a>.
            </p>
        </article>
    </SidePanel>
{/if}

<style>
    article {
        color: white;
        max-width: 20rem;
        /* text-align: justify; */
    }

    a {
        color: white;
    }
</style>