<script lang="ts">

    import {supabase} from "$lib/supabaseClient";
    import Auth from "$lib/components/user/Auth.svelte";
    import {onMount} from "svelte";
    import {supabaseSession} from "$lib/stores";

    let session = $supabaseSession;
    let loading = false;
    let username: string = "";
    let fullName: string = "";
    let avatarUrl: string = "";

    onMount(() => {
        if(session) { // todo improve auth, with redirect and in layout
            const { user } = session;

            supabase
                .from("profiles")
                .select("username, full_name, avatar_url")
                .eq("id", user.id)
                .single().then(response => {
                username = response.data.username;
                fullName = response.data.full_name;
                avatarUrl = response.data.avatar_url;

                console.log(response)
                if(response.error && response.status !== 406) throw response.error;
            });
        }
    });

    async function updateProfile() {
        loading = true;
        const { user } = session;

        const updates = {
            id: user.id,
            username: username,
            full_name: fullName,
            avatar_url: avatarUrl
        }

        let { error } = await supabase.from("profiles").upsert(updates);

        if(error)
            alert(error.message)
        loading = false;
    }

    async function signOut() {
        loading = true;

        let { error } = await supabase.auth.signOut();
        if(error) throw error;
        loading = false;
    }
</script>

{#if session}
    <form on:submit|preventDefault={updateProfile}>
        <label for="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled/>

        <label for="username">Username</label>
        <input id="username" type="text" value={username}/>

        <label for="fullName">Full Name</label>
        <input id="fullName" type="text" value={fullName}/>

        <input type="submit" value={loading ? "Loading" : "Save"} disabled={loading}/>

        <button on:click={signOut} disabled={loading}>Sign out</button>
    </form>
{:else}
    <Auth />
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;

        background-color: bisque;
        border-radius: 15px;
        padding: 20px;
        gap: 15px;
    }
</style>
