<script lang="ts">
  import CounterInput from "./lib/CounterInput.svelte";
  import Lifecycle from "./lib/Lifecycle.svelte";
  import {someStoredInput, someReadable, someDerived, customStore} from "./lib/store";
  import {onDestroy} from "svelte";
  import Motion from "./lib/Motion.svelte";
  import { fade, fly } from "svelte/transition";

  let firstName: string = "Some";
  let secondName: string = "Guy";
  let count: number = 0;
  $: console.log("count changed", count)

  let firstInput: string = "Test";
  let secondInput: string = "yee";

  $: combinedInput = `${firstInput} -> ${secondInput}`;

  let inputText: string = "Bro type something";

  let show: boolean = true;

  interface User {
    name: string,
    email: string,
    phone: number,
    uniqueKey: string,
  }

  let users: User[] = [
    {name: "test", email: "test@moretest.com", phone: 12378, uniqueKey: "abc"},
    {name: "teste", email: "teste@moretest.com", phone: 83084, uniqueKey: "dfg"},
    {name: "testee", email: "testee@moretest.com", phone: 85802, uniqueKey: "hij"},
  ];

  let componentCount: number = 18;
  let component: any | undefined;
  $: {
    if(component) component.executeMeFromAnywhere();
  }
  let b: boolean = false;
  $: console.log("check box is", b);

  let amount: number = 1;
  let checked: string[] = [ "cat", "yes", "..." ];
  let words: string[] = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  let checkboxes: string[] = [ "car", "cat", "dog", "yes", "oof", "..." ];

  let value: string;

  let someDiv: HTMLDivElement | undefined;
  $: {
    if (someDiv) {
      someDiv.style.backgroundColor = "red";
    }
  }

  let someInput: string = "none here yet ):"
  const someStoreUnSub: Function = someStoredInput.subscribe((value) => someInput = value) // writable store has a subscribe, update & set method
  onDestroy(() => someStoreUnSub()) // suggested to unsubscribe from stores when component is destroyed due to memory leaks

  function getPromise(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users)
      }, 2000)
    })
  }

  function increaseCount() {
    count++;
  }

  function decreaseCount() {
    count--;
  }

  function handleInput(e) {
    inputText = e.target.value;
  }

  function alertPlease() {
    alert("this is an alert. It will only be called once");
  }
</script>

<main>
  <h1>Hello {firstName} {secondName}</h1>
  <h4>events</h4>
  <button on:click={increaseCount}>+</button>
  <span>This is the current count ->  {count}</span>
  <button on:click={decreaseCount}>-</button>

  <h4>conditionals</h4>
  {#if count > 0}
    <p>Count is g than 0</p>
  {:else if count === 0}
    <p>Count is 0</p>
  {:else}
    <p>Count is less than 0</p>
  {/if}

  <h4>bidirectional binding</h4>
  <input type="text" on:input={handleInput} value={inputText}/>
  <input type="text" bind:value={inputText}/>
  <span>Here is your text: </span>
  <span>{inputText}</span>

  <h4>value that listens to changes</h4>
  <input type="text" bind:value={firstInput}/>
  <input type="text" bind:value={secondInput}/>
  <span>Combined text: {combinedInput}</span>

  <h4>loop</h4>
  {#each users as user, index}
    <div>
      <span>{user.name} - {user.email} - {user.phone}</span>
      <button on:click={() => users = users.filter(u => u.uniqueKey !== user.uniqueKey)}>remove</button>
    </div>
  {/each}

  <h4>loop with error handling</h4>
  {#each [] as item}
    <span>{item}</span>
  {:else}
    <span>this is a loop over an empty array</span>
  {/each}

  <h4>await with state handing</h4>
  {#await getPromise()}
    <div>loading...</div>
  {:then users}
    {#each users as user, index}
      <span>{user.name} - {user.email} - {user.phone}</span>
    {/each}
  {:catch error}
    <div>error</div>
  {/await}

  <h4>pipe on events</h4>
  <button on:click|once={alertPlease}>click twice</button>

  <h4>Component events and props</h4>
  <h5>counter is {componentCount}</h5>
  <CounterInput bind:this={component} bind:count={componentCount} on:reached={e => alert(`the desired count of ${e.detail} has been reached`)}/>

  <h4>svelte handles types automatically</h4>
  <input type="number" bind:value={componentCount} min="3" max="25"/>

  <h4>checked not value</h4>
  <input type="checkbox" bind:checked={b}/>

  <h4>bind group</h4>
  <h5>radio to int: {amount}</h5>
  <div>
    {#each words as w, index }
      <label>
        <input type="radio" bind:group={amount} value={index + 1}/>
        {w}
      </label>
    {/each}
  </div>

  <h5>checked to list: {checked}</h5>
  <div>
    {#each checkboxes as c}
      <label>
        <input type="checkbox" bind:group={checked} value={c}/>
        {c}
      </label>
    {/each}
  </div>

  <h4>bind short form: {value}</h4>
  <input type="text" bind:value/>

  <h4>bind "this"</h4>
  <div bind:this={someDiv}>
    if bind was a success than background is red
  </div>

  <h4>Lifecycle (console)</h4>
  <input type="checkbox" bind:checked={show} />
  {#if show}
    <div transition:fly={{x: 50, duration: 250}}>
      <Lifecycle/>
    </div>
  {/if}

  <h4>Stores</h4>
  <h5>someInput: {someInput}</h5>
  <input type="text" on:input={v => $someStoredInput = v.target.value}/>
  <input type="text" bind:value={$someStoredInput}/>
  <h5>derived (enter "dervied") -> {$someDerived}</h5>
  <h5>readonly store: {$someReadable}</h5>

  <h5>custom store</h5>
  <div>
    <span>value: {$customStore}</span>
    <button on:click={() => customStore.someMagic()}>magic</button>
    <button on:click={() => customStore.more()}>more</button>
    <button on:click={() => customStore.reset()}>reset</button>
  </div>

  <Motion />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    margin-bottom: 40px;
  }
</style>
