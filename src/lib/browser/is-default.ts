import { readable } from "svelte/store";
import * as cr from "../cr";

let setDefaultBrowser: (_: boolean) => void;

export const isDefaultBrowser = readable(false, (set) => {
    const browser = cr.DefaultBrowserBrowserProxyImpl.getInstance();

    browser.requestDefaultBrowserState().then(
        state => set(state.isDefault)
    );

    setDefaultBrowser = set;
});

cr.addWebUiListener(
    'browser-default-state-changed',
    (state: cr.DefaultBrowserInfo) => setDefaultBrowser(state.isDefault)
);
