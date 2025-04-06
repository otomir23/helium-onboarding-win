import * as cr from "./cr";

export type Preferences = {
    'services.bangs': boolean,
    'services.enabled': boolean,
    'services.ext_proxy': boolean,
    'services.origin_override': string,
    'services.spellcheck_files': boolean,
};

export type PrefKey = keyof Preferences;

export const getPrefs = async (): Promise<Preferences> => {
    return Object.freeze(await cr.sendWithPromise('getPrefs'));
}

export const setPref = async <
    Key extends PrefKey,
    Value extends Preferences[PrefKey]
>(name: Key, value: Value): Promise<void> => {
    await cr.sendWithPromise('setPref', name, value);
}

export const markOnboardingComplete = () => {
    cr.sendWithPromise('markOnboardingComplete');
}
