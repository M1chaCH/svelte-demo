import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import {supabaseSession} from "$lib/stores";
import type {AuthSession} from "@supabase/supabase-js";

export const load: LayoutLoad = async (event) => {
    const { session } = await getSupabase(event);

    supabaseSession.set(session as AuthSession);
    return session;
}