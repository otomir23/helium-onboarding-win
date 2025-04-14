import { readable } from "svelte/store";
import * as cr from "../cr";

export type Preferences = {
    'completed_onboarding': boolean,
    'services.bangs': boolean,
    'services.enabled': boolean,
    'services.ext_proxy': boolean,
    'services.origin_override': string,
    'services.user_consented': boolean,
    'services.spellcheck_files': boolean,
};

export type PrefKey = keyof Preferences;

let setPreferences: (_: Preferences) => void;

export const preferences = readable(
    {} as Preferences,
    (set) => {
        cr.sendWithPromise('getPrefs').then(set);
        setPreferences = set;
    }
);

export const setPref = async <
    Key extends PrefKey,
    Value extends Preferences[PrefKey]
>(name: Key, value: Value): Promise<void> => {
    await cr.sendWithPromise('setPref', name, value);
}

cr.addWebUiListener(
    'helium-prefs-changed',
    (prefs: Preferences) => setPreferences(prefs)
);
