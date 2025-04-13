<script lang="ts">
    import "@fontsource-variable/instrument-sans";

    import Welcome from "./pages/Welcome.svelte";
    import PageNavigation from "./components/PageNavigation.svelte";
    import HeliumServices from "./pages/HeliumServices.svelte";
    import SearchEngine from "./pages/SearchEngine.svelte";
    import Finish from "./pages/Finish.svelte";
</script>

<main>
    <Welcome />

    <PageNavigation />
    <HeliumServices />
    <SearchEngine />
    <Finish />
</main>

<style>
    main {
        height: 100vh;
    }
</style>
