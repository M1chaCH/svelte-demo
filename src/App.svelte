<script>
  let firstName = "Micha";
  let secondName = "Schweizer";
  let count = 0;
  $: console.log("count changed", count)

  let firstInput = "Test";
  let secondInput = "yee";

  $: combinedInput = `${firstInput} -> ${secondInput}`

  let inputText = "Bro type something";

  let users = [
    {name: "test", email: "test@moretest.com", phone: "12378", uniqueKey: "abc"},
    {name: "teste", email: "teste@moretest.com", phone: "83084", uniqueKey: "dfg"},
    {name: "testee", email: "testee@moretest.com", phone: "85802", uniqueKey: "hij"},
  ];

  function increaseCount() {
    count++;
  }

  function decreaseCount() {
    count--;
  }

  function handleInput(e) {
    inputText = e.target.value;
  }
</script>

<main>
  <h1>Hello {firstName} {secondName}</h1>
  <button on:click={increaseCount}>+</button>
  <span>This is the current count ->  {count}</span>
  <button on:click={decreaseCount}>-</button>
  {#if count > 0}
    <p>Count is g than 0</p>
  {:else if count === 0}
    <p>Count is 0</p>
  {:else}
    <p>Count is less than 0</p>
  {/if}

  <input type="text" on:input={handleInput} value={inputText}/>
  <input type="text" bind:value={inputText}/>
  <span>Here is your text: </span>
  <span>{inputText}</span>

  <input type="text" bind:value={firstInput}/>
  <input type="text" bind:value={secondInput}/>
  <span>Combined text: {combinedInput}</span>

  {#each users as user, index}
    <div>
      <span>{user.name} - {user.email} - {user.phone}</span>
      <button on:click={() => users = users.filter(u => u.uniqueKey !== user.uniqueKey)}>remove</button>
    </div>
  {/each}

  {#each [] as item}
    <span>{item}</span>

  {:else}
    <span>this is a loop over an empty array</span>
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
</style>
