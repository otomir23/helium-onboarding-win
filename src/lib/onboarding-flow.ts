import { SvelteSet } from "svelte/reactivity";
import { derived, get, readable, writable, type Updater } from "svelte/store";

import { importableProfiles } from "./browser";

export const flow = [
    "Welcome",
    "HeliumServices",
    "SearchEngine",
    "DataImport",
    "DefaultBrowser",
    "Finish"
];

let update: (_: Updater<number>) => void;

const index = readable(
    0,
    (_, _update) => { update = _update }
);

export const currentPage = derived(
    index,
    $index => flow[$index]
);

export const nextPage = () => {
    update((current) => {
        if (current < flow.length - 1) {
            ++current;

            // skip the data import page
            // if there's nothing to import
            if (flow[current] === "DataImport"
                && get(importableProfiles).length === 0) {
                ++current;
            }
        }
        return current;
    });
}

export const previousPage = () => {
    update((current) => {
        if (current) {
            --current;

            // skip the data import page
            // if there's nothing to import
            if (flow[current] === "DataImport"
                && get(importableProfiles).length === 0) {
                --current;
            }
        }
        return current;
    });
}

export const userChoseHeliumAsDefault = writable(true);
export const selectedProfiles = writable(new SvelteSet<number>());
export const previouslyImportedProfiles = writable(new SvelteSet<number>());
