<script lang="ts">
    import { s } from "../lib/strings";
    import { nextPage, previousPage, currentPage } from "../lib/onboarding-flow";

    import IconArrowLeft from "../icons/tabler/IconArrowLeft.svelte";
    import IconArrowRight from "../icons/tabler/IconArrowRight.svelte";

    $: visible = $currentPage !== "Welcome" && $currentPage !== "Finish";
</script>

<div id="setup-buttons" class:visible>
    <button on:click={previousPage}>
        <IconArrowLeft />
        {s.button.back}
    </button>
    <button class="primary" on:click={nextPage}>
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
