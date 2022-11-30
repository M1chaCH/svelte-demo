<nav>
    <a href="/">Home</a>
    <a href="/todo">TODOs</a>
</nav>
<div class="center">
    <slot></slot>
</div>

<style>
    nav {
        width: 100%;
        height: 80px;

        background-color: aqua;

        display: flex;
        flex-flow: row nowrap;
        gap: 20px;
        justify-content: center;
        align-items: center;
    }

    .center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>