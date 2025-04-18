<script lang="ts">
    import { s } from "../lib/strings";
    import { askToBeDefault, setPref } from "../lib/browser";
    import { nextPage, previousPage, currentPage, userChoseHeliumAsDefault } from "../lib/onboarding-flow";

    import IconArrowLeft from "../icons/tabler/IconArrowLeft.svelte";
    import IconArrowRight from "../icons/tabler/IconArrowRight.svelte";

    const visible = $derived(
        $currentPage !== "Welcome" && $currentPage !== "Finish"
    );

    const next = () => {
        // if the user pressed "next" on the HeliumServices page,
        // then we mark consent (having seen the page) as true
        if ($currentPage === "HeliumServices") {
            setPref("services.user_consented", true);
        }

        if ($currentPage === "DefaultBrowser" && $userChoseHeliumAsDefault) {
            askToBeDefault();
        }
        nextPage();
    }
</script>

<div id="setup-buttons" class:visible>
    <button onclick={previousPage}>
        <IconArrowLeft />
        {s.button.back}
    </button>
    <button class="primary" onclick={next}>
        <IconArrowRight />
        {s.button.next}
    </button>
</div>

<style>
    #setup-buttons {
        display: flex;
        justify-content: center;
        width: 100%;
        left: 0;
        bottom: 48px;
        position: absolute;
        gap: var(--gap-2);
        z-index: 9;

        visibility: hidden;

        &.visible {
            visibility: visible;
            animation: zoom-blur-in 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: backwards;
        }

        &:not(.visible) {
            animation: zoom-blur-out 0.2s;
            animation-fill-mode: forwards;
        }
    }
</style>
