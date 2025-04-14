<script lang="ts">
    import { s } from "../lib/strings";
    import { currentPage } from "../lib/onboarding-flow";

    import HeliumLogo from "../icons/HeliumLogo.svelte";
    import IconCheck from "../icons/tabler/IconCheck.svelte";

    const done = async () => {
        window.open("chrome://newtab", "_self");
    }

    const visible = $derived($currentPage === "Finish");
</script>

<div
    id="welcome-page"
    class="onboarding-page"
    class:visible
>
    <div id="welcome-page-container">
        <div id="welcome-top">
            <div id="welcome-logo">
                <HeliumLogo />
            </div>
            <div id="welcome-text">
                <h1>{s.finish.title}</h1>
                <p>{s.finish.body}</p>
            </div>
            <div id="welcome-buttons">
                <button class="primary" onclick={done}>
                    <IconCheck />
                    {s.button.getStarted}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    #welcome-page {
        visibility: hidden;

        &.visible {
            visibility: visible;
            animation: zoom-blur-in 0.5s;
            animation-fill-mode: backwards;
        }

        &:not(.visible) {
            animation: zoom-blur-out 0.2s;
            animation-fill-mode: forwards;
        }
    }

    #welcome-top,
    #welcome-text {
        display: flex;
        flex-direction: column;
    }

    #welcome-page-container {
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

    @media (prefers-reduced-transparency) or (prefers-reduced-motion) {
        #welcome-page.visible {
            animation: none;
            opacity: 1;
        }
    }
</style>
