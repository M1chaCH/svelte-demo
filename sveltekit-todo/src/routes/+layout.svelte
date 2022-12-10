<script lang="ts">
    import {onMount} from "svelte";
    import {supabase} from "$lib/supabaseClient";
    import {invalidate} from "$app/navigation";

    onMount(() => {
        const { data: { subscription }, } = supabase.auth.onAuthStateChange(() => invalidate("supabase:auth"));

        return () => {
            subscription.unsubscribe();
        }
    });
</script>

<nav>
    <a href="/">Home</a>
    <a href="/todo">TODOs</a>
    <a href="/account">Account</a>
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

        margin: 20px;
    }
</style>