<script lang="ts">
    import Kaleidoscope from "$lib/components/Kaleidoscope/Kaleidoscope.svelte";
</script>

<main>
    <Kaleidoscope />
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
        flex-direction: column;
        overflow: hidden;
        max-width: 100vw;
        @media (min-width: 768px) {
            /* border-radius: 50%; */

        }
    }
</style>
