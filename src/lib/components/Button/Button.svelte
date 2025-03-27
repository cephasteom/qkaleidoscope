<script lang='ts'>
    import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
    // @ts-ignore
    import { FontAwesomeIcon } from 'fontawesome-svelte';

    export let classes: string = '';
    export let text: string = '';
    export let icon: IconDefinition | null = null;
    export let image: string = '';
    export let active: boolean = true;
    export let narrow: boolean = false;
    export let disabled: boolean = false;
    export let colour: string = 'primary';
    export let orientation: string = 'horizontal';
    export let border: boolean = false;
    export let invert: boolean = false;
    export let onClick: () => void;
</script>

<button
    class:active={active}
    class={`btn btn--${colour} 
        ${disabled ? 'btn--disabled' : ''} 
        ${orientation === 'vertical' ? 'btn--vertical' : ''} 
        ${border ? 'btn--border' : ''} 
        ${narrow ? 'btn--narrow' : ''} 
        ${invert ? 'btn--invert' : ''} 
        ${classes}`
    }
    on:click={onClick}
>
    {#if icon}
        <span class="btn__icon">
            <FontAwesomeIcon {icon} />
        </span>
    {/if}
    {#if image}
        <img src={image} alt={text} />
    {/if}
    {#if text}
        <span
            class:has-image={image || icon} 
            class="btn__text">{text}
        </span>
    {/if}
</button>

<style lang="scss">
    .btn {
        text-transform: uppercase;
        color: white;
        width: 100%;
        height: 100%;
        letter-spacing: 0.0625rem;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            background-color: white;
            color: black;
        }

        & img {
            height: 1.5rem;
            margin: 0.4rem 0;
        }

        &__text, &__icon {
            width: 100%;
            text-align: center;
        }

        &--invert {
            flex-direction: row-reverse;
            .btn__icon {
                margin-left: 0.5rem;
            }
            .btn__text {
                margin-left: 0;
            }
        }
    }

    .has-image {
        margin-left: 0.5rem;
    }

    .btn--narrow {
        padding: 0.25rem 1rem;
    }
    .btn--vertical {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;

        & .btn__icon {
            font-size: 1.5rem;
        }

        & .btn__text {
            margin-left: 0;
            max-width: 5rem;
        }

        &.active {
            img {
                filter: invert(70%);
            }
        }
    }

    .btn--disabled {
        background-color: blue;
        opacity: 0.5;
    }
</style>