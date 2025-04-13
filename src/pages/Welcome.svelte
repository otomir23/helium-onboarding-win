<script lang="ts">
    import "@fontsource-variable/instrument-sans";
    import * as Browser from "../lib/browser";

    import { s } from "../lib/strings";

    import HeliumLogo from "../icons/HeliumLogo.svelte";
    import IconCheck from "../icons/tabler/IconCheck.svelte";
    import IconArrowRight from "../icons/tabler/IconArrowRight.svelte";

    const useDefaults = async () => {
        await Browser.setPref('services.enabled', true);
        window.open("chrome://newtab", "_self");
    }
</script>

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

<style>
    #welcome-top,
    #welcome-text {
        display: flex;
        flex-direction: column;
    }

    #welcome-page {
        text-align: center;
        height: 100%;
        max-width: 700px;

        opacity: 0;
        animation: zoom-blur-in 0.7s;
        animation-delay: 0.5s;
        will-change: transform, filter, opacity;
        animation-fill-mode: forwards;
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

        animation: zoom-blur-in 0.6s;
        animation-delay: 1.2s;
        will-change: transform, filter, opacity;
        animation-fill-mode: backwards;
    }

    @keyframes zoom-blur-in {
        from {
            transform: scale(0.75);
            filter: blur(12px);
            opacity: 0;
        }
        55% {
            transform: scale(1.015);
            opacity: 1;
        }
        100% {
            transform: scale(1);
        }
        to {
            opacity: 1;
        }
    }

    @media (prefers-reduced-transparency) or (prefers-reduced-motion) {
        #welcome-page, #welcome-footer {
            animation: none;
            opacity: 1;
        }
    }
</style>
