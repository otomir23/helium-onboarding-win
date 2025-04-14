import { readable } from "svelte/store";
import * as cr from "../cr";

let setEngines: (_: cr.SearchEngine[]) => void;

const browser = cr.SearchEnginesBrowserProxyImpl.getInstance();

export const searchEngines = readable<cr.SearchEngine[]>([], (set) => {
    browser.getSearchEnginesList().then(
        engines => set(engines.defaults)
    );

    setEngines = set;
});

export const setDefaultEngine = (modelIndex: number) => {
    browser.setDefaultSearchEngine(
        modelIndex,
        cr.ChoiceMadeLocation.CHOICE_SCREEN,
        null
    );
}

cr.addWebUiListener(
    'search-engines-changed',
    (state: cr.SearchEnginesInfo) => setEngines(state.defaults)
);
