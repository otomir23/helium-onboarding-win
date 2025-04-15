<script lang="ts">
    import { s } from "../lib/strings";
    import { currentPage } from "../lib/onboarding-flow";

    import PageHeader from "../components/PageHeader.svelte";
    import IconSearch from "../icons/tabler/IconSearch.svelte";
    import SearchEngineItem from "../components/SearchEngineItem.svelte";

    const topEngine = "DuckDuckGo";
    const searchEngines = ["Kagi", "Qwant", "Ecosia", "Bing", "Google"];

    const searchDescs: Record<string, string> = s.searchEngines;

    // can't use svgs for these engines cuz
    // they don't provide .svg as a usable brand resource
    const svgExceptions = ["Bing", "Google"];

    const iconPath = (engine: string) => {
        const ext = svgExceptions.includes(engine) ? "png" : "svg";
        return `/search-engine-icons/${engine.toLowerCase()}.${ext}`;
    };

    const visible = $derived($currentPage === "SearchEngine");
</script>

<div id="search-engines-page" class="onboarding-page" class:visible>
    <div id="search-engines-page-container" class="scrollable-page">
        <PageHeader
            title={s.search.title}
            subtitle={s.search.subtitle}
            icon={IconSearch}
        />

        <div id="content" class="page-content">
            <SearchEngineItem
                name={topEngine}
                desc={searchDescs[topEngine]}
                iconPath={iconPath(topEngine)}
            />
            {#each searchEngines as engine}
                <SearchEngineItem
                    name={engine}
                    desc={searchDescs[engine]}
                    iconPath={iconPath(engine)}
                />
            {/each}
        </div>
    </div>
</div>

<style>
    #search-engines-page {
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
</style>
