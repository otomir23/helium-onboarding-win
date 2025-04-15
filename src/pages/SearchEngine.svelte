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
    <div id="search-engines-page-container">
        <PageHeader
            title={s.search.title}
            subtitle={s.search.subtitle}
            icon={IconSearch}
        />

        <div id="content">
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

    #search-engines-page-container {
        max-width: 600px;
        overflow-x: scroll;
        overflow-y: visible;
        padding: 20px;
        padding-top: 0;
        padding-bottom: 150px;

        mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 80%,
            rgba(0, 0, 0, 0.1) 90%,
            rgba(0, 0, 0, 0) 100%
        );
    }

    #content {
        display: flex;
        flex-direction: column;
        gap: var(--gap-1);
        margin-top: var(--gap-2);
        align-items: center;
    }
</style>
