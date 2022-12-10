<script lang="ts">

    import {supabase} from "$lib/supabaseClient";

    let loading = false;
    let email: string;

    async function handleLogin() {
        try {
            loading = true;
            const { error } = await supabase.auth.signInWithOtp({ email });
            if(error)
                alert(error.message)

            alert("Check you email for the login link!")
        }finally {
            loading = false;
        }
    }

</script>

<form on:submit|preventDefault={handleLogin}>
    <h1>Login to Todo App</h1>
    <p>Sign in using a magic link sent via email</p>
    <input type="email" placeholder="Your Email" bind:value={email}/>
    <input type="submit" value={loading ? "Loading" : "Send magic link"} disabled={loading}>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;

        background-color: aqua;
        border-radius: 15px;
        gap: 15px;
        padding: 20px;
    }
</style>