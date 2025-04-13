<script lang="ts">
    import "@fontsource-variable/instrument-sans";
    import * as Browser from "./lib/browser";

    import { s } from "./lib/strings";

    import HeliumLogo from "./icons/HeliumLogo.svelte";
    import IconCheck from "./icons/tabler/IconCheck.svelte";
    import IconArrowRight from "./icons/tabler/IconArrowRight.svelte";

    const prefs = Browser.getPrefs();
    let debug = "";

    const handleInput = async (event: Event) => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            try {
                await Browser.setPref(
                    target.name as Browser.PrefKey,
                    target.type === "checkbox" ? target.checked : target.value
                );
                debug += `setPref succeeded on ${target.name}\n`;
            } catch (e) {
                debug += `err: ${e}\n`;
            }
        }
    };

    const useDefaults = async () => {
        await Browser.setPref('services.enabled', true);
        window.open("chrome://newtab", "_self");
    }
</script>

<main>
    <div id="welcome-page">
        <div id="welcome-top">
            <div id="welcome-logo">
                <HeliumLogo />
            </div>
            <div id="welcome-text">
                <h1>{s.welcome.greeting}</h1>
                <p>{s.welcome.body}</p>
            </div>
            <div id="welcome-buttons">
                <button on:click={useDefaults}>
                    <IconCheck />
                    {s.button.useDefaults}
                </button>
                <button class="primary" tabindex="0">
                    <IconArrowRight />
                    {s.button.configure}
                </button>
            </div>
        </div>
        <div id="welcome-footer">
            <p>{s.welcome.defaultsNote}</p>
        </div>
    </div>
</main>

<style>
    main {
        height: 100vh;
    }

    #welcome-top,
    #welcome-text {
        display: flex;
        flex-direction: column;
    }

    #welcome-page {
        text-align: center;
        height: 100%;
        justify-content: center;
        align-items: center;
        max-width: 700px;
    }

    #welcome-top {
        height: 100%;
        gap: 32px;
        justify-content: center;
        align-items: center;
    }

    #welcome-logo :global(svg) {
        height: 64px;
        width: 64px;
    }

    #welcome-text {
        gap: 20px;

        & p {
            font-size: 20px;
        }
    }

    #welcome-buttons {
        display: flex;
        gap: var(--gap-2);
    }

    #welcome-footer {
        bottom: 32px;
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        left: 0;
    }
</style>
