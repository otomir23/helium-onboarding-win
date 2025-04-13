<script lang="ts">
    import "@fontsource-variable/instrument-sans";

    import Welcome from "./pages/Welcome.svelte";
    import PageNavigation from "./components/PageNavigation.svelte";
</script>

<main>
    <Welcome />

    <PageNavigation />
</main>

<style>
    main {
        height: 100vh;
    }
</style>
