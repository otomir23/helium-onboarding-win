import { SvelteSet } from "svelte/reactivity";
import { derived, get, readable, writable, type Updater } from "svelte/store";

import { canBeDefaultBrowser, importableProfiles, isDefaultBrowser } from "./browser";

export const flow = [
    "Welcome",
    "HeliumServices",
    "SearchEngine",
    "DataImport",
    "DefaultBrowser",
    "Finish"
] as const;

let update: (_: Updater<number>) => void;

const index = readable(
    0,
    (_, _update) => { update = _update }
);

export const currentPage = derived(
    index,
    $index => flow[$index]
);

const getPageNumber = (current: number, direction = 1) => {
    let next = current + direction;

    if (flow[next] === 'DataImport') {
        // skip if nothing to import
        if (get(importableProfiles).length === 0)
            next += direction;
    }

    if (flow[next] === 'DefaultBrowser') {
        // skip if we're already default (we can't undefault ourselves)
        if (!canBeDefaultBrowser || get(isDefaultBrowser))
            next += direction;
    }

    return Math.max(0, Math.min(next, flow.length - 1));
}

export const nextPage = () => {
    update(getPageNumber);
}

export const previousPage = () => {
    update((current) => getPageNumber(current, -1));
}

export const userChoseHeliumAsDefault = writable(true);
export const selectedProfiles = writable(new SvelteSet<number>());
export const previouslyImportedProfiles = writable(new SvelteSet<number>());
