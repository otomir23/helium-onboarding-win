import * as cr from './cr';

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
    completed_onboarding: false,
    'services.bangs': false,
    'services.enabled': false,
    'services.ext_proxy': false,
    'services.origin_override': '',
    'services.spellcheck_files': false
};

const _send_polyfill = (msg: string, params?: any[]) => {
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
        }
    } else if (params?.[0]) {
        cr.webUIResponse(params[0], false, 'unknown method');
    }
}

if (!('send' in chrome)) {
    chrome.send = _send_polyfill;
    console.log('polyfilled chrome.send()');
}
