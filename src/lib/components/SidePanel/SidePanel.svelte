<aside>
    <slot></slot>
</aside>

<style lang="scss">
    aside {
        position: absolute;
        top: 0;
        left: 50px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        gap: 1rem;
        overflow: hidden;
        border-left: 0.25px solid rgba(255,255,255,0.25);
        padding: 1rem 0.75rem 0 2rem;
        z-index: 100;
        font-weight: 100;
    }
</style>