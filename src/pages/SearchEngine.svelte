<script lang="ts">
    import { s } from "../lib/strings";
    import { currentPage } from "../lib/onboarding-flow";

    import PageHeader from "../components/PageHeader.svelte";
    import IconSearch from "../icons/tabler/IconSearch.svelte";

    const visible = $derived($currentPage === "SearchEngine");
</script>

<div
    id="services-page"
    class="onboarding-page"
    class:visible
>
    <div id="services-page-container">
        <PageHeader
            title={s.search.title}
            subtitle={s.search.subtitle}
            icon={IconSearch}
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
