<script lang="ts">
    import { s } from "../lib/strings";
    import { currentPage } from "../lib/onboarding-flow";

    import HeliumLogo from "../icons/HeliumLogo.svelte";
    import PageHeader from "../components/PageHeader.svelte";

    $: visible = $currentPage === "HeliumServices";
</script>

<div
    id="services-page"
    class="onboarding-page"
    class:visible
>
    <div id="services-page-container">
        <PageHeader
            title={s.services.title}
            subtitle={s.services.subtitle}
            icon={HeliumLogo}
        />
    </div>
</div>

<style>
    #services-page {
        justify-content: flex-start;
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

    #services-page-container {
        max-width: 600px;
    }
</style>
