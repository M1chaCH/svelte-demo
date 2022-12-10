import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import type {AuthSession} from "@supabase/supabase-js";

export const supabaseSession: Writable<AuthSession> = writable<AuthSession>();