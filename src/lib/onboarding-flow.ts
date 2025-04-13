import { derived, writable, type Updater } from "svelte/store";

export const flow = [
    "Welcome",
    "HeliumServices",
    "SearchEngine",
    "Finish"
];

let update: (_: Updater<number>) => void;

const index = writable(
    0,
    (_, _update) => { update = _update }
);

export const currentPage = derived(
    index,
    $index => flow[$index]
);

export const nextPage = () => {
    update((current) => {
        return ++current;
    });
}

export const previousPage = () => {
    update((current) => {
        if (current >= 1) {
            return --current;
        }
        return current;
    })
}
