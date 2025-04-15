import { readable } from "svelte/store";
import * as cr from "../cr";

let setProfiles: (_: cr.BrowserProfile[]) => void;

const browser = cr.ImportDataBrowserProxyImpl.getInstance();

export const importableProfiles = readable<cr.BrowserProfile[]>([], (set) => {
    browser.initializeImportDialog().then(set);
    setProfiles = set;
});

export type WhatToImport = Partial<{
    autofillFormData: boolean,
    bookmarks: boolean,
    history: boolean,
    savedPasswords: boolean,
    searchEngine: boolean,
    extensions: boolean
}>;

const convertTasks = (tasks: WhatToImport): cr.WhatToImport => {
    return {
        import_dialog_autofill_form_data: !!tasks.autofillFormData,
        import_dialog_bookmarks: !!tasks.bookmarks,
        import_dialog_history: !!tasks.history,
        import_dialog_saved_passwords: !!tasks.savedPasswords,
        import_dialog_search_engine: !!tasks.searchEngine,
        import_dialog_extensions: !!tasks.extensions
    };
}

type Action = () => void;
let queue: [number, cr.WhatToImport, Action, Action][] = [];

const runNext = () => {
    const [ index, tasks, resolve, reject ] = queue.pop()!;

    const me = cr.addWebUiListener('import-data-status-changed', (status: cr.ImportDataStatus) => {
        if ([cr.ImportDataStatus.FAILED, cr.ImportDataStatus.SUCCEEDED].includes(status)) {
            cr.removeWebUiListener(me);

            if (status === cr.ImportDataStatus.FAILED)
                reject();
            else
                resolve();

            if (queue.length) {
                runNext();
            } else {
                browser.initializeImportDialog().then(setProfiles);
            }
        }
    });

    browser.importData(index, tasks);
}

export const importProfile = (index: number, tasks: WhatToImport) => {
    const wrappedTasks = convertTasks(tasks);

    let _res: Action, _rej: Action;
    const pr = new Promise<void>((resolve, reject) => {
        _res = resolve;
        _rej = reject;

        if (queue.push([ index, wrappedTasks, _res, _rej ]) === 1) {
            runNext();
        }
    });

    return pr;
}
