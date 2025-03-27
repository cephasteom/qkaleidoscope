<script lang="ts">
    import Kaleidoscope from "$lib/components/Kaleidoscope/Kaleidoscope.svelte";
    import Parameters from "$lib/components/Parameters/Parameters.svelte";
    import "./styles.css";
    import { segments } from "$lib/stores/kaleidoscope";
</script>

<main>
    <Parameters />
    {#key $segments}
    <Kaleidoscope segments={$segments}/>
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
    }

    :global(main) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        overflow: hidden;
        max-width: 100vw;
        padding: 1rem;
    }
</style>
