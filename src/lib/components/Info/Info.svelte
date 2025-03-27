<script lang="ts">
    import { 
        showInfo,
    } from "$lib/stores/kaleidoscope";
    import SidePanel from "$lib/components/SidePanel/SidePanel.svelte";
</script>

{#if $showInfo}
    <SidePanel>
        <article>
            <h2>Kaleidoscope</h2>
            <p>A generative kaleidoscope that transforms the state vector of a simulated quantum circuit into dynamic shapes and colours on a canvas.</p>
            <p>Each basis state is represented by an element on the canvas, with its probability amplitude determining its position and its phase influencing its colour. As the number of qubits increases, the visual complexity of the canvas grows.</p>
            <p>
                Open the circuit menu to start building your quantum circuit, and use the parameters menu to adjust gate angles and global settings.
            </p>
            <p>
                Built by CephasTeom using <a href="https://svelte.dev/" target="_blank">Svelte</a> and <a href="https://www.npmjs.com/package/quantum-circuit" target="_blank">quantum-circuit</a>.
            </p>
        </article>
    </SidePanel>
{/if}

<style>
    article {
        color: white;
        max-width: 20rem;
    }

    a {
        color: white;
    }
</style>