import {derived, readable, writable} from "svelte/store";

export const someStoredInput = writable("Hello World");

export const someReadable = readable("initial", set => {
  setTimeout(() => {
    set("updated");
  }, 5000);

  return () => console.log("stop called / last subscriber unsubscribed / no one likes me")
});

export const someDerived = derived(someStoredInput, $someStoredInput => {
    if($someStoredInput === "derived") return "cool you got it";
    else return "try again";
});

export const customStore = defineCustomStore();

function defineCustomStore() {
  const { subscribe, set, update } = writable("hello");

  return {
    subscribe, // has to be default
    someMagic: () => update(value => value += " magic"),
    more: () => update(value => value += value += value),
    reset: () => set("hello"),
  };
}