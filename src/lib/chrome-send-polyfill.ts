import * as cr from './cr';
import type { DefaultBrowserInfo } from './cr/default_browser_browser_proxy';
import type { SearchEngine, SearchEnginesInfo } from './cr/search_engines_browser_proxy';

let chrome: Record<string, Function> = {};

declare namespace globalThis {
    namespace chrome {
        function send(msg: string, params?: any[]): void;
    }
}

if (!('chrome' in globalThis)) {
    Object.assign(globalThis, { chrome });
} else {
    chrome = globalThis.chrome as typeof chrome;
}

const prefs: Record<string, unknown> = {
    'completed_onboarding': false,
    'services.bangs': true,
    'services.enabled': true,
    'services.ext_proxy': true,
    'services.origin_override': '',
    'services.user_consented': false,
    'services.spellcheck_files': true,
};

const searchEngineTemplate: SearchEngine = {
    canBeActivated: false,
    canBeDeactivated: false,
    canBeDefault: true,
    canBeEdited: true,
    canBeRemoved: true,
    default: false,
    displayName: '',
    iconPath: 'chrome://theme/IDR_DUMMY_ICON_DOT_COM@2x',
    iconURL: "https://dummy.invalid/favicon.ico",
    id: -1,
    isManaged: false,
    isOmniboxExtension: false,
    isPrepopulated: true,
    isStarterPack: false,
    keyword: 'domain.com',
    modelIndex: -1,
    name: 'Search',
    shouldConfirmDeletion: true,
    url: 'https://dummy.invalid/suggest?q=%s',
    urlLocked: true
};

const searchEngines: SearchEnginesInfo = {
    actives: [],
    defaults: [],
    extensions: [],
    others: []
};

let currentDefault = 0;

const actualDefaults: [string, number, string, number, boolean][] = [
    ["DuckDuckGo", 6, "duckduckgo.com", 0, true],
    ["Kagi", 7, "kagi.com", 1, false],
    ["Ecosia", 3, "ecosia.org", 2, false],
    ["Qwant", 4, "qwant.com", 3, false],
    ["Microsoft Bing", 2, "bing.com", 4, false],
    ["Google", 5, "google.com", 5, false],
];

for (const [ name, id, keyword, modelId, isDefault ] of actualDefaults) {
    const engine = structuredClone(searchEngineTemplate);
    engine.name = name;
    engine.displayName = name;
    if (isDefault) engine.displayName += ` (Default)`;
    engine.id = id;
    engine.modelIndex = modelId;
    engine.keyword = keyword;
    engine.default = isDefault;
    searchEngines.defaults.push(engine);
}

const defaultBrowser: DefaultBrowserInfo = {
    canBeDefault: true,
    isDefault: false,
    isDisabledByPolicy: false,
    isUnknownError: false,
};

const _send_polyfill = (msg: string, params?: any[]) => {
    console.log(msg, params);

    if (msg === 'getPrefs') {
        if (params && params[0]) {
            cr.webUIResponse(params[0], true, { ...prefs });
        }
    } else if (msg === 'setPref') {
        const [id, name, new_val] = params! as [string, string, any];

        const cur_val = prefs[name];
        if (typeof name !== 'string') {
            cr.webUIResponse(id, false, 'invalid name');
        } else if (cur_val === undefined) {
            cr.webUIResponse(id, false, `helium.${name} does not exist`);
        } else if (typeof cur_val !== typeof new_val) {
            cr.webUIResponse(id, false, 'invalid value type');
        } else {
            prefs[name] = new_val;
            cr.webUIResponse(id, true, null);
            cr.webUIListenerCallback('helium-prefs-changed', {...prefs});
        }
    } else if (msg === 'getSearchEnginesList') {
        if (params && params[0]) {
            cr.webUIResponse(params[0], true, searchEngines);
        }
    } else if (msg === 'setDefaultSearchEngine') {
        const currentDefaultEngine = searchEngines.defaults[currentDefault];
        currentDefaultEngine.displayName = currentDefaultEngine.name;
        currentDefaultEngine.default = false;
        if (params && params.length >= 1) {
            const modelIndex = +params[0];
            const nextDefaultEngine = searchEngines.defaults[modelIndex];
            nextDefaultEngine.default = true;
            nextDefaultEngine.displayName = `${nextDefaultEngine.name} (Default)`;
            currentDefault = modelIndex;
        }
        cr.webUIListenerCallback('search-engines-changed', structuredClone(searchEngines));
    } else if (msg === 'requestDefaultBrowserState') {
        if (params && params[0]) {
            cr.webUIResponse(params[0], true, defaultBrowser);
        }
    } else if (msg === 'setAsDefaultBrowser') {
        defaultBrowser.isDefault = true;
        cr.webUIListenerCallback('browser-default-state-changed', structuredClone(defaultBrowser));
    } else if (params?.[0]) {
        cr.webUIResponse(params[0], false, 'unknown method');
    }
}

if (!('send' in chrome)) {
    chrome.send = _send_polyfill;
    console.log('polyfilled chrome.send()');
}
