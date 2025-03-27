<script lang="ts">
    import { draggable } from '@neodrag/svelte';
    
    let {id, symbol, disabled = false, dragend, mouseover, mouseout} = $props();
    let isDragging: boolean = $state(false);

    let thisGate: HTMLButtonElement;
    let position = $state({x: 0, y: 0});

    function handleDragEnd(e: CustomEvent) {
        const target = e.target as HTMLElement;
        const bounds = target.getBoundingClientRect() as DOMRect;
        const x = bounds.x + window.scrollX;
        const y = bounds.y + window.scrollY;
        dragend({id, x, y});
        position = {x: -4, y: 0}
        isDragging = false;
    }

    function handleDrag(e: CustomEvent) {
        const x = e.detail.offsetX;
        const y = e.detail.offsetY;
        position = {x, y};
    }
    
    function handleDragStart() {
        isDragging = true;
    }

</script>

<button 
    bind:this={thisGate}
    on:focus={() => mouseover(id)}
    on:mouseover={() => mouseover(id)}
    on:blur={() => mouseout(id)}
    on:mouseout={() => mouseout(id)}
    class="gate"
    disabled={disabled}
>
    {#if !disabled}
        <span
            use:draggable={{bounds: 'body', position: position}}
            on:neodrag:end={handleDragEnd}
            on:neodrag:start={handleDragStart}
            on:neodrag={handleDrag}
            class:grab={isDragging}
        >
            {symbol}
        </span>
    {/if}
    {symbol}
</button>

<style lang="scss">
    .gate {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: transparent;
        color: white;
        margin-bottom: 0.5rem;
        padding: 1.25rem 0;
        border-radius: 5px;
        border: 1px solid white;
        width: calc(100%/2 - 0.25rem);

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        span {
            cursor: grab;
            display: inline-block;
            padding: 1rem;
            background-color: transparent;
            text-align: center;
            position: absolute;
            opacity: 0;
            margin: auto;
            border-radius: 5px;
            &.grab {
                cursor: grabbing;
                z-index: 20;
                border: white 1px solid;
                background-color: black;
                border-radius: 0;
                width: 40px;
                height: 40px;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 1;
            }
        }

        @media (min-width: 1200px){
            width: calc(100%/3 - (1rem/3));
        }
    }

</style>