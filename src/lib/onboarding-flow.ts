import { derived, readable, writable, type Updater } from "svelte/store";

export const flow = [
    "Welcome",
    "HeliumServices",
    "SearchEngine",
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
        }
        return current;
    });
}

export const previousPage = () => {
    update((current) => {
        if (current) {
            --current;
        }
        return current;
    })
}

export const userChoseHeliumAsDefault = writable(true);
