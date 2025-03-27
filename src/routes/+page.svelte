<script lang="ts">
    import Kaleidoscope from "$lib/components/Kaleidoscope/Kaleidoscope.svelte";
    import Parameters from "$lib/components/Parameters/Parameters.svelte";
    import Sidebar from "$lib/components/Sidebar/Sidebar.svelte";
    import "./styles.css";
    import { segments, toggleIsPlaying } from "$lib/stores/kaleidoscope";
    import { onMount } from "svelte";

    onMount(() => {
        // listen for spacebar to toggle play
        window.addEventListener("keydown", (e) => e.key === "Enter" && toggleIsPlaying());
    });
</script>

<main>
    <Sidebar />
    <Parameters />
    {#key $segments}
        <Kaleidoscope 
            segments={$segments}
            size={800}
        />
    {/key}
</main>

<style>
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: black;
        margin: 0;
        overflow: hidden;
        position: relative;
    }

    :global(main) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        overflow: hidden;
        width: 100vw;
        padding: 1rem;
    }
</style>
