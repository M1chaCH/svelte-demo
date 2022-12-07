<script lang="ts">
    import type {ActionData} from "./$types";
    import { enhance } from '$app/forms';

    export let form: ActionData;
    let canceled = false;

    // `form` is the `<form>` element
    // `data` is its `FormData` object
    // `action` is the URL to which the form is posted
    // `cancel()` will prevent the submission
    function clientSideValidation({ form, data, action, cancel }) {
        const title: string = data.get("title");
        canceled = false;

        if(title === "cancel") {
            console.log("cancel was entered")
            cancel();
            canceled = true;
        } else console.log("just fine, you may pass")

        // `result` is an `ActionResult` object
        // `update` is a function which triggers the logic that would be triggered if
        return async ({ result, update }) => {
            console.log("got response", result)
            update(); // without update form would not be cleared and "form" parameter would not update
        }
    }
</script>

<!-- todos don't update automatically because of this use:enhance.-->
<form id="testForm" method="POST" action="/todo?/addTodo" use:enhance={clientSideValidation}>
    <label for="titleInput">Title</label>
    <input id="titleInput" name="title" type="text" placeholder="new todo"/>

    <label for="descriptionInput">Description</label>
    <input id="descriptionInput" name="description" type="text" placeholder="description (optional)"/>

    <button type="submit">Save</button>

    {#if form?.empty | form?.duplicate}
        <p><strong>{form?.message}</strong></p>
    {/if}

    {#if form?.success}
        <p>Saved!</p>
    {/if}

    {#if canceled}
        <p>submission was canceled</p>
    {/if}
</form>

<style lang="scss">
  div, form {
    width: 350px;

    input{
      width: 100%;
      margin: 5px;
    }
  }


</style>