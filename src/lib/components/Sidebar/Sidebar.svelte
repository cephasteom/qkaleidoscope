<script lang="ts">
    import Button from "$lib/components/Button/Button.svelte";
    import { isPlaying, showControls, toggleControls, toggleIsPlaying, toggleInfo, showInfo, showCircuit, toggleCircuit } from "$lib/stores/kaleidoscope";
    import { faDiagramProject, faSliders, faPlay, faInfo } from '@fortawesome/free-solid-svg-icons';
    import { onMount } from "svelte";

    let showSidebarInFullscreen: boolean = false;
    function showSidebar(e: MouseEvent | TouchEvent) {
        // @ts-ignore
        showSidebarInFullscreen = e.clientX < 50 || $showInfo || $showCircuit || $showControls;
    }
    
    onMount(() => {
        // on mousemove, set showSidebarInFullscreen to true
        window.addEventListener('mousemove', showSidebar);
        // on touchstart, set showSidebarInFullscreen to true
        window.addEventListener('touchstart', showSidebar);
        // clean up
        return () => {
            window.removeEventListener('mousemove', showSidebar);
            window.removeEventListener('touchstart', showSidebar);
        }
        
    })
</script>

<aside 
    class:show={showSidebarInFullscreen} 
>
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
        transition: transform 0.5s ease-in-out;

        @media all and (display-mode: fullscreen) {
            transform: translateX(-100%);
        }

        &.show {
            transform: translateX(0);
        }
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
