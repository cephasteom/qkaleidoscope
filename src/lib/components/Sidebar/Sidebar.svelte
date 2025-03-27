<script lang="ts">
    import Button from "$lib/components/Button/Button.svelte";
    import { isPlaying, showControls, toggleControls, toggleIsPlaying, toggleInfo, showInfo, showCircuit, toggleCircuit } from "$lib/stores/kaleidoscope";
    import { faDiagramProject, faSliders, faPlay, faInfo } from '@fortawesome/free-solid-svg-icons';
</script>

<aside>
    <ul>
        <li>
            <Button 
                onClick={toggleInfo}
                icon={faInfo}
                active={$showInfo}
            />
        </li>
        <li>
            <Button 
                onClick={toggleCircuit}
                icon={faDiagramProject}
                active={$showCircuit}
            />
        </li>        
        <li>
            <Button 
            active={$showControls}
            onClick={toggleControls}
            icon={faSliders}
            />
        </li>
        <li>
            <Button 
                onClick={toggleIsPlaying}
                icon={faPlay}
                active={$isPlaying}
            />
        </li>
    </ul>
</aside>

<style>
    aside {
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 100;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        height: 50px;
        border: 0.25px solid rgba(255,255,255,0.25);
        border-bottom: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    li:last-of-type {
        border-bottom: 0.25px solid rgba(255,255,255,0.25);
    }
</style>
