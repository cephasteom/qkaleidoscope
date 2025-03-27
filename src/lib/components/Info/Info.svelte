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
            <h1>Quantum Kaleidoscope</h1>
            <p>
                A simple project for visualising the output of a quantum circuit.
            </p>
            <!-- <p>
                TODO: Mappings... 
            </p> -->
            <p>
                Built by Cephas Teom / Pete Thomas using Svelte and <a href="https://www.npmjs.com/package/quantum-circuit" target="_blank">quantum-circuit</a>.
            </p>
        </article>
    </SidePanel>
{/if}

<style>
    article {
        color: white;
        max-width: 15rem;
    }

    a {
        color: white;
    }
</style>