import { readable } from "svelte/store";
import * as cr from "../cr";

let setDefaultBrowser: (_: boolean) => void;

const browser = cr.DefaultBrowserBrowserProxyImpl.getInstance();

export const isDefaultBrowser = readable(false, (set) => {
    browser.requestDefaultBrowserState().then(
        state => set(state.isDefault)
    );

    setDefaultBrowser = set;
});

export const askToBeDefault = (/* 🥺👉👈 */) => {
    browser.setAsDefaultBrowser();
}

cr.addWebUiListener(
    'browser-default-state-changed',
    (state: cr.DefaultBrowserInfo) => setDefaultBrowser(state.isDefault)
);
